import React, { useState } from "react";
import SingleRepo from "../Component/SingleRepo";
import "./FetchRepo.css";
const FetchRepo = () => {
  const [searchKey, setSearchKey] = useState();
  const [sortOption, setSortOption] = useState();
  const [languageFilter, setLanguageFilter] = useState();
  const [repositories, setRepositoires] = useState([]);
  
  const username = localStorage.getItem('githubId');
  const handleSearch = async () => {
    try {
      let url;
      const encodedSearchKey = encodeURIComponent(searchKey);
      console.log(searchKey, " ", sortOption, " ", languageFilter);
      if (!sortOption && !languageFilter) {
        url = `https://api.github.com/search/repositories?q=${encodedSearchKey}`;
      } else if (!languageFilter) {
        const sort = sortOption.split("_")[0];
        const order = sortOption.split("_")[1];
        url = `https://api.github.com/search/repositories?q=${encodedSearchKey}&sort=${sort}&order=${order}`;
      } else {
        const sort = sortOption.split("_")[0];
        const order = sortOption.split("_")[1];
        url = `https://api.github.com/search/repositories?q=${encodedSearchKey}+language:${languageFilter}&sort=${sort}&order=${order}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setRepositoires(data.items);
    } catch (error) {
      console.log(error);
    }
  };
  if(!username){
    window.location.href = '/';
  }

  return (
    <div className="fetch-container">
      <div className="topfetch-container">
       <div className="sort">
       <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="best match">Best Match</option>
          <option value="stars_desc">Most stars</option>
          <option value="stars_asc">Fewest stars</option>
          <option value="forks_desc">Most forks</option>
          <option value="forks_asc">Fewest forks</option>
          <option value="updated_desc">Recently updated</option>
          <option value="updated_insc">Least recently updated</option>
        </select>
       </div>
        <input
          className="filter_lang"
          type="text"
          placeholder="Filter by Language"
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
        />
        <div className="search_bar">
          <input
            type="text"
            placeholder="Find a Repository"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="toggle-container">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className ="te"
        >
          <option value="best match">Best Match</option>
          <option value="stars_desc">Most stars</option>
          <option value="stars_asc">Fewest stars</option>
          <option value="forks_desc">Most forks</option>
          <option value="forks_asc">Fewest forks</option>
          <option value="updated_desc">Recently updated</option>
          <option value="updated_insc">Least recently updated</option>
        </select>
        <input
          className="te ti"
          type="text"
          placeholder="Filter by Language"
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
        />
        <div className="toggle_search_bar">
          <input
            type="text"
            placeholder="Find a Repository"
            className="te ti"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button className="te tb" onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div class="fetch_main">
      {repositories.length === 0 ? (
        <p className="fetch_p">Explore GitHub repositories by entering relevant keywords. Simply type your search query, hit enter, and dive into a world of code. Discover, contribute, and stay connected with the vast GitHub community.</p>
      ) : (
        <div>
          <p className="fetch_p">{repositories.length} Results</p>
          {repositories.map((repo) => (
            <SingleRepo key={repo.id} repo={repo} />
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default FetchRepo;
