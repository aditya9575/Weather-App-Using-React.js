import React, { useState } from "react";

import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";


//we will have the function passed from the parent component here as an argument and we'll call it inside onSearchChange and give data 
// to it 
const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    // here we make the api call to the endpoint of rapid api to fetch the details as needed
    // this inputValue is the value that is used inside the input and now we hit our url 
    return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
     .then(response => response.json())
     .then((response) => {
      if (!response) {
        return { options: [] }; // Return an empty array if response is undefined
      }
      return {
        options: response.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name} ${city.countryCode}`,
        })),
      };
     })
     .catch(error => console.error(error));
     
  };

  //search data that is passed here is nothing but the data that we will enter in our asyncpaginate component
  //onSearchChange(searchData) is the function passed in to us in the search component from the parent component and the search 
  // data is the data being entered in our paginate component 
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <div>
      {/* this asyncpaginate creates a search bar and will have various parameters */}
      <AsyncPaginate
        placeholder="Search for city"
        //we assigned this debouce time as if a user starts tapping onto the fetching/searching part continuously so it may lead to
        //slowing down of the application as of the continouse fetch api call being made to retrieve the data from the provider 
        //hence debounce time will make the user wait for a preset time before allowing him to hit the search call again
        debounceTimeout={600}
        value={search}
        //this will only show some output when we will start fetching the data as soon as we start searching 
        onChange={handleOnChange}
        //to display the output we call in the loadoptions method to display the inputs available through an async request 
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default Search;

// this component will be using the async paginate package
