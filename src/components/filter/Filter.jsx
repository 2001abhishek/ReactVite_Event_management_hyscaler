import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';

function Filter() {
    const context = useContext(myContext);
    const { mode, searchkey, setSearchkey, filterType, setFilterType,
        product, resetSearchKey, resetFilterType } = context;

    const handleResetFilter = () => {
        resetSearchKey(); // Function to reset search key
        resetFilterType(); // Function to reset filter type
    };

    const categories = [...new Set(product.map(item => item.category))];

    return (
        <div className='container mx-auto  py-1'>
            <div className={`p-2 rounded-lg border ${mode === 'dark' ? 'bg-gray-600 border-gray-700 text-white' : 'bg-gray-100 border-gray-200 text-gray-900'}`}>
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            name="searchkey"
                            id="searchkey"
                            value={searchkey}
                            onChange={e => setSearchkey(e.target.value)}
                            placeholder="Search"
                            className="px-4 py-2 w-full max-w-xs rounded-md border border-transparent bg-gray-200 text-sm focus:outline-none focus:border-indigo-500"
                            style={{ backgroundColor: mode === 'dark' ? '#2d2d2d' : '#f5f5f5', color: mode === 'dark' ? 'white' : 'black' }}
                        />
                    </div>

                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className={`px-4 py-2 rounded-md border border-transparent bg-gray-200 text-sm focus:outline-none focus:border-indigo-500 ${mode === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                    >
                        <option value="" disabled hidden>Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>

                    <button
                        onClick={handleResetFilter}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${mode === 'dark' ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Filter;
