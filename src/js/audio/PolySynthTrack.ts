import * as Tone from 'tone';

import {Sequenced} from "./Sequencer";
import {Track} from "./Track";
const irSrc = require<string>('../../assets/audio/ir1.ogg');

export class PolySynthTrack extends Track implements Sequenced {
    synth = new Tone.PolySynth(8);
    // synthDelay = new Tone.PingPongDelay('8n', 0.3);
    synthReverb = new Tone.Convolver(irSrc);

    private notes = ['F2', 'G#2', 'A#2', 'C3', 'D#3', 'F3'];

    protected setupRouting() {
        this.synth.volume.value = -12;
        // this.synthDelay.wet.value = 0.3;
        this.synthReverb.wet.value = 0.4;
        this.synth.chain(this.synthReverb);
        this.output = this.synthReverb;
    }

    trigger(time: Tone.Time, y: number): void {
        this.synthTrigger(time, this.notes[y]);
    }

    private synthTrigger(time, note) {
        const duration = (Math.sin(time * 0.4) * 0.15) + 0.25;
        this.synth.triggerAttackRelease(note, duration);
    }
}
