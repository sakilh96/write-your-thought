const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
      const resizeOptions = {
        width: 300,
        height: 300,
        quality: 100,
        fileType: file.type,
      };

      resizeFile(file, resizeOptions)
        .then((resizedImage) => {
          const reader = new FileReader();
          reader.readAsDataURL(resizedImage);
          reader.onload = () => {
            const base64String = reader.result.split(",")[1];
            resolve(base64String);
          };
          reader.onerror = (error) => {
            console.error("Error converting to base64:", error);
            reject(error);
          };
        })
        .catch((error) => {
          console.error("Error resizing image:", error);
          reject(error);
        });
    });
  };

  export default resizeImage;