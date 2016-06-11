import * as Tone from 'tone';

import {PolySynthTrack} from "./PolySynthTrack";
import {MasterTrack} from "./MasterTrack";
import {Sequencer} from "./Sequencer";

import {PolySequencerStore, DrumSequencerStore} from "../stores/SequencerStore";
import {DrumSynthTrack} from "./DrumSynthTrack";
import {AbstractSequencerState} from "../stores/AbstractSequencerState";
import {PolySequencerActions, DrumSequencerActions} from "../actions/SequencerActions";

export class Session {
    master = new MasterTrack();

    polySynth = new PolySynthTrack();
    polySynthSequencer = new Sequencer(this.polySynth, PolySequencerActions);

    drumSynth = new DrumSynthTrack();
    drumSynthSequencer = new Sequencer(this.drumSynth, DrumSequencerActions);

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

        // hook in state stores for sequencers
        this.connectSequencerToStore(this.polySynthSequencer, PolySequencerStore);
        this.connectSequencerToStore(this.drumSynthSequencer, DrumSequencerStore);

        // here we go
        Tone.Transport.bpm.value = 101;
        Tone.Transport.start();
    }

    private connectSequencerToStore(sequencer: Sequencer, sequencerStore: AltJS.AltStore<AbstractSequencerState>) {
        sequencer.update(sequencerStore.getState());
        sequencerStore.listen(sequencer.update);
    }
}
