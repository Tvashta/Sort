async function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function swap (arr, a, b) {
  arr[a] = [arr[b], (arr[b] = arr[a])][0]
}

//Bubble Sort
export async function bubbleSort (arr) {
  for (let i = 0; i < arr.length; i++)
    for (let j = 0; j < arr.length; j++)
      if (arr[i] < arr[j]) {
        await sleep(10)
        await swap(arr, i, j)
      }
}

//Selection Sort
export async function selectionSort (arr) {
  for (let i = 0; i < arr.length; i++) {
    let m = i
    for (let j = i + 1; j < arr.length; j++)
      if (arr[j] < arr[m]) {
        await sleep(10)
        m = j
      }
    await sleep(40)
    await swap(arr, i, m)
  }
}

//Insertion Sort
export async function insertionSort (arr) {
  for (let i = 1; i < arr.length; i++) {
    let m = arr[i]
    let j = i - 1
    while (j >= 0 && arr[j] > m) {
      await sleep(20)
      arr[j + 1] = arr[j]
      j--
    }
    await sleep(10)
    arr[j + 1] = m
  }
}

//Heap Sort
async function heapify (arr, k, length) {
  let large = k,
    left = 2 * k + 1,
    right = 2 * k + 2
  if (left < length && arr[k] < arr[left]) large = left
  if (right < length && arr[large] < arr[right]) large = right
  if (large !== k) {
    arr[large] = [arr[k], (arr[k] = arr[large])][0]
    await heapify(arr, large, length)
  }
}

export async function heapSort (arr) {
  for (let j = Math.ceil(arr.length / 2); j >= 0; j--) {
    await heapify(arr, j, arr.length)
    await sleep(75)
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    arr[i] = [arr[0], (arr[0] = arr[i])][0]
    await heapify(arr, 0, i)
    await sleep(75)
  }
}

//Merge Sort
export async function mergeSort (a, start, end) {
  if (end - start <= 1) return
  var mid = Math.round((end + start) / 2)
  await mergeSort(a, start, mid)
  await mergeSort(a, mid, end)
  let i = start,
    j = mid
  while (i < end && j < end) {
    if (a[i] > a[j]) {
      let t = a[j]
      a.splice(j, 1)
      a.splice(i, 0, t)
      j++
    }
    i++
    if (i === j) j++
    await sleep(25)
  }
  if (start === 0 && end === a.length) {
    await sleep(200)
  }
}

//Quick Sort
export async function quickSort (arr, start, end) {
  if (start >= end) {
    return
  }
  let p = await partition(arr, start, end)
  await Promise.all([quickSort(arr, start, p - 1), quickSort(arr, p + 1, end)])
}

async function partition (arr, start, end) {
  let pi = start
  let val = arr[end]
  for (let i = start; i < end; i++) {
    if (arr[i] < val) {
      await sleep(40)
      await swap(arr, i, pi)
      pi++
    }
  }
  await swap(arr, pi, end)
  return pi
}

//Radix Sort
async function radixSort (arr, e) {
  let c = []
  let i = 0
  for (i = 0; i < 10; i++) c.push(0)
  let op = new Array(arr.length)
  for (i = 0; i < arr.length; i++) c[Math.floor(arr[i] / e) % 10]++
  for (i = 1; i < 10; i++) c[i] += c[i - 1]
  for (i = arr.length - 1; i >= 0; i--) {
    op[c[Math.floor(arr[i] / e) % 10] - 1] = arr[i]
    c[Math.floor(arr[i] / e) % 10]--
  }
  for (i = 0; i < arr.length; i++) {
    await sleep(100)
    arr[i] = op[i]
  }
}

export async function radix (arr) {
  let m = Math.max(...arr)
  let e = 1
  while (m > 0) {
    await radixSort(arr, e)
    e *= 10
    m = Math.floor(m / 10)
  }
}
