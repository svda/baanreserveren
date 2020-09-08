import { CronJob } from 'cron'

import { Crawler } from '../crawler'

interface TaskRunnerOptions {
  crawler: Crawler
}

export interface TaskRunner {
  run: () => void
}

const CRON_SCHEDULE = '0 0 7 * * WED'
const CRON_TIMEZONE = 'Europe/Amsterdam'

export function createTaskRunner(options: TaskRunnerOptions): TaskRunner {
  const { crawler } = options

  const job = new CronJob(CRON_SCHEDULE, async () => {
    await crawler.createReservation()
  }, null, true, CRON_TIMEZONE)

  function run() {
    job.start()
    console.log('Task runner started.')
  }

  return {
    run,
  }
}
