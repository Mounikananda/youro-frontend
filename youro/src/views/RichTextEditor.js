import React, { useRef } from 'react';
import { Modifier, EditorState, RichUtils } from 'draft-js';
import Editor from '@draft-js-plugins/editor';

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

const HeadlineFourButton = (props) => {
  const { editorState, setEditorState } = props;

  const onHeadlineFourClick = () => {
    const newEditorState = RichUtils.toggleBlockType(editorState, 'header-four');
    setEditorState(newEditorState);
  };

  return (
    <button onClick={onHeadlineFourClick} className={buttonStyles.button}>
      H4
    </button>
  );
};

const HeadlineFiveButton = (props) => {
  const { editorState, setEditorState } = props;

  const onClick = () => {
    const newEditorState = RichUtils.toggleBlockType(editorState, 'header-five');
    setEditorState(newEditorState);
  };

  return (
    <button onClick={onClick} className={buttonStyles.button}>
      H5
    </button>
  );
};

const FontSizeSelect = (props) => {
  const { editorState, setEditorState } = props;

  const onFontSizeChange = (e) => {
    const fontSize = e.target.value;

    // Toggle the inline style for font size
    const newEditorState = RichUtils.toggleInlineStyle(
      editorState,
      {'fontSize': fontSize}
    );
    console.log(newEditorState)
    setEditorState(newEditorState);
  };

  return (
    <select onChange={onFontSizeChange}>
      <option value="12px">12px</option>
      <option value="14px">14px</option>
      <option value="16px">16px</option>
      <option value="18px">18px</option>
      <option value="20px">20px</option>
      <option value="24px">24px</option>
      <option value="28px">28px</option>
      <option value="32px">32px</option>
      <option value="36px">36px</option>
      <option value="40px">40px</option>
    </select>
  );
};

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
                  {/* <FontSizeSelect  {...externalProps} editorState={props.editorState} setEditorState={props.setEditorState}/> */}
                  <UnorderedListButton {...externalProps} />
                  <OrderedListButton {...externalProps} />
                  <HeadlineOneButton {...externalProps}/>
                  <HeadlineTwoButton {...externalProps}/>
                  <HeadlineThreeButton {...externalProps}/>
                  <HeadlineFourButton  {...externalProps} editorState={props.editorState} setEditorState={props.setEditorState}/>
                  <HeadlineFiveButton  {...externalProps} editorState={props.editorState} setEditorState={props.setEditorState}/>
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