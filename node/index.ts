import { method, Service, ServiceContext } from '@vtex/api'
import { process } from './middlewares/process'

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext
}

export default new Service({
  routes: {    
    transform: method ({
      POST: [process],
    }),
  },
})
