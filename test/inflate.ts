const chai = require('chai');
chai.use(require('chai-as-promised'));

import inflate from '../src/inflate/inflate';


const ab = new ArrayBuffer(6);
const unit8 = new Uint8Array(ab);
unit8[0] = 128;
unit8[1] = 6;
unit8[2] = 157;
unit8[3] = 6;
unit8[4] = 75;
unit8[5] = 196;
unit8[6] = 1;

describe('inflate arrayBuffer', () => {
    it('expect return number[]', () => {
        chai.expect(inflate(ab)).to.an.instanceof(Array).deep.equal([ 0x100 + 0x80, -399, -38, 34 ]);
    });
    it('expect test startoffset and read number', () => {
        chai.expect(inflate(ab, 2, 1)).to.an.instanceof(Array).deep.equal([ -399 ]);
    });
});
