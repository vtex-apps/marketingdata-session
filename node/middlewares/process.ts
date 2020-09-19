import { json } from 'co-body'

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
  let sessionContent : SessionContent = await json(ctx.req)
  console.log("SessionContent:", sessionContent)
  
  // Perform any content calculation and build session new content
  let sessionNewContent : SessionContent = {}
  if(!sessionContent.public?.utm_source && sessionContent.public?.gclid) {
    sessionContent.public["utm_source"] = { value: "Google" }
    sessionNewContent["public"] = { utm_source : sessionContent.public["utm_source"]}
  }
  sessionNewContent["marketingdata"] = sessionContent.public

  // Define response
  ctx.response.status = 200
  ctx.response.set('Content-Type', 'application/json')
  ctx.response.body = JSON.stringify(sessionNewContent)
  await next()
}
