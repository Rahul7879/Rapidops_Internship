import React, { useState, useEffect } from 'react';
import RenderTree from './RenderTree';
import { buildTree, deleteNodeAndChildren } from './treeUtils';
import './tree.css';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [data, setData] = useState([]);
  const [tree, setTree] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:4500/get').then((res) => {
      console.log(res.data.result,data)
      setData([{id:1,parentnodeId:null,name:"Root Node"} ,...res.data.result])
  }).catch((err) => {
    toast.error("Database error")
  });
  },[])

  useEffect(() => {
    setTree(buildTree(data));

  }, [data]);

  const addNode = async parentID => {
    let nodeName = prompt("Enter Node name");
    let id = Date.now();
    if (nodeName) {
      const newNode = { id: id, parentnodeId: parentID, name: nodeName};
      setData([...data, newNode]);
    }

    axios.post('http://localhost:4500/add', {
        nodeName: nodeName.trim(),
        parentID: parentID,
        id:id
    }).then((res) => {
       toast.success("Node created successfully")
    }).catch((err) => {
      toast.error("not created")
    });
  };

  const deleteNode = id => {
    if (id === 1) {
      toast.error("Root node cannot be deleted.")
      return;
    }
    const newData = deleteNodeAndChildren(id, data);
    setData(newData);

    axios.delete(`http://localhost:4500/delete/${id}`).then((res) => {
      toast.success("Node deleted successfully")
  }).catch((err) => {
      toast.error("Node Deletion Failed!")
  });
  };

  const moveNode = (id) => {
    const nodeName = prompt("Enter the name of the new parent node:");
    if (!nodeName) {
      toast.error("Node name cannot be empty.");
      return;
    }
    const parent = data.find(node => node.name === nodeName);
    // ******* we can also move nodes using id **********
    if (!parent) {
      toast.error("Node not found.");
      return;
    }

    let currentNode = parent;
    while (currentNode) {
      if (currentNode.id === id) {
        toast.error("Cannot move a node under itself or its descendant.");
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

    axios.patch('http://localhost:4500/update', {
        id:id,
        parentID: parent.id,
    }).then((res) => {
      toast.success("Node moved successfully")
    }).catch((err) => {
        toast.error("not move")
    });
  };

  const mergeNode = (nodeToMergeId) => {
    let targetNodeName = prompt("Enter the name of the new parent node:");
    if (!targetNodeName) {
      alert("Node name cannot be empty.");
      return;
    }
    
    const targetNode = data.find(node => node.name === targetNodeName);
    if (!targetNode) {
      alert("Target node not found.");
      return;
    }

    let currentNode = targetNode;
    while (currentNode) {
      if (currentNode.id === nodeToMergeId) {
        alert("Cannot merge a node with itself or into one of its descendants.");
        return;
      }
      currentNode = data.find(node => node.id === currentNode.parentnodeId);
    }

    let newData = data.map(node => {
      if (node.parentnodeId === nodeToMergeId) {
        return { ...node, parentnodeId: targetNode.id };
      }
      return node;
    });

    newData = newData.filter(node => node.id !== nodeToMergeId);
    setData(newData); 

    axios.patch('http://localhost:4500/merge', {
      id:nodeToMergeId,
      targetNode: targetNode.id
  }).then((res) => {
    toast.success("Node moved successfully")
  }).catch((err) => {
      toast.error("not move")
  });

  };
  

  return (
    <div className="tree">
      <RenderTree nodes={tree} addNode={addNode} deleteNode={deleteNode} moveNode={moveNode} mergeNode={mergeNode} />
      <Toaster />
    </div>
  );
};

export default App;
