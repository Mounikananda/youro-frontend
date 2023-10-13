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
        Upload new result
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
        //  <div className='upload-docs'>
            <div>{uploadedDocuments.map((file, index) => (
              <div className='document-list' >
              <p key={index}>{file.name}</p>
              <p className='pdf-open'>Open</p>
              </div>
            ))}
          </div>
      )}
    </div>
  );
};

export default FileUpload;
