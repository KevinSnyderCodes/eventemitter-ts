
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
