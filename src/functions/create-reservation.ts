import { loadBoolean } from '../config'
import { createCrawler } from '../crawler'

const createReservation = (_req: any, _res: any): void => {
  const crawler = createCrawler({
    debug: loadBoolean(process.env.DEBUG, false),
    dryRun: loadBoolean(process.env.DRY_RUN, false),
  })

  crawler.createReservation()
}

export default createReservation
