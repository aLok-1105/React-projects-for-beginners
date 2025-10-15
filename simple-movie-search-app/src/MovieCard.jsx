import React, { useState } from "react";


const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type }, onClick }) => {
  return (
    <div className="movie cursor-pointer" onClick={onClick}>
      <div>
        <p>{Year}</p>
      </div>

      <div>
        <img
          src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"}
          alt={Title}
        />
      </div>
const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(!modal);
  };


  return (
    <>
      <div className="movie" key={imdbID} onClick={openModal}>
        <div>
          <p>{Year}</p>
        </div>
        <div>
          <img
            src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"}
            alt={Title}
          />
        </div>
        <div>
          <span>{Type}</span>
          <h3>{Title}</h3>
        </div>
      </div>

      {modal && (
        <div className="modal-container">
          <div className="card">
            <button
              className="btn"
              onClick={openModal}
            >
              &times;
            </button>
            <div>
              <img
                src={
                  Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"
                }
                alt={Title}
                style={{ width: "100%", borderRadius: "4px" }}
              />
            </div>
            <div className="card-details">
              <h2>{Title}</h2>
              <p>
                <strong>Year:</strong> {Year}
              </p>
              <p>
                <strong>Type:</strong> {Type}
              </p>
              <p>
                <strong>IMDB ID:</strong> {imdbID}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
