import {SequencerStore} from '../../src/js/stores/SequencerStore';
import realAlt from '../../src/js/alt';

const alt: any = realAlt; // access dispatcher

describe('SequencerStore', () => {
    it('has a default state', () => {
        expect(SequencerStore.getState()).toEqual({
            positions: [
                [true, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, true],
                [false, true, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, true, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, true, false, false, false],
                [false, false, false, false, true],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, true, false, false],
                [false, false, false, false, false],
                [false, false, false, false, true]
            ],
            width: 16,
            height: 5,
            playhead: 0,
            drums: true
        });
    });

    it('handles toggling position at x 1, y 0', () => {
        alt.dispatcher.dispatch({
            action: 'SequencerActions.togglePosition',
            data: {x: 1, y: 0}
        });

        expect(SequencerStore.getState().positions).toEqual([
            [true, false, false, false, false],
            [true, false, false, false, false],
            [false, false, false, false, true],
            [false, true, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, true, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, true, false, false, false],
            [false, false, false, false, true],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, true, false, false],
            [false, false, false, false, false],
            [false, false, false, false, true]
        ]);
    });

    it('handles toggling position at x 0, y 1', () => {
        alt.dispatcher.dispatch({
            action: 'SequencerActions.togglePosition',
            data: {x: 0, y: 1}
        });

        expect(SequencerStore.getState().positions).toEqual([
            [true, true, false, false, false],
            [true, false, false, false, false],
            [false, false, false, false, true],
            [false, true, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, true, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, true, false, false, false],
            [false, false, false, false, true],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, true, false, false],
            [false, false, false, false, false],
            [false, false, false, false, true]
        ]);
    });

    it('handles toggling drums', () => {
        alt.dispatcher.dispatch({
            action: 'SequencerActions.toggleDrums',
            data: true
        });

        expect(SequencerStore.getState().drums).toBe(false);

        alt.dispatcher.dispatch({
            action: 'SequencerActions.toggleDrums',
            data: true
        });

        expect(SequencerStore.getState().drums).toBe(true);
    });

    it('handles updating playhead', () => {
        alt.dispatcher.dispatch({
            action: 'SequencerActions.updatePlayhead',
            data: 7
        });

        expect(SequencerStore.getState().playhead).toBe(7);
    });
});
