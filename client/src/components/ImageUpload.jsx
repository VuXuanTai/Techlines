// ImageUpload.js
import React, { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useState } from "react";

const ImageUpload = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);
  const onDrop = useCallback(
    async (acceptedFiles, e) => {
      
      const file = acceptedFiles[0];

      try {
        setUploading(true);
        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post("http://localhost:5000/upload", formData);

        if (response.status === 200) {
          const imageName = response.data.imageName;
          onUpload(imageName);
          console.log("FS", response);
        } else {
          // Xử lý trường hợp redirect
          console.log("Redirect occurred, do something...");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <form onSubmit={(e) => e.preventDefault()}>
    <div {...getRootProps()} style={dropzoneStyles}>
      <input {...getInputProps()} />
      {uploading ? <p>Uploading...</p> : <p>Drag 'n' drop an image here, or click to select an image</p>}
    </div>
    </form>
  );
};

const dropzoneStyles = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default ImageUpload;
