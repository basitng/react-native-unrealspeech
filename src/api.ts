// api.ts
interface ISynthesisTaskResponse {
  SynthesisTask: {
    CreationTime: string;
    OutputUri: string;
    RequestCharacters: string;
    TaskId: string;
    TaskStatus: string;
    VoiceId: string;
  };
}

interface BlobResponse {
  _bodyBlob: {
    _data: {
      blobId: string;
      name: string;
      offset: number;
      size: number;
      type: string;
    };
  };
  headers: {
    map: {
      [key: string]: string;
    };
  };
  ok: boolean;
  status: number;
  statusText: string;
  type: string;
  url: string;
}

class UnrealSpeech {
  private api_key: string;
  private base_url: string;
  private headers: Record<string, string>;

  constructor(api_key: string) {
    this.api_key = api_key;
    this.base_url = "https://api.v6.unrealspeech.com";
    this.headers = {
      Authorization: `Bearer ${api_key}`,
      "Content-Type": "application/json",
    };
  }

  async stream(
    text: string,
    voiceId: string = "Scarlett",
    bitrate: string = "192k",
    speed: number = 0,
    pitch: number = 1.0,
    codec: string = "libmp3lame",
    temperature: number = 0.25
  ): Promise<BlobResponse> {
    const url = `${this.base_url}/stream`;
    const payload = {
      Text: text,
      VoiceId: voiceId,
      Bitrate: bitrate,
      Speed: speed,
      Pitch: pitch,
      Codec: codec,
      Temperature: temperature,
    };
    const response = await this._makePostRequest(url, payload);
    return response as unknown as BlobResponse; // Cast the response to BlobResponse type
  }

  async createSynthesisTask(
    text: string,
    voiceId: string = "Scarlett",
    bitrate: string = "192k",
    timestampType: string = "word"
  ): Promise<string> {
    const url = `${this.base_url}/synthesisTasks`;
    const payload = {
      Text: [text],
      VoiceId: voiceId,
      Bitrate: bitrate,
      TimestampType: timestampType,
    };
    const response = await this._makePostRequest(url, payload);
    const data = (await response.json()) as ISynthesisTaskResponse;
    return data.SynthesisTask.TaskId;
  }

  async getSynthesisTaskStatus(
    taskId: string
  ): Promise<ISynthesisTaskResponse["SynthesisTask"]> {
    const url = `${this.base_url}/synthesisTasks/${taskId}`;
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      const response = await this._makeGetRequest(url);
      const data = (await response.json()) as ISynthesisTaskResponse;
      const taskStatus = data.SynthesisTask;

      if (taskStatus.TaskStatus === "completed") {
        return taskStatus;
      } else {
        console.log("Audiobook generation is in progress.");
        attempts++;
        await new Promise((resolve: any) => setTimeout(resolve, 2000));
      }
    }

    throw new Error("Task status check exceeded maximum attempts");
  }

  async speech(
    text: string,
    voiceId: string = "Scarlett",
    bitrate: string = "320k",
    timestampType: string = "sentence"
  ): Promise<any> {
    const url = `${this.base_url}/speech`;
    const payload = {
      Text: text,
      VoiceId: voiceId,
      Bitrate: bitrate,
      OutputFormat: "uri",
      TimestampType: timestampType,
    };
    const response = await this._makePostRequest(url, payload);
    return response.json();
  }

  private async _makePostRequest(url: string, data: any): Promise<Response> {
    const response = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return this._handleResponse(response);
  }

  private async _makeGetRequest(url: string): Promise<Response> {
    const response = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    return this._handleResponse(response);
  }

  private async _handleResponse(response: Response): Promise<Response> {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response;
  }
}

export type { ISynthesisTaskResponse, BlobResponse };
export default UnrealSpeech;
