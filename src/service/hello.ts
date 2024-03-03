import { createReactor } from "@ic-reactor/react"
import { canisterId, hello, idlFactory } from "declarations/hello"

export const { initialize, useQueryCall } = createReactor<typeof hello>({
  canisterId,
  idlFactory,
  withLocalEnv: true
})
