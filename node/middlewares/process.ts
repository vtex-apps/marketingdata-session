import { json } from 'co-body'

//import { forEach } from 'ramda'

interface MarketingDataContent {
  utm_source: string,
  utm_medium?: string,
  utm_campaign?: string,
  utmi_cp?: string,
  utmi_p?: string,
  utmi_pc?: string
}

interface SessionField {
  value: string
}

interface SessionNamespaceContent {
  [key: string]: SessionField
}

interface SessionContent {
  [key: string]: SessionNamespaceContent
}

export async function process(ctx: Context, next: () => Promise<any>) {
  ctx.set('Cache-Control', 'no-cache')
  
  // Parse request body
  //console.log("ResquestContent:", await text(ctx.req))
  const sessionContent : SessionContent = await json(ctx.req)
  console.log("SessionContent:", sessionContent)
  let marketingDataContent : MarketingDataContent = {
    utm_source: ""
  } 
  
  // Perform any content calculation
  // Note: if none of these values are available, this service will not be called.
  if(sessionContent.public?.utm_source) {
    marketingDataContent.utm_source = sessionContent.public.utm_source.value
  } else if(sessionContent.public?.gclid) {
    marketingDataContent.utm_source = "Google"
  }

  // Build namespace content
  //let marketingDataSessionContent : SessionNamespaceContent = {} 

  // Build session new content
  // TODO: send public marketingdata content to proper namespace
  let sessionNewContent : SessionContent = {
    public:{
      utm_source:{
        value: marketingDataContent.utm_source
      } 
    },
    marketingdata: {
      utm_source:{
        value: marketingDataContent.utm_source
      }
    }
  }

  // Define response
  ctx.response.status = 200
  ctx.response.set('Content-Type', 'application/json')
  ctx.response.body = JSON.stringify(sessionNewContent)
  await next()
}
