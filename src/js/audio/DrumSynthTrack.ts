import * as Tone from 'tone';
import {Track} from "./Track";
import {Sequenced} from "./Sequencer";

export class DrumSynthTrack extends Track implements Sequenced {
    synth = new Tone.DrumSynth();
    distortion = new Tone.Distortion(0.2);
    compressor = new Tone.Compressor({
        threshold: -24,
        ratio: 4,
        release: 0.250,
        attack: 0.100,
        knee: 6
    });

    protected setupRouting() {
        this.distortion.oversample = '4x';
        this.synth.chain(this.distortion, this.compressor);
        this.output = this.compressor;
    }

    trigger(time: Tone.Time, y: number): void {
        this.synth.triggerAttackRelease('F1', '8n');
    }
}
