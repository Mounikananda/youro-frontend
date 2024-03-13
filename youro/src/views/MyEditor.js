import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';

function MyEditor() {
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );
  
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  }
  const _onBoldClick = (e) => {
    e.preventDefault()

    const newState = RichUtils.toggleInlineStyle(editorState, 'BOLD')

    if (newState) {
      setEditorState(newState);
    }
  }

  const _onItalicClick = (e) => {
    e.preventDefault()

    const newState = RichUtils.toggleInlineStyle(editorState, 'ITALIC')

    if (newState) {
      setEditorState(newState);
    }
  }
  return (
    <>
      <div className="toolbar">
        <button className="btn" onClick={_onBoldClick}>B</button>
        <button className="btn" onClick={_onItalicClick}>I</button>
      </div>
      <div style={{ border: '1px solid black', padding: '10px', minHeight: '300px', borderRadius: '10px' }}>
        <Editor 
          editorState={editorState}
          onChange={setEditorState} 
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </>
  );
}

export default MyEditor;