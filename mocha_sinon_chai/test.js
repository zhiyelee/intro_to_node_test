'use strict';
let chai = require('chai');
// http://chaijs.com/guide/styles/#configure
chai.config.includeStack = true;

let assert = chai.assert;
var sinon = require('sinon');

var sandbox;
beforeEach(function () {
  sandbox = sinon.sandbox.create();
})

afterEach(function () {
   sandbox.restore();
})

describe('Sinon: spy', function () {
  it('spy calledOnce', function () {
    var cb = sandbox.spy();

    cb();

    assert(cb.calledOnce, '`cb` should only be called once');
  });

  it('spy callCount etc', function () {
    var cb = sandbox.spy();

    cb({ name: 'tubitv', type: 'video' });
    cb(2, 4);
    cb(3);

    // called times
    assert(cb.calledThrice, '`cb` should only be called 3 times');
    assert.equal(cb.callCount, 3, '`cb` should only be called 3 times');

    // the last call of spy function
    // const lastCall = cb.getCall(3);
    const lastCall = cb.lastCall;
    assert.equal(lastCall.args[0], 3, 'received args when called');

    // check called arguments with calledWith - has been called with
    assert.isBelow(cb.withArgs(3).callCount, 2, 'Called with 3 for one time');
    assert.ok(cb.calledWith(), 'Has been called with undefined');
    assert.ok(cb.calledWith(2), 'Has been called with 2, with other arguments, here 4');
    assert.isFalse(cb.calledWith(4), 'Called with 4');
    assert.notOk(cb.calledWithExactly(2), 'Has been called with undefined');
    assert.notOk(cb.alwaysCalledWith(3), 'Always called with');
    // http://sinonjs.org/docs/#matchers
    assert.ok(cb.calledWithMatch({ type: 'video' }), 'Arguments contain property');
  });

  it('spy: spy existing functions/methods', function () {
    const str = 'my function';

    function myFun() {
      return str;
    }

    let spy = sandbox.spy(myFun);
    spy();

    assert(spy.returned(str), `Spy should returned : ${str}`);

    const split = sandbox.spy(String.prototype, 'split');
    const join = sandbox.spy(Array.prototype, 'join');
    const result = str.split(' ').join('_');

    // check `this` value when function is called
    assert(split.calledOn(str), 'Should have been called with * as this');

    // return values array
    assert.equal(join.returnValues[0], result, `Check returned value`);
  });
});

describe('Sinon: stubs', function () {
  it('stub function', function () {
    const str = 'Rock with stubs';
    const stub = sandbox.stub(String.prototype, 'split');

    const res = str.split(' ');

    assert.equal(res, undefined, 'Stubbed join should return nothing');
  });

  it('stub: custom return value when call with args', function () {
    const str = 'Rock with stubs';
    const STUB_RETURN = 'stub!!';

    const stub = sandbox.stub(String.prototype, 'split');
    stub.withArgs(' ').returns(STUB_RETURN);

    const res = str.split(' ');
    assert.equal(res, STUB_RETURN, 'will get stub return value on args');
  });

});

describe('Fake Timer', function () {

  it('Fake timer and tick', function () {
    const clock = sandbox.useFakeTimers();
    const spy = sandbox.spy();

    setTimeout(spy, 5000);
    clock.tick(4999);
    assert.isFalse(spy.called, 'Have not been called');

    clock.tick(1);
    assert(spy.called, 'Called after tick');
  });

  it('Called order', function () {
    const clock = sandbox.useFakeTimers();
    const spy1 = sandbox.spy();
    const spy2 = sandbox.spy();

    setTimeout(spy1, 50);
    setTimeout(spy2, 30);
    clock.tick(60);

    assert(spy2.calledBefore(spy1), 'Called after tick');
  });
})


