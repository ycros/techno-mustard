
import * as Tone from 'tone';

export abstract class Track {
    public meter = new Tone.Meter();
    output: Tone = null;

    init() {
        this.setupRouting();
        if (!this.output) {
            throw new Error("Track's output member variable must be set in setupRouting().");
        }
        this.output.chain(this.meter);
    }

    protected abstract setupRouting();
}
