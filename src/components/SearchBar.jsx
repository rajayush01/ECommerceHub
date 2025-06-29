export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-500 group-hover:bg-white/80 group-hover:border-indigo-200/50">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <div className="relative">
            <svg className="h-6 w-6 text-gray-400 group-hover:text-indigo-500 transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div className="absolute inset-0 bg-indigo-400 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
        </div>
        
        <input
          className="w-full pl-16 pr-16 py-5 bg-transparent rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 placeholder-gray-400 text-gray-700 font-medium text-lg group-hover:placeholder-gray-500"
          type="text"
          placeholder="Search for amazing products..."
          value={value}
          onChange={e=>onChange(e.target.value)}
        />
        
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 pr-6 flex items-center group/clear"
          >
            <div className="relative w-8 h-8 bg-gray-100 hover:bg-red-100 rounded-full flex items-center justify-center transition-all duration-300 group-hover/clear:scale-110 group-hover/clear:bg-red-100">
              <svg className="h-4 w-4 text-gray-500 group-hover/clear:text-red-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <div className="absolute inset-0 bg-red-400 rounded-full blur opacity-0 group-hover/clear:opacity-20 transition-opacity duration-300"></div>
            </div>
          </button>
        )}
        
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
      </div>
      
      {!value && (
        <div className="absolute top-full left-0 right-0 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/30">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="font-medium">Popular searches:</span>
              <div className="flex space-x-2">
                {['Electronics', 'Fashion', 'Home', 'Sports'].map((tag, i) => (
                  <span 
                    key={tag}
                    className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium cursor-pointer hover:from-indigo-200 hover:to-purple-200 transition-all duration-300 hover:scale-105"
                    onClick={() => onChange(tag)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
