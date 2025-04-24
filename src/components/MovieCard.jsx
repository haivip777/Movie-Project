import React from 'react'

// const getRandomRating = () => {
//   return (Math.random() * 5 + 5).toFixed(1);
// };

const MovieCard = ({movie: 
  {Title, Year, Poster}
}) => {
  return (
    <div className='movie-card'>
      <img src={Poster !== 'N/A' ? Poster : '/no-movie.png'} alt={Title} />
      <div className="mt-4">
        <h3>{Title}</h3>
        <div className="content">
          <div className="rating">
            <img src="./star.svg" alt="Star Icon" />
            <p>9.0</p>
          </div>
          <span>•</span>
          <p className='lang'>En</p>
          <span>•</span>
          <p className='year'>{Year}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard