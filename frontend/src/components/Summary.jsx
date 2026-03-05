import React from 'react'

const Summary = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-4 rounded shadow">
            Avg Demand
        </div>

        <div className="bg-white p-4 rounded shadow">
            Peak Demand
        </div>

        <div className="bg-white p-4 rounded shadow">
            Lowest Demand
        </div>

    </div>
  )
}

export default Summary