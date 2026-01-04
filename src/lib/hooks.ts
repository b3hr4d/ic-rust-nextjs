/**
 * IC Reactor v3 Hooks
 *
 * This file exports typed React hooks for interacting with the hello canister.
 * Using createActorHooks generates a suite of hooks tailored to your canister's interface.
 */
import { createActorHooks, createAuthHooks } from "@ic-reactor/react"
import { clientManager, helloReactor } from "./reactor"

/**
 * Auth hooks
 */
export const { useAuth, useAgentState } = createAuthHooks(clientManager)

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
