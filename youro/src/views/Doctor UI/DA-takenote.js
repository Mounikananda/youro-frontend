import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../../styles/Doctor-ui/Doctor-appointment/DA-takenotes.css";


const ReactQuillWrapper = ({ onClose, val }) => {
  const [text, setText] = useState('');
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  const handleChange = (value) => {
    setText(value);
    val(value)
  };

  return (
    <div className="quill-editor-container">
      <ReactQuill value={text} modules={modules} formats={formats} onChange={handleChange} />
    </div>
  );
};

export default ReactQuillWrapper;
