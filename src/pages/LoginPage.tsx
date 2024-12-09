import { Link } from "react-router-dom"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white font-questrial flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <Link to="/" className="mb-8 inline-block">
          <img src="/tempguru.svg" alt="TempGuru" className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl mb-8">Log in to TempGuru</h1>
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 bg-white/10 rounded focus:outline-none focus:ring-2 focus:ring-[#FF4800]"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-2 bg-white/10 rounded focus:outline-none focus:ring-2 focus:ring-[#FF4800]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#FF4800] text-white rounded hover:bg-[#FF4800]/90 transition-colors"
          >
            Log in
          </button>
          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-white hover:underline">
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

