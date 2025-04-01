/**
 * Add TextEncoder and TextDecoder to the global scope for Node.js environments
 * This is needed for MongoDB tests
 */

const { TextEncoder, TextDecoder } = require("util");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
