export default function MergeSortTree(arr) {
  const steps = [];

  function build(array) {
    if (array.length <= 1) {
      return { value: array, children: [] };
    }

    const mid = Math.floor(array.length / 2);
    const left = build(array.slice(0, mid));
    const right = build(array.slice(mid));

    const merged = merge(left.value, right.value);

    const node = {
      value: merged,
      children: [left, right],
    };

    // 🔥 push step-by-step tree
    steps.push(JSON.parse(JSON.stringify(node)));

    return node;
  }

  build(arr);
  return steps;
}

function merge(left, right) {
  let res = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) res.push(left[i++]);
    else res.push(right[j++]);
  }

  return [...res, ...left.slice(i), ...right.slice(j)];
}