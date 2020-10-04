
import React from 'react';
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const Song = ({ song, isFavorite, onFavoriteChange }) => {
  return (
    <div key={song.id} className="song-item">
      <div className="col-5">
        <img className="thumbnail" src={song.images} alt="..."></img>

              {song.artist} - {song.title}
        
          <span className="badge badge-primary badge-pill">{song.level}</span>

        <button onClick={onFavoriteChange}>
          {isFavorite ? <MdFavorite id="heart-full"/> : <MdFavoriteBorder id="heart-empty"/> } 
        </button>
      </div>
    </div>
  );
};

export default Song;
