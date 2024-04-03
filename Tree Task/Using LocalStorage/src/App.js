import React, { useState, useEffect } from 'react';
import RenderTree from './RenderTree';
import { buildTree, deleteNodeAndChildren } from './treeUtils';
import './tree.css';

const initialData = () => JSON.parse(localStorage.getItem("data")) || [
  { id: 1, parentnodeId: null, name: 'Root Node' }
];

const App = () => {
  const [data, setData] = useState(initialData());
  const [tree, setTree] = useState([]);

  useEffect(() => {
    setTree(buildTree(data));
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const addNode = parentID => {
    let nodeName = prompt("Enter Node name");
    if (nodeName) {
      const newNode = { id: Date.now(), parentnodeId: parentID, name: nodeName };
      setData([...data, newNode]);
    }
  };

  const deleteNode = id => {
    if (id === 1) {
      alert("Root node cannot be deleted.");
      return;
    }
    const newData = deleteNodeAndChildren(id, data);
    setData(newData);
  };

  const moveNode = (id) => {
    const nodeName = prompt("Enter the name of the new parent node:");
    if (!nodeName) {
      alert("Node name cannot be empty.");
      return;
    }
    const parent = data.find(node => node.name === nodeName);
    // ******* we can also move nodes using id **********
    if (!parent) {
      alert("Node not found.");
      return;
    }

    let currentNode = parent;
    while (currentNode) {
      if (currentNode.id === id) {
        alert("Cannot move a node under itself or its descendant.");
        return;
      }
      currentNode = data.find(node => node.id === currentNode.parentnodeId);
    }

    const newData = data.map(node => {
      if (node.id === id) {
        return { ...node, parentnodeId: parent.id };
      }
      return node;
    });

    setData(newData);
  };

  return (
    <div className="tree">
      <RenderTree nodes={tree} addNode={addNode} deleteNode={deleteNode} moveNode={moveNode} />
    </div>
  );
};

export default App;
