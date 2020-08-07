import React, { useState } from "react";
import Sketch from "react-p5";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";
import { Button, Nav, Navbar } from "react-bootstrap";
var arr = [];
var i = 0,
  j = 0;
var start = false;
var strokewt = 10;
var fast = 10;
var length = 0;
function App() {
  const [value, setValue] = useState(0);
  function shuffle() {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    length = arr.length;
    i = j = 0;
    start = false;
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Sorting Visualizer</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={shuffle}>Shuffle</Nav.Link>
          <RangeSlider
            value={value}
            min="1"
            max="10"
            onChange={(e) => {
              setValue(e.target.value);
              strokewt = e.target.value * 10;
            }}
          ></RangeSlider>
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
            p5.createCanvas(970, 400).parent(parent);
            for (let i = 190; i < 290; i += strokewt / 10) arr.push(i);
            shuffle();
          }}
          draw={(p5) => {
            length = Math.ceil(arr.length / strokewt) * 10;
            console.log(length);
            p5.colorMode(p5.HSL, 360);
            var stw = 0;
            if (start === true) {
              console.log(arr);
              for (let speed = 0; speed < fast; speed++) {
                if (i < length) {
                  if (j < length) {
                    if (arr[i] > arr[j]) {
                      let t = arr[i];
                      arr[i] = arr[j];
                      arr[j] = t;
                    }
                    j++;
                  } else {
                    j = 0;
                    i += 1;
                  }
                }
              }
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
