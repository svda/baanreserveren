"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReservationDate = exports.delay = void 0;
function delay(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
exports.delay = delay;
function getReservationDate(daysOffset = 7) {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + daysOffset * 24 * 60 * 60 * 1000);
    const day = nextWeek.getDate();
    const month = nextWeek.getMonth() + 1;
    const year = nextWeek.getFullYear();
    return { day, month, year };
}
exports.getReservationDate = getReservationDate;
//# sourceMappingURL=helpers.js.map