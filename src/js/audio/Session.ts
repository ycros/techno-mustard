import * as Tone from 'tone';

import {PolySynthTrack} from "./PolySynthTrack";
import {MasterTrack} from "./MasterTrack";
import {Sequencer} from "./Sequencer";

import {DrumSynthTrack} from "./DrumSynthTrack";
import {SequencerID} from "../types/SequencerID";
import {SessionStore, SessionState} from "../stores/SessionStore";

export class Session {
    master = new MasterTrack();

    polySynth = new PolySynthTrack();
    polySynthSequencer = new Sequencer(this.polySynth, SequencerID.Poly);

    drumSynth = new DrumSynthTrack();
    drumSynthSequencer = new Sequencer(this.drumSynth, SequencerID.Drum);

    state: SessionState = null;

    constructor() {
        this.updateState(SessionStore.getState());
        SessionStore.listen(this.updateState.bind(this));
    }

    start() {
        // init all tracks
        this.master.init();
        this.polySynth.init();
        this.drumSynth.init();

        // connect tracks to master
        this.polySynth.output.chain(this.master.input);
        this.drumSynth.output.chain(this.master.input);

        // route master output to real master
        this.master.output.toMaster();

        // here we go
        (<any>Tone.Buffer).on('load', () => {
            console.log("Starting transport.");
            Tone.Transport.bpm.value = 101;
            Tone.Transport.start();
        });
    }

    private updateState(newState: SessionState) {
        this.state = newState;
        this.polySynthSequencer.update(newState.sequencers[SequencerID.Poly]);
        this.drumSynthSequencer.update(newState.sequencers[SequencerID.Drum]);
    }
}
