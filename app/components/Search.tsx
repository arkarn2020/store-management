export default function Search({ setSearchTerm }) {
  return (
    <div className="mb-6">
      <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
        Search orders by customer name
      </label>
      <input
        id="search"
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter customer name"
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
      />
    </div>
  )
}

