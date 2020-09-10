import {ColossusContext} from 'colossus'

export default {
  routes: {    
    transform: async (ctx: ColossusContext) => {
      ctx.set('Cache-Control', 'no-cache')
      ctx.response.status = 200      
      ctx.response.body = {
        sessionappnode:{
          output_field:{
            value: "output_field_value"
          } 
        }
      }
    }
  }
}
