import React, { useState } from "react"
import { useActorMutation } from "lib/hooks"

/**
 * Greeting Component
 *
 * Demonstrates IC Reactor v3 usage with useActorMutation hook.
 * Since greet doesn't need caching (it's a simple call with changing args),
 * we use mutation pattern for manual triggering.
 */
const Greeting: React.FC = () => {
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
    if (name.trim()) {
      mutate([name])
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <div className="greeting-section">
      <h2 className="greeting-title">🎉 Greeting Demo</h2>
      <div className="greeting-form">
        <label htmlFor="name">
          Enter your name to get a greeting from the canister:
        </label>
        <div className="input-group">
          <input
            id="name"
            type="text"
            placeholder="Your name..."
            value={name}
            onChange={onChangeName}
            onKeyDown={handleKeyDown}
          />
          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={isPending || !name.trim()}
          >
            {isPending ? (
              <>
                <span className="spinner" />
                Sending...
              </>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
      <div className="response-area">
        <div className="response-label">Response from canister:</div>
        {isPending ? (
          <span className="response-text muted">Waiting for response...</span>
        ) : error ? (
          <span className="response-text error">⚠️ {error.message}</span>
        ) : data ? (
          <span className="response-text success">✅ {String(data)}</span>
        ) : (
          <span className="response-text muted">
            Enter a name and click Send
          </span>
        )}
      </div>
    </div>
  )
}

export default Greeting
