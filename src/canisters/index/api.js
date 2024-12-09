import { Principal } from '@dfinity/principal'
import { createActor } from '../connect'
import { idlFactory } from './did'

function u8toString(u8) {
  return new TextDecoder().decode(u8)
}

export async function getMessageKeys() {
  const actor = await createActor(import.meta.env.VITE_CANISTER_INDEX, idlFactory)
  const res = await actor.get_message_keys()
  return res
}

export async function getMessageList(type, limit, offset) {
  const actor = await createActor(import.meta.env.VITE_CANISTER_INDEX, idlFactory)
  const res = await actor.get_message_list(type, limit, offset)
  const target = res.map((item) => {
    item[0].payload = JSON.parse(u8toString(item[0].payload))
    return item
  })
  return target
}

export async function getMessageListByPid(type, pid, limit, offset) {
  const actor = await createActor(import.meta.env.VITE_CANISTER_INDEX, idlFactory)
  const res = await actor.get_message_list_by_pid(type, Principal.fromText(pid), limit, offset)
  const target = res.map((item) => {
    item[0].payload = JSON.parse(u8toString(item[0].payload))
    return item
  })
  return target
}
