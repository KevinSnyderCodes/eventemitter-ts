/// <reference types="node" />
import { EventEmitter } from 'events';
export interface IValidEvents {
    [x: string]: any;
}
/**
 * An `EventEmitter` with strictly typed events.
 *
 * `T` is an object whose keys are the event name and whose values
 * are the argument type passed to the respective event type listener(s).
 */
export declare class TypedEventEmitter<T> extends EventEmitter {
    addListener<K extends Extract<keyof T, string | symbol>>(event: K, listener: (arg: T[K]) => void): this;
    on<K extends Extract<keyof T, string>>(event: K, listener: (arg: T[K]) => void): this;
    once<K extends Extract<keyof T, string>>(event: K, listener: (arg: T[K]) => void): this;
    prependListener<K extends Extract<keyof T, string>>(event: K, listener: (arg: T[K]) => void): this;
    prependOnceListener<K extends Extract<keyof T, string>>(event: K, listener: (arg: T[K]) => void): this;
    removeListener<K extends Extract<keyof T, string>>(event: K, listener: (arg: T[K]) => void): this;
    removeAllListeners<K extends Extract<keyof T, string>>(event?: K): this;
    listeners<K extends Extract<keyof T, string>>(event: K): Function[];
    rawListeners<K extends Extract<keyof T, string>>(event: K): Function[];
    eventNames<K extends Extract<keyof T, string>>(): Array<K>;
    listenerCount<K extends Extract<keyof T, string>>(type: K): number;
    emit<K extends Extract<keyof T, string>>(event: K, arg: T[K]): boolean;
}
/**
 * A `TypedEventEmitter` class that can only emit events from within the class.
 *
 * `EventEmitter#emit` does nothing and always returns false. Use `ProtectedEventEmitter#protectedEmit`
 * to emit events from within the class
 */
export declare class ProtectedEventEmitter<T> extends TypedEventEmitter<T> {
    /**
     * @deprecated _NOP_, use `PrivateEventEmitter#privateEmit` to emit events from within the class
     */
    emit<K extends Extract<keyof T, string>>(event: K, arg: T[K]): boolean;
    protected protectedEmit<K extends Extract<keyof T, string>>(event: K, arg: T[K]): boolean;
}
