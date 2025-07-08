import React from 'react';
import './NodePanel.css';

const availableNodes = [
  { type: 'sendMessage', label: '➕ Send Message' },
  // Future extension: { type: 'imageNode', label: '🖼️ Image' },
];

const NodePanel = () => {
  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="node-panel">
      {availableNodes.map((node) => (
        <div
          key={node.type}
          className="draggable-node"
          onDragStart={(event) => handleDragStart(event, node.type)}
          draggable
        >
          {node.label}
        </div>
      ))}
    </aside>
  );
};

export default NodePanel;
