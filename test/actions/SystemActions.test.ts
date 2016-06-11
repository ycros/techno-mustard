import SystemActions from '../../src/js/actions/SystemActions';
import realAlt from '../../src/js/alt';

const alt: any = realAlt; // access dispatcher

describe('SystemActions', () => {
    beforeEach(() => {
        spyOn(alt.dispatcher, 'dispatch');
    });

    it('should dispatch sequencerEngine on setSequencerEngine', () => {
        const myEngine = {};
        SystemActions.setSequencerEngine(myEngine);

        expect(alt.dispatcher.dispatch).toHaveBeenCalledTimes(1);
        const arg = alt.dispatcher.dispatch.calls.argsFor(0)[0];

        expect(arg.action).toBe('SystemActions.setSequencerEngine');
        expect(arg.data).toBe(myEngine);
    });

});
