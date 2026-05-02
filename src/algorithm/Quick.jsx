export default function QuickSortTree(arr) {
  let steps = [];

  function buildTree(array) {
    if (array.length <= 1) {
      return {
        value: array,
        pivot: null,
        children: []
      };
    }

    let pivot = array[array.length - 1];

    let left = array.filter(x => x < pivot);
    let right = array.filter(x => x > pivot);

    let node = {
      value: array,
      pivot: pivot,
      children: [
        buildTree(left),
        buildTree(right)
      ]
    };

    steps.push(JSON.parse(JSON.stringify(node)));

    return node;
  }

  buildTree(arr);
  return steps;
}