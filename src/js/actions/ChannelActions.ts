import alt from '../alt';
import {AbstractActions} from "./AbstractActions";
import {SequencerID} from "../types/SequencerID";
import {SessionState} from "../stores/SessionStore";
import {buildGrid} from "../util/grid_builder";

export interface ChannelActions {
    setState(state: any);
    setSequencerPosition(sequencerId: number, x: number, y: number, value: boolean);
    setSequencerActive(sequencerId: number, value: boolean);
}

class ChannelActionsImpl extends AbstractActions implements ChannelActions {
    // TODO: verify sequencerIDs?

    setState(state: any) {
        let newState: SessionState = {
            sequencers: Object.keys(state.sequencers).map(key => {
                const seq: any = state.sequencers[key];
                seq.playhead = 0;
                const newGrid = buildGrid(seq.width, seq.height);
                Object.keys(seq.grid).forEach(gk => {
                    const gv = seq.grid[gk];
                    const [x, y] = gk.split(',');
                    newGrid[x][y] = gv;
                });
                seq.grid = newGrid;
                return seq;
            })
        };

        return newState;
    }

    setSequencerPosition(sequencerId: number, x: number, y: number, value: boolean) {
        return {id: sequencerId, x, y, value};
    }

    setSequencerActive(sequencerId: number, value: boolean) {
        return {id: sequencerId, value};
    }

}

export const ChannelActions = alt.createActions<ChannelActions>(ChannelActionsImpl);
