import React, { useEffect, useState } from "react";
import BankTable from "./bankTable";
import ListGroup from "./common/listGroup";
import SelectGroup from "./common/select";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./common/searchBox";

function MainPage() {
  const [data, setdata] = useState([]);
  const [cities, setcities] = useState([
    "COIMBATORE",
    "MUMBAI",
    "THANE",
    "CHENNAI",
    "ERODE",
  ]);
  const [currentPage, setcurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(500);
  const [selectedCity, setselectedCity] = useState("COIMBATORE");
  const [sortColumn, setsortColumn] = useState();
  const [searchQuery, setsearchQuery] = useState("");

  const options = [
    {
      label: "500",
      value: 500,
    },
    {
      label: "600",
      value: 600,
    },
    {
      label: "700",
      value: 700,
    },
    {
      label: "800",
      value: 800,
    },
  ];

  useEffect(() => {
    handleDataFromApi();
  }, [data, selectedCity, currentPage, pageSize, searchQuery]);

  function handleDataFromApi() {
    fetch(`https://vast-shore-74260.herokuapp.com/banks?city=${selectedCity}`)
      .then((result) => result.json())
      .then((result) => populateData(result))
      .catch((err) => console.log(err));
  }

  function populateData(data) {
    const query = searchQuery.trim();
    const filteredData = [];
    if (query.length === 0) return setdata(data);
    data.forEach((datum) => {
      for (const key in datum) {
        let value = datum[key].toString();
        if (value.includes(query)) {
          filteredData.push(datum);
          break;
        }
      }
    });
    setdata(filteredData);
  }

  function handleSelectCity(city) {
    console.log(city);
    setselectedCity(city);
  }

  function handlePageChange(page) {
    setcurrentPage(page);
  }

  function handlePageSizeChange(size) {
    setPageSize(size);
  }

  function getPagedData() {
    const banks = paginate(data, currentPage, pageSize);
    return { totalCount: data.length, banks };
  }

  function handleSearch(value) {
    setsearchQuery(value);
  }

  const { totalCount, banks } = getPagedData();

  return (
    <div style={{ margin: 20 }}>
      <h1 style={{ textAlign: "center" }}>
        {totalCount > 0
          ? `There are ${totalCount} banks in ${selectedCity} city`
          : "There are no such BANKS"}
      </h1>
      <div className="row">
        <div className="col-3">
          <h3>Cities</h3>
          <ListGroup
            items={cities}
            selectedItem={selectedCity}
            onItemSelect={handleSelectCity}
          />
        </div>
        <div className="col-3">
          <Pagination
            currentPage={currentPage}
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={(page) => handlePageChange(page)}
          />
          <div className="col">
            <SelectGroup
              pageSize={pageSize}
              setPageSize={handlePageSizeChange}
              options={options}
            />
          </div>
          <div className="col">
            <SearchBox onChange={handleSearch} value={searchQuery} />
          </div>
          {totalCount > 0 && (
            <BankTable movies={banks} sortColumn={sortColumn} />
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
