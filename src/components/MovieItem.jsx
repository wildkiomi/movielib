import React, { Component } from "react";
import { image_path as IMAGE_PATH } from "../utils/constants";

class MovieItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      willWatch: false
    };
  }
  render() {
    const {
      movie,
      removeItem,
      willWatchItem,
      removeMovieFromWillWatch
    } = this.props;
    return (
      <div className="card">
        <img
          className="card-img-top"
          src={`${IMAGE_PATH}${movie.backdrop_path || movie.poster_path}`}
          alt={movie.title}
        />
        <div className="card-body">
          <p className="catd-title">{movie.title}</p>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-primary btn-sm"
              onClick={removeItem.bind(this, movie)}
            >
              Remove movie
            </button>
            <button
              className={
                this.state.willWatch
                  ? "btn btn-success btn-sm"
                  : "btn btn-secondary btn-sm"
              }
              onClick={() => {
                this.state.willWatch
                  ? removeMovieFromWillWatch(movie)
                  : willWatchItem(movie);
                this.setState({ willWatch: !this.state.willWatch });
              }}
            >
              {this.state.willWatch
                ? "Remove from will watch"
                : "Add to will watch"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieItem;
