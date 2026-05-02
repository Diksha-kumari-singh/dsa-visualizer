export default function InsertionSortAnimations(arr) {
  const animations = [];
  let a = [...arr];

  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;

    // compare + shift
    while (j >= 0 && a[j] > key) {
      animations.push({
        type: "compare",
        indices: [j, j + 1],
      });

      // shift element
      animations.push({
        type: "swap",
        indices: [j, j + 1],
      });

      a[j + 1] = a[j];
      j--;
    }

    a[j + 1] = key;

    // mark sorted portion
    animations.push({
      type: "sorted",
      index: i,
    });
  }

  return animations;
}