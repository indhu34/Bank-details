import React, { Component } from "react";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    { path: "bank_name", label: "BANK NAME" },
    { path: "ifsc", label: "IFSC" },
    { path: "branch", label: "BRANCH" },
    { path: "address", label: "ADDRESS" },
  ];

  constructor() {
    super();
  }

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
