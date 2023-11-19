import { Routes,Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar/Navbar'
import Home from './Pages/Home';
import Trending from './Pages/Trending';
import FetchRepo from './Pages/FetchRepo';
import StarredRepos from './Pages/StarredRepos';
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/trending' element={<Trending/>} />
        <Route path='/fetchRepo' element={<FetchRepo/>} />
        <Route path='/starred' element={<StarredRepos/>} />
      </Routes>
    </>
  );
}

export default App;
