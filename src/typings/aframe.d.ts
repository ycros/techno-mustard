declare module 'aframe' {
    interface Component {
        schema: any;

        init?: () => void;
        update?: () => void;
        remove?: () => void;
        tick?: () => void;
        play?: () => void;
        pause?: () => void;
    }

    export function registerComponent(name: string, componentDefinition: {}): void;
}