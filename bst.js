function Node(data, left, right) {
  return { data, left, right };
}

function Tree(array) {
  const root = buildTree(array);

  function buildTree(array) {
    // First sort then remove duplicates
    if (array.length === 1) return new Node(array[0], null, null);
    if (array.length === 0) return null;
    const sortedArray = Array.from(new Set(array.sort((a, b) => a - b)));
    const mid = Math.floor(sortedArray.length / 2);
    const leftTree = sortedArray.slice(0, mid);
    const rightTree = sortedArray.slice(mid + 1);

    return new Node(
      sortedArray[mid],
      buildTree(leftTree),
      buildTree(rightTree),
    );
  }

  function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }

    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  return { root, prettyPrint };
}

export default Tree;
