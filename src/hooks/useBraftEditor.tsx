import { useState } from 'react';
import BraftEditor from 'braft-editor';

const useBraftEditor = () => {
  const initialContent = BraftEditor.createEditorState(null);
  const [content, setContent] = useState(initialContent);

  const contentToHtml = () => {
    return content.toHTML();
  };

  return { content, setContent, contentToHtml };
};

export default useBraftEditor;
