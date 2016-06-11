import realAlt from '../../src/js/alt';
import {SessionStore} from "../../src/js/stores/SessionStore";
import {SequencerID} from "../../src/js/types/SequencerID";

const alt: any = realAlt; // access dispatcher

const stringsToGrid = function(...strings: string[]) {
    strings = strings.map(s => s.replace(/\s+/g, ''));
    expect(strings.length).toBeGreaterThan(0);

    const firstString = strings[0];
    expect(strings.every(s => s.length === firstString.length)).toBe(true);

    const result = [];

    for (let x = 0; x < firstString.length; x++) {
        const col = [];
        result.push(col);
        for (let y = 0; y < strings.length; y++) {
            col.push(strings[y][x] === '1' ? true : false);
        }
    }

    return result;
};

describe('SessionStore', () => {
    afterEach(() => {
        realAlt.recycle();
    });

    it('has a default state', () => {
        const sequencers = {};

        sequencers[SequencerID.Poly] = {
            id: SequencerID.Poly,
            active: true,
            width: 16,
            height: 5,
            playhead: 0,
            grid: stringsToGrid(
                '0000 0000 0000 0000',
                '0000 0000 0000 0000',
                '0000 0000 0000 0000',
                '0000 0000 0000 0000',
                '0000 0000 0000 0000')
        };

        sequencers[SequencerID.Drum] = {
            id: SequencerID.Drum,
            active: true,
            width: 16,
            height: 1,
            playhead: 0,
            grid: stringsToGrid(
                '0000 0000 0000 0000')
        };

        expect(SessionStore.getState()).toEqual({
            sequencers: sequencers
        });
    });

    it('should toggle active sequencer state', () => {
        alt.dispatcher.dispatch({ action: 'SessionActions.toggleSequencer', data: SequencerID.Drum });
        expect(SessionStore.getState().sequencers[SequencerID.Drum].active).toBe(false);
    });

    it('should toggle active sequencer state back on if sequencer is off', () => {
        alt.dispatcher.dispatch({ action: 'SessionActions.toggleSequencer', data: SequencerID.Drum });
        alt.dispatcher.dispatch({ action: 'SessionActions.toggleSequencer', data: SequencerID.Drum });

        expect(SessionStore.getState().sequencers[SequencerID.Drum].active).toBe(true);
    });

    it('should reset playhead when setting sequencer to not active', () => {
        alt.dispatcher.dispatch({ action: 'SessionActions.updateSequencerPlayhead', data: { id: SequencerID.Drum, position: 7 } });
        alt.dispatcher.dispatch({ action: 'SessionActions.toggleSequencer', data: SequencerID.Drum });

        expect(SessionStore.getState().sequencers[SequencerID.Drum].playhead).toBe(0);
    });

    it('should update sequencer playhead', () => {
        alt.dispatcher.dispatch({ action: 'SessionActions.updateSequencerPlayhead', data: { id: SequencerID.Poly, position: 7 } });

        expect(SessionStore.getState().sequencers[SequencerID.Poly].playhead).toBe(7);
    });

    it('should update sequencer grid', () => {
        alt.dispatcher.dispatch({ action: 'SessionActions.toggleSequencerPosition', data: { id: SequencerID.Poly, x: 0, y: 0 } });

        expect(SessionStore.getState().sequencers[SequencerID.Poly].grid).toEqual(stringsToGrid(
            '1000 0000 0000 0000',
            '0000 0000 0000 0000',
            '0000 0000 0000 0000',
            '0000 0000 0000 0000',
            '0000 0000 0000 0000'));
    });

    it('should update sequencer grid where x nonzero', () => {
        alt.dispatcher.dispatch({ action: 'SessionActions.toggleSequencerPosition', data: { id: SequencerID.Poly, x: 3, y: 0 } });

        expect(SessionStore.getState().sequencers[SequencerID.Poly].grid).toEqual(stringsToGrid(
            '0001 0000 0000 0000',
            '0000 0000 0000 0000',
            '0000 0000 0000 0000',
            '0000 0000 0000 0000',
            '0000 0000 0000 0000'));
    });

    it('should update sequencer grid where y nonzero', () => {
        alt.dispatcher.dispatch({ action: 'SessionActions.toggleSequencerPosition', data: { id: SequencerID.Poly, x: 0, y: 3 } });

        expect(SessionStore.getState().sequencers[SequencerID.Poly].grid).toEqual(stringsToGrid(
            '0000 0000 0000 0000',
            '0000 0000 0000 0000',
            '0000 0000 0000 0000',
            '1000 0000 0000 0000',
            '0000 0000 0000 0000'));
    });

    it('should update sequencer grid over multiple dispatches', () => {
        alt.dispatcher.dispatch({ action: 'SessionActions.toggleSequencerPosition', data: { id: SequencerID.Poly, x: 0, y: 3 } });
        alt.dispatcher.dispatch({ action: 'SessionActions.toggleSequencerPosition', data: { id: SequencerID.Poly, x: 1, y: 1 } });
        alt.dispatcher.dispatch({ action: 'SessionActions.toggleSequencerPosition', data: { id: SequencerID.Poly, x: 3, y: 0 } });

        expect(SessionStore.getState().sequencers[SequencerID.Poly].grid).toEqual(stringsToGrid(
            '0001 0000 0000 0000',
            '0100 0000 0000 0000',
            '0000 0000 0000 0000',
            '1000 0000 0000 0000',
            '0000 0000 0000 0000'));
    });
});
