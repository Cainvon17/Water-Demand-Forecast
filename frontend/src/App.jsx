import { useEffect, useState } from "react";
import axios from "axios";

import Analytics from "./components/Analytics";
import MapPanel from "./components/MapPanel";
import Topbar from "./components/Topbar";

export default function App() {

  const [actualData, setActualData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);
  const [selectedZone, setSelectedZone] = useState("Z1");

  useEffect(() => {
    axios.get("http://localhost:5000/api/water-demand")
      .then(res => setActualData(res.data));

    axios.get("http://localhost:5000/api/predictions")
      .then(res => setPredictedData(res.data));
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-100 dark:bg-gray-900">

      <Topbar />

      {/* Main Content */}
      <div className="flex h-[calc(100vh-56px)]">

        {/* Map Panel (40%) */}
        <MapPanel
          selectedZone={selectedZone}
          setSelectedZone={setSelectedZone}
        />

        {/* Analytics Panel (60%) */}
        <Analytics
          actualData={actualData}
          predictedData={predictedData}
          selectedZone={selectedZone}
        />

      </div>
    </div>
  );
}