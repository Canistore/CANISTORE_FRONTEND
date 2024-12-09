import { Actor, HttpAgent } from '@dfinity/agent'

import { AuthClient } from '@dfinity/auth-client'
import LocalStorage from '@/canisters/LocalStorage'

export function getClient() {
  return AuthClient.create({
    storage: LocalStorage,
    keyType: 'Ed25519',
    idleOptions: {
      disableIdle: true // disable IdleManager
    }
  })
}

export async function createActor(canisterId, idlFactory) {
  const authClient = await getClient()
  const identity = await authClient.getIdentity()
  return Actor.createActor(idlFactory, {
    agent: HttpAgent.createSync({
      host: 'https://icp0.io/',
      identity
    }),
    canisterId
  })
}
