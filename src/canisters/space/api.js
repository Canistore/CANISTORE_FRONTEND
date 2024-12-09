import { createActor } from '../connect'
import { idlFactory } from './did'

async function getActor(spaceId) {
  return await createActor(spaceId, idlFactory)
}

function wrapRes(res) {
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

export async function getTrackInfo(id, spaceId) {
  const actor = await getActor(spaceId)
  const res = await actor.get_track_info(id)
  return wrapRes(res)
}

export async function getLicenseByTrack(trackId, spaceId) {
  const actor = await getActor(spaceId)
  const res = await actor.get_license_by_track(trackId, spaceId)
  return res
}

export async function createLicenseOrder(trackId, memo, spaceId) {
  const actor = await getActor(spaceId)
  const res = await actor.create_license_order(trackId, memo)
  return wrapRes(res)
}

export async function confirmLicenseOrder(orderId, spaceId) {
  const actor = await getActor(spaceId)
  const res = await actor.confirm_license_order(orderId)
  return wrapRes(res)
}
