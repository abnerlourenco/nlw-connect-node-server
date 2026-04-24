import { Redis } from 'ioredis'
import { env } from '../env.ts'

export const redis = new Redis(env.REDIS_URL, {
  enableReadyCheck: false,
})

redis.on('error', (err) => {
  console.error('Redis Connection Error:', err.message);
});