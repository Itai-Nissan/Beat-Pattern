import { storageService } from './storageService.js'
import { makeId } from './utilService.js'
import samples from '../assets/data/samples.json'

export const sampleService = {
    query,
    save,
    remove,
    getById,
    getEmptySample,
    trySample,
    getKitsList
}

const STORAGE_KEY = 'samples'

async function query(filterBy) {

    let kitToReturn
    if (!filterBy) filterBy = 'rock'

    kitToReturn = await _getByKit(filterBy)
    return Promise.resolve(kitToReturn);
}

function _getByKit(kitName) {
    const kit = samples.find(kit => kit.kitName === kitName)
    return Promise.resolve({ ...kit })
}

function getKitsList() {
    const kitsList = []
    samples.map((kit) => {
        kitsList.push(kit.kitName)
    })
    return kitsList
}

function trySample(id) {
    const sample = samples.find(sample => sample._id === id)
    sample.batteryStatus -= 10
    return Promise.resolve()
}
function getById(id) {
    const sample = samples.find(sample => sample._id === id)
    return Promise.resolve({ ...sample })
}

function remove(id) {
    const idx = samples.findIndex(sample => sample._id === id)
    samples.splice(idx, 1)
    if (!samples.length) samples = samples.slice()
    storageService.store(STORAGE_KEY, samples)
    return Promise.resolve()
}

function save(sampleToSave) {
    if (sampleToSave._id) {
        const idx = samples.findIndex(sample => sample._id === sampleToSave._id)
        samples.splice(idx, 1, sampleToSave)
    } else {
        sampleToSave._id = makeId()
        sampleToSave.batteryStatus = 100
        samples.push(sampleToSave)
    }
    storageService.store(STORAGE_KEY, samples)
    return Promise.resolve(sampleToSave);
}


function getEmptySample() {
    return {
        model: '',
        type: ''
    }
}

function _loadSamples() {
    let samples = storageService.load(STORAGE_KEY)
    if (!samples || !samples.length) samples = samples
    storageService.store(STORAGE_KEY, samples)
    return samples
}

