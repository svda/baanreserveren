"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCrawler = void 0;
var puppeteer_1 = __importDefault(require("puppeteer"));
var config_1 = require("../config");
var helpers_1 = require("../helpers");
function createCrawler(options) {
    console.log('Baanreserveren crawler initialized.');
    function createReservation(reservationOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var browser, page, _a, day, month, year, rowSelector, row, cells, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 25, , 26]);
                        return [4 /*yield*/, puppeteer_1.default.launch({
                                headless: options.debug ? false : true,
                            })];
                    case 1:
                        browser = _b.sent();
                        return [4 /*yield*/, browser.newPage()];
                    case 2:
                        page = _b.sent();
                        return [4 /*yield*/, page.setViewport({
                                width: 1024,
                                height: 768,
                                deviceScaleFactor: 1,
                            })];
                    case 3:
                        _b.sent();
                        page.on('console', function (msg) { return console.log("Crawler:", msg.text()); });
                        return [4 /*yield*/, page.goto(config_1.config.baanreserveren.url)
                            // Log in
                        ];
                    case 4:
                        _b.sent();
                        // Log in
                        return [4 /*yield*/, page.type('#login-form input[name=username]', config_1.config.baanreserveren.username)];
                    case 5:
                        // Log in
                        _b.sent();
                        return [4 /*yield*/, page.type('#login-form input[name=password]', config_1.config.baanreserveren.password)];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, page.click('#login-form button')
                            // Navigate to next week
                        ];
                    case 7:
                        _b.sent();
                        // Navigate to next week
                        return [4 /*yield*/, page.waitForSelector('#tbl_calendar')];
                    case 8:
                        // Navigate to next week
                        _b.sent();
                        _a = helpers_1.getReservationDate(), day = _a.day, month = _a.month, year = _a.year;
                        return [4 /*yield*/, page.click("#cal_" + year + "_" + month + "_" + day + " > a.cal-link")
                            //await delay(500)
                        ];
                    case 9:
                        _b.sent();
                        rowSelector = ".matrix tr[data-time=\"" + ((reservationOptions === null || reservationOptions === void 0 ? void 0 : reservationOptions.timeslot) || config_1.config.reservation.defaultTimeslot) + "\"]";
                        return [4 /*yield*/, page.waitForSelector(rowSelector)
                            // Select available timeslot
                        ];
                    case 10:
                        _b.sent();
                        return [4 /*yield*/, page.$(rowSelector)];
                    case 11:
                        row = _b.sent();
                        return [4 /*yield*/, (row === null || row === void 0 ? void 0 : row.$$('td[type="free"]'))];
                    case 12:
                        cells = _b.sent();
                        if (!(cells && cells.length)) return [3 /*break*/, 14];
                        return [4 /*yield*/, cells[0].click()];
                    case 13:
                        _b.sent();
                        _b.label = 14;
                    case 14: 
                    // await delay(500)
                    // Select guest and submit
                    return [4 /*yield*/, page.waitForSelector('.lightbox form select[name="players[2]"]')];
                    case 15:
                        // await delay(500)
                        // Select guest and submit
                        _b.sent();
                        return [4 /*yield*/, page.select('.lightbox form select[name="players[2]"]', '-1')];
                    case 16:
                        _b.sent();
                        return [4 /*yield*/, page.click('#__make_submit')];
                    case 17:
                        _b.sent();
                        return [4 /*yield*/, helpers_1.delay(500)
                            // Confirm
                        ];
                    case 18:
                        _b.sent();
                        if (!!options.dryRun) return [3 /*break*/, 20];
                        return [4 /*yield*/, page.click('#__make_submit2')];
                    case 19:
                        _b.sent();
                        _b.label = 20;
                    case 20:
                        if (!options.debug) return [3 /*break*/, 22];
                        return [4 /*yield*/, page.screenshot({ path: 'example.png' })];
                    case 21:
                        _b.sent();
                        _b.label = 22;
                    case 22:
                        if (!!options.debug) return [3 /*break*/, 24];
                        return [4 /*yield*/, browser.close()];
                    case 23:
                        _b.sent();
                        _b.label = 24;
                    case 24:
                        console.log('Reservation made successfully.');
                        return [3 /*break*/, 26];
                    case 25:
                        error_1 = _b.sent();
                        console.error(error_1.message);
                        return [3 /*break*/, 26];
                    case 26: return [2 /*return*/];
                }
            });
        });
    }
    return {
        createReservation: createReservation,
    };
}
exports.createCrawler = createCrawler;
//# sourceMappingURL=index.js.map