"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReservationDate = exports.delay = void 0;
function delay(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
exports.delay = delay;
function getReservationDate(daysOffset) {
    if (daysOffset === void 0) { daysOffset = 7; }
    var today = new Date();
    var nextWeek = new Date(today.getTime() + daysOffset * 24 * 60 * 60 * 1000);
    var day = nextWeek.getDate();
    var month = nextWeek.getMonth() + 1;
    var year = nextWeek.getFullYear();
    return { day: day, month: month, year: year };
}
exports.getReservationDate = getReservationDate;
//# sourceMappingURL=helpers.js.map