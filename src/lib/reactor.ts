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

// Create the ClientManager - handles agent creation and authentication
export const clientManager = new ClientManager({
  queryClient,
  withProcessEnv: true
})

/**
 * Reactor for the Hello canister
 *
 * This reactor provides type-safe access to all canister methods
 * with automatic query caching via TanStack Query.
 */
export const helloReactor = new Reactor<_SERVICE>({
  name: "hello",
  clientManager,
  idlFactory,
  canisterId
})
