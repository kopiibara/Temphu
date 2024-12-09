import { Link } from "react-router-dom"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white font-questrial">
      {/* Header */}
      <header className="p-4">
        <div className="max-w-[1200px] mx-auto">
          <img src="/tempguru.svg" alt="TempGuru" className="w-6 h-6" />
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <h1 className="text-4xl font-normal leading-tight">
              Stay in Control
              <br />
              of Your Environment, Always.
            </h1>
            <p className="text-gray-400">
              Track <span className="text-white">temperature</span> and{" "}
              <span className="text-white">humidity</span> effortlessly
              <br />
              with real-time monitoring.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-[#FF4800] text-white rounded hover:bg-[#FF4800]/90 transition-colors">
                Get Started
              </button>
              <Link
                to="/login"
                className="px-6 py-2 text-[#FF4800] hover:text-[#FF4800]/90 transition-colors"
              >
                Log in
              </Link>
            </div>
          </div>
          <div className="bg-white/10 aspect-square w-full max-w-sm" />
        </div>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-2xl mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-Time Monitoring",
                description: "Get instant access to temperature and humidity readings from your environment."
              },
              {
                title: "Interactive Data Visualization",
                description: "Track views and analyze environmental factors with intuitive monitoring."
              },
              {
                title: "Remote Accessibility",
                description: "Monitor your environment from any device, anywhere, with easy access to real-time data."
              }
            ].map((feature, index) => (
              <div key={index} className="space-y-4">
                <div className="bg-white/10 aspect-square w-full" />
                <h3 className="text-sm">{feature.title}</h3>
                <p className="text-xs text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-16">
          <h2 className="text-2xl mb-8">Powered by These Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "ESP8266",
                description: "A Wi-Fi enabled microcontroller capable of WiFi connectivity, allowing sensor data to flow seamlessly to the web in real-time."
              },
              {
                title: "DHT22",
                description: "A digital sensor that measures temperature and humidity with unmatched accuracy and reliability."
              }
            ].map((tool, index) => (
              <div key={index} className="space-y-4">
                <div className="bg-white/10 aspect-square w-full" />
                <h3 className="text-sm">{tool.title}</h3>
                <p className="text-xs text-gray-400">{tool.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center">
          <p className="text-gray-400 mb-8">
            Start monitoring your environment today
            <br />— sign up and try it out!
          </p>
          <div className="flex justify-center gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-white">About Us</a>
            <a href="#" className="hover:text-white">Contact</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">FAQ</a>
          </div>
          <p className="mt-8 text-[10px] text-gray-600">© 2024 TempGuru. All Rights Reserved.</p>
        </footer>
      </main>
    </div>
  )
}

