import React, { useState } from "react";
import Sketch from "react-p5";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
var arr = [];
var start = false;
var strokewt = 10;
var fast = 10;
var length = 0;
var j = 0,
  i = 0;
var sortAlg = 0;
var m = 0;
function App() {
  // const [value, setValue] = useState(0);
  const [f, setF] = useState(true);
  function shuffle() {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      if (arr[i] !== undefined && arr[j] !== undefined)
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    start = false;
    setF(true);
  }

  function bubbleSort() {
    if (f) {
      i = 0;
      j = 0;
      setF(false);
    }
    if (i < length) {
      if (j < length) {
        if (arr[i] < arr[j]) {
          arr[j] = [arr[i], (arr[i] = arr[j])][0];
        }
        j++;
      } else {
        j = 0;
        i += 1;
      }
    } else {
      start = false;
      setF(true);
    }
  }

  function heapify(k, length) {
    let large = k,
      left = 2 * k + 1,
      right = 2 * k + 2;
    if (left < length && arr[k] < arr[left]) large = left;
    if (right < length && arr[large] < arr[right]) large = right;
    if (large !== k) {
      arr[large] = [arr[k], (arr[k] = arr[large])][0];
      heapify(large, length);
    }
  }

  function heapSort() {
    if (f) {
      j = Math.ceil(length / 2);
      i = length - 1;
      setF(false);
    }
    if (j >= 0) {
      heapify(j, length);
      j -= 1;
    } else {
      if (i >= 0) {
        arr[i] = [arr[0], (arr[0] = arr[i])][0];
        heapify(0, i);
        i -= 1;
      } else {
        start = false;
        setF(true);
      }
    }
  }

  function selectionSort() {
    if (f) {
      i = 0;
      j = 0;
      m = 0;
      setF(false);
    }
    if (i < length) {
      if (j < length) {
        if (arr[j] < arr[m]) m = j;
        j += 1;
      } else {
        arr[i] = [arr[m], (arr[m] = arr[i])][0];
        i += 1;
        m = i;
        j = i + 1;
      }
    } else {
      start = false;
      setF(true);
    }
  }

  function insertionSort() {
    if (f) {
      i = 1;
      j = 0;
      m = arr[0];
      setF(false);
    }
    if (i < length) {
      if (j >= 0 && arr[j] > m) {
        arr[j + 1] = arr[j];
        j--;
      } else {
        arr[j + 1] = m;
        i += 1;
        j = i - 1;
        m = arr[i];
      }
    } else {
      start = false;
      setF(true);
    }
  }

  function sorting() {
    switch (sortAlg) {
      case 0:
        for (let speed = 0; speed < fast; speed++) bubbleSort();
        break;
      case 1:
        for (let speed = 0; speed < fast; speed++) selectionSort();
        break;
      case 2:
        for (let speed = 0; speed < fast; speed++) insertionSort();
        break;
      case 3:
        heapSort();
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Sorting Visualizer</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={shuffle}>Shuffle</Nav.Link>
          {/* <RangeSlider
            value={value}
            min={1}
            max={10}
            onChange={e => {
              setValue(e.target.value)
              strokewt = e.target.value * 10
            }}
          ></RangeSlider> */}
          <NavDropdown title="Algorithm" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => (sortAlg = 0)}>
              BubbleSort
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => (sortAlg = 1)}>
              Selection Sort
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => (sortAlg = 2)}>
              Insertion Sort
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => (sortAlg = 3)}>
              Heap Sort
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Button
          variant="outline-danger"
          size="lg"
          onClick={() => (start = true)}
        >
          Sort!
        </Button>
      </Navbar>

      <div className="sort">
        <Sketch
          setup={(p5, parent) => {
            p5.createCanvas(1200, 400).parent(parent);
            for (let i = 190; i < 290; i += Math.floor(strokewt / 10))
              arr.push(i);
            shuffle();
          }}
          draw={(p5) => {
            length = Math.ceil(arr.length / strokewt) * 10;
            p5.colorMode(p5.HSL, 360);
            var stw = 100;
            if (start === true) {
              sorting();
            }

            for (let hue = 0; hue < length; hue++) {
              p5.strokeWeight(strokewt);
              p5.stroke(arr[hue], 255, 200);
              p5.line(stw, 0, stw, 400);
              stw += strokewt;
            }
            for (let k = length; k < arr.length; k++) {
              p5.strokeWeight(strokewt);
              p5.stroke(255, 360, 360);
              p5.line(stw, 0, stw, 400);
              stw += strokewt;
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;
