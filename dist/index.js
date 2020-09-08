"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crawler_1 = require("./crawler");
var task_runner_1 = require("./task-runner");
var config_1 = require("./config");
var crawler = crawler_1.createCrawler({
    debug: config_1.loadBoolean(process.env.DEBUG, false),
    dryRun: config_1.loadBoolean(process.env.DRY_RUN, false),
});
var app = task_runner_1.createTaskRunner({
    crawler: crawler,
});
app.run();
//# sourceMappingURL=index.js.map