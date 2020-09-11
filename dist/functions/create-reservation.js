"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const crawler_1 = require("../crawler");
const crawler = crawler_1.createCrawler({
    debug: config_1.loadBoolean(process.env.DEBUG, false),
    dryRun: config_1.loadBoolean(process.env.DRY_RUN, false),
});
const createReservation = (_req, _res) => {
    crawler.createReservation();
};
exports.default = createReservation;
//# sourceMappingURL=create-reservation.js.map