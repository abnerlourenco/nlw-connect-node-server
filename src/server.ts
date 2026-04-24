import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import 'dotenv/config.js'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { accesInviteLinkRoute } from './routes/access-invite-link.routes.ts'
import { getRankingRoute } from './routes/get-ranking.routes.ts'
import { getSubscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks.routes.ts'
import { getSubscriberInvitesCountRoute } from './routes/get-subscriber-invites-count.routes.ts'
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position.routes.ts'
import { subscribeToEventRoute } from './routes/subscribe-to-event.routes.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: env.BASEURL_WEB_ORIGIN,
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'DevStage-api',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.get('/health', () => {
  return 'OK'
})

app.register(subscribeToEventRoute)
app.register(accesInviteLinkRoute)
app.register(getSubscriberInviteClicksRoute)
app.register(getSubscriberInvitesCountRoute)
app.register(getSubscriberRankingPositionRoute)
app.register(getRankingRoute)

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server is running!')
})
