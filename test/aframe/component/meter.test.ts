import * as THREE from 'three';

import {Session} from "../../../src/js/audio/Session";

import newMeter from '../../../src/js/aframe/component/meter';

describe('aframe/component/meter init', () => {
    it("should get meter from the session's master", () => {
        const toneMeter = 'moo';
        const meter: any = newMeter(<Session>{
            master: {
                meter: toneMeter
            }
        });

        expect(meter.meter).toBeUndefined('assumption');

        meter.init();

        expect(meter.meter).toBe(toneMeter);
    });
});

describe('aframe/component/meter renders meter on tick', () => {
    let meter;
    let mesh;
    let toneMeter;

    beforeEach(() => {
        meter = newMeter(<Session>{});
        mesh = new THREE.Mesh();
        toneMeter = {
            getLevel() { return 0; },
            isClipped() { return false; }
        };

        meter.el = {
            object3DMap: {
                mesh: mesh
            }
        };
        meter.meter = toneMeter;
    });

    it('test initial state expectations', () => {
        expect(mesh.scale).toEqual(new THREE.Vector3(1, 1, 1));
        expect(mesh.position).toEqual(new THREE.Vector3(0, 0, 0));
    });

    it('changes mesh height according to meter level, when level 0', () => {
        spyOn(toneMeter, 'getLevel').and.returnValue(0);

        meter.tick();

        expect(mesh.scale).toEqual(new THREE.Vector3(1, 0.01, 1));
        expect(mesh.position).toEqual(new THREE.Vector3(0, 0.0005, 0));
    });

    it('changes mesh height according to meter level, when level 1', () => {
        spyOn(toneMeter, 'getLevel').and.returnValue(1);

        meter.tick();

        expect(mesh.scale).toEqual(new THREE.Vector3(1, 22, 1));
        expect(mesh.position).toEqual(new THREE.Vector3(0, 1.1, 0));
    });

    it("changes mesh's meshbasicmaterial's color when not clipping", () => {
        meter.tick();

        expect(mesh.material.color.getHex()).toEqual(0x0000ff);
    });

    it("changes mesh's meshbasicmaterial's color when clipping", () => {
        spyOn(toneMeter, 'isClipped').and.returnValue(true);

        meter.tick();

        expect(mesh.material.color.getHex()).toEqual(0xff0000);
    });
});
