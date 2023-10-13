import React, { useState, useRef } from 'react';
import { FaUpload } from 'react-icons/fa';
import "../../styles/Doctor-ui/Doctor-appointment/DA-results.css";

const FileUpload = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const fileInputRef = useRef();

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setUploadedDocuments((prevDocuments) => [...prevDocuments, ...files]);
    e.target.value = ''; 
  };

  return (
    <div className="document-uploader">
      <label
        htmlFor="file-upload"
        className="upload-label"
      >
        <FaUpload />
        Upload Document
      </label>
      <input
        type="file"
        id="file-upload"
        ref={fileInputRef}
        onChange={handleFileSelect}
        multiple
        style={{ display: 'none' }}
      />

      {uploadedDocuments.length > 0 && (
        <div className="document-list">
          <h2>Uploaded Documents:</h2>
          <ul>
            {uploadedDocuments.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
