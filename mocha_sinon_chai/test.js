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

    cb();
    cb();
    cb(3);

    assert(cb.calledThrice, '`cb` should only be called 3 times');
    assert.equal(cb.callCount, 3, '`cb` should only be called 3 times');

    // the last call of spy function
    // equal to:
    // let lastCall = cb.getCall(3);
    let lastCall = cb.lastCall;
    assert.equal(lastCall.args[0], 3, 'received args when called');

    // calledOn - has been called with
    assert.isFalse(cb.calledOn(2), 'Has been called with');
  });

  it('spy: spy existing functions/methods', function () {
    const str = 'my function';

    function myFun() {
      return str;
    }

    let spy = sandbox.spy(myFun);
    spy();

    const method = sandbox.spy(Array.prototype, 'join');
    const result = str.split(' ').join('_');

    assert(spy.returned(str), `Spy should returned : ${str}`);
    assert.equal(method.returnValues[0], result, `Check returned value`);
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


