import React, { useState, useRef, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';
import "../../styles/Doctor-ui/Doctor-appointment/DA-results.css";
import { API_DETAILS } from '../../App';
import axios from 'axios';

const FileUpload = (props) => {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  // const [existingDocuments, setExistingDocuments] = useState([]);
  const fileInputRef = useRef();

  const handleFileSelect = (e) => {
    console.log('handleFileSelect :: ');
    const files = Array.from(e.target.files);

    setUploadedDocuments((prevDocuments) => [...prevDocuments, ...files]);
    uploadResult(files);
    e.target.value = '';
  };

  const uploadResult = async (file) => {
    console.log(file);
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'multipart/form-data'
      }
    };
    const url = API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + `/uploadResults?files=${file}&patientId=${props.data}`;
    try {
      const res = await axios.post(url, config);
      alert('upload success');
      console.log("Data inside fetchData : ");
      console.log(res);
      setUploadedDocuments(res.data)
    }
    catch (err) {
      alert('upload failed');
      console.error(err);
    }
  }


  useEffect(() => {
    console.log('DA-results useEffect : ');
    fetchData();
  }, []);


  const fetchData = async () => {
    console.log(props);
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json'
      }
    };
    const url = API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + `/getResults/${props.data}`;
    try {
      const res = await axios.get(url, config);
      // for (let i = 0; i < res.data.length; i++) {
      //     console.log(res.data[i]);
      //     if (res.data[i].softDelete !== true) {
      //         console.log(true);
      //         data.push(res.data[i]);
      //     }
      // }
      console.log("Data inside fetchData : ");
      console.log(res);
      setUploadedDocuments(res.data)
    }
    catch (err) {
      console.error(err);
    }
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
            <p key={index}>File Name</p>
            <p className='pdf-open'>Open</p>

            {/* <object
              data={URL.createObjectURL(new Blob([uploadedDocuments[0]], { type: 'application/pdf' }))}
              type="application/pdf"
              width="100%"
              height="100%"
            >
              <embed
                src={URL.createObjectURL(new Blob([uploadedDocuments[0]], { type: 'application/pdf' }))}
                type="application/pdf"
                width="100%"
                height="100%"
              />
            </object> */}

          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
