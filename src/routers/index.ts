import dexRouter from './module/dexRouter'
import browser from './network/browser'
const routers = {
  ...dexRouter,
  network: {
    ...browser
  }
}

export default routers
