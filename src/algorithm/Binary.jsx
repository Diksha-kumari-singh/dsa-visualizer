export default function BinarySearchAnimations(arr, target) {
  let animations = [];

  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    animations.push({
      type: "check",
      low,
      high,
      mid
    });

    if (arr[mid] === target) {
      animations.push({
        type: "found",
        index: mid
      });
      return animations;
    }

    if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  animations.push({ type: "notfound" });
  return animations;
}