import React from 'react'

const MapPanel = () => {
  return (
    <div className="w-[40%] border-r p-3">
        
        <div className="flex justify-end mb-2">
        <select className="border p-2 rounded">
            <option>All Zones</option>
            <option>Z1</option>
            <option>Z2</option>
            <option>Z3</option>
        </select>
        </div>

        <div className="h-full bg-gray-200 rounded">
        {/* CityMap here */}
        </div>

    </div>
  )
}

export default MapPanel