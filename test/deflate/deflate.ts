const chai = require('chai');
chai.use(require('chai-as-promised'));

import deflate from '../src/deflate/deflate';

const testNumber = 0x100 + 0x80;

describe('deflate should return like uint8array', function() {
    const varInt = deflate(testNumber);
    chai.expect(varInt).to.an.instanceof(Array).equal([ 0, 6 ]);
});