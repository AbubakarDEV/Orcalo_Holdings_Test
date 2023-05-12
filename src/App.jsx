import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import "./App.css";

// Column in table
const columns = [
  { field: "name", headerName: "name", width: 200 },
  { field: "email", headerName: "email", width: 200 },
  { field: "imageUrl", headerName: "imageUrl", width: 200 },
  { field: "id", headerName: "id", width: 200 },
  { field: "date_of_birth", headerName: "date_of_birth", width: 200 },
];

function App() {
  const [apiResponseData, setApiResponseData] = useState([]);
  const [searchText, setSearchText] = useState("");

  // fetch Api
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await fetch(
          "https://mock-api.mortgagebasket.co.uk/v1/users?pageSize=100"
        );
        const jsonData = await response.json();
        setApiResponseData(jsonData);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchApiData();
  }, []);

  // Search handle for name
  const handleSearchText = (e) => {
    const value = e?.target?.value;
    setSearchText(value);
  };

  // Filter rows on the basis of name
  const filteredRows = apiResponseData?.data?.filter((row) =>
    row.name.toLowerCase().includes(searchText?.toLowerCase())
  );

  return (
    <>
      <h1>Hello Orcalo Holdings React Js Test By Abubakar</h1>
      <TextField
        value={searchText}
        onChange={handleSearchText}
        placeholder="Filter by Name"
        style={{ width: "100%", marginBottom: 20 }}
      />
      {apiResponseData?.data?.length > 1 && (
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      )}
    </>
  );
}

export default App;
