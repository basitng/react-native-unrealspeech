# Unreal Speech React Native SDK

Unreal Speech React Native SDK allows you to easily integrate the Unreal Speech API into your React Native application for text-to-speech (TTS) synthesis. This SDK provides convenient methods for working with the Unreal Speech API, including generating speech, managing synthesis tasks, and streaming audio.

## Getting Started:

## Installation for both Bare and manage React Native Project

```bash
    npm i react-native-unrealspeech
```

## Available endpoints

| Endpoint                 | Description                                  |
| ------------------------ | -------------------------------------------- |
| `/stream`                | Stream audio for short, time-sensitive cases |
| `/speech`                | Generate speech with options (MP3 format)    |
| `/synthesisTasks`        | Manage synthesis tasks for longer text       |
| `/synthesisTasks/TaskId` | Check the status of a synthesis task         |

## Common Request Body Schema

| Property | Type   | Required? | Default Value | Allowed Values                             |
| -------- | ------ | --------- | ------------- | ------------------------------------------ |
| VoiceId  | string | Required  | N/A           | Scarlett, Liv, Dan, Will, Amy              |
| Bitrate  | string | Optional  | 192k          | 16k, 32k, 48k, 64k, 128k, 192k, 256k, 320k |
| Speed    | float  | Optional  | 0             | -1.0 to 1.0                                |
| Pitch    | float  | Optional  | 1.0           | 0.5 to 1.5                                 |

## Parameter Details

- **VoiceId:**

  - Dan: Young Male
  - Will: Mature Male
  - Scarlett: Young Female
  - Liv: Young Female
  - Amy: Mature Female

- **Bitrate:** Defaults to 192k. Use lower values for low bandwidth or to reduce the transferred file size. Use higher values for higher fidelity.

- **Speed:** Defaults to 0. Examples:

  - 0.5: makes the audio 50% faster. (i.e., 60-second audio becomes 42 seconds)
  - -0.5: makes the audio 50% slower. (i.e., 60-second audio becomes 90 seconds.)

- **Pitch:** Defaults to 1. However, on the landing page, we default male voices to 0.92 as people tend to prefer lower/deeper male voices.

## Rate Limit

| Plan  | Requests per second |
| ----- | ------------------- |
| Free  | 1                   |
| Basic | 2                   |
| Pro   | 8                   |

## Obtaining an API Key

[Get your API Key](https://unrealspeech.com)
To use the Unreal Speech API, you'll need to obtain an API key by signing up for an account on the Unreal Speech website. Once you have an API key, you can use it to initialize the UnrealSpeechAPI class.

## Usage

To use the SDK, you need to initialize it with your API key and other required configurations.
Initialization

```javascript
import { UnrealSpeech } from "react-native-unrealspeech";
const unrealSpeech = new UnrealSpeech("your_api_key");
```

### Methods

#### `stream(text, voiceId, bitrate, speed, pitch, codec, temperature)`

This method streams the synthesized speech based on the provided parameters.

- `text`: The text to be synthesized.
- `voiceId`: The ID of the voice to be used.
- `bitrate`: The bitrate of the audio.
- `speed`: The speed of speech.
- `pitch`: The pitch of speech.
- `codec`: The audio codec to be used.
- `temperature`: The temperature of speech.

Returns: A promise that resolves to the synthesized speech buffer.

#### `createSynthesisTask(text, voiceId, bitrate, timestampType)`

This method creates a synthesis task for the provided text and voice.

- `text`: The text to be synthesized.
- `voiceId`: The ID of the voice to be used.
- `bitrate`: The bitrate of the audio.
- `timestampType`: The type of timestamp to be used.

Returns: A promise that resolves to the ID of the created synthesis task.

#### `getSynthesisTaskStatus(taskId)`

This method retrieves the status of a synthesis task based on the provided task ID.

- `taskId`: The ID of the synthesis task.

Returns: A promise that resolves to the status of the synthesis task.

#### `speech(text, voiceId, bitrate, timestampType)`

This method synthesizes speech based on the provided text and voice.

- `text`: The text to be synthesized.
- `voiceId`: The ID of the voice to be used.
- `bitrate`: The bitrate of the audio.
- `timestampType`: The type of timestamp to be used.

Returns: A promise that resolves to the synthesized speech data.

### Configuration Options

- `apiKey`: Your API key for authentication.
- Other configuration options and their descriptions.

## Examples

#### stream

This method streams the synthesized speech based on the provided parameters.

```javascript
const buffer = await unrealSpeech.stream("Hello, world!");
console.log(buffer);
```

#### createSynthesisTask

```javascript
const taskId = await unrealSpeech.createSynthesisTask("Hello, world!");
console.log(taskId); // Use the ID of the created synthesis task as needed
```

#### getSynthesisTaskStatus

```javascript
const taskId = "task123"; // Replace with the actual task ID
const status = await unrealSpeech.getSynthesisTaskStatus(taskId);
console.log(status); // Use the status of the synthesis task as needed
```

#### speech

```javascript
const speechData = await unrealSpeech.speech("Hello, world!");
console.log(speechData); // Use the synthesized speech data as needed
```

## useUnrealSpeech Hook

The `useUnrealSpeech` hook is designed to facilitate speech synthesis tasks in React Native applications. It provides a simple and efficient way to convert text to speech using the UnrealSpeech API.

First, import the `useUnrealSpeech` hook from the package:

```javascript
import useUnrealSpeech from "react-native-unrealspeech";
```

API Key
You will need an API key from UnrealSpeech to use this hook.

### Example

Here is a basic example of how to use the useUnrealSpeech hook in your React Native application:

```javascript
import React from "react";
import { Text, Button, View } from "react-native";
import useUnrealSpeech from "react-native-unrealspeech";

const App = () => {
  const {
    createSynthesisTask,
    getSynthesisTaskStatus,
    stream,
    speech,
    status,
    requestState,
  } = useUnrealSpeech("your-api-key");

  const handleSpeech = async () => {
    await createSynthesisTask("Hello, world!");
  };

  return (
    <View>
      <Button onPress={handleSpeech} title="Speak" />
      {requestState === "loading" && <Text>Loading...</Text>}
      {status && <Text>Status: {status}</Text>}
    </View>
  );
};

export default App;
```

## Functions

### `createSynthesisTask`

Creates a new synthesis task.

**Parameters**

- `text`: The text to be synthesized.
- `voiceId`: (Optional) The voice ID to use for synthesis. Default is "Scarlett".

**Returns**

- Task ID on success.

### `getSynthesisTaskStatus`

Gets the status of a synthesis task.

**Parameters**

- `taskId`: The ID of the task.

**Returns**

- Task status object on success.

### `stream`

Streams the synthesized speech.

**Parameters**

- `text`: The text to be synthesized.
- Additional optional parameters for customization.

**Returns**

- A `BlobResponse` object containing the audio buffer.

### `speech`

Generates speech data.

**Parameters**

- `text`: The text to be synthesized.
- Additional optional parameters for customization.

**Returns**

- Speech data on success.

## States

- `status`: Current status of the task.
- `requestState`: State of the request (`idle`, `loading`, `success`, `error`).

## Troubleshooting

Include common issues and their solutions.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
