import * as Tone from 'tone';
import {Track} from "./Track";
import {Sequenced} from "./Sequencer";

export class DrumSynthTrack extends Track implements Sequenced {
    kickSynth = new Tone.DrumSynth();
    kickDistortion = new Tone.Distortion(0.2);
    kickCompressor = new Tone.Compressor({
        threshold: -24,
        ratio: 4,
        release: 0.250,
        attack: 0.100,
        knee: 6
    });

    snareNoiseSynth = new Tone.NoiseSynth({
        envelope:  {
            // attack: 0.05
            decay: 0.15,
            sustain: 0,
            release: 0.15
        }
    });
    snareSynth = new (<any>Tone).SimpleSynth({
        envelope: {
            decay: 0.1,
            sustain: 0,
            release: 0.1
        }
    });

    gain = new (<any>Tone).Gain();

    protected setupRouting() {
        this.kickDistortion.oversample = '4x';
        this.kickSynth.chain(this.kickDistortion, this.kickCompressor, this.gain);

        this.snareNoiseSynth.chain(this.gain);
        this.snareSynth.chain(this.gain);

        this.output = this.gain;
    }

    trigger(time: Tone.Time, y: number): void {
        switch (y) {
            case 0:
                this.kickSynth.triggerAttackRelease('F1', 0.1);
                break;
            case 1:
                this.snareNoiseSynth.triggerAttackRelease(0.2);
                this.snareSynth.triggerAttackRelease('C2', 0.01);
                break;
        };
    }
}
