import React from 'react';

const SearchFilter = ({ searchQuery, setSearchQuery, category, setCategory }) => {
  const categories = ['All', 'Chicken', 'Lamb', 'Fish'];

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select value={category} onChange={(e) => setSearchQuery(e.target.value)}>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilter;
