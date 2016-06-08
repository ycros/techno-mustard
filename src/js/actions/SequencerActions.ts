import alt from '../alt';

import { AbstractActions } from './AbstractActions';

interface Actions {
    togglePosition(x: number, y: number): { x: number, y: number }
    updatePlayhead(x: number): number
    toggleDrums(): boolean
}

class SequencerActions extends AbstractActions implements Actions {
    togglePosition(x, y) {
        return {x, y};
    }

    updatePlayhead(x) {
        return x;
    }

    toggleDrums() {
        return true;
    }
}

export default alt.createActions<Actions>(SequencerActions);
