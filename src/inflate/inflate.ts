import { isType } from '../ulit';

const inflate = (item: ArrayBuffer, startOffset = 0, num = item.byteLength): number[] => {
    switch (isType(item)) {
        case('[object ArrayBuffer]'):
            return readVarInts(item, startOffset, num);
        default:
            throw new Error(`unhandle type ${isType(item)}`);
    }
};

const decodeVarInt = (num: number): number => {
    return (num >> 1) ^ (~(num & 1) + 1);
};

const readVarInts = (ab: ArrayBuffer, offset: number, num: number): number[] => {
    const ar = new Uint8Array(ab);
    const varInts = [];
    for (let i = 0; i < num; i++) {
        const varInt = [];
        for (let j = offset; j < ar.length; j++) {
            const value = ar[j];
            offset ++;
            if (value >>> 7 === 1) {
                varInt.push(value & 0x7f);
            } else {
                varInt.push(value);
                break;
            }
        }
        if (varInt.length !== 0) {
            let k = 0;
            const data = varInt.reduce((pr, cr) => {
                const j = 2 ** (7 * k) * cr;
                k++;
                return pr + j;
            }, 0);
            varInts.push(decodeVarInt(data));
        }
    }
    return varInts;
};

export default inflate;
export {
    readVarInts,
};
