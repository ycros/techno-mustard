import alt from '../alt';
import {AbstractStoreModel} from "./AbstractStoreModel";
import {SequencerID} from "../types/SequencerID";
import {SessionActions} from "../actions/SessionActions";

type Grid = Array<Array<boolean>>;

export interface SequencerState {
    id: SequencerID;
    active: boolean;
    width: number;
    height: number;
    grid: Grid;
    playhead: number;
}

interface Sequencers {
    [id: number]: SequencerState;
}

export interface SessionState {
    sequencers: Sequencers;
}

class SessionStoreImpl extends AbstractStoreModel<SessionState> implements SessionState {
    sequencers: Sequencers = {};

    constructor() {
        super();

        this.sequencers[SequencerID.Poly] = {
            id: SequencerID.Poly,
            active: true,
            width: 16,
            height: 5,
            grid: this.buildGrid(16, 5),
            playhead: 0
        };

        this.sequencers[SequencerID.Drum] = {
            id: SequencerID.Drum,
            active: true,
            width: 16,
            height: 1,
            grid: this.buildGrid(16, 1),
            playhead: 0
        };

        this.bindListeners({
            handleToggleSequencer: SessionActions.toggleSequencer,
            handleUpdatePlayhead: SessionActions.updateSequencerPlayhead,
            handleTogglePosition: SessionActions.toggleSequencerPosition
        });
    }

    handleToggleSequencer(id: SequencerID) {
        const sequencer = this.sequencers[id];
        sequencer.active = !sequencer.active;
        if (!sequencer.active) {
            sequencer.playhead = 0;
        }
    }

    handleUpdatePlayhead({id, position}) {
        this.sequencers[id].playhead = position;
    }

    handleTogglePosition({ id, x, y }) {
        const sequencer = this.sequencers[id];
        sequencer.grid[x][y] = !sequencer.grid[x][y];
    }

    private buildGrid(width: number, height: number): Grid {
        const result = [];
        for (let x = 0; x < width; x++) {
            let col = [];
            for (let y = 0; y < height; y++) {
                col.push(false);
            }
            result.push(col);
        }
        return result;
    }
}

export const SessionStore = alt.createStore<SessionState>(SessionStoreImpl, 'SessionStore');
