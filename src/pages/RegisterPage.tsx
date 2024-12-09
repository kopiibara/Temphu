import { Link } from "react-router-dom"
import { X } from 'lucide-react'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black text-white font-questrial flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 relative">
        <button className="absolute right-0 top-0 p-2 text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl mb-2">Create your account</h1>
          <p className="text-gray-400 text-sm">Enter your details to sign up</p>
        </div>

        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter your username..."
              className="w-full p-3 bg-transparent border border-gray-800 rounded-md text-sm focus:outline-none focus:border-gray-600"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password..."
              className="w-full p-3 bg-transparent border border-gray-800 rounded-md text-sm focus:outline-none focus:border-gray-600"
            />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Confirm your password..."
              className="w-full p-3 bg-transparent border border-gray-800 rounded-md text-sm focus:outline-none focus:border-gray-600"
            />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>

          <div>
            <input
              type="email"
              placeholder="Enter your email..."
              className="w-full p-3 bg-transparent border border-gray-800 rounded-md text-sm focus:outline-none focus:border-gray-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 border-gray-800 rounded focus:ring-0"
            />
            <label htmlFor="terms" className="text-sm text-gray-400">
              I agree to <Link to="/terms" className="text-white hover:underline">Terms and Conditions</Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full p-3 rounded-md text-white text-sm font-medium bg-gradient-to-r from-[#e6796d] to-[#77b5b3] hover:opacity-90 transition-opacity"
          >
            Create your Account
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-xs text-gray-400">
              <span className="bg-black px-2">or</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full p-3 rounded-md text-white text-sm font-medium border border-gray-800 hover:bg-gray-800/50 transition-colors flex items-center justify-center gap-2"
          >
            <img src="/google.svg" alt="Google" className="w-5 h-5" />
            Sign up with Google
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

