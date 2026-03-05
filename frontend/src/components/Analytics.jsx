import Charts from "./Charts";

export default function Analytics({ actualData, predictedData, selectedZone }) {

  const latestPrediction = predictedData
    .filter(p => p.zone_id === selectedZone)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  return (
    <div className="w-[60%] p-4">

      {/* Latest Prediction Card */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6 w-64">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
          Latest Prediction ({selectedZone})
        </h2>

        {latestPrediction ? (
          <p className="text-2xl font-bold text-orange-500">
            {latestPrediction.predicted_demand.toLocaleString()} L
          </p>
        ) : (
          <p className="text-gray-400">No prediction available</p>
        )}
      </div>

      {/* Chart */}
      <Charts
        actualData={actualData}
        predictedData={predictedData}
        selectedZone={selectedZone}
      />

    </div>
  );
}