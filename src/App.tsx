import { useState, useEffect } from 'react';
import { Moon, Sun, Download, Copy, Check, Smartphone } from 'lucide-react';
import QRCode from 'react-qr-code';

interface AppData {
  id: string;
  name: string;
  description: string;
  downloadUrl: string;
  icon: string;
  color: string;
}

interface InstanceData {
  id: string;
  title: string;
  url: string;
  username: string;
  password: string;
  icon?: string;
  color?: string;
}

const apps: AppData[] = [
  {
    id: 'customer',
    name: 'Customer App',
    description: 'Browse, order, and track your deliveries with ease',
    downloadUrl: 'https://drive.google.com/file/d/1CjUL7xKIqJLywQ1LVMZRYRoK8wDU64d6/view?usp=drive_link',
    icon: '👥',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'driver',
    name: 'Driver App',
    description: 'Manage deliveries, optimize routes, and earn more',
    downloadUrl: 'https://drive.google.com/file/d/1-2m4O-dOCCfrQThOluZ_MHZfugEfyCky/view',
    icon: '🚗',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'packer',
    name: 'Packer App',
    description: 'Efficient packing, inventory management, and order fulfillment',
    downloadUrl: 'https://drive.google.com/file/d/1IygXVrSizYgOfMTU4QutzF1Ded1BD6FO/view?usp=sharing',
    icon: '📦',
    color: 'from-orange-500 to-orange-600'
  }
];

const instances: InstanceData[] = [
  {
    id: 'operation-staging',
    title: 'Operation (Staging)',
    url: 'https://operation-staging.dieture.com',
    username: 'operation_manager@dieture.com',
    password: 'operation@2025@',
    icon: '⚙️',
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 'frappe-dev',
    title: 'Frappe Dev',
    url: 'https://frappe-dev.dieture.com',
    username: 'administrator',
    password: 'admin123',
    icon: '🛠️',
    color: 'from-teal-500 to-teal-600'
  }
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  // generalized copy state so we can show check icon for url/username/password independently
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const copyToClipboard = async (text: string, fieldId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Dieture Apps Hub
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Download our suite of mobile applications
                </p>
              </div>
            </div>
            
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Dieture Apps & Instances
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
              Download our mobile apps or connect to staging/dev instances. Scan the QR codes or copy the download links and credentials below.
            </p>
          </div>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="pb-20 px-4">
        <div className="container mx-auto">
          {/* Mobile Tab Navigation */}
          <div className="md:hidden mb-8">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 max-w-md mx-auto">
              {apps.map((app, index) => (
                <button
                  key={app.id}
                  onClick={() => setActiveTab(index)}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === index
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className="block text-lg mb-1">{app.icon}</span>
                  <span className="block text-xs">{app.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Tab Content */}
          <div className="md:hidden">
            <div className="app-card p-6 max-w-md mx-auto animate-fade-in">
              {(() => {
                const app = apps[activeTab];
                return (
                  <>
                    {/* App Header */}
                    <div className="text-center mb-6">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${app.color} flex items-center justify-center text-2xl shadow-lg`}>
                        {app.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {app.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {app.description}
                      </p>
                    </div>

                    {/* QR Code */}
                    <div className="bg-white p-4 rounded-xl mb-6 shadow-inner flex justify-center">
                      <QRCode
                        value={app.downloadUrl}
                        size={160}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        viewBox="0 0 256 256"
                      />
                    </div>

                    {/* Download URL */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Download URL:
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={app.downloadUrl}
                          readOnly
                          className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-xs text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => copyToClipboard(app.downloadUrl, `${app.id}:url`)}
                          className="copy-button"
                          title="Copy to clipboard"
                        >
                          {copiedField === `${app.id}:url` ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {copiedField === `${app.id}:url` && (
                        <p className="text-sm text-green-500 mt-1 animate-fade-in">
                          Copied to clipboard!
                        </p>
                      )}
                    </div>

                    {/* Download Button */}
                    <a
                      href={app.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="download-button w-full flex items-center justify-center space-x-2"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Now</span>
                    </a>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Desktop Grid Layout for Apps */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {apps.map((app, index) => (
              <div
                key={app.id}
                className="app-card p-8 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* App Header */}
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${app.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {app.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {app.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {app.description}
                  </p>
                </div>

                {/* QR Code */}
                <div className="bg-white p-4 rounded-xl mb-6 shadow-inner flex justify-center">
                  <QRCode
                    value={app.downloadUrl}
                    size={160}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox="0 0 256 256"
                  />
                </div>

                {/* Download URL */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Download URL:
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={app.downloadUrl}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-xs lg:text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => copyToClipboard(app.downloadUrl, `${app.id}:url`)}
                      className="copy-button"
                      title="Copy to clipboard"
                    >
                      {copiedField === `${app.id}:url` ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {copiedField === `${app.id}:url` && (
                    <p className="text-sm text-green-500 mt-1 animate-fade-in">
                      Copied to clipboard!
                    </p>
                  )}
                </div>

                {/* Download Button */}
                <a
                  href={app.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-button w-full flex items-center justify-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Now</span>
                </a>
              </div>
            ))}
          </div>

          {/* Instances section (Operation / Frappe) */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Instances</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {instances.map((inst) => (
                <div key={inst.id} className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md">
                  <div className="text-center mb-4">
                    <div className={`w-14 h-14 mx-auto mb-3 rounded-lg bg-gradient-to-r ${inst.color || 'from-gray-400 to-gray-500'} flex items-center justify-center text-xl`}>
                      <span>{inst.icon ?? '🔗'}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{inst.title}</h4>
                  </div>

                  {/* QR */}
                 

                  {/* URL */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL</label>
                    <div className="flex items-center space-x-2 mt-2">
                      <input type="text" readOnly value={inst.url}
                        className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-xs text-gray-700 dark:text-gray-300" />
                      <button onClick={() => copyToClipboard(inst.url, `${inst.id}:url`)} title="Copy URL" className="p-2 rounded-md">
                        {copiedField === `${inst.id}:url` ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Username */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                    <div className="flex items-center space-x-2 mt-2">
                      <input type="text" readOnly value={inst.username}
                        className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-xs text-gray-700 dark:text-gray-300" />
                      <button onClick={() => copyToClipboard(inst.username, `${inst.id}:username`)} title="Copy username" className="p-2 rounded-md">
                        {copiedField === `${inst.id}:username` ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                    <div className="flex items-center space-x-2 mt-2">
                      <input type="text" readOnly value={inst.password}
                        className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-xs text-gray-700 dark:text-gray-300" />
                      <button onClick={() => copyToClipboard(inst.password, `${inst.id}:password`)} title="Copy password" className="p-2 rounded-md">
                        {copiedField === `${inst.id}:password` ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <a href={inst.url} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 text-center rounded-md bg-blue-600 text-white hover:opacity-95">
                      Open
                    </a>
                    <button onClick={() => {
                      // populate clipboard with a convenient copy-paste block (URL + credentials)
                      const block = `URL: ${inst.url}\nUsername: ${inst.username}\nPassword: ${inst.password}`;
                      copyToClipboard(block, `${inst.id}:full`);
                    }} className="py-2 px-3 rounded-md bg-gray-100 dark:bg-gray-700">
                      {copiedField === `${inst.id}:full` ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © 2025 Mobile Apps Hub. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Scan QR codes with your mobile device camera or copy the download links and credentials above.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
