import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../utils/api";
import NavTabs from "./NavTabs";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sortBy: "popularity.desc"
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies = () => {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sortBy}`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results
        });
      });
  };

  updateSortBy = value =>
    this.setState({
      sortBy: value
    });

  removeItem = movie => {
    this.setState({
      movies: this.state.movies.filter(item => item.id !== movie.id)
    });
  };

  willWatchItem = movie => {
    const updatedWillWatch = [...this.state.moviesWillWatch, movie];
    this.setState({
      moviesWillWatch: updatedWillWatch
    });
  };

  removeMovieFromWillWatch = movie => {
    this.setState({
      moviesWillWatch: this.state.moviesWillWatch.filter(
        item => item.id !== movie.id
      )
    });
  };

  componentDidUpdate(prevProps, prevStates) {
    if (prevStates.sortBy !== this.state.sortBy) {
      this.getMovies();
    }
  }

  render() {
    return (
      <div className="card text-center">
        <div className="card-header">
          <NavTabs
            sortBy={this.state.sortBy}
            updateSortBy={this.updateSortBy}
          />
        </div>
        <div className="card-body">
          <div className="container">
            <div className="row mt-4">
              <div className="col-9">
                <div className="row">
                  {this.state.movies.map(movie => {
                    return (
                      <div className="col-4 mb-4" key={movie.id}>
                        <MovieItem
                          movie={movie}
                          removeItem={this.removeItem}
                          willWatchItem={this.willWatchItem}
                          removeMovieFromWillWatch={
                            this.removeMovieFromWillWatch
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-3">
                <h4>Will Watch: {this.state.moviesWillWatch.length} movies</h4>
                <ul className="list-group">
                  {this.state.moviesWillWatch.map(movie => (
                    <li key={movie.id} className="list-group-item">
                      <div className="d-flex justify-content-between">
                        <p>{movie.title}</p>
                        <p>{movie.vote_average}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
