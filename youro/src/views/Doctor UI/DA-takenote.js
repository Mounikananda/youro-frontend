// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import "../../styles/Doctor-ui/Doctor-appointment/DA-takenotes.css";

// const ReactQuillWrapper = () => {
//   const [text, setText] = useState('');
//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, false] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
//       ['link', 'image'],
//       ['clean'],
//     ],
//   };

//   const formats = [
//     'header',
//     'bold',
//     'italic',
//     'underline',
//     'strike',
//     'blockquote',
//     'list',
//     'bullet',
//     'indent',
//     'link',
//     'image',
//   ];

//   const handleChange = (value) => {
//     setText(value);
//   };

//   return (
//     <div>
//       <ReactQuill value={text} modules={modules} formats={formats} onChange={handleChange}  />
//     </div>
//   );
// };

// // const App = () => (
// //   <div>
// //     <h1>Quill React Editor</h1>
// //     <ReactQuillWrapper />
// //   </div>
// // );

// export default ReactQuillWrapper;

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../../styles/Doctor-ui/Doctor-appointment/DA-takenotes.css";


const ReactQuillWrapper = ({ onClose }) => {
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
  };

  return (
    <div className="quill-editor-container">
      <ReactQuill value={text} modules={modules} formats={formats} onChange={handleChange} />
    </div>
  );
};

export default ReactQuillWrapper;
