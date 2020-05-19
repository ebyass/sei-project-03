import React from 'react'

const searchInput = ({ handleFilterChange, searchTerm }) => (
	<div>
		<input
		className="input"
		onChange={handleFilterChange}
		name="searchTerm"
		value={searchTerm}
		/>
	</div>
)

export default searchInput