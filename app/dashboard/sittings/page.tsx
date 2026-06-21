"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow p-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">
          Settings
        </h1>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="font-medium">
              Dark Mode
            </span>

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className={`px-5 py-2 rounded-lg text-white ${
                darkMode
                  ? "bg-green-600"
                  : "bg-gray-500"
              }`}
            >
              {darkMode ? "ON" : "OFF"}
            </button>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium">
              Email Notifications
            </span>

            <input
              type="checkbox"
              defaultChecked
            />
          </div>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}