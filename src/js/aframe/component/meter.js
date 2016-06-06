import AFRAME from 'aframe';

import SystemStore from '../../stores/SystemStore';

AFRAME.registerComponent('meter', {
    schema: { type: 'string' },

    init() {
        this.meter = null;
        this.updateState(SystemStore.getState());
        SystemStore.listen(this.updateState.bind(this));
    },

    updateState(newState) {
        if (newState.sequencerEngine) {
            this.meter = newState.sequencerEngine.meter;
        }
    },

    tick() {
        if (this.meter) {
            let mesh = this.el.object3DMap['mesh'];
            const level = this.meter.getLevel();
            const clip = this.meter.isClipped();
            var calc = level*22;

            if (calc == 0) {
                calc = 0.01;
            }

            mesh.scale.setY(calc);
            mesh.position.setY(calc/20);

            if (clip) {
                console.log('clip');
                mesh.material.color.set(0xff0000);
            } else {
                mesh.material.color.set(0x0000ff);
            }
        }
    }
});
