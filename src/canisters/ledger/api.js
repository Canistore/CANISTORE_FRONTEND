import { Principal } from '@dfinity/principal'
import { createActor } from '../connect'
import { idlFactory } from './did'

function toastError(err) {
  showToast({
    className: 'toast',
    message: err
  })
}

/**
 * Transfer
 * @param {string} owner Recipient
 * @param {number} subaccount Recipient subaccount
 * @param {number} amount Transfer amount
 * @returns
 */
export function icrc1Transfer(owner, subaccount, amount) {
  return createActor(import.meta.env.VITE_CANISTER_LEDGER, idlFactory)
    .then((actor) =>
      actor.icrc1_transfer({
        to: {
          owner: Principal.fromText(owner),
          subaccount: [subaccount]
        },
        fee: [10000],
        memo: [],
        from_subaccount: [],
        created_at_time: [],
        amount: amount + 10000
      })
    )
    .catch((err) => {
      toastError(err.toString())
      throw err
    })
}
