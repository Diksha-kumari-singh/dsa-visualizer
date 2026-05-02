export default function BFSAnimations(graph, start) {
  let visited = new Set();
  let queue = [start];
  let steps = [];

  visited.add(start);

  while (queue.length > 0) {
    let node = queue.shift();

    steps.push({
      type: "visit",
      node,
      queue: [...queue],
    });

    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);

        steps.push({
          type: "enqueue",
          node: neighbor,
          queue: [...queue],
        });
      }
    }
  }

  return steps;
}