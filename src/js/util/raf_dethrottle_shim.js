// import Stats from 'stats.js';

export default function shimRequestAnimationFrame() {
    // const stats = new Stats();
    // document.body.appendChild(stats.dom);

    const originalRequestAnimationFrame = window.requestAnimationFrame;

    var callbacks = [];

    const requestAnimationFrameCallback = function (time) {
        // stats.begin();

        const currentCallbacks = callbacks;
        callbacks = [];

        for (let i = 0; i < currentCallbacks.length; i++) {
            currentCallbacks[i](time);
        }

        // stats.end();
    };

    window.requestAnimationFrame = function(callback) {
        if (callbacks.length === 0) {
            originalRequestAnimationFrame(requestAnimationFrameCallback);
        }

        if (callbacks.indexOf(callback) === -1) {
            callbacks.push(callback);
        }
    };
}
