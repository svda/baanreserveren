"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var crawler_1 = require("../crawler");
var createReservation = function (_req, _res) {
    var crawler = crawler_1.createCrawler({
        debug: config_1.loadBoolean(process.env.DEBUG, false),
        dryRun: config_1.loadBoolean(process.env.DRY_RUN, false),
    });
    crawler.createReservation();
};
exports.default = createReservation;
//# sourceMappingURL=create-reservation.js.map