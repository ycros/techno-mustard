import alt from '../alt';
import {AbstractActions} from "./AbstractActions";
import {SequencerID} from "../types/SequencerID";

interface SequencerPositionData {
    id: SequencerID;
    x: number;
    y: number;
}

interface UpdateSequencerPlayheadData {
    id: SequencerID;
    position: number;
}

interface ToggleSequencerData {
    id: SequencerID;
}

export interface SessionActions {
    toggleSequencerPosition(sequencerId: SequencerID, x: number, y: number): SequencerPositionData;
    updateSequencerPlayhead(sequencerId: SequencerID, position: number): UpdateSequencerPlayheadData;
    toggleSequencer(sequencerId: SequencerID): ToggleSequencerData;
}

class SessionActionsImpl extends AbstractActions implements SessionActions {
    toggleSequencerPosition(sequencerId: SequencerID, x: number, y: number): SequencerPositionData {
        return { id: sequencerId, x, y };
    }

    updateSequencerPlayhead(sequencerId: SequencerID, position: number): UpdateSequencerPlayheadData {
        return { id: sequencerId, position };
    }

    toggleSequencer(sequencerId: SequencerID): ToggleSequencerData {
        return { id: sequencerId };
    }
}

export const SessionActions = alt.createActions<SessionActions>(SessionActionsImpl);
