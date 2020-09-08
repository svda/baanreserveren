import puppeteer from 'puppeteer'

import { config } from '../config'
import { delay, getReservationDate } from '../helpers'

interface CrawlerOptions {
  debug?: boolean
  dryRun?: boolean
}

export interface Crawler {
  makeReservation: (reservationOptions?: ReservationOptions) => Promise<void>
}

interface ReservationOptions {
  timeslot: string
}

export function createCrawler(options: CrawlerOptions): Crawler {
  console.log('Baanreserveren crawler initialized.')

  async function makeReservation(reservationOptions?: ReservationOptions) {
    try {
      const browser = await puppeteer.launch({
        headless: options.debug ? false : true,
        // slowMo: 250, // slow down by 250ms
        // devtools: true,
      })

      const page = await browser.newPage()
      await page.setViewport({
        width: 1024,
        height: 768,
        deviceScaleFactor: 1,
      })
      page.on('console', msg => console.log("Crawler:", msg.text()))

      await page.goto(config.baanreserveren.url)

      // Log in
      await page.type('#login-form input[name=username]', config.baanreserveren.username)
      await page.type('#login-form input[name=password]', config.baanreserveren.password)
      await page.click('#login-form button')

      // Navigate to next week
      await page.waitForSelector('#tbl_calendar')
      const { day, month, year } = getReservationDate()
      await page.click(`#cal_${year}_${month}_${day} > a.cal-link`)

      //await delay(500)

      const rowSelector = `.matrix tr[data-time="${reservationOptions?.timeslot || config.reservation.defaultTimeslot}"]`
      await page.waitForSelector(rowSelector)
      // Select available timeslot
      const row = await page.$(rowSelector)
      const cells = await row?.$$('td[type="free"]')
      if (cells && cells.length) {
        await cells[0].click()
      }

      // await delay(500)

      // Select guest and submit
      await page.waitForSelector('.lightbox form select[name="players[2]"]')
      await page.select('.lightbox form select[name="players[2]"]', '-1')
      await page.click('#__make_submit')

      await delay(500)

      // Confirm
      if (!options.dryRun) {
        await page.click('#__make_submit2')
      }

      if (options.debug) {
        await page.screenshot({path: 'example.png'})
      }

      if (!options.debug) {
        await browser.close()
      }

      console.log('Reservation made successfully.')
    } catch (error) {
      console.error(error.message)
    }
  }

  return {
    makeReservation,
  }
}
