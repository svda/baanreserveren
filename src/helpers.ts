export function delay(ms: number) {
  return new Promise(function(resolve) { 
    setTimeout(resolve, ms)
  })
}

type GetReservationDateResponse = {
  day: number
  month: number
  year: number
}

export function getReservationDate(daysOffset: number = 7): GetReservationDateResponse {
  const today = new Date()
  const nextWeek = new Date(today.getTime() + daysOffset * 24 * 60 * 60 * 1000)
  const day = nextWeek.getDate()
  const month = nextWeek.getMonth() + 1
  const year = nextWeek.getFullYear()

  return { day, month, year }
}
