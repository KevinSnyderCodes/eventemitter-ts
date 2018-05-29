/// <reference types="node" />
import { EventEmitter } from 'events';
/**
 * An `EventEmitter` with strictly typed events.
 *
 * `T` is an object whose keys are the event name and whose values
 * are the argument type passed to the respective event type listener(s).
 */
export declare class TypedEventEmitter<T> extends EventEmitter {
    addListener<K extends keyof T>(event: K, listener: (arg: T[K]) => void): this;
    on<K extends keyof T>(event: K, listener: (arg: T[K]) => void): this;
    once<K extends keyof T>(event: K, listener: (arg: T[K]) => void): this;
    prependListener<K extends keyof T>(event: K, listener: (arg: T[K]) => void): this;
    prependOnceListener<K extends keyof T>(event: K, listener: (arg: T[K]) => void): this;
    removeListener<K extends keyof T>(event: K, listener: (arg: T[K]) => void): this;
    removeAllListeners<K extends keyof T>(event?: K): this;
    listeners<K extends keyof T>(event: K): Function[];
    rawListeners<K extends keyof T>(event: K): Function[];
    eventNames<K extends keyof T>(): Array<K>;
    listenerCount<K extends keyof T>(type: K): number;
    emit<K extends keyof T>(event: K, arg: T[K]): boolean;
}
/**
 * A `TypedEventEmitter` class that can only emit events from within the class.
 *
 * `EventEmitter#emit` does nothing and always returns false. Use `ProtectedEventEmitter#protectedEmit`
 * to emit events from within the class
 */
export declare class ProtectedEventEmitter<T> extends TypedEventEmitter<T> {
    /**
     * @deprecated _NOP_, use `PrivateEventEmitter#privateEmit` to emit events from
     */
    emit<K extends keyof T>(event: K, arg: T[K]): boolean;
    protected protectedEmit<K extends keyof T>(event: K, arg: T[K]): boolean;
}
