import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

export default function AuthPage() {
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md space-y-8 p-6 bg-card rounded-xl shadow-lg border border-border">
          <h1 className="text-3xl font-bold text-center">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded border bg-background text-foreground"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded border bg-background text-foreground"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          {errorMsg && (
            <p className="text-destructive text-center">{errorMsg}</p>
          )}

          <button
            type="button"
            className="w-full text-center text-muted-foreground hover:text-foreground"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Already have an account? Sign In' : 'No account? Sign Up'}
          </button>
        </div>
      </div>
    </Layout>
  );
}