import dotenv from 'dotenv'

dotenv.config()

interface Config {
  baanreserveren: {
    url: string
    username: string
    password: string
  }
  reservation: {
    defaultTimeslot: string
  }
}

export function loadBoolean(
  variable: string | undefined,
  defaultValue: boolean
): boolean {
  switch (variable?.toLowerCase()) {
    case 'true':
    case 'yes':
    case '1':
      return true
    case 'false':
    case 'no':
    case '0':
      return false
    default:
      return defaultValue
  }
}

export function loadNumber(
  variable: string | undefined,
  defaultValue: number | undefined
): number {
  return variable && !isNaN(Number(variable)) ? Number(variable) : defaultValue!
}

export function loadString(
  variable: string | undefined,
  defaultValue: string = ''
): string {
  return (variable || defaultValue).replace(/\\n/g, '\n')
}

export const config: Config = {
  baanreserveren: {
    url: 'https://squashcity.baanreserveren.nl',
    username: loadString(process.env.BAANRESERVEREN_USERNAME),
    password: loadString(process.env.BAANRESERVEREN_PASSWORD),
  },
  reservation: {
    defaultTimeslot: '18:15'
  }
}
