
const INITIAL_STATE = {
    samplesKit: null,
    kitsList: null,
    filterBy: null
}


export function sampleReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_SAMPLES':
            return {
                ...state,
                samplesKit: action.samplesKit
            }

        case 'SET_KITS':
            return {
                ...state,
                kitsList: action.kitsList
            }

        case 'ADD_SAMPLE':
            return {
                ...state,
                samplesKit: [...state.samplesKit, action.sample]
            }

        case 'REMOVE_SAMPLE':
            return {
                ...state,
                samplesKit: state.samplesKit.filter(sample => sample._id !== action.sampleId)
            }

        case 'UPDATE_SAMPLE':
            return {
                ...state,
                samplesKit: state.samplesKit.map(sample => sample._id === action.sample._id ? action.sample : sample)
            }

        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: state.filterBy
            }

        default:
            return state;
    }
}