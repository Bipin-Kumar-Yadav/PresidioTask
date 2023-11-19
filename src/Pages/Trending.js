import React, { useEffect, useState } from 'react'
import SingleRepo from '../Component/SingleRepo';
import './Trending.css'

const Trending = () => {
    const [popularRepo,setPopularRepo] = useState([]);
  
    useEffect(() => {
        const apiUrl = 'https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&per_page=20';
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            const repositories = data.items || [];
            setPopularRepo(repositories);
            console.log(popularRepo)
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);


  return (
    <div className='pop_container'>
      {
        popularRepo.length === 0 ? (
        <p className='not_found'>No popular repositories available.</p>
      ) : (
        <div>
            {
                popularRepo.map((repo)=>(
                    <SingleRepo key={repo.id} repo={repo}/>
                ))
            }
        </div>        
      )
      }
    </div>
  )
}

export default Trending
