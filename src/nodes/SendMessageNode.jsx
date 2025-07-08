import React from 'react';
import { Handle, Position } from 'reactflow';
import './SendMessageNode.css';

const SendMessageNode = ({ data }) => {
  return (
    <div className="send-message-node">
      <Handle type="target" position={Position.Left} />
      <div className="message-content">
        💬 {data.label || 'Test Message'}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default SendMessageNode;
