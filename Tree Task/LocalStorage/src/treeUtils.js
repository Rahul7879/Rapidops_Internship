export function buildTree(data) {
    let tree = [];
    let childrenOf = {};
    data.forEach(node => {
      childrenOf[node.id] = childrenOf[node.id] || [];
      node.children = childrenOf[node.id];
    });
    data.forEach(node => {
      if (node.parentnodeId === null) {
        tree.push(node);
      } else if (childrenOf[node.parentnodeId]) {
        childrenOf[node.parentnodeId].push(node);
      }
    });
    return tree;
  }
  
  export function deleteNodeAndChildren(nodeId, data) {
    let toDelete = new Set([nodeId]);
    let didDelete;
  
    do {
      didDelete = false;
      data = data.filter(node => {
        if (toDelete.has(node.parentnodeId)) {
          toDelete.add(node.id);
          didDelete = true;
          return false;
        }
        return true;
      });
    } while (didDelete);
  
    return data.filter(node => !toDelete.has(node.id));
  }
  