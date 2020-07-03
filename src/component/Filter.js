import React from "react";

const Filter = ({ showFilter, setShowFilter }) => {
  const filteredPerson = (event) => {
    setShowFilter(event.target.value);
  };

  return (
    <div>
      filter shown with <input value={showFilter} onChange={filteredPerson} />
    </div>
  );
};

export default Filter;
