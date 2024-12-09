import { Principal } from '@dfinity/principal'
import { createActor } from '../connect'
import { idlFactory } from './did'
import { showLoading, hideLoading } from '@/components/loading/loading.js'

function wrapResWithToast(res) {
  if (res.Err) {
    const error = res.Err.slice(0, res.Err.lastIndexOf(':')).split('|')
    if (error.length > 1) {
      showToast({
        className: 'toast',
        message: 'Error code: ' + error[0] + '\n' + error[1]
      })
    } else {
      showToast(error[0])
    }
    throw res.Err
  } else {
    return res.Ok
  }
}

function wrapRes(res) {
  if (res.Err) {
    const error = res.Err.slice(0, res.Err.lastIndexOf(':')).split('|')
    return error
  } else {
    return res.Ok
  }
}

function toastError(err) {
  showToast({
    className: 'toast',
    message: err
  })
}

// User login
export function login() {
  showLoading()
  return createActor(import.meta.env.VITE_CANISTER_USER, idlFactory)
    .then((actor) => actor.user_login())
    .then((res) => wrapResWithToast(res))
    .catch((err) => {
      toastError(err.toString())
      throw err
    })
    .finally(() => hideLoading())
}

export function profile() {
  showLoading()
  return createActor(import.meta.env.VITE_CANISTER_USER, idlFactory)
    .then((actor) => actor.profile())
    .then((res) => res[0])
    .catch((err) => {
      toastError(err.toString())
      throw err
    })
    .finally(() => hideLoading())
}

export function setUserInfo(options) {
  showLoading()
  const defalutOpt = {
    bio: [],
    born: [],
    handler: [],
    website: [],
    artist_name: [],
    genre: [],
    music_content_type: [],
    location: [],
    avatar: [],
    confirm_agreement: []
  }
  options = Object.assign(defalutOpt, options)
  return createActor(import.meta.env.VITE_CANISTER_USER, idlFactory)
    .then((actor) => actor.set_user_info(options))
    .then((res) => wrapResWithToast(res))
    .catch((err) => {
      toastError(err.toString())
      throw err
    })
    .finally(() => hideLoading())
}

export async function getUserInfos(principals) {
  const actor = await createActor(import.meta.env.VITE_CANISTER_USER, idlFactory)
  const res = await actor.get_user_infos(principals)
  return res
}

/**
 * Create a payment order
 * @param {string} memo Order memo
 * @returns
 */
export function createPaymentOrder(memo) {
  showLoading()
  return createActor(import.meta.env.VITE_CANISTER_USER, idlFactory)
    .then((actor) => actor.create_payment_order(memo))
    .then((res) => wrapResWithToast(res))
    .catch((err) => {
      toastError(err.toString())
      throw err
    })
    .finally(() => hideLoading())
}

/**
 * Confirm a payment order
 * @param {string} roderId Order ID
 * @returns
 */
export function confirmPaymentOrder(roderId) {
  showLoading()
  return createActor(import.meta.env.VITE_CANISTER_USER, idlFactory).then((actor) =>
    actor.confirm_payment_order(roderId)
  )
}

/**
 *
 * @param {string []} spaceIds
 * @returns
 */
export async function getUserInfosBySpaceIds(spaceIds) {
  spaceIds = spaceIds.map((id) => Principal.fromText(id))
  const actor = await createActor(import.meta.env.VITE_CANISTER_USER, idlFactory)
  const res = await actor.get_user_infos_by_space_ids(spaceIds)
  return res
}
