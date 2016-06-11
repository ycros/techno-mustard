import {PolySequencerActions} from '../../src/js/actions/SequencerActions';
import realAlt from '../../src/js/alt';

const alt: any = realAlt; // access dispatcher

describe('SequencerActions', () => {
    beforeEach(() => {
        spyOn(alt.dispatcher, 'dispatch');
    });

    it('should dispatch position on togglePosition', () => {
        PolySequencerActions.togglePosition(2, 4);

        expect(alt.dispatcher.dispatch).toHaveBeenCalledTimes(1);
        const arg = alt.dispatcher.dispatch.calls.argsFor(0)[0];

        expect(arg.action).toBe('PolySequencerActions.togglePosition');
        expect(arg.data).toEqual({ x: 2, y: 4 });
    });

    it('should dispatch playhead on updatePlayhead', () => {
        PolySequencerActions.updatePlayhead(7);

        expect(alt.dispatcher.dispatch).toHaveBeenCalledTimes(1);
        const arg = alt.dispatcher.dispatch.calls.argsFor(0)[0];

        expect(arg.action).toBe('PolySequencerActions.updatePlayhead');
        expect(arg.data).toBe(7);
    });

});
