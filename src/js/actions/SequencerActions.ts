import alt from '../alt';

import { AbstractActions } from './AbstractActions';

export interface SequencerActions {
    togglePosition(x: number, y: number): { x: number, y: number };
    updatePlayhead(x: number): number;
}

class PolySequencerActions extends AbstractActions implements SequencerActions {
    togglePosition(x, y) {
        return {x, y};
    }

    updatePlayhead(x) {
        return x;
    }
}

class DrumSequencerActions extends AbstractActions implements SequencerActions {
    togglePosition(x, y) {
        return {x, y};
    }

    updatePlayhead(x) {
        return x;
    }
}

// class PolySequencerActionsImpl extends AbstractSequencerActions {}
// class DrumSequencerActionsImpl extends AbstractSequencerActions {}

export const PolySequencerActions = alt.createActions<SequencerActions>(PolySequencerActions);
export const DrumSequencerActions = alt.createActions<SequencerActions>(DrumSequencerActions);
