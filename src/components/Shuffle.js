export default function Shuffle (arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    if (arr[i] !== undefined && arr[j] !== undefined)
      arr[i] = [arr[j], (arr[j] = arr[i])][0]
  }
}
