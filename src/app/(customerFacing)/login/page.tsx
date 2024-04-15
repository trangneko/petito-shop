"use client"

import { googleAuthenticate } from "@/lib/actions" // added import
import { useFormState } from "react-dom"


export default function Page() {
  const [errorMsg, dispatch] = useFormState(googleAuthenticate, undefined)
  return (
    <div>
      <h1>Log in Page</h1>
      <form className="flex flex-col" action={dispatch}>
          <input className="bg-blue-300 text-black" name="id"></input>
          <input className="bg-yellow-300 text-black" name="password" type="password"></input>
          <button>
              Log In
          </button>
          <p>{errorMsg}</p>
      </form>
    </div>
  )
}