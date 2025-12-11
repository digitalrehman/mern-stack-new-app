import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { Button } from "./ui/button";

const ImageUpload = ({ onImageUpload }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        onImageUpload(file);
      }
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  });

  const removeImage = (e) => {
    e.stopPropagation();
    setPreview(null);
    onImageUpload(null);
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors
          ${
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-muted-foreground/25 hover:border-primary/50"
          }
          ${preview ? "p-2" : "p-10"}
        `}
      >
        <input {...getInputProps()} />

        {preview ? (
          <div className="relative w-full h-64">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain rounded-md"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 rounded-full"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center text-muted-foreground">
            <Upload className="h-10 w-10 mb-2" />
            <p className="text-sm font-medium">
              {isDragActive
                ? "Drop the image here"
                : "Drag & drop an image here, or click to select"}
            </p>
            <p className="text-xs mt-1">Supports JPG, PNG, GIF</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
