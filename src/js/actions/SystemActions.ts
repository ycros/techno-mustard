import alt from '../alt';

import { AbstractActions } from './AbstractActions';

interface Actions {
    setSequencerEngine(engine): any;
}

class SystemActions extends AbstractActions implements Actions {
    setSequencerEngine(engine) {
        return engine;
    }
}

export default alt.createActions<Actions>(SystemActions);
