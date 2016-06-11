import {PolySequencerStore} from '../../src/js/stores/SequencerStore';
import realAlt from '../../src/js/alt';

const alt: any = realAlt; // access dispatcher

describe('PolySequencerStore', () => {
    it('has a default state', () => {
        expect(PolySequencerStore.getState()).toEqual({
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
            playhead: 0
        });
    });

    it('handles toggling position at x 1, y 0', () => {
        alt.dispatcher.dispatch({
            action: 'PolySequencerActions.togglePosition',
            data: {x: 1, y: 0}
        });

        expect(PolySequencerStore.getState().positions).toEqual([
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
            action: 'PolySequencerActions.togglePosition',
            data: {x: 0, y: 1}
        });

        expect(PolySequencerStore.getState().positions).toEqual([
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

    it('handles updating playhead', () => {
        alt.dispatcher.dispatch({
            action: 'PolySequencerActions.updatePlayhead',
            data: 7
        });

        expect(PolySequencerStore.getState().playhead).toBe(7);
    });
});
