import React, { useState, useRef, useEffect, Component } from 'react';

import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';

import createToolbarPlugin, {
  Separator,
} from '@draft-js-plugins/static-toolbar';
import {
  AlignTextCenterButton,
  AlignTextLeftButton,
  AlignTextRightButton,
  AlignBlockDefaultButton,
  createBlockStyleButton,
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from '@draft-js-plugins/buttons';
import editorStyles from '../styles/Editor/editorStyles.module.css';
import buttonStyles from '../styles/Editor/buttonStyles.module.css';
import toolbarStyles from '../styles/Editor/toolbarStyles.module.css';

// const HeadlinesPicker = ({ onOverrideContent }) => {
//   useEffect(() => {
//     const onWindowClick = () => {
//       // Call `onOverrideContent` again with `undefined`
//       // so the toolbar can show its regular content again.
//       onOverrideContent(undefined);
//     };

//     setTimeout(() => {
//       window.addEventListener('click', onWindowClick);
//     });

//     return () => {
//       window.removeEventListener('click', onWindowClick);
//     };
//   }, [onOverrideContent]);

//   const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
//   return (
//     <div>
//       {buttons.map((Button, i) => (
//         <Button key={i} onOverrideContent={onOverrideContent} />
//       ))}
//     </div>
//   );
// };

// const HeadlinesButton = ({ onOverrideContent }) => {
//   const onClick = () => {
//     // A button can call `onOverrideContent` to replace the content
//     // of the toolbar. This can be useful for displaying sub
//     // menus or requesting additional information from the user.
//     onOverrideContent(HeadlinesPicker);
//   };

//   return (
//     <div className={editorStyles.headlineButtonWrapper}>
//       <button onClick={onClick} className={editorStyles.headlineButton}>
//         H
//       </button>
//     </div>
//   );
// };

// // const HeadlinesButton = () => {
// //   const onClick = () => {
// //     // A button can call `onOverrideContent` to replace the content
// //     // of the toolbar. This can be useful for displaying sub
// //     // menus or requesting additional information from the user.
// //     onOverrideContent(HeadlinesPicker);
// //   };

// //   return (
// //     <div className={editorStyles.headlineButtonWrapper}>
// //       <button onClick={onClick} className={editorStyles.headlineButton}>
// //         H
// //       </button>
// //     </div>
// //   );
// // };
const toolbarPlugin = createToolbarPlugin({
  theme: { buttonStyles, toolbarStyles },
});
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];

const CustomToolbarEditor = (props) => {
  const editorRef = useRef(null);

  const onChange = (newEditorState) => {
    props.setEditorState(newEditorState);
  };

  const focus = () => {
    editorRef.current.focus();
  };

  // useEffect(() => {
  //   props.setEditorState(createEditorStateWithText(text));
  // }, []);

  return (
    <div>
      <div className={editorStyles.editor} onClick={focus}>
        <Editor
          editorState={props.editorState}
          onChange={onChange}
          plugins={plugins}
          ref={editorRef}
          readOnly={props.readOnly}
        />
      </div>
      {!props.readOnly && (
          <Toolbar>
            {
              // may be use React.Fragment instead of div to improve perfomance after React 16
              (externalProps) => (
                <div className={editorStyles.toolbar}>
                  <BoldButton {...externalProps} title="Bold"/>
                  <ItalicButton {...externalProps} />
                  <UnderlineButton {...externalProps} />
                  {/* <CodeButton {...externalProps} /> */}
                  <Separator {...externalProps} />
                  {/* <HeadlinesButton {...externalProps} /> */}
                  <UnorderedListButton {...externalProps} />
                  <OrderedListButton {...externalProps} />
                  <BlockquoteButton {...externalProps} />
                  {/* <CodeBlockButton {...externalProps} /> */}
                </div>
              )
            }
          </Toolbar>
      )}
    </div>
  );
};
  
export default CustomToolbarEditor;