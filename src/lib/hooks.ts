/**
 * IC Reactor v3 Hooks
 *
 * This file exports typed React hooks for interacting with the hello canister.
 * Using createActorHooks generates a suite of hooks tailored to your canister's interface.
 */
import { createActorHooks } from "@ic-reactor/react"
import { helloReactor } from "./reactor"

/**
 * Generated hooks for the Hello canister:
 *
 * - useActorQuery: For query calls (cached via TanStack Query)
 * - useActorMutation: For update calls (mutations)
 * - useActorInfiniteQuery: For paginated data
 * - useActorSuspenseQuery: For Suspense-enabled queries
 */
export const {
  useActorQuery,
  useActorMutation,
  useActorInfiniteQuery,
  useActorSuspenseQuery
} = createActorHooks(helloReactor)

// Re-export reactor for direct access if needed
export { helloReactor } from "./reactor"
