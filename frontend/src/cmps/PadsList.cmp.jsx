import { PadPreview } from './PadPreview'

export function PadList({ samplesKit }) {

    let currentKit = []
    let kitName = ''

    if (samplesKit) {
        currentKit = samplesKit.kitSamples
        kitName = samplesKit.kitName
    }

    return (
        <section className='pad-list'>
            <div className="header">
                <h3>{kitName}</h3>
            </div>
            <div className="pads">
                {currentKit.map(sample => <PadPreview key={sample.sampleUrl} sample={sample} />)}
            </div>
        </section>
    )
}