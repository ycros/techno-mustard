import shim from '../../src/js/util/raf_dethrottle_shim';

describe('raf_dethrottle_shim', () => {
    let requestAnimationFrameSpy;
    let cancelAnimationFrameSpy;

    beforeEach(() => {
        requestAnimationFrameSpy = jasmine.createSpy('requestAnimationFrame');
        cancelAnimationFrameSpy = jasmine.createSpy('cancelAnimationFrame');

        window.requestAnimationFrame = requestAnimationFrameSpy;
        window.cancelAnimationFrame = cancelAnimationFrameSpy;

        shim();
    });

    afterEach(() => {
        window.requestAnimationFrame = null;
        window.cancelAnimationFrame = null;
    });

    it('should not call raf on init', () => {
        expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
    });

    it('should call raf when a callback is registered', () => {
        const myCallback = () => {};

        window.requestAnimationFrame(myCallback);

        expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);
        expect(requestAnimationFrameSpy).toHaveBeenCalledWith(jasmine.any(Function));
    });

    it('should call raf once when more callbacks are registered', () => {
        const myCallback = () => {};
        const myCallback2 = () => {};
        const myCallback3 = () => {};

        window.requestAnimationFrame(myCallback);
        window.requestAnimationFrame(myCallback2);
        window.requestAnimationFrame(myCallback3);

        expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);
        expect(requestAnimationFrameSpy).toHaveBeenCalledWith(jasmine.any(Function));
    });

    it('should return a number', () => {
        expect(window.requestAnimationFrame(() => {})).toEqual(jasmine.any(Number));
    });

    it('should call callbacks when real raf calls back', () => {
        const callback1 = jasmine.createSpy('callback1');
        const callback2 = jasmine.createSpy('callback2');

        window.requestAnimationFrame(callback1);
        window.requestAnimationFrame(callback2);

        const realRafCallback = requestAnimationFrameSpy.calls.first().args[0];
        realRafCallback(12345);

        expect(callback1).toHaveBeenCalledTimes(1);
        expect(callback1).toHaveBeenCalledWith(12345);
        expect(callback2).toHaveBeenCalledTimes(1);
        expect(callback2).toHaveBeenCalledWith(12345);
    });

    it('should support new registrations while calling callbacks', () => {
        const callback = jasmine.createSpy('callback');
        callback.and.callFake(() => {
            window.requestAnimationFrame(callback);
        });

        window.requestAnimationFrame(callback);

        const realRafCallback = requestAnimationFrameSpy.calls.first().args[0];
        requestAnimationFrameSpy.calls.reset();
        realRafCallback(12345);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(12345);
        expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);

        callback.calls.reset();

        requestAnimationFrameSpy.calls.first().args[0](555);

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(555);
    });
});
