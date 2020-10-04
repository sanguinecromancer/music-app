import React, { useState, useEffect } from "react";
import InfiniteLoading from "react-simple-infinite-loading";
import api from "./api";
import "./App.css";
import Song from './Song';
import { TiMediaRecordOutline } from "react-icons/ti";

function App() {
  
  const [songs, setSongs] = useState([]);
  const [songCount, setSongCount] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [keywords, setKeywords] = useState('');
  const [levels, setLevels] = useState([]);
  const [isOpened, setIsOpened] = useState(false);

  const onAppLoad = async () => {
    try {
      await searchSongs();
      const { data: favs } = await api.getFavorites();
      setFavorites(favs);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    onAppLoad();
  }, []);
  
  // search functionalities

  const searchSongs = async (keywords = '', levels = [], offset = 0) => {
    try {
      const { songs: results, count } = await api.fetchSongs(keywords, levels, offset);
      if (offset == 0) {
        setSongs(results);
      } else {
        setSongs([...songs, ...results]);
      }
      setSongCount(count);
    } catch (error) {
      console.log(error);
    }
  }
  
  function onKeywordsChange(event) {
    const newKeywords = event.target.value;
    setKeywords(newKeywords);
    searchSongs(newKeywords, levels);
  }
  
  function onLevelClick(level) {
    let newLevels;
    if (levels.includes(level)) {
      newLevels = levels.filter(l => l != level);
    } else {
      newLevels = [...levels, level];
    }
    setLevels(newLevels);
    searchSongs(keywords, newLevels);
  }  
  
  async function onInfiniteScrollTrigger() {
    return searchSongs(keywords, levels, songs.length);
  }

  // favourite functionalities

  const toggleFavorite = async (id) => {
    const favorite = favorites.find(f => f.songId == id);
    if (favorite) {
      setFavorites(favorites.filter(x => x.songId !== id));
      try {
        await api.deleteFromFavorites(favorite.id);
      }
      catch(e) {
        console.log(e);
      }
    }

    else {
      setFavorites([...favorites,  {songId: id}]);
      try {
        const response = await api.postFavorites(id);
        const favId = response.data.id;
        setFavorites(favorites => favorites.map(f => (f.songId == id) ? { ...f, id: favId } : f));
      }
      catch(e) {
        console.log(e);
      }
    }
  }

  //filter by level functionalities 

  function showOrHideFilters() {
    if (isOpened) {
      setLevels([]);
      searchSongs(keywords, []);
    }
    setIsOpened(!isOpened);
  }
    
  const renderFilters = () => {
    const arr = Array.from({ length: 15 }, (v, k) => k + 1);
    return (
      <div>
        {arr.map((level) => (
          <button
            key={level}
            className={`filterButton ${levels.includes(level) ? 'selected' : ''}`}
            onClick={() => onLevelClick(level) }>
            {level}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container header">
          <h1>New songs delivered every week</h1>
        
       
          <div className="search-bar"> 
            <input className="form-control" value={keywords} onChange={onKeywordsChange}></input>
           
          </div> 
      
          
      </div>
      <div className="filters">

            {isOpened && renderFilters()}
            <button className="filter-by" onClick={ showOrHideFilters }>FILTER BY LEVEL</button>
            
        </div>
      <div className="song-list">
        <InfiniteLoading
          hasMoreItems={songCount > songs.length}
          itemHeight={90}
          loadMoreItems={onInfiniteScrollTrigger}
          elementClassName="song-wrapper"
        >
          {songs.map((item) => (
            <Song
              key={item.id}
              song={item}
              isFavorite={favorites.find(x => x.songId == item.id)}
              onFavoriteChange={() => toggleFavorite(item.id)}
            />
          ))}
        </InfiniteLoading>
      </div>
    </div>
  );
}

export default App;
