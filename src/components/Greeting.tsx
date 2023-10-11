import React, { useState } from "react"
import { callActor, useActorState } from "service/actor"

interface GreetingProps {}

const Greeting: React.FC<GreetingProps> = ({}) => {
  const [name, setName] = useState("")

  const data = useActorState()

  function onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    const newName = e.target.value
    setName(newName)
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
        <button onClick={() => callActor("greet", name)}>Send</button>
      </section>
      <section>
        <label>Response: &nbsp;</label>
        {data?.greet.loading ? <span>Loading...</span> : null}
        {data?.greet.error ? (
          <span>Error: {JSON.stringify(data?.greet.error)}</span>
        ) : null}
        {data?.greet.result && <span>{data?.greet.result}</span>}
      </section>
    </div>
  )
}

export default Greeting
