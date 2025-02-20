// pages/auth.js
import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isSignUp, setIsSignUp] = useState(false) // toggles between sign-up & sign-in

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMsg('')

    if (isSignUp) {
      // Sign Up
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setErrorMsg(error.message)
      } else {
        if (data.user) {
          await supabase.from('users').upsert({
            id: data.user.id,
            email: data.user.email,
            slug: data.user.email.split('@')[0]
          })
        }
        router.push('/dashboard')
      }
    } else {
      // Sign In (using signInWithPassword)
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setErrorMsg(error.message)
      } else {
        if (data.user) {
          await supabase.from('users').upsert({
            id: data.user.id,
            email: data.user.email,
            slug: data.user.email.split('@')[0]
          })
        }
        router.push('/dashboard')
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-3xl mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="px-3 py-2 rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="px-3 py-2 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
        >
          {isSignUp ? 'Create Account' : 'Sign In'}
        </button>
      </form>
      {errorMsg && <p className="text-red-400 mt-3">{errorMsg}</p>}
      <button
        className="mt-6 text-blue-300 underline"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp
          ? 'Already have an account? Sign In'
          : 'No account? Sign Up'}
      </button>
    </div>
  )
}
