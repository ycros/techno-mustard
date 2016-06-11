import SequencerActions from '../../src/js/actions/SequencerActions';
import realAlt from '../../src/js/alt';

const alt: any = realAlt; // access dispatcher

describe('SequencerActions', () => {
    beforeEach(() => {
        spyOn(alt.dispatcher, 'dispatch');
    });

    it('should dispatch position on togglePosition', () => {
        SequencerActions.togglePosition(2, 4);

        expect(alt.dispatcher.dispatch).toHaveBeenCalledTimes(1);
        const arg = alt.dispatcher.dispatch.calls.argsFor(0)[0];

        expect(arg.action).toBe('SequencerActions.togglePosition');
        expect(arg.data).toEqual({ x: 2, y: 4 });
    });

    it('should dispatch playhead on updatePlayhead', () => {
        SequencerActions.updatePlayhead(7);

        expect(alt.dispatcher.dispatch).toHaveBeenCalledTimes(1);
        const arg = alt.dispatcher.dispatch.calls.argsFor(0)[0];

        expect(arg.action).toBe('SequencerActions.updatePlayhead');
        expect(arg.data).toBe(7);
    });

    it('should dispatch true on toggleDrums', () => {
        SequencerActions.toggleDrums();

        expect(alt.dispatcher.dispatch).toHaveBeenCalledTimes(1);
        const arg = alt.dispatcher.dispatch.calls.argsFor(0)[0];

        expect(arg.action).toBe('SequencerActions.toggleDrums');
        expect(arg.data).toBe(true);
    });


});
