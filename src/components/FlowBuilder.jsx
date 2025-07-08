import React, { useCallback, useRef, useState, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

import SendMessageNode from '../nodes/SendMessageNode';
import NodePanel from './NodePanel';
import SettingsPanel from './SettingsPanel';
import Toast from './Toast'; // ✅ New component for showing messages

const nodeTypes = {
  sendMessage: SendMessageNode,
};

let id = 2;
const getId = () => `${id++}`;

const FlowBuilderCanvas = () => {
  const [nodes, setNodes] = useState([
    {
      id: '1',
      type: 'sendMessage',
      position: { x: 100, y: 100 },
      data: { label: 'Test Message 1' },
    },
  ]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [toast, setToast] = useState({ message: '', type: '' }); // ✅ Toast State

  const reactFlowWrapper = useRef(null);
  const { project } = useReactFlow();

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback((connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: 'New Message' },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [project]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const updateNodeText = (newText) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, label: newText } }
          : node
      )
    );
    setSelectedNode((prev) => ({
      ...prev,
      data: { ...prev.data, label: newText },
    }));
  };

  // ✅ Save Handler
  const handleSaveFlow = () => {
    const outgoing = new Set(edges.map((edge) => edge.source));
    const nodesWithoutOutgoing = nodes.filter((node) => !outgoing.has(node.id));

    if (nodes.length > 1 && nodesWithoutOutgoing.length > 1) {
      setToast({
        message: '❌ Cannot save flow. More than one node has no outgoing edge.',
        type: 'error',
      });
      return;
    }

    setToast({ message: '✅ Flow saved successfully!', type: 'success' });
    console.log('Saved Nodes:', nodes);
    console.log('Saved Edges:', edges);
  };

  // ✅ Auto-dismiss toast after 3 seconds
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ message: '', type: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      {selectedNode ? (
        <SettingsPanel
          selectedNode={selectedNode}
          updateNodeText={updateNodeText}
          onClose={() => setSelectedNode(null)}
        />

      ) : (
        <NodePanel />
      )}

      {/* ✅ Save Button */}
      <button
        onClick={handleSaveFlow}
        style={{
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          padding: '10px 20px',
          fontSize: '14px',
          fontWeight: 'bold',
          borderRadius: '5px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        💾 Save Flow
      </button>

      <div
        style={{ flexGrow: 1, height: '100vh' }}
        ref={reactFlowWrapper}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      {/* ✅ Toast Message */}
      <Toast message={toast.message} type={toast.type} />
    </div>
  );
};

const FlowBuilder = () => (
  <ReactFlowProvider>
    <FlowBuilderCanvas />
  </ReactFlowProvider>
);

export default FlowBuilder;
