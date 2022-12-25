import { Component } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'


import { loadSamples } from '../store/actions/sampleActions'
import { loadKitsList } from '../store/actions/sampleActions'

import { onSetKit } from '../store/actions/sampleActions'
import { setFilterBy } from '../store/actions/sampleActions'

export function SampleList({ kits }) {

  const dispatch = useDispatch()

  let selectKits = []

  if (kits) {
    selectKits = kits.map((kit, i) => {
      return (
        <option value={kit} key={i}>{kit}</option>
      )
    }, this)
  }

  function onSetKit(event) {
    dispatch(loadSamples(event.target.value))
  }

  return (
    <section className='sample-list'>SampleList
      <select name="" id="" onChange={onSetKit}>
        {selectKits}
      </select>
    </section>
  )
  // }
}
