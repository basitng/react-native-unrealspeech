import { useState, useCallback } from "react";
import UnrealSpeech, { BlobResponse, ISynthesisTaskResponse } from "./api";

type StatusType = any; // Define a more specific type if needed
type RequestState = "idle" | "loading" | "success" | "error";

const useUnrealSpeech = (apiKey: string) => {
  const unrealSpeech = new UnrealSpeech(apiKey);

  const [status, setStatus] = useState<StatusType>(null);
  const [requestState, setRequestState] = useState<RequestState>("idle");

  const createSynthesisTask = useCallback(
    async (
      text: string,
      voiceId: string = "Scarlett",
      bitrate: string = "192k",
      speed: number = 0,
      pitch: number = 1.0,
      timestampType: string = "word"
    ) => {
      setRequestState("loading");
      try {
        const taskId = await unrealSpeech.createSynthesisTask(
          text,
          voiceId,
          bitrate,
          timestampType,
          speed,
          pitch
        );
        setStatus(taskId);
        setRequestState("success");
      } catch (error) {
        console.error("Error creating synthesis task:", error);
        setStatus(null);
        setRequestState("error");
      }
    },
    [unrealSpeech]
  );

  const getSynthesisTaskStatus = useCallback(
    async (
      taskId: string
    ): Promise<ISynthesisTaskResponse["SynthesisTask"]> => {
      setRequestState("loading");
      try {
        const taskStatus = await unrealSpeech.getSynthesisTaskStatus(taskId);
        setStatus(taskStatus);
        setRequestState("success");
        return taskStatus;
      } catch (error) {
        console.error("Error fetching task status:", error);
        setRequestState("error");
        throw error;
      }
    },
    [unrealSpeech]
  );

  const stream = useCallback(
    async (
      text: string,
      voiceId: string = "Scarlett",
      bitrate: string = "192k",
      speed: number = 0,
      pitch: number = 1.0,
      timestampType: string = "word"
    ): Promise<BlobResponse> => {
      setRequestState("loading");
      try {
        const audioBuffer = await unrealSpeech.stream(
          text,
          voiceId,
          bitrate,
          timestampType,
          speed,
          pitch
        );
        setRequestState("success");
        return audioBuffer;
      } catch (error) {
        console.error("Error in streaming:", error);
        setRequestState("error");
        throw error;
      }
    },
    [unrealSpeech]
  );

  const speech = useCallback(
    async (
      text: string,
      voiceId: string = "Scarlett",
      bitrate: string = "320k",
      timestampType: string = "sentence",
      speed: number = 0,
      pitch: number = 1.0
    ): Promise<any> => {
      setRequestState("loading");
      try {
        const speechData = await unrealSpeech.speech(
          text,
          voiceId,
          bitrate,
          timestampType,
          speed,
          pitch
        );
        setRequestState("success");
        return speechData;
      } catch (error) {
        console.error("Error in speech synthesis:", error);
        setRequestState("error");
        throw error;
      }
    },
    [unrealSpeech]
  );

  return {
    createSynthesisTask,
    getSynthesisTaskStatus,
    stream,
    speech,
    status,
    requestState,
  };
};

export default useUnrealSpeech;
