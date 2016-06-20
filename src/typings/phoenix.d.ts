
declare module 'phoenix' {

    interface Push {
        receive(type: string, callback: (data: any) => void): Push;
        receive(type: 'ok', callback: (message: any) => void): Push;
        receive(type: 'error', callback: (reasons: any) => void): Push;
        receive(type: 'timeout', callback: () => void): Push;
    }

    interface Channel {
        on(event: string, callback: (message: any) => void): void;
        off(event: string): void;

        push(event: string, payload: any, timeout?: number): Push;
        join(timeout?: number): Push;
        leave(timeout?: number): Push;

        onError(callback: (reason: any) => void);
        onClose(callback: () => void);
    }


    export class Socket {
        constructor(endpoint: string, options?: any);

        channel(topic: string, chanParams?: any): Channel;
        connect(): void;

        onOpen(callback: () => void);
        onClose(callback: (event: any) => void);
        onError(callback: (error: any) => void);
        onMessage(callback: (message: any) => void);
    }

}

