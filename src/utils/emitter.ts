import Mitt from 'mitt';

// @ts-ignore
const emitter = new Mitt();

emitter.$on = emitter.on;
emitter.$off = emitter.off;
emitter.$emit = emitter.emit;

export default emitter;
