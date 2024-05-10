import dexRouter from './module/dexRouter'
import browser from './network/browser'
import logger from './events/logger'
import events from './module/events'
const routers = {
  ...dexRouter,
  network: {
    ...browser
  },
  onEvents: {
    ...logger
  },
  sendEvents: {
    ...events
  }
}

export default routers
