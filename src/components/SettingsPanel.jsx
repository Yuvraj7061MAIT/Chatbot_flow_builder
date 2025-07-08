import React, { useState, useEffect } from 'react';

const SettingsPanel = ({ selectedNode, updateNodeText, onClose }) => {
  const [text, setText] = useState(selectedNode?.data?.label || '');

  useEffect(() => {
    setText(selectedNode?.data?.label || '');
  }, [selectedNode]);

  const handleSaveAndBack = () => {
    updateNodeText(text);
    onClose(); // Go back to NodePanel
  };

  return (
    <div style={{ padding: '20px', width: '300px', background: '#f7f7f7', height: '100vh' }}>
      <h2>Edit Message</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%', height: '100px', padding: '8px' }}
      />
      <br /><br />
      <button onClick={handleSaveAndBack} style={{ padding: '8px 16px', fontWeight: 'bold' }}>
        ✅ Save & Back
      </button>
    </div>
  );
};

export default SettingsPanel;
