import { isType } from '../ulit';

const deflate = (item: any): number[] => {
    let ar: any;
    switch (isType(item)) {
        case('[object Number]'):
            return num2Varint(item);
        case('[object String]'):
            ar = [];
            for (let i = 0; i < item.length; i++) {
                ar.push(item.charCodeAt(i));
            }
            return ar2Varints(ar);
        case('[object Int16Array]'):
            ar = new Uint32Array(item.buffer);
            return ar2Varints(ar);
        case('[object Int32Array]'):
            ar = new Uint32Array(item.buffer);
            return ar2Varints(ar);
        case('[object Uint8Array]'):
            ar = new Uint32Array(item.buffer);
            return ar2Varints(ar);
        case('[object Array]'):
            return ar2Varints(item);
        default:
            throw new Error(`unhandle type ${isType(item)}`);
    }
};

const mapEncode = (num: number): number => {
    return (num << 1) ^ (num >> 31);
};

const ar2Varints = (ab: any): number[] => {
    const varInts = [];
    for (let i = 0; i < ab.length; i++) {
        const varInt = num2Varint(ab[i]) as number[];
        varInts.push(...varInt);
    }
    return varInts;
};

const num2Varint = (num: number): number[] => {
    const dist = [];
    let value = mapEncode(num);
    while (value > 128) {
        const byte7 = value & 0x7f | 0x80; // 取后7位并加上首位标识符
        dist.push(byte7);
        value = value >>> 7;
    }
    dist.push(value);
    return dist;
};

export default deflate;
