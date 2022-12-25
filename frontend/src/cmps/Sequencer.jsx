import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'

export function Sequencer({ samplesKit }) {
  let samples = []
  if (samplesKit) {
    samples = samplesKit.kitSamples
  }

  let counter = 0
  let intervalID = null

  const barsAmount = 8
  const bars = (() => {
    return <ul className='bars'>{Array.from(Array(barsAmount), (e, i) => {
      return <div id={'bar-' + i} className={`bar btn bar-${+ i}`} key={i}>{i + 1}</div>
    })}</ul>
  }
  )

  function interval() {
    if (!intervalID) {
      intervalID = setInterval((() => {

        function playSample() {
          samples = samplesKit.kitSamples
          if (samples[counter]) {
            const audio = require(`../assets/${samples[counter].sampleUrl}`)
            if (audio) {
              new Audio(audio).play()
            }
          }
        }

        if (counter === barsAmount) {
          counter = 0
          playSample()
          let currentBar = document.querySelector('#bar-' + counter)
          currentBar.classList.add('active-bar')
          let prevBar = document.querySelector('#bar-' + (barsAmount - 1))
          prevBar.classList.remove('active-bar')
          counter = counter + 1
        } else {
          if (counter === 0) {
            let currentBar = document.querySelector('#bar-' + counter)
            currentBar.classList.add('active-bar')
            let prevBar = document.querySelector('#bar-' + (barsAmount - 1))
            prevBar.classList.remove('active-bar')
            playSample()
            counter = counter + 1
          } else {
            let prevBar = document.querySelector('#bar-' + (counter - 1))
            prevBar.classList.remove('active-bar')
            let currentBar = document.querySelector('#bar-' + counter)
            currentBar.classList.add('active-bar')
            playSample()
            counter = counter + 1
          }
        }
      }), 500)
    }
  }

  function clear() {
    clearInterval(intervalID)
    intervalID = null
    let currentBar = document.querySelector('#bar-' + (counter - 1))
    currentBar.classList.remove('active-bar')
    counter = 0
  }

  return (
    <div className='sequencer'>
      <section className="">{bars()}</section>
      <div className="control-buttons">
        <button className='play btn' onClick={() => interval()}>Play </button>
        <button className='stop btn' onClick={() => clear()}>Stop </button>
      </div>
    </div>
  )
}


// export class Sequencer extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       samples: {},
//       currentKit: [],
//       counter: 0,
//       intervalID: null,
//       barsAmount: 8,
//       bars: (() => {
//         return <ul className='bars'>{Array.from(Array(this.state.barsAmount), (e, i) => {
//           return <div id={'bar-' + i} className={`bar btn bar-${+ i}`} key={i}>{i + 1}</div>
//         })}</ul>
//       }
//       )
//     }
//   }



//   componentDidMount() {
//     console.log(this.props);
//   }

//   interval() {
//     if (!this.state.intervalID) {
//       this.state.intervalID = setInterval((() => {
//         console.log(this.state.counter);

//         if (this.state.counter === this.state.barsAmount) {
//           this.setState({ counter: this.state.counter = 0 })
//           let currentBar = document.querySelector('#bar-' + this.state.counter)
//           currentBar.classList.add('active-bar')
//           let prevBar = document.querySelector('#bar-' + (this.state.barsAmount - 1))
//           prevBar.classList.remove('active-bar')
//           this.setState({ counter: this.state.counter + 1 })
//         } else {
//           if (this.state.counter === 0) {
//             let currentBar = document.querySelector('#bar-' + this.state.counter)
//             currentBar.classList.add('active-bar')
//             let prevBar = document.querySelector('#bar-' + (this.state.barsAmount - 1))
//             prevBar.classList.remove('active-bar')
//             this.setState({ counter: this.state.counter + 1 })
//           } else {
//             let prevBar = document.querySelector('#bar-' + (this.state.counter - 1))
//             prevBar.classList.remove('active-bar')
//             let currentBar = document.querySelector('#bar-' + this.state.counter)
//             currentBar.classList.add('active-bar')
//             this.setState({ counter: this.state.counter + 1 })
//           }
//         }
//       }), 500)
//     }
//   }

//   clear() {
//     clearInterval(this.state.intervalID)
//     this.state.intervalID = null
//     // console.log('clear', this.state.counter - 1);
//     let currentBar = document.querySelector('#bar-' + (this.state.counter - 1))
//     currentBar.classList.remove('active-bar')
//     this.setState({ counter: this.state.counter = 0 })
//   }

//   render() {
//     return (
//       <div className='sequencer'>
//         <section className="">{this.state.bars()}</section>
//         <div className="control-buttons">
//           <button className='play btn' onClick={() => this.interval()}>Play </button>
//           <button className='stop btn' onClick={() => this.clear()}>Stop </button>
//         </div>
//       </div>
//     )
//   }
// }
