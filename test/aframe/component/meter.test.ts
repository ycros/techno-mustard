import newMeter from '../../../src/js/aframe/component/meter';
import {SystemStore} from "../../../src/js/stores/SystemStore";
import * as THREE from 'three';

describe('aframe/component/meter maintains state from SystemStore', () => {
    let meter;

    beforeEach(() => {
        meter = newMeter();
    });

    it('should update state from the SystemStore on init', () => {
        const myState = {
            sequencerEngine: {
                meter: 'moo'
            }
        };

        spyOn(SystemStore, 'getState').and.returnValue(myState);

        meter.init();

        expect(meter.meter).toBe('moo');
    });

    it("shouldn't set meter if no sequencerEngine is present", () => {
        const myState = {};

        spyOn(SystemStore, 'getState').and.returnValue(myState);

        meter.init();

        expect(meter.meter).toBeNull();
    });

    it("should listen to store state changes", () => {
        spyOn(SystemStore, 'listen');

        meter.init();

        expect(SystemStore.listen).toHaveBeenCalledTimes(1);
    });

    it("should update state when store state changes", () => {
        const initialState = {
            sequencerEngine: { meter: 'foo' }
        };
        const newState = {
            sequencerEngine: { meter: 'bar' }
        };

        spyOn(SystemStore, 'getState').and.returnValue(initialState);
        const listenSpy = spyOn(SystemStore, 'listen');

        meter.init();

        expect(meter.meter).toBe('foo');

        listenSpy.calls.argsFor(0)[0](newState);

        expect(meter.meter).toBe('bar');
    });
});

describe('aframe/component/meter renders meter on tick', () => {
    let meter;
    let mesh;
    let toneMeter;

    beforeEach(() => {
        meter = newMeter();
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
