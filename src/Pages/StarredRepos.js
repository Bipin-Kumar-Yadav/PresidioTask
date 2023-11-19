import React, { useEffect, useState } from "react";
import SingleRepo from "../Component/SingleRepo";

const StarredRepos = () => {
  const [starredRepos, setStarredRepos] = useState([]);
 const username = localStorage.getItem('githubId');
  useEffect(() => {
    const fetchStarredRepos = async () => {
      try {
        const token = "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";
        const response = await fetch(
          `https://api.github.com/users/${username}/starred`,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
        if (!response.ok) {
            throw new Error(`GitHub API request failed with status ${response.status}`);
          }
        const data = await response.json();
        
        setStarredRepos(data);
      } catch (error) {
        console.error("Error fetching starred repositories:", error);
        setStarredRepos([]); 
      }
    };

    if (username) {
      fetchStarredRepos();
    }
  }, [username]);

  if(!username){
    window.location.href = '/';
  }


  return (
    <div>
      {starredRepos.length === 0 ? (
        <p>No Repositories</p>
      ) : (
        <div>
        {
            starredRepos.map((repo)=>(<SingleRepo key={repo.id} repo={repo}/>))
        }
        </div>
      )}
    </div>
  );
};

export default StarredRepos;
