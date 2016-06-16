import alt from '../alt';
import {AbstractStoreModel} from "./AbstractStoreModel";
import {SequencerID} from "../types/SequencerID";
import {SessionActions} from "../actions/SessionActions";
import {buildGrid} from "../util/grid_builder";
import {ChannelActions} from "../actions/ChannelActions";

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
            grid: buildGrid(16, 5),
            playhead: 0
        };

        this.sequencers[SequencerID.Drum] = {
            id: SequencerID.Drum,
            active: true,
            width: 16,
            height: 1,
            grid: buildGrid(16, 1),
            playhead: 0
        };

        this.bindListeners({
            handleToggleSequencer: SessionActions.toggleSequencer,
            handleUpdatePlayhead: SessionActions.updateSequencerPlayhead,
            handleTogglePosition: SessionActions.toggleSequencerPosition,
            handleSetState: ChannelActions.setState,
            handleSetPosition: ChannelActions.setSequencerPosition,
            handleSetActive: ChannelActions.setSequencerActive
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

    handleSetState(newState: SessionState) {
        Object.keys(this.sequencers).forEach(k => {
            newState.sequencers[k].playhead = this.sequencers[k].playhead;
        });
        this.sequencers = newState.sequencers;
    }

    handleSetPosition({id, x, y, value}) {
        const sequencer = this.sequencers[id];
        sequencer.grid[x][y] = value;
    }

    handleSetActive({id, value}) {
        this.sequencers[id].active = value;
    }
}

export const SessionStore = alt.createStore<SessionState>(SessionStoreImpl, 'SessionStore');
