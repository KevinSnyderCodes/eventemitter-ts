import { EventEmitter } from 'events';

/**
 * An `EventEmitter` with strictly typed events.
 * 
 * `T` is an object whose keys are the event name and whose values
 * are the argument type passed to the respective event type listener(s).
 */
export class TypedEventEmitter<T> extends EventEmitter {
    addListener<K extends keyof T>(event: K, listener: (arg: T[K]) => void): this {
        return super.addListener(event, listener);
    }
    on<K extends keyof T>(event: K, listener: (arg: T[K]) => void): this {
        return super.on(event, listener);
    }
    once<K extends keyof T>(event: K, listener: (arg: T[K]) => void): this {
        return super.once(event, listener);
    }
    prependListener<K extends keyof T>(event: K, listener: (arg: T[K]) => void): this {
        return super.prependListener(event, listener);
    }
    prependOnceListener<K extends keyof T>(event: K, listener: (arg: T[K]) => void): this {
        return super.prependOnceListener(event, listener);
    }
    removeListener<K extends keyof T>(event: K, listener: (arg: T[K]) => void): this {
        return super.removeListener(event, listener);
    }
    removeAllListeners<K extends keyof T>(event?: K): this {
        return super.removeAllListeners(event);
    }
    listeners<K extends keyof T>(event: K): Function[] {
        return super.listeners(event);
    }
    rawListeners<K extends keyof T>(event: K): Function[] {
        return super.rawListeners(event);
    }
    eventNames<K extends keyof T>(): Array<K> {
        return super.eventNames() as any;
    }
    listenerCount<K extends keyof T>(type: K): number {
        return super.listenerCount(type);
    }
    emit<K extends keyof T>(event: K, arg: T[K]): boolean {
        return super.emit(event, arg);
    }
}

/**
 * A `TypedEventEmitter` class that can only emit events from within the class.
 * 
 * `EventEmitter#emit` does nothing and always returns false. Use `ProtectedEventEmitter#protectedEmit`
 * to emit events from within the class
 */
export class ProtectedEventEmitter<T> extends TypedEventEmitter<T> {
    /**
     * @deprecated _NOP_, use `PrivateEventEmitter#privateEmit` to emit events from within the class
     */
    emit<K extends keyof T>(event: K, arg: T[K]): boolean {
        return false;
    }
    protected protectedEmit<K extends keyof T>(event: K, arg: T[K]): boolean {
        return super.emit(event, arg);
    }
}
