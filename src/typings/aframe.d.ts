declare module 'aframe' {
    interface Object3DMap {
        [key: string]: THREE.Object3D;
    }

    interface ComponentElement extends Element {
        object3D: THREE.Group;
        object3DMap: Object3DMap;
    }

    interface Component {
        schema: any;

        init?: () => void;
        update?: () => void;
        remove?: () => void;
        tick?: () => void;
        play?: () => void;
        pause?: () => void;

        el: ComponentElement;
    }

    export function registerComponent(name: string, componentDefinition: {}): void;
}
