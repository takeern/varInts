const isType = (obj: any) => Object.prototype.toString.apply(obj);

const jsdev = () => typeof(window) === undefined;
export {
    isType,
};
