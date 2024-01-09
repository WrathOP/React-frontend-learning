import React, { useEffect, useState } from 'react';
import './TableComponent.css';

const headerMapping = {
  web_pages: 'Web Pages',
  alpha_two_code: 'Conutry Code',
  domains: 'Domains',
  'state-province': 'State/Province',
  country: 'Country',
  name: 'University Name'
};

function UniversityTable() {
  const [universityInfo, setUniversityInfo] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filterParam, setFilterParam] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://universities.hipolabs.com/search?country=United+States");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setUniversityInfo(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
  }


  const filteredUniversityInfo = universityInfo.filter((university) => {
    if (filterParam === "All") {
      return university;
    }
    return university["state-province"] === filterParam;

    //won't work just coding out thoughts
  });


  const searchUniInfo = universityInfo.filter((university) => {
    const values = Object.values(university).join(' ').toLowerCase();
    return values.includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <h1>University Table</h1>
      <div className="university-table-container">
        {/* Search input field */}
        <input
          className='search-input'
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          onChange={(e) => {
            setFilterParam(e.target.value);
          }}
          className="custom-select">
          <option value="All">Filter By State</option>
          <option value="Africa">Texas</option>
          <option value="Americas">Pennsylvania</option>
          <option value="Asia">Utah</option>
          <option value="Europe">Ohio</option>
          <option value="Oceania">End of knowledge</option>
        </select>

        {isLoading ? (
          <p>Loading...</p> // Display loading message while data is being fetched
        ) : (
          <table className="university-table">
            <thead>
              <tr>
                {universityInfo.length > 0 &&
                  Object.keys(universityInfo[0]).map((key) => (
                    <th key={key}>{headerMapping[key]}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {searchUniInfo.length > 0 ? (
                searchUniInfo.map((university, index) => (
                  <tr key={index}>
                    {Object.values(university).map((value, subIndex) => (
                      searchQuery.length > 0 ? <td key={subIndex} dangerouslySetInnerHTML={{ __html: highlightText(String(value), searchQuery) }} /> : <td key={subIndex}>{value}</td>))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={Object.keys(headerMapping).length}>
                    <p>no results</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default UniversityTable;
