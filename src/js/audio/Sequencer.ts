import * as Tone from 'tone';

import {AbstractSequencerState} from "../stores/AbstractSequencerState";
import {SequencerActions} from "../actions/SequencerActions";


export interface Sequenced {
    trigger(time: Tone.Time, y: number): void;
}

export class Sequencer {
    private cols: Array<number> = [];
    private toneSequencer: Tone.Sequence;
    private state: AbstractSequencerState;

    constructor(private sequenced: Sequenced,
                private actions: SequencerActions) {
    }

    update = (newState: AbstractSequencerState) => {
        if (!this.state || this.state.width !== newState.width) {
            let replacingSequencer = false;

            this.cols.length = 0;

            for (let x = 0; x < newState.width; x++) {
                this.cols.push(x);
            }

            if (this.toneSequencer) {
                this.toneSequencer.stop();
                this.toneSequencer.dispose();
            }

            this.toneSequencer = new Tone.Sequence(this.sequencerLoop, this.cols, "16n");
            this.toneSequencer.start(0);
        }

        this.state = newState;
    };

    private sequencerLoop = (time, col) => {
        this.actions.updatePlayhead(col);

        for (let y = 0; y < this.state.height; y++) {
            let play = this.state.positions[col][y];
            if (play) {
                this.sequenced.trigger(time, y);
            }
        }
    };
}
