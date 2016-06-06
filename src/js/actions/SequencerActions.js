import alt from '../alt';

class SequencerActions {
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

export default alt.createActions(SequencerActions);
