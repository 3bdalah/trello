export default function UnderProgress() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"> {/* Center horizontally and vertically */}
        <div className="mb-4 text-3xl font-semibold text-green-600"> {/* Change text color to green */}
          Under Development
        </div>
        <div className="text-gray-600">
          This component is still in development. Check back later for updates.
        </div>
      </div>
    </div>
  )
}
