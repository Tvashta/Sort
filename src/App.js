import React, { useState } from 'react'
import Sketch from 'react-p5'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
// import RangeSlider from "react-bootstrap-range-slider";
import { Button, Nav, Navbar} from 'react-bootstrap'
import Shuffle from './components/Shuffle'
import {
  bubbleSort,
  insertionSort,
  selectionSort,
  heapSort,
  mergeSort,
  radix,
  quickSort,
  shellSort
} from './components/Sort'
import HamburgerMenu from 'react-hamburger-menu'
import SideBar from './components/Sidebar'

var arr = []
var strokewt = 10
function App () {
  // const [value, setValue] = useState(0);
  const [f, setF] = useState(true)
  const [startSort, setStart] = useState(false)
  const [isMenuOpen, menuToggle]=useState(false)
  const [sortAlg, setSortAlg]=useState(0)
  function shuffle () {
    if (f) Shuffle(arr)
    setStart(false)
  }
  
  function handleClick(i){
    setSortAlg(i)
    menuToggle(false)
  }

  async function sorting () {
    setF(false)
    switch (sortAlg) {
      case 0:
        await bubbleSort(arr)
        break
      case 1:
        await selectionSort(arr)
        break
      case 2:
        await insertionSort(arr)
        break
      case 3:
        await heapSort(arr)
        break
      case 4:
        await mergeSort(arr, 0, arr.length)
        break
      case 5:
        await quickSort(arr, 0, arr.length - 1)
        break
      case 6:
        await radix(arr)
        break
      case 7:
        await shellSort(arr)
        break
      default:
        break
    }
    setF(true)
    setStart(false)
  }

  return (
    <div>
      <Navbar bg='dark' variant='dark'>
       <HamburgerMenu
          isOpen={isMenuOpen}
          menuClicked={()=>menuToggle(!isMenuOpen)}
          width={30}
          height={20}
          strokeWidth={2}
          rotate={0}
          color='white'
          borderRadius={0}
          animationDuration={0.5}
          id="menu"
        /> 
        <Navbar.Brand className="margin">Sorting</Navbar.Brand>
        <Nav className='mr-auto'>
        
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
          
        </Nav>
        <Button
          variant='outline-danger'
          size='lg'
          onClick={() => setStart(true)}
        >
          Sort!
        </Button>
      </Navbar>
      <SideBar open={isMenuOpen} handleClick={handleClick}/> 
      
<div className='sort'>
      
        <Sketch
          setup={(p5, parent) => {
            p5.createCanvas(1000, 400).parent(parent)
            for (let i = 190; i < 290; i += Math.floor(strokewt / 10))
              arr.push(i)
            shuffle()
          }}
          draw={p5 => {
            p5.colorMode(p5.HSL, 360)
            var stw = 100
            if (startSort === true) {
              sorting()
              setStart(false)
            }
            for (let hue = 0; hue < arr.length; hue++) {
              if (arr[hue] !== undefined) {
                p5.strokeWeight(strokewt)
                p5.stroke(arr[hue], 255, 200)
                p5.line(stw, 0, stw, 400)
                stw += strokewt
              }
            }
            // for (let k = length; k < arr.length; k++) {
            //   p5.strokeWeight(strokewt)
            //   p5.stroke(255, 360, 360)
            //   p5.line(stw, 0, stw, 400)
            //   stw += strokewt
            // }
          }}
        />
      </div>
          

     
      
    </div>
  )
}

export default App
