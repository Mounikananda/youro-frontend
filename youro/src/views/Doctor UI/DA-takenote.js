import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../../styles/Doctor-ui/Doctor-appointment/DA-takenotes.css";


const ReactQuillWrapper = ({ onClose, val }) => {
  const [text, setText] = useState('<p>&nbsp;</p>');
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link'],
      ['clean'],
    ],
    // placeholder: 'Write a note...',
    // theme: 'snow'
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
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
  ];

  const handleChange = (value) => {
    setText(value);
    val(value)
  };

  return (
    <div className="quill-editor-container" key="unique-key">
      <ReactQuill value={text} modules={modules} formats={formats} onChange={handleChange} placeholder={'Write a note...'}/>
    </div>
  );
};

export default ReactQuillWrapper;
