import React, { useState } from "react";

const AddDataForm = ({ onAddData }) => {
  const [formData, setFormData] = useState({
    steps: "",
    calories: "",
    sleep: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      date: new Date(),
      steps: parseInt(formData.steps) || 0,
      calories: parseInt(formData.calories) || 0,
      sleep: parseFloat(formData.sleep) || 0,
    };
    onAddData(newData);
    setFormData({ steps: "", calories: "", sleep: "" });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Log New Activity</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="steps"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Steps
            </label>
            <input
              type="number"
              name="steps"
              id="steps"
              value={formData.steps}
              onChange={handleChange}
              placeholder="e.g., 8500"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
          </div>
          <div>
            <label
              htmlFor="calories"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Calories Burned
            </label>
            <input
              type="number"
              name="calories"
              id="calories"
              value={formData.calories}
              onChange={handleChange}
              placeholder="e.g., 350"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
          </div>
          <div>
            <label
              htmlFor="sleep"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Sleep (hours)
            </label>
            <input
              type="number"
              step="0.1"
              name="sleep"
              id="sleep"
              value={formData.sleep}
              onChange={handleChange}
              placeholder="e.g., 7.5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Add Log
        </button>
      </form>
    </div>
  );
};

export default AddDataForm;
