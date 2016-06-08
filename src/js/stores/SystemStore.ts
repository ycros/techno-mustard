import alt from '../alt';

import SystemActions from '../actions/SystemActions';
import SequencerEngine from '../audio/SequencerEngine';

import { AbstractStoreModel } from './AbstractStoreModel';

export interface SystemState {
    sequencerEngine: SequencerEngine;
}

class SystemStoreImpl extends AbstractStoreModel<SystemState> implements SystemState {
    sequencerEngine: SequencerEngine;

    constructor() {
        super();

        this.sequencerEngine = null;

        this.bindListeners({
            handleSetSequencerEngine: SystemActions.setSequencerEngine
        });
    }

    handleSetSequencerEngine(engine) {
        this.sequencerEngine = engine;
    }
}

export const SystemStore = alt.createStore<SystemState>(SystemStoreImpl, 'SystemStore');
