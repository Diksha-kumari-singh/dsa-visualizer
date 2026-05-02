export default function SelectionSortAnimations(arr) {
  const animations = [];
  let a = [...arr];
  const n = a.length;

  for (let i = 0; i < n; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      // 🔴 compare current with min
      animations.push({
        type: "compare",
        indices: [minIndex, j],
      });

      if (a[j] < a[minIndex]) {
        minIndex = j;
      }
    }

    // 🔁 swap min with current position
    if (minIndex !== i) {
      animations.push({
        type: "swap",
        indices: [i, minIndex],
      });

      [a[i], a[minIndex]] = [a[minIndex], a[i]];
    }

    // 🟢 mark sorted
    animations.push({
      type: "sorted",
      index: i,
    });
  }

  return animations;
}