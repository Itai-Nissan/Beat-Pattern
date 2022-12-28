import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'

export function Sequencer({ samplesKit }) {
  let samples = []
  if (samplesKit) {
    samples = samplesKit.kitSamples
  }

  let kick = ''
  let clap = ''
  let snare = ''
  let hhClose = ''
  let hhOpen = ''
  let crash = ''
  if (samples && samples.length > 0) {
    kick = require(`../assets/${samples[0].sampleUrl}`)
    clap = require(`../assets/${samples[1].sampleUrl}`)
    snare = require(`../assets/${samples[2].sampleUrl}`)
    hhClose = require(`../assets/${samples[3].sampleUrl}`)
    hhOpen = require(`../assets/${samples[4].sampleUrl}`)
    crash = require(`../assets/${samples[5].sampleUrl}`)
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

  let stop = false
  let timeInput = 4000

  function onSetPlay(time) {
    stop = false
    playSequence(time)
  }
  function playSequence(time) {
    if (stop === true) {
      return;
    }
    // snippet: if play already running: restart
    for (let i = 0; i < 8; ++i) {
      let j = i;
      if (stop === true) return
      else {
        setTimeout(() => {
          if (counter === barsAmount && stop === false) {
            counter = 0
            _playSample()
            _addClass()
            _removeClass()
            counter = counter + 1
          } else {
            if (counter === 0 && stop === false) {
              _playSample()
              _addClass()
              _removeClass()
              counter = counter + 1
            } else {
              if (stop === false) {
                _addClass()
                let prevBar = document.querySelector('#bar-' + (counter - 1))
                prevBar.classList.remove('active-bar')
                _playSample()
                counter = counter + 1
              }
            }
          }

          // pads.toggleStepPlayClass(j);
          // playChord(
          //   steps[j],
          //   time / 8000,
          //   elements.instrument.value
          // )

        }, (time * j) / 8)
      }
    }

    //   console.log(stop);
    setTimeout(() => {
      if (stop === false) {
        playSequence(timeInput);
      }
    }, time);

    // setTimeout(() => {
    //   pads.toggleStepPlayClass(8);
    // }, time);
    // if (stop === false) {
    //   console.log(stop);
    //   setTimeout(() => {
    //     playSequence(timeInput);
    //   }, time);
    // }

  }

  function clear() {
    stop = true
    let prevBar = document.querySelector('#bar-' + (counter - 1))
    prevBar.classList.remove('active-bar')
    counter = 0
  }

  function c() {
    clearInterval(intervalID)
    intervalID = null
    counter = 0
    let allBars = [...document.querySelectorAll(".bar")]
    for (let i = 0; i < allBars.length; i++) {
      let currentBar = document.querySelector('#bar-' + (i))
      currentBar.classList.remove('active-bar')

      // if (allBars[i].classList.contains('actie-bar')) {
      // allBars[i].classList.remove('active-bar')
      // let currentBar = document.querySelector('#bar-' + (i))
      // currentBar.classList.remove('active-bar')
      // }
    }
  }

  function _play(sample) {
    new Audio(sample).play()
  }

  function _playSample() {
    samples = samplesKit.kitSamples
    padMap[counter].pad.forEach((sample) => {
      if (sample === 'kick') {
        _play(kick)
      } else if (sample === 'clap') {
        _play(clap)
      } else if (sample === 'snare') {
        _play(snare)
      } else if (sample === 'hh-close') {
        _play(hhClose)
      } else if (sample === 'hh-open') {
        _play(hhOpen)
      } else if (sample === 'crash') {
        _play(crash)
      }
    })
  }

  function _addClass() {
    let currentBar = document.querySelector('#bar-' + counter)
    currentBar.classList.add('active-bar')
  }
  function _removeClass() {
    let prevBar = document.querySelector('#bar-' + (barsAmount - 1))
    prevBar.classList.remove('active-bar')
  }

  return (
    <div className='container sequencer'>
      <section className="">{bars()}</section>
      <div className="control-buttons">
        <button className='play btn' onClick={() => onSetPlay(timeInput)}>Play </button>
        <button className='stop btn' onClick={() => clear()}>Stop </button>
      </div>
    </div>
  )
}

const padMap = [
  {
    pad: [
      'kick',
      'crash',
      'hh-close'
    ],
  },
  {
    pad: [
      'hh-close'
    ],
  },
  {
    pad: [
      'snare',
      'hh-open'
    ],
  },
  {
    pad: [
      'hh-close'
    ],
  },
  {
    pad: [
      'kick',
      'hh-close'
    ],
  },
  {
    pad: [
      'hh-close'
    ],
  },
  {
    pad: [
      'snare',
      'hh-close'
    ],
  },
  {
    pad: [
      'hh-close'
    ],
  },
]
