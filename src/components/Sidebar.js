import React from 'react'
import 'font-awesome/css/font-awesome.min.css';
import { faHandPointUp, faMountain, faSquareRootAlt, faStopwatch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function SideBar(props){
    let classes=props.open?'sideBar':'sideBar open'
    return <div className={classes}>
    {/* <h1><FontAwesomeIcon className="white-color" icon={faCogs} size='sm'/> Algorithms</h1> */}
    <p className='sideElement' onClick={()=>props.handleClick(0)} ><img src='https://cdn2.iconfinder.com/data/icons/nature-glyph-2/128/99-512.png' width='40px'/><span> Bubble Sort</span></p>
    <p className='sideElement' onClick={()=>props.handleClick(1)} ><FontAwesomeIcon className="white-color" icon={faHandPointUp} size='lg'/><span>  Selection Sort </span></p>
    <p className='sideElement' onClick={()=>props.handleClick(2)} ><img src="https://iconarchive.com/download/i65358/icons-land/metro-raster-sport/Casino-Playing-Cards.ico" width='40px'/> <span> Insertion Sort</span></p>
    <p className='sideElement' onClick={()=>props.handleClick(3)} ><FontAwesomeIcon className="white-color" icon={faMountain} size='lg'/><span> Heap Sort</span></p>
    <p className='sideElement' onClick={()=>props.handleClick(4)} ><img src="https://cdn0.iconfinder.com/data/icons/arrows-148/24/arrow-merge-512.png" width='40px'/> <span> Merge Sort</span></p>
    <p className='sideElement' onClick={()=>props.handleClick(5)} ><FontAwesomeIcon className="white-color" icon={faStopwatch} size='lg'/> <span> Quick Sort</span></p>
    <p className='sideElement' onClick={()=>props.handleClick(6)} ><FontAwesomeIcon className="white-color" icon={faSquareRootAlt} size='lg'/><span>  Radix Sort</span></p>
    <p className='sideElement' onClick={()=>props.handleClick(7)} ><img src='https://cdn3.iconfinder.com/data/icons/island-2/50/60-512.png' width='40px'/><span> Shell Sort</span></p>
    </div>
}