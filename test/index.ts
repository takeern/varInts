const chai = require('chai');
chai.use(require('chai-as-promised'));

import varInts from '../src/index';

const testNumber = 0x100 + 0x80;

describe('deflate then inflate', () => {
    it('deflate and inflate number should no change', () => {
        const ar = varInts.deflate(testNumber);
        const ab = new ArrayBuffer(ar.length);
        const view = new Uint8Array(ab);
        ar.map((item: number, i: number) => {
            view[i] = item;
        });
        chai.expect(varInts.inflate(ab)).to.be.deep.equal([0x100 + 0x80]);
    });
})