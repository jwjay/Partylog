import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function SearchFriend() {

  
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const accessToken = localStorage.getItem("access-token");
  
  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value.length === 0) { // 검색창에 입력된 것이 없으면 검색하지 않음
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(`${SERVER_API_URL}/user/searchUser/${e.target.value}/10/0`, { 
        headers: {
          'Authorization': `${accessToken}`
        }
      });
      setSearchResults(response.data.data); 
    } catch (error) {
      console.error("An error occurred while fetching the data", error);
    }
  };

  const handleAutocompleteChange = (event, newValue) => {
    if (newValue) {
      window.location.href = `/user/${newValue.user_no}`;
    }
  };
 
  return (
    <div>
      <Autocomplete
        options={searchResults}
        getOptionLabel={(option) => option.user_nickname}
        fullWidth
        onChange={handleAutocompleteChange} // 항목 선택 변경 시
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="친구 검색"
            value={searchTerm}
            onChange={handleSearch}
            variant="outlined"
            fullWidth
            style={{ fontFamily: "MaplestoryOTFLight" }}
          />
        )}
        renderOption={(props, option) => (
          <Link key={option.user_no} to={`/user/${option.user_no}`} className="myLink">
            <li {...props}>
              {option.user_nickname}
            </li>
          </Link>
        )}
      />
    </div>
  );
}
