"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
/**
 * An `EventEmitter` with strictly typed events.
 *
 * `T` is an object whose keys are the event name and whose values
 * are the argument type passed to the respective event type listener(s).
 */
var TypedEventEmitter = /** @class */ (function (_super) {
    __extends(TypedEventEmitter, _super);
    function TypedEventEmitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TypedEventEmitter.prototype.addListener = function (event, listener) {
        return _super.prototype.addListener.call(this, event, listener);
    };
    TypedEventEmitter.prototype.on = function (event, listener) {
        return _super.prototype.on.call(this, event, listener);
    };
    TypedEventEmitter.prototype.once = function (event, listener) {
        return _super.prototype.once.call(this, event, listener);
    };
    TypedEventEmitter.prototype.prependListener = function (event, listener) {
        return _super.prototype.prependListener.call(this, event, listener);
    };
    TypedEventEmitter.prototype.prependOnceListener = function (event, listener) {
        return _super.prototype.prependOnceListener.call(this, event, listener);
    };
    TypedEventEmitter.prototype.removeListener = function (event, listener) {
        return _super.prototype.removeListener.call(this, event, listener);
    };
    TypedEventEmitter.prototype.removeAllListeners = function (event) {
        return _super.prototype.removeAllListeners.call(this, event);
    };
    TypedEventEmitter.prototype.listeners = function (event) {
        return _super.prototype.listeners.call(this, event);
    };
    TypedEventEmitter.prototype.rawListeners = function (event) {
        return _super.prototype.rawListeners.call(this, event);
    };
    TypedEventEmitter.prototype.eventNames = function () {
        return _super.prototype.eventNames.call(this);
    };
    TypedEventEmitter.prototype.listenerCount = function (type) {
        return _super.prototype.listenerCount.call(this, type);
    };
    TypedEventEmitter.prototype.emit = function (event, arg) {
        return _super.prototype.emit.call(this, event, arg);
    };
    return TypedEventEmitter;
}(events_1.EventEmitter));
exports.TypedEventEmitter = TypedEventEmitter;
/**
 * A `TypedEventEmitter` class that can only emit events from within the class.
 *
 * `EventEmitter#emit` does nothing and always returns false. Use `ProtectedEventEmitter#protectedEmit`
 * to emit events from within the class
 */
var ProtectedEventEmitter = /** @class */ (function (_super) {
    __extends(ProtectedEventEmitter, _super);
    function ProtectedEventEmitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @deprecated _NOP_, use `PrivateEventEmitter#privateEmit` to emit events from
     */
    ProtectedEventEmitter.prototype.emit = function (event, arg) {
        return false;
    };
    ProtectedEventEmitter.prototype.protectedEmit = function (event, arg) {
        return _super.prototype.emit.call(this, event, arg);
    };
    return ProtectedEventEmitter;
}(TypedEventEmitter));
exports.ProtectedEventEmitter = ProtectedEventEmitter;
