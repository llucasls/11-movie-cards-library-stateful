import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';
import MovieList from './MovieList';

class MovieLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies: props.movies,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBookmarkChange = this.handleBookmarkChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ searchText: event.target.value });
  }

  handleGenreChange(event) {
    this.setState({ selectedGenre: event.target.value });
  }

  handleBookmarkChange(event) {
    this.setState({ bookmarkedOnly: event.target.checked });
  }

  // handleMovies(event) {
  //
  // }

  submitMovie({ target }) {
    const movieInfo = target.parentNode;
    // sessionStorage.setItem('movie', JSON.stringify(this.state));
  }

  render() {
    const {
      searchText, bookmarkedOnly,
      selectedGenre,
    } = this.state;
    let { movies } = this.props;
    movies = movies.filter((movie) => (
      movie.title.includes(searchText)
      || movie.subtitle.includes(searchText)
      || movie.storyline.includes(searchText)
    ));
    movies = bookmarkedOnly ? [movies[0]] : movies;
    movies = movies.filter((movie) => (
      movie.genre.includes(selectedGenre)
    ));
    return (
      <div>
        <AddMovie onClick={ this.submitMovie } />
        <SearchBar
          searchText={ searchText }
          onSearchTextChange={ this.handleTitleChange }
          bookmarkedOnly={ bookmarkedOnly }
          onBookmarkedChange={ this.handleBookmarkChange }
          selectedGenre={ selectedGenre }
          onSelectedGenreChange={ this.handleGenreChange }
        />
        <MovieList movies={ movies } />
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default MovieLibrary;
