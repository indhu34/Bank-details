import React from "react";

const SelectGroup = ({ pageSize, setPageSize, options }) => {
  const handlePageSize = (e) => {
    setPageSize(e.target.value);
  };

  return (
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect01">
          Select Page Size
        </label>
      </div>
      <select
        className="custom-select"
        id="inputGroupSelect01"
        value={pageSize}
        onChange={handlePageSize}
      >
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectGroup;

{
  /* <div class="input-group mb-3">
  <div class="input-group-prepend">
    <label class="input-group-text" for="inputGroupSelect01">
      Select Page Size
    </label>
  </div>
  <select className="custom-select" id="inputGroupSelect01" value={pageSize} onChange={handlePageSize}>
    {options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
  </select>
</div>; */
}
