type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

class Logger {
  private currentLevel: LogLevel

  constructor() {
    this.currentLevel = import.meta.env.PROD ? 'warn' : 'debug'
  }

  setLevel(level: LogLevel) {
    this.currentLevel = level
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.currentLevel]
  }

  private format(level: LogLevel, message: string, data?: unknown): void {
    const timestamp = new Date().toISOString()
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`

    switch (level) {
      case 'debug':
        console.debug(prefix, message, data ?? '')
        break
      case 'info':
        console.info(prefix, message, data ?? '')
        break
      case 'warn':
        console.warn(prefix, message, data ?? '')
        break
      case 'error':
        console.error(prefix, message, data ?? '')
        break
    }
  }

  debug(message: string, data?: unknown) {
    if (this.shouldLog('debug')) this.format('debug', message, data)
  }

  info(message: string, data?: unknown) {
    if (this.shouldLog('info')) this.format('info', message, data)
  }

  warn(message: string, data?: unknown) {
    if (this.shouldLog('warn')) this.format('warn', message, data)
  }

  error(message: string, data?: unknown) {
    if (this.shouldLog('error')) this.format('error', message, data)
  }
}

export const logger = new Logger()
