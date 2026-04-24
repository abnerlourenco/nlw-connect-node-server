import { redis } from '../redis/client.ts'

interface GetSubscriberInvitesCountParams {
  subscriberId: string
}

export async function getSubscriberInvitesCount({
  subscriberId,
}: GetSubscriberInvitesCountParams) {
  const count = await redis.zscore('referral:ranking', subscriberId)

  return { count: count ? Number.parseInt(count) : 0 }
}
