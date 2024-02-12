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
import { UnrealSpeech } from "react-native-unrealspeech";
const unrealSpeech = new UnrealSpeech("your_api_key");

const App = () => {
  
  const handlePress = async () => { 
    const bitrate = "192k";
    const speed = 0;
    const pitch = 1.0;
    const text = "Hello world";
    const voiceId = "Will";
    const timestampType = "word";
    
    const buffer = await unrealSpeech.stream(
      	text,
        voiceId,
        bitrate,
      	timestampType,
        speed,
        pitch,
    );
    console.log(buffer);
  }
  
  return (
    <Button onPress={handlePress} title="Press!"/>
    
    )
}

```

#### createSynthesisTask

```javascript
import { UnrealSpeech } from "react-native-unrealspeech";
const unrealSpeech = new UnrealSpeech("your_api_key");

const App = () => {
  
  const handlePress = async () => { 
    const text = "Hello world";
    const voice_id = "Scarlett";
    const bitrate = "192k";
    const timestampType = "word";
    const speed = 0;
    const pitch = 1.0;
    
   	 const taskId = await unrealSpeech.createSynthesisTask(text, voice_id, bitrate, timestampType, speed, pitch);
			// Pass the ID of the created synthesis task to getSynthesisTaskStatus
			console.log(taskId);
  }
  
  return (
    <Button onPress={handlePress} title="Press!"/>
    
    )
}

```

#### getSynthesisTaskStatus

```javascript
import { UnrealSpeech } from "react-native-unrealspeech";
const unrealSpeech = new UnrealSpeech("your_api_key");

const App = () => {
  
  const handlePress = async () => { 
  	const taskId = "task123"; // Replace with the actual task ID
		const status = await unrealSpeech.getSynthesisTaskStatus(taskId);
		console.log(status);
  }
  
  return (
    <Button onPress={handlePress} title="Press!"/>
    
    )
}

```

#### speech

```javascript
import { UnrealSpeech } from "react-native-unrealspeech";
const unrealSpeech = new UnrealSpeech("your_api_key");

const App = () => {
  
  const handlePress = async () => { 

    const text = "Hello world";
   	const voice = "Will";
    const bitrate = "320k";
    const timestampType = "sentence";
    const speed = 0.5;
    const pitch = 1.0;
    
  	const speechData = await speech(
        text,
        voice,
        bitrate,
        timestampType,
        speed,
        pitch
      );
		console.log(speechData); 
  }
  
  return (
    <Button onPress={handlePress} title="Press!"/>
    
    )
}

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

function App() {
  const apiKey = "YOUR_API_KEY";

  const {
    createSynthesisTask,
    getSynthesisTaskStatus,
    stream,
    speech,
    status,
    requestState,
  } = useUnrealSpeech(apiKey);

  // State variables
  const [textToSynthesize, setTextToSynthesize] = useState("");
  const [taskId, setTaskId] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("Scarlett"); // Default voice

  // Function to create a synthesis task
  const handleCreateTask = async () => {
    try {
      await createSynthesisTask(textToSynthesize, selectedVoice);
      // Handle successful task creation
    } catch (error) {
      // Handle error
    }
  };

  // Function to get task status
  const handleGetTaskStatus = async () => {
    try {
      const taskStatus = await getSynthesisTaskStatus(taskId);
      // Handle task status retrieval
    } catch (error) {
      // Handle error
    }
  };

  // Function to stream audio
  const handleStream = async () => {
    try {
      
      const text = "Hello world";
    	const voice = "Will";
      const bitrate = "192k";
      const timestampType = "word";
      const speed = 0;
      const pitch = 1.0;

      const audioBlob = await stream(
        text,
        voice,
        bitrate,
        timestampType,
        speed,
        pitch
      );
			
      console.log(audioBlob)
    } catch (error) {
			console.log(error)
    }
  };

  // Function to generate speech
  const handleSpeech = async () => {
    try {
			const text = "Hello world";
    	const voice = "Will";
      const bitrate = "192k";
      const timestampType = "word";
      const speed = 0;
      const pitch = 1.0;

      const speechData = await speech(
        text,
        voice,
        bitrate,
        timestampType,
        speed,
        pitch
      );

      // Handle successful speech generation
    } catch (error) {
      // Handle error
    }
  };

  return (
    <View>
      <Text>Unreal Speech Synthesis</Text>
      <TextInput
        placeholder="Enter text to synthesize"
        value={textToSynthesize}
        onChangeText={(text) => setTextToSynthesize(text)}
      />
      <TextInput
        placeholder="Select voice (default: Scarlett)"
        value={selectedVoice}
        onChangeText={(voice) => setSelectedVoice(voice)}
      />
      <Button title="Create Synthesis Task" onPress={handleCreateTask} />
      <Button title="Get Task Status" onPress={handleGetTaskStatus} />
      <Button title="Stream Audio" onPress={handleStream} />
      <Button title="Generate Speech" onPress={handleSpeech} />
      <View>
        <Text>Status: {status}</Text>
        <Text>Request State: {requestState}</Text>
      </View>
    </View>
  );
}

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
