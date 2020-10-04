
import React from 'react';
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const Song = ({ song, isFavorite, onFavoriteChange }) => {
  return (
    <div key={song.id} className="song-item">
    <div className="col-5">

      <li className="list-group-item d-flex justify-content-between align-items-center">
        <div>
        
         <div className="thumbnail">
           <img src={song.images} alt="..."></img>
         </div> 
        
          {song.artist} - {song.title}
        
          <span className="badge badge-primary badge-pill">{song.level}</span>
        </div>

        <button onClick={onFavoriteChange}>
          {isFavorite ? <MdFavorite id="heart-full"/> : <MdFavoriteBorder id="heart-empty"/> } 
        </button>
      </li>
    
    </div>
  </div>
  );
};

export default Song;
