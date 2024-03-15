import './SortDropdown.css'
import React from 'react';

const SortDropdown = ({ sortBy, sortOrder, handleSortChange }) => {
  return (
    <div className="sorting-controls">
      <select className="sort-dropdown-select" name="sortBy" value={sortBy} onChange={handleSortChange}>
        <option value="created_at">Date</option>
        <option value="comment_count">Comment Count</option>
        <option value="votes">Votes</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>
      <select className="sort-dropdown-select" name="sortOrder" value={sortOrder} onChange={handleSortChange}>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
};

export default SortDropdown;