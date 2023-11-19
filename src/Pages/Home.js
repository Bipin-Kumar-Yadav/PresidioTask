import React, { useState } from 'react';
import Trending from './Trending';
import './Home.css';

const Home = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const userid = localStorage.getItem('githubId');

  const validateAndStoreUsername = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.ok) {
        localStorage.setItem('githubId', username);
        setError('');
        setUsername('');
        window.location.href = '/trending';
      } else {
        setError('Invalid GitHub username. Please enter a valid username.');
      }
    } catch (error) {
      console.error('Error validating GitHub username:', error);
      setError('An error occurred while validating the username.');
    }
  };

  return (
    <div className='home_main'>
      {!userid ? (
        <div className="home_main_div">
          <label className='home_lab'>
            <div>
              <p className='home_p'>Enter GitHub Username:</p>
              <input
                type='text'
                value={username}
                className='home_in'
                placeholder='Enter Your Github Username'
                onChange={(e) => setUsername(e.target.value)}
              />
              <button className='home_btn' onClick={validateAndStoreUsername}>
                Authenticate
              </button>
              {error && <p className='error-message'>{error}</p>}
            </div>
          </label>
        </div>
      ) : (
        <Trending />
      )}
    </div>
  );
};

export default Home;
