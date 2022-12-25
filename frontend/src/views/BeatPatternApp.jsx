import { Component } from 'react'
import { AppHeader } from '../cmps/AppHeader'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PadList } from '../cmps/PadsList.cmp'
import { SampleList } from '../cmps/SampleList'
import { Sequencer } from '../cmps/Sequencer'

import { loadSamples } from '../store/actions/sampleActions'
import { loadKitsList } from '../store/actions/sampleActions'
import { setFilterBy } from '../store/actions/sampleActions'

export const BeatPatternApp = () => {

    const dispatch = useDispatch()
    const samplesKit = useSelector(state => state.sampleModule.samplesKit)
    let kits = useSelector(state => state.sampleModule.kitsList)

    useEffect(() => {
        dispatch(loadSamples())
        dispatch(loadKitsList())
    }, [])

    return (
        <div className='beat-pattern'>
            <SampleList kits={kits} />
            <PadList samplesKit={samplesKit} />
            <Sequencer samplesKit={samplesKit} />
        </div>
    )
}

