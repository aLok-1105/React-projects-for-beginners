import React, { useState, useMemo, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MetricCard from '../components/dashboard/MetricCard';
import AddDataForm from '../components/dashboard/AddDataForm';
import WearableIntegration from '../components/dashboard/WearableIntegration';

export default function DashboardPage() {
  const [healthData, setHealthData] = useState([
    { date: new Date(), steps: 10250, calories: 450, sleep: 7.8 },
  ]);
  const [isConnected, setIsConnected] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Guest',
    email: 'Please sign in',
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fitbitConnected = urlParams.get('connected') === 'true';
    const googleConnected = urlParams.get('google_connected') === 'true';

    if ((fitbitConnected || googleConnected) && !isConnected) {
      setIsConnected(true);
      const service = googleConnected ? 'google' : 'fitbit';
      console.log(`${service} connection successful. Fetching data...`);

      const fetchActivityData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/${service}/activities/today`);
          if (!response.ok) throw new Error(`Failed to fetch data from ${service}.`);
          const syncedData = await response.json();
          console.log(`Synced data received from ${service}:`, syncedData);
          const newEntry = {
            date: new Date(),
            steps: syncedData.steps,
            calories: syncedData.caloriesOut || syncedData.calories,
            sleep: 0,
          };
          setHealthData([newEntry]);
        } catch (error) {
          console.error(`Could not fetch ${service} activity data:`, error);
        }
      };

      const fetchProfileData = async () => {
        if (service === 'google') {
          try {
            const response = await fetch(`http://localhost:3001/api/google/profile`);
            if (!response.ok) throw new Error(`Failed to fetch profile from Google.`);
            const profileData = await response.json();
            console.log(`Synced profile data:`, profileData);
            setUserProfile(profileData);
          } catch (error) {
            console.error(`Could not fetch ${service} profile data:`, error);
          }
        }
      };

      fetchActivityData();
      fetchProfileData();
    }
  }, [isConnected]);

  const handleAddData = (newData) => {
    setHealthData((prevData) =>
      [newData, ...prevData].sort((a, b) => b.date - a.date)
    );
  };

  const latestData = healthData[0] || { steps: 0, calories: 0, sleep: 0 };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Header user={userProfile} />
        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <MetricCard title="Steps Today" value={latestData.steps} unit="steps" icon="steps" color="blue" trend={{ change: 5.2 }} />
            <MetricCard title="Calories Burned" value={latestData.calories} unit="kcal" icon="calories" color="orange" trend={{ change: -1.8 }} />
            <MetricCard title="Last Night's Sleep" value={latestData.sleep} unit="hours" icon="sleep" color="purple" trend={{ change: 8.0 }} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <AddDataForm onAddData={handleAddData} />
            <WearableIntegration />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Activity Log</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="py-3 px-4 font-semibold text-gray-600">Date</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Steps</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Calories (kcal)</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Sleep (hrs)</th>
                  </tr>
                </thead>
                <tbody>
                  {healthData.map((log, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">{log.date.toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-gray-700">{log.steps.toLocaleString()}</td>
                      <td className="py-3 px-4 text-gray-700">{log.calories.toLocaleString()}</td>
                      <td className="py-3 px-4 text-gray-700">{log.sleep.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
