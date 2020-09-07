import { createCrawler } from './crawler'

const crawler = createCrawler({
  debug: true,
  dryRun: true
})

crawler.makeReservation()
