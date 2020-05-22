import React from 'react'

const searchInput = ({ handleFilterChange, searchTerm }) => (
  <form>
    <div className="field">
      <div className="control">
      <input
        className="input is-fullwidth"
        placeholder="Search"
        onChange={handleFilterChange}
        name="searchTerm"
        value={searchTerm}
      />
      </div>
    </div>
  </form>
)

export default searchInput