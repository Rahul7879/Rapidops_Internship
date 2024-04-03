import React from 'react';

const RenderTree = ({ nodes, addNode, deleteNode, moveNode }) => (
  <ul>
    {nodes.map(item => (
      <li key={item.id}>
        <div className='nodes'>
          <h2>{item.name}</h2>
          <button className='btns' onClick={() => addNode(item.id)}>Add</button>
          {item.id !== 1 && <div className='btns'> <button onClick={() => deleteNode(item.id)}>Delete</button>  <button onClick={() => moveNode(item.id)}>move</button> </div>}
        </div>
        {item.children && item.children.length > 0 && <RenderTree nodes={item.children} addNode={addNode} deleteNode={deleteNode} moveNode={moveNode} />}
      </li>
    ))}
  </ul>
);

export default RenderTree;
