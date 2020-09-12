export async function process(ctx: Context, next: () => Promise<any>) {
  ctx.set('Cache-Control', 'no-cache')
  ctx.response.status = 200      
  ctx.response.body = {
    sessionappnode:{
      output_field:{
        value: "output_field_value"
      } 
    }
  }
  await next()
}
