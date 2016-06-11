import * as Tone from 'tone';

import {Track} from "./Track";

export class MasterTrack extends Track {
    limiter = new Tone.Limiter(-12);

    protected setupRouting() {
        this.output = this.limiter;
    }

    get input() {
        return this.limiter;
    }
}
