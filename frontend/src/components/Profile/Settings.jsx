import React from 'react';

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      {/* Application Settings */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Application Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Theme</label>
            <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Language</label>
            <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </section>

      {/* Privacy Settings */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Privacy Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="ml-2 block text-sm font-medium">Make Profile Public</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="ml-2 block text-sm font-medium">Enable Location Services</label>
          </div>
        </div>
      </section>

      {/* Security Settings */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Security Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="ml-2 block text-sm font-medium">Enable Two-Factor Authentication</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="ml-2 block text-sm font-medium">Send Login Alerts</label>
          </div>
        </div>
      </section>

      {/* Connected Accounts */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Connected Accounts</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/40"
                alt="Google"
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2 block text-sm font-medium">Google</span>
            </div>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
              Disconnect
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/40"
                alt="Facebook"
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2 block text-sm font-medium">Facebook</span>
            </div>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
              Disconnect
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
