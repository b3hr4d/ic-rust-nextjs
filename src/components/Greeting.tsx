import React, { useState } from "react"
import { useActorMutation } from "lib/hooks"

interface GreetingProps {}

/**
 * Greeting Component
 *
 * Demonstrates IC Reactor v3 usage with useActorMutation hook.
 * Since greet doesn't need caching (it's a simple call with changing args),
 * we use mutation pattern for manual triggering.
 */
const Greeting: React.FC<GreetingProps> = () => {
  const [name, setName] = useState("")

  // useActorMutation for the greet function
  // This is ideal for user-triggered actions
  const { mutate, data, error, isPending } = useActorMutation({
    functionName: "greet"
  })

  function onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }

  function handleSubmit() {
    // Call the canister with the current name
    mutate([name])
  }

  return (
    <div>
      <section>
        <h2>Greeting</h2>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input
          id="name"
          alt="Name"
          type="text"
          value={name}
          onChange={onChangeName}
        />
        <button onClick={handleSubmit} disabled={isPending}>
          {isPending ? "Sending..." : "Send"}
        </button>
      </section>
      <section>
        <label>Response: &nbsp;</label>
        {isPending ? (
          <span>Loading...</span>
        ) : error ? (
          <span style={{ color: "red" }}>{error.message}</span>
        ) : data ? (
          <span>{String(data)}</span>
        ) : (
          <span style={{ color: "#888" }}>
            Enter a name and click Send to get a greeting
          </span>
        )}
      </section>
    </div>
  )
}

export default Greeting
