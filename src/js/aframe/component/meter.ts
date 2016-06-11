import MeshBasicMaterial = THREE.MeshBasicMaterial;
import {Component, ComponentElement} from "aframe";
import {Session} from "../../audio/Session";

export default function newMeter(session: Session) {
    return {
        schema: {type: 'string'},

        init() {
            this.meter = session.master.meter;
        },

        tick() {
            if (this.meter) {
                let mesh = <THREE.Mesh>this.el.object3DMap['mesh'];
                const level = this.meter.getLevel();
                const clip = this.meter.isClipped();
                let calc = level * 22;

                if (calc === 0) {
                    calc = 0.01;
                }

                mesh.scale.setY(calc);
                mesh.position.setY(calc / 20);

                if (clip) {
                    (<MeshBasicMaterial> mesh.material).color.set(0xff0000);
                } else {
                    (<MeshBasicMaterial> mesh.material).color.set(0x0000ff);
                }
            }
        }
    };
};
