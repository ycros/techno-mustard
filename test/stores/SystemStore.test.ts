import { SystemStore } from '../../src/js/stores/SystemStore';
import realAlt from '../../src/js/alt';

const alt: any = realAlt; // access dispatcher

describe('SystemStore', () => {
    it('has a default state', () => {
        expect(SystemStore.getState()).toEqual({
            sequencerEngine: null
        });
    });

    it('handles sequencer engine updates', () => {
        alt.dispatcher.dispatch({
            action: 'SystemActions.setSequencerEngine',
            data: 'moo'
        });

        expect(SystemStore.getState().sequencerEngine).toBe('moo');
    });
});
