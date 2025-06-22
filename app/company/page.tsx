export default function CompanyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Access&Co</h1>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="mb-4">
            Access&Co is a revolutionary platform that combines social networking, investment opportunities, and global
            business partnerships in one seamless experience.
          </p>
          <p>
            Our mission is to become the #1 most powerful, automated, self-evolving superapp that dominates every
            industry — social, business, fashion, media, entertainment, elite, diplomatic, and financial sectors.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold mb-4">Founder</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center text-4xl font-bold text-gray-400">
                A
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-xl font-bold mb-1">Jemael Xenn Enriquez Gonzales</h3>
              <h4 className="text-lg text-indigo-600 mb-4">Founder & Visionary</h4>
              <div className="grid gap-2 mb-4">
                <p>
                  <strong>Nickname:</strong> Aries
                </p>
                <p>
                  <strong>Education:</strong> Psychology Major – NU Lipa
                </p>
                <p>
                  <strong>Age:</strong> 20 Years Old
                </p>
                <p>
                  <strong>Location:</strong> Philippines
                </p>
              </div>
              <p>
                As the visionary founder of Access&Co, Aries is revolutionizing how people connect, invest, and grow on
                a global scale. His innovative approach combines social networking, investment opportunities, and global
                business partnerships into one seamless platform.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Platform Features</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h4 className="font-bold mb-2">Self-Evolving Intelligence</h4>
              <p className="text-sm">
                Access automatically upgrades itself without developer intervention, including self-enhancement,
                self-healing, and self-marketing.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-bold mb-2">In-App Shareholding</h4>
              <p className="text-sm">
                Secure investment portal with real-time stock/share value dashboard, legal share certificates, and
                auto-trading capabilities.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-bold mb-2">Elite World Access Club</h4>
              <p className="text-sm">
                Exclusive areas for world leaders, politicians, royal families, celebrities, and high-net-worth
                individuals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
