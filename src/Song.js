
import React from 'react';
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const Song = ({ song, isFavorite, onFavoriteChange }) => {
  return (
    <li key={song.id} className="song-item">
      <div className="col-md-5 item-wrapper">
        <img className="thumbnail" src={song.images} alt="..."></img>
        <div className="col-sm-6 title">
          <div className="songname">{song.title}</div>
          <div className="artist">  {song.artist} </div>
        </div>
        
        <div className="col-sm-6 icons">
            
        
          <button className="filterButton">{song.level}</button>

          <div className="favorite" onClick={onFavoriteChange}>
          {isFavorite ? <MdFavorite id="heart-full"/> : <MdFavoriteBorder id="heart-empty"/> } 
          </div> 
        </div>
      </div>
    </li>

  );
};

export default Song;
