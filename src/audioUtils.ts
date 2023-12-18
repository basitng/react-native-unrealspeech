function blobToDataURI(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsDataURL(blob);
  });
}

export { blobToDataURI };
