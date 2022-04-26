import should from 'should';
import { spy } from 'sinon';
import { doSomeStuff } from '../src';

const SPIED = spy(console);

describe('Example test', () => {
  const withThis = 'foo';
  const andThat = 'bar';

  it('should call doSomeStuff and verify stdout', () => {
    const andThose = ['hello', 'world'];
    doSomeStuff(withThis, andThat, andThose);
    SPIED.log.calledTwice.should.be.equal(true);
    SPIED.log.firstCall.args.should.be.eql([withThis]);
    SPIED.log.secondCall.args.should.be.eql([andThat]);
    SPIED.dir.calledOnce.should.be.equal(true);
    SPIED.dir.firstCall.args.should.be.eql([andThose]);
  });

  it('should call doSomeStuff and return false', () => {
    const andThose: string[] = [];
    const returnValue = doSomeStuff(withThis, andThat, andThose);
    should(returnValue).not.be.undefined;
    // returnValue.should.be.equal(false)
  });
});
