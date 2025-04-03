import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Dashboard from "./dashboard";
import { useLocation } from "react-router-dom";

// Simuler des données des bases de données
const fetchDatabaseMetrics = async () => {
  return [
    { name: "Sales", size: 500 }, // Taille en Mo
    { name: "Inventory", size: 800 },
    { name: "Users", size: 300 },
    { name: "Invoices", size: 450 },
    { name: "Purchase", size: 700 }
  ];
};

function Diagram() {
  const [data, setData] = useState<{ name: string; size: number }[]>([]);

  useEffect(() => {
    const getData = async () => {
      const dbMetrics = await fetchDatabaseMetrics();
      setData(dbMetrics);
    };
    getData();
  }, []);

  const location = useLocation();
  return (
    <Dashboard currentPath={location.pathname} >
      <div className="p-6  ">
        <h2 className="text-2xl font-semibold text-gray-700 font-[Klapt]">Database Scale</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="size" fill="#8884d8" name="Taille (Mo)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Dashboard>
  );
}

export default Diagram;
