import * as Tone from 'tone';
import {SequencerState} from "../stores/SessionStore";
import {SequencerID} from "../types/SequencerID";
import {SessionActions} from "../actions/SessionActions";

export interface Sequenced {
    trigger(time: Tone.Time, y: number): void;
}

export class Sequencer {
    private cols: Array<number> = [];
    private toneSequencer: Tone.Sequence;
    private state: SequencerState;

    constructor(private sequenced: Sequenced,
                public id: SequencerID) {
    }

    update = (newState: SequencerState) => {
        if (!this.state || this.state.width !== newState.width) {
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
        SessionActions.updateSequencerPlayhead(this.id, col);

        for (let y = 0; y < this.state.height; y++) {
            let play = this.state.grid[col][y];
            if (play) {
                this.sequenced.trigger(time, y);
            }
        }
    };
}
