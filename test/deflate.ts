const chai = require('chai');
chai.use(require('chai-as-promised'));

import deflate from '../src/deflate/deflate';

const testNumber = 0x100 + 0x80;

const testArray = [testNumber, 0x01];

const testStr = 'varints';

describe('deflate number', function() {
    const varInt = deflate(testNumber);
    it('expect return like uintArray', function() {
        chai.expect(varInt).to.an.instanceof(Array).deep.equal([ 128, 6 ]);
    });
});

describe('deflate array', function() {
    const varInt = deflate(testArray);
    it('expect return like uintArray', function() {
        chai.expect(varInt).to.an.instanceof(Array).deep.equal([ 128, 6, 2]);
    });
});

describe('deflate string', function() {
    const varInt = deflate(testStr);
    it('expect return like uintArray', function() {
        chai.expect(varInt).to.an.instanceof(Array).deep.equal([ 236, 1, 194, 1, 228, 1, 210, 1, 220, 1, 232, 1, 230, 1 ]);
    });
});
