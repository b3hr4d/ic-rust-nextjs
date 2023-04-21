import { canisterId, createActor } from "declarations/hello"

export const makeActor = (canisterId, createActor) =>
  createActor(canisterId, {
    agentOptions: {
      host: process.env.NEXT_PUBLIC_IC_HOST
    }
  })

export function makeHelloActor() {
  return makeActor(canisterId, createActor)
}
