import { NestFactory } from '@nestjs/core'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { ExpressAdapter } from '@nestjs/platform-express'
import { APIGatewayProxyEvent, Context, Handler } from 'aws-lambda'
import { createServer, proxy } from 'aws-serverless-express'
import { Server } from 'http'
import { AppModule } from './app.module'
import * as express from 'express'
import * as morgan from 'morgan'
import { EntityNotFoundFilter } from '@filters/entity-not-found.filter'
import { TransformInterceptor } from '@interceptors/transform.interceptor'
import { VideosModule } from '@modules/videos/videos.module'
import { VideosService } from '@modules/videos/videos.service'

const expressApp = express()

async function bootstrap(): Promise<INestApplication> {
  const app = await NestFactory.create(
    AppModule, new ExpressAdapter(expressApp), { logger: ['error', 'warn'] }
  )
  app.enableCors()
  app.use(morgan('combined'))
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new EntityNotFoundFilter())
  return app
}

/* --------------------------------------------------------------------- *
 * local server (if NODE_ENV = development)
 * --------------------------------------------------------------------- */
if (process.env.NODE_ENV === 'development') {
  bootstrap().then(async app => {
    await app.listen(8080)
    console.log(`Server listening on http://locallhost:8080`)
  })
}

/* --------------------------------------------------------------------- *
 * server handler (for lambda)
 * --------------------------------------------------------------------- */
let cachedServer: Server
export const server: Handler = (event: APIGatewayProxyEvent, context: Context) => {
  if (!cachedServer) {
    bootstrap().then(async app => {
      await app.init()
      cachedServer = createServer(expressApp)
      proxy(cachedServer, event, context)
    })
  } else {
    proxy(cachedServer, event, context)
  }
}
/* --------------------------------------------------------------------- *
 * job handler (for lambda)
 * --------------------------------------------------------------------- */
export const job: Handler = (event: any, context: Context) => {
  bootstrap().then(async app => {
    console.log('Job start.')
    try {
      const videosService = app.select(VideosModule).get(VideosService)
      switch (true) {
        case event?.name === 'queue': {
          console.log('Job: queue job processes.')
          await videosService.queue()
          break
        }
        case event?.name === 'scrape': {
          console.log('Job: scrape job processes.')
          await videosService.scrape()
          break
        }
      }
    } catch (e) {
      console.error(e)
    }
    console.log('Job end.')

    await app.close()
  })
}
