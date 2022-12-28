import { sampleService } from "../../services/sampleService"
import { useDispatch, useSelector } from 'react-redux'


export function loadSamples(filterBy) {
    console.log('loadSamples');

    return async (dispatch) => {
        try {
            const samplesKit = await sampleService.query(filterBy)
            dispatch({ type: 'SET_SAMPLES', samplesKit })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function loadKitsList() {

    return async (dispatch, getState) => {
        try {
            const { filterBy } = getState().sampleModule
            const kitsList = sampleService.getKitsList(filterBy)
            dispatch({ type: 'SET_KITS', kitsList })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function onSetKit(kit) {

    return async (dispatch, getState) => {
        try {
            console.log(kit);

        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function removeSample(sampleId) {

    return async (dispatch, getState) => {
        try {
            const sample = await sampleService.remove(sampleId)
            dispatch({ type: 'REMOVE_SAMPLE', sampleId })
            return sample
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function setFilterBy(filterBy) {

    return async (dispatch, getState) => {
        try {
            dispatch({ type: 'SET_FILTER_BY', filterBy })
        } catch (err) {
            console.log('err:', err)
        }
    }
}