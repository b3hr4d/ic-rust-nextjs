/**
 * IC Reactor v3 Setup
 *
 * This file initializes the ClientManager and Reactor for the hello canister.
 * - ClientManager: Manages the IC Agent connection and authentication
 * - Reactor: Manages the canister actor instance with query caching
 */
import { ClientManager, Reactor } from "@ic-reactor/react"
import { QueryClient } from "@tanstack/react-query"
import { idlFactory, canisterId } from "declarations/hello"
import type { _SERVICE } from "declarations/hello/hello.did"

// Create a QueryClient for TanStack Query caching
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Queries are considered fresh for 30 seconds
      staleTime: 30 * 1000,
      // Keep unused data in cache for 5 minutes
      gcTime: 5 * 60 * 1000,
      // Retry failed queries once
      retry: 1
    }
  }
})

// Determine if we're in a local environment
const isLocal =
  typeof process !== "undefined" && process.env?.DFX_NETWORK !== "ic"

// Create the ClientManager - handles agent creation and authentication
export const clientManager = new ClientManager({
  queryClient,
  withLocalEnv: isLocal
})

/**
 * Reactor for the Hello canister
 *
 * This reactor provides type-safe access to all canister methods
 * with automatic query caching via TanStack Query.
 *
 * Note: We use the management canister ID as a fallback during SSR/build
 * when env vars aren't available. The actual canister ID will be used at runtime.
 */
export const helloReactor = new Reactor<_SERVICE>({
  clientManager,
  idlFactory,
  // Use the canisterId from declarations, or management canister as fallback
  // "aaaaa-aa" is the management canister principal (always valid)
  canisterId: canisterId || "aaaaa-aa"
})
