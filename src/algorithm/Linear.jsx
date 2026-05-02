export default function LinearSearchAnimations(arr, target) {
  let animations = [];

  for (let i = 0; i < arr.length; i++) {
    animations.push({
      type: "check",
      index: i
    });

    if (arr[i] === target) {
      animations.push({
        type: "found",
        index: i
      });
      break;
    }
  }

  return animations;
}