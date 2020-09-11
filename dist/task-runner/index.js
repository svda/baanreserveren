"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskRunner = void 0;
const cron_1 = require("cron");
const CRON_SCHEDULE = '0 0 7 * * WED';
const CRON_TIMEZONE = 'Europe/Amsterdam';
function createTaskRunner(options) {
    const { crawler } = options;
    const job = new cron_1.CronJob(CRON_SCHEDULE, async () => {
        await crawler.createReservation();
    }, null, true, CRON_TIMEZONE);
    function run() {
        job.start();
        console.log('Task runner started.');
    }
    return {
        run,
    };
}
exports.createTaskRunner = createTaskRunner;
//# sourceMappingURL=index.js.map