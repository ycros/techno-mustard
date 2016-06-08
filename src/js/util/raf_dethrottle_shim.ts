
export default function shimRequestAnimationFrame() {
    // AltspaceVR has a broken requestAnimationFrame implementation, that only accepts ONE callback
    // so we shim our own implementation over it

    const originalRequestAnimationFrame = window.requestAnimationFrame;
    const originalCancelAnimationFrame = window.cancelAnimationFrame;

    var callbacks = [];

    const requestAnimationFrameCallback = function (time) {
        const currentCallbacks = callbacks;
        callbacks = [];

        for (let i = 0; i < currentCallbacks.length; i++) {
            currentCallbacks[i](time);
        }
    };

    window.requestAnimationFrame = function(callback) {
        if (callbacks.length === 0) {
            originalRequestAnimationFrame(requestAnimationFrameCallback);
        }

        if (callbacks.indexOf(callback) === -1) {
            callbacks.push(callback);
        }

        return 0;
    };

    window.cancelAnimationFrame = function(handle: number) {
        // not implemented
    };
}
