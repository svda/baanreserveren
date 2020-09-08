import { createCrawler } from './crawler'
import { createTaskRunner } from './task-runner'
import { loadBoolean } from './config'

const crawler = createCrawler({
  debug: loadBoolean(process.env.DEBUG, false),
  dryRun: loadBoolean(process.env.DRY_RUN, false),
})

const app = createTaskRunner({
  crawler,
})

app.run()
