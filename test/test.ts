
import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
import {
    TypedEventEmitter,
    ProtectedEventEmitter    
} from '../lib';

interface Events {
    'foo': number;
    'bar': string;
}

class TestProtectedEventEmitter extends ProtectedEventEmitter<Events> {
    constructor() {
        super();
    }
    callProtectedEmit() {
        this.protectedEmit('foo', 123);
    }
}

function emitTestEvents(ee: TypedEventEmitter<Events>) {
    ee.emit('foo', 123);
    ee.emit('bar', 'test');
}

describe('TypedEventEmitter', () => {
    const ee = new TypedEventEmitter<Events>();
    const fooListener = sinon.spy();
    const barListener = sinon.spy();

    describe('#removeAllListeners', () => {
        beforeEach(() => {
            ee.on('foo', fooListener);
            ee.on('bar', barListener);
        });

        it('should remove all listeners for the specified event', () => {
            ee.removeAllListeners('foo');
            emitTestEvents(ee);
            expect(fooListener.called).to.be.false;
            expect(barListener.calledOnce).to.be.true;
        });
        it('should remove all listeners if called with no arguments', () => {
            ee.removeAllListeners();
            emitTestEvents(ee);
            expect(fooListener.called).to.be.false;
            expect(barListener.called).to.be.false;
        });

        afterEach(() => {
            fooListener.resetHistory();
            barListener.resetHistory();
        })
    });
});

describe('ProtectedEventEmitter', () => {
    const ee = new TestProtectedEventEmitter();
    const listener = sinon.spy();
    ee.on('foo', listener);

    describe('#emit', () => {
        let res: boolean;

        before(() => {
            res = ee.emit('foo', 123);
        });

        it('should do nothing', () => {
            expect(listener.called).to.be.false;
        });
        it('should return false', () => {
            expect(res).to.be.false;
        });

        after(() => {
            listener.resetHistory();
        });
    });

    describe('#protectedEmit', () => {
        before(() => {
            ee.callProtectedEmit();
        });

        it('should call listener attached to respective event', () => {
            expect(listener.called).to.be.true;
        });

        after(() => {
            listener.resetHistory();
        });
    });
});
