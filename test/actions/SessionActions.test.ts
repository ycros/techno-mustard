
import realAlt from '../../src/js/alt';
import {SessionActions} from "../../src/js/actions/SessionActions";
import {SequencerID} from "../../src/js/types/SequencerID";

const alt: any = realAlt; // access dispatcher

describe('SequencerActions', () => {
    beforeEach(() => {
        spyOn(alt.dispatcher, 'dispatch');
    });

    it('should dispatch on toggleSequencer', () => {
        SessionActions.toggleSequencer(SequencerID.Poly);

        expect(alt.dispatcher.dispatch).toHaveBeenCalledTimes(1);
        const arg = alt.dispatcher.dispatch.calls.argsFor(0)[0];

        expect(arg.action).toBe('SessionActions.toggleSequencer');
        expect(arg.data).toEqual({ id: SequencerID.Poly });
    });

    it('should dispatch on toggleSequencerPosition', () => {
        SessionActions.toggleSequencerPosition(SequencerID.Poly, 3, 4);

        expect(alt.dispatcher.dispatch).toHaveBeenCalledTimes(1);
        const arg = alt.dispatcher.dispatch.calls.argsFor(0)[0];

        expect(arg.action).toBe('SessionActions.toggleSequencerPosition');
        expect(arg.data).toEqual({ id: SequencerID.Poly, x: 3, y: 4 });
    });

    it('should dispatch on updateSequencerPlayhead', () => {
        SessionActions.updateSequencerPlayhead(SequencerID.Poly, 7);

        expect(alt.dispatcher.dispatch).toHaveBeenCalledTimes(1);
        const arg = alt.dispatcher.dispatch.calls.argsFor(0)[0];

        expect(arg.action).toBe('SessionActions.updateSequencerPlayhead');
        expect(arg.data).toEqual({ id: SequencerID.Poly, position: 7 });
    });

});
