import React from "react";
import { FaSearch, FaFilter, FaThLarge } from "react-icons/fa";

const categories = [
    "Sales", "Interventions", "Accounting", "Inventory", "Manufacturing", "Website", "Marketing", "Human Resources", "Productivity"
  ];

const apps = [
    { name: "WhatsApp Odoo Integration", description: "WhatsApp Integration with Odoo", button: "Activate" },
    { name: "Sales", description: "From quotes to invoices", button: "Learn more" },
    { name: "Restaurant", description: "Extensions for restaurants in the point of sale", button: "Learn more" },
    { name: "Billing", description: "Invoices & Payments", button: "Learn more" },
    { name: "Website", description: "Business website builder", button: "Learn more" },
    { name: "Inventory", description: "Manage your stock and logistics activities", button: "Learn more" },
  ];

const Apps = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
    {/* Header */}
    <header className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
      <h1 className="text-xl font-semibold">Apps</h1>
      <div className="flex items-center space-x-2">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button className="p-2 bg-gray-200 rounded-md hover:bg-gray-300">
          <FaFilter />
        </button>
        <button className="p-2 bg-gray-200 rounded-md hover:bg-gray-300">
          <FaThLarge />
        </button>
      </div>
    </header>

    {/* Main Content */}
    <div className="flex mt-6">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-4 shadow-md rounded-lg">
        <h2 className="font-semibold text-lg">Categories</h2>
        <ul className="mt-2 space-y-2">
          {categories.map((category, index) => (
            <li key={index} className="p-2 rounded-md hover:bg-gray-200 cursor-pointer">
              {category}
            </li>
          ))}
        </ul>
      </aside>

      {/* Apps Grid */}
      <main className="w-3/4 grid grid-cols-2 gap-4 p-4">
        {apps.map((app, index) => (
          <div key={index} className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-semibold">{app.name}</h3>
            <p className="text-gray-600 text-sm">{app.description}</p>
            <button className="mt-2 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">
              {app.button}
            </button>
          </div>
        ))}
      </main>
    </div>
  </div>
  );
};

export default Apps;
