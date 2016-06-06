import alt from '../alt';
import SequencerActions from '../actions/SequencerActions';

class SequencerStore {
    constructor() {
        this.positions = [];
        this.width = 16;
        this.height = 5;
        this.playhead = 0;

        for (let x = 0; x < this.width; x++) {
            let col = [];
            for (let y = 0; y < this.height; y++) {
                col.push(false);
            }
            this.positions.push(col);
        }

        this.positions[0][0] = true;
        this.positions[2][4] = true;
        this.positions[3][1] = true;
        this.positions[6][3] = true;
        this.positions[9][1] = true;
        this.positions[10][4] = true;
        this.positions[13][2] = true;
        this.positions[15][4] = true;

        this.drums = true;

        this.bindListeners({
            handleTogglePosition: SequencerActions.TOGGLE_POSITION,
            handleUpdatePlayhead: SequencerActions.UPDATE_PLAYHEAD,
            handleToggleDrums: SequencerActions.TOGGLE_DRUMS
        });
    }

    handleTogglePosition(pos) {
        let {x, y} = pos;
        this.positions[x][y] = !this.positions[x][y];
    }

    handleUpdatePlayhead(x) {
        this.playhead = x;
    }

    handleToggleDrums() {
        this.drums = !this.drums;
    }
}

export default alt.createStore(SequencerStore, 'SequencerStore');
