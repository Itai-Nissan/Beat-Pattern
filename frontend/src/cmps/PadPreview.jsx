
export function PadPreview({ sample }) {
    function onClickPad() {
        const audio = require(`../assets/${sample.sampleUrl}`)
        if (audio) {
            new Audio(audio).play()
        }
    }

    return (
        <div className='pad-preview'>
            <button className="btn" onClick={() => onClickPad(sample.sampleUrl)}>{sample.sampleName}</button>
        </div>

    )
}

