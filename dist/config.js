"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.loadString = exports.loadNumber = exports.loadBoolean = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function loadBoolean(variable, defaultValue) {
    switch (variable === null || variable === void 0 ? void 0 : variable.toLowerCase()) {
        case 'true':
        case 'yes':
        case '1':
            return true;
        case 'false':
        case 'no':
        case '0':
            return false;
        default:
            return defaultValue;
    }
}
exports.loadBoolean = loadBoolean;
function loadNumber(variable, defaultValue) {
    return variable && !isNaN(Number(variable)) ? Number(variable) : defaultValue;
}
exports.loadNumber = loadNumber;
function loadString(variable, defaultValue = '') {
    return (variable || defaultValue).replace(/\\n/g, '\n');
}
exports.loadString = loadString;
exports.config = {
    baanreserveren: {
        url: 'https://squashcity.baanreserveren.nl',
        username: loadString(process.env.BAANRESERVEREN_USERNAME),
        password: loadString(process.env.BAANRESERVEREN_PASSWORD),
    },
    reservation: {
        defaultTimeslot: '18:15'
    }
};
//# sourceMappingURL=config.js.map