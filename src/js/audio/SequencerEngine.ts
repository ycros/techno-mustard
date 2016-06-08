
import * as Tone from 'tone';
import SequencerActions from '../actions/SequencerActions';
import { SequencerStore, SequencerState } from '../stores/SequencerStore';

const irSrc = require<string>('../../assets/audio/ir1.ogg');

export default class SequencerEngine {
    _cols: Array<number> = [];
    _state: SequencerState;
    _sequencer: Tone.Sequence;

    synth = new Tone.PolySynth(8);
    synthDelay = new Tone.PingPongDelay('8n', 0.3);
    synthReverb = new Tone.Convolver(irSrc);

    drumSynth = new Tone.DrumSynth();
    drumDistortion = new Tone.Distortion(0.2);
    drumCompressor = new Tone.Compressor({
        threshold: -24,
        ratio: 4,
        release: 0.250,
        attack: 0.100,
        knee: 6
    });

    limiter = new Tone.Limiter(-12);
    meter = new Tone.Meter();

    notes = ['F2', 'G#2', 'A#2', 'C3', 'D#3', 'F3'];

    constructor() {
        this._setupRouting();

        this._receivedNewState(SequencerStore.getState());
        SequencerStore.listen(this._receivedNewState);

        Tone.Transport.bpm.value = 101;
        Tone.Transport.start();

        this._sequencer.start("1m");
    }

    _setupRouting() {
        this.synth.volume.value = -12;
        this.synthDelay.wet.value = 0.3;
        this.synthReverb.wet.value = 0.4;
        this.synth.chain(this.synthReverb, this.limiter);

        this.drumDistortion.oversample = '4x';
        this.drumSynth.chain(this.drumDistortion, this.drumCompressor, this.limiter);

        this.limiter.toMaster();

        Tone.Master.chain(this.meter);
    }

    _synthTrigger(time, note) {
        const duration = (Math.sin(time * 0.4) * 0.15) + 0.25;
        this.synth.triggerAttackRelease(note, duration);
    }

    _sequencerLoop = (time, col) => {
        SequencerActions.updatePlayhead(col);

        for (let y = 0; y < this._state.height; y++) {
            let play = this._state.positions[col][y];
            if (play) {
                this._synthTrigger(time, this.notes[y]);
            }
        }

        if (this._state.drums && col % 4 == 0) {
            this.drumSynth.triggerAttackRelease("F1", "8n");
        }
    };

    _receivedNewState = newState => {
        if (!this._state || this._state.width !== newState.width) {
            let replacingSequencer = false;

            this._cols.length = 0;

            for (let x = 0; x < newState.width; x++) {
                this._cols.push(x);
            }

            if (this._sequencer) {
                this._sequencer.stop();
                this._sequencer.dispose();
                replacingSequencer = true;
            }

            this._sequencer = new Tone.Sequence(this._sequencerLoop, this._cols, "16n");

            if (replacingSequencer) {
                this._sequencer.start(0);
            }
        }

        this._state = newState;
    };
}
