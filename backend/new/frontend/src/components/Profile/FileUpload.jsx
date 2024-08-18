import React from 'react';
const FileUpload = ({ setFile, handleImageChange }) => {
    const [file, setFileState] = React.useState(null);
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };
    const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <div
      className="border-dashed border-2 border-gray-300 rounded-lg py-4 px-6 flex flex-col items-center justify-center cursor-pointer"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="text-gray-500 text-center cursor-pointer"
      >
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded Preview"
            className="w-full h-auto max-w-xs"
          />
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-gray-700 text-xl">Drag and drop an image here</span>
            <span className="text-gray-500">or click to select one</span>
          </div>
        )}
      </label>
    </div>
  );
};

export default FileUpload;
