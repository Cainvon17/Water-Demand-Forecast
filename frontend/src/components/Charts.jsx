import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function Charts({ actualData, predictedData, selectedZone }) {

  const actualFiltered =
    actualData.filter(d => d.zone_id === selectedZone);

  const predictedFiltered =
    predictedData.filter(d => d.zone_id === selectedZone);

  const mergedData = actualFiltered.map(a => {
    const match = predictedFiltered.find(
      p => p.date === a.date
    );

    return {
      date: a.date,
      actual: a.demand_liters,
      predicted: match ? match.predicted_demand : null
    };
  });

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={mergedData}>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="actual"
            stroke="#2563eb"
            name="Actual Demand"
          />

          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#f97316"
            name="Predicted Demand"
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}