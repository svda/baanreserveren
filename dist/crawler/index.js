"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCrawler = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const config_1 = require("../config");
const helpers_1 = require("../helpers");
function createCrawler(options) {
    console.log('Baanreserveren crawler initialized.');
    async function createReservation(reservationOptions) {
        try {
            const browser = await puppeteer_1.default.launch({
                headless: options.debug ? false : true,
            });
            const page = await browser.newPage();
            await page.setViewport({
                width: 1024,
                height: 768,
                deviceScaleFactor: 1,
            });
            page.on('console', msg => console.log("Crawler:", msg.text()));
            await page.goto(config_1.config.baanreserveren.url);
            // Log in
            await page.type('#login-form input[name=username]', config_1.config.baanreserveren.username);
            await page.type('#login-form input[name=password]', config_1.config.baanreserveren.password);
            await page.click('#login-form button');
            // Navigate to next week
            const { day, month, year } = helpers_1.getReservationDate();
            const daySelector = `#cal_${year}_${month}_${day} > a.cal-link`;
            await page.waitForSelector(daySelector);
            await page.click(daySelector);
            // Select an available timeslot at the preferred time
            const timeslot = (reservationOptions === null || reservationOptions === void 0 ? void 0 : reservationOptions.timeslot) || config_1.config.reservation.defaultTimeslot;
            const rowSelector = `.matrix tr[data-time="${timeslot}"]`;
            await page.waitForSelector(rowSelector);
            const row = await page.$(rowSelector);
            const cells = await (row === null || row === void 0 ? void 0 : row.$$('td[type="free"]'));
            if (!cells || !cells.length) {
                // No court available.
                console.log(`No court available at ${timeslot}.`);
                return;
            }
            else {
                cells[0].click();
            }
            // Select guest and submit
            await page.waitForSelector('.lightbox form select[name="players[2]"]');
            await page.select('.lightbox form select[name="players[2]"]', '-1');
            await page.click('#__make_submit');
            await helpers_1.delay(500);
            // Confirm
            if (!options.dryRun) {
                await page.click('#__make_submit2');
            }
            if (options.debug) {
                await page.screenshot({ path: 'example.png' });
            }
            if (!options.debug) {
                await browser.close();
            }
            console.log('Reservation made successfully.');
        }
        catch (error) {
            console.error(error.message);
        }
    }
    return {
        createReservation,
    };
}
exports.createCrawler = createCrawler;
//# sourceMappingURL=index.js.map