import alt from '../alt';
import {DrumSequencerActions, PolySequencerActions} from '../actions/SequencerActions';

import { AbstractStoreModel } from './AbstractStoreModel';
import {AbstractSequencerState} from "./AbstractSequencerState";

export interface SequencerState extends AbstractSequencerState {
    positions: Array<Array<boolean>>;
    width: number;
    height: number;
    playhead: number;
}

abstract class AbstractSequencerStore extends AbstractStoreModel<SequencerState> implements SequencerState {
    positions: Array<Array<boolean>>;
    width: number;
    height: number;
    playhead: number;

    constructor(width: number, height: number) {
        super();
        this.positions = [];
        this.width = width;
        this.height = height;
        this.playhead = 0;

        for (let x = 0; x < this.width; x++) {
            let col = [];
            for (let y = 0; y < this.height; y++) {
                col.push(false);
            }
            this.positions.push(col);
        }
    }

    handleTogglePosition(pos) {
        let {x, y} = pos;
        this.positions[x][y] = !this.positions[x][y];
    }

    handleUpdatePlayhead(x) {
        this.playhead = x;
    }
}

class PolySequencerStoreImpl extends AbstractSequencerStore {
    constructor() {
        super(16, 5);

        this.positions[0][0] = true;
        this.positions[2][4] = true;
        this.positions[3][1] = true;
        this.positions[6][3] = true;
        this.positions[9][1] = true;
        this.positions[10][4] = true;
        this.positions[13][2] = true;
        this.positions[15][4] = true;

        this.bindListeners({
            handleTogglePosition: PolySequencerActions.togglePosition,
            handleUpdatePlayhead: PolySequencerActions.updatePlayhead
        });
    }
}

class DrumSequencerStoreImpl extends AbstractSequencerStore {
    constructor() {
        super(16, 1);

        this.positions[0][0] = true;
        this.positions[4][0] = true;
        this.positions[8][0] = true;
        this.positions[12][0] = true;

        this.bindListeners({
            handleTogglePosition: DrumSequencerActions.togglePosition,
            handleUpdatePlayhead: DrumSequencerActions.updatePlayhead
        });
    }
}

export const PolySequencerStore = alt.createStore<SequencerState>(PolySequencerStoreImpl, 'PolySequencerStore');
export const DrumSequencerStore = alt.createStore<SequencerState>(DrumSequencerStoreImpl, 'DrumSequencerStore');
