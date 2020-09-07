import { createCrawler } from './crawler'

console.log('Initializing baanreserveren crawler.')

const crawler = createCrawler({
  debug: true,
  dryRun: true
})

crawler.makeReservation()

console.log('Baanreserveren crawler finished.')
