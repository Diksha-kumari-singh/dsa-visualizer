export default function BubbleSortAnimations(arr) {
  const animations = [];
  let a = [...arr];

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {

      // compare
      animations.push({ type: "compare", indices: [j, j + 1] });

      if (a[j] > a[j + 1]) {
        // swap
        animations.push({ type: "swap", indices: [j, j + 1] });

        let temp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = temp;
      }
    }

    // mark sorted
    animations.push({ type: "sorted", index: a.length - i - 1 });
  }

  return animations;
}