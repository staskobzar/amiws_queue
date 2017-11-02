const Logger = {}

Logger.log = (msg) => {
  if (process.env.NODE_ENV === 'development') {
    window.console.log(msg)
  }
}

Logger.info = (msg) => {
  if (process.env.NODE_ENV === 'development') {
    window.console.info(msg)
  }
}

Logger.debug = (msg) => {
  if (process.env.NODE_ENV === 'development') {
    window.console.debug(msg)
  }
}

Logger.warn = (msg) => {
  if (process.env.NODE_ENV === 'development') {
    window.console.warn(msg)
  }
}

Logger.error = (msg) => {
  if (process.env.NODE_ENV === 'development') {
    window.console.error(msg)
  }
}

export default Logger
