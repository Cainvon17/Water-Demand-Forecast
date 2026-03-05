import React from 'react'

const Topbar = () => {
  return (
    <div className="h-14 bg-white dark:bg-gray-800 flex items-center justify-between px-6 shadow">
    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
      Water Demand Analytics
    </h1>

    <div className="flex gap-4 items-center">
        <button>🌙</button>
        <button>👤</button>
    </div>
    </div>
  )
}

export default Topbar