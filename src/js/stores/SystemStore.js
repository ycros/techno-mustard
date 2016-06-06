import alt from '../alt';

import SystemActions from '../actions/SystemActions';

class SystemStore {
    constructor() {
        this.sequencerEngine = null;

        this.bindListeners({
            handleSetSequencerEngine: SystemActions.SET_SEQUENCER_ENGINE
        });
    }

    handleSetSequencerEngine(engine) {
        this.sequencerEngine = engine;
    }
}

export default alt.createStore(SystemStore, 'SystemStore');
