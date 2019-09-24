import React, { Component } from "react";
import Search from './Search'

class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      results: [],
      currentAlbum: [],
      currentTrack: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillUpdate() {
    // in case i need to catch something before updating
  }
  componentDidUpdate(prevProps, prevState) {
    // updates the current station display box only if one is selected
      // const url = this.state.albums[0].image
      console.log(this.state.results);
      console.log(this.state.albums);
      console.log(this.state.currentAlbum);
      // return <img
      //      src={url}
      //      className="radio-box__album-image"
      //     alt="sadie"
      //    />
  }
  handleClick(e) {
    console.log(e.currentTarget);
    const currentAlbum = this.state.results.find((x) => {
        return x.id === e.currentTarget.id
      });
    console.log(currentAlbum);
    this.setState({
      currentAlbum: currentAlbum
    });
    // updates the state by using id stored in target props as index
  }

  handleSearch(p) {
    this.setState({
      results: p
    })
  }
  componentDidMount() {
    const handleErrors = response => {
      if (!response.ok)
        console.error(`${response.status}: ${response.statusText}`);
      return response.json();
    };
    // fetches API once component is mounted
    fetch(
      "https://api.jamendo.com/v3.0/albums/tracks/?client_id=3cbc4327&format=jsonpretty"
    )
      .then(handleErrors)
      .then(results => {
         this.setState({ albums: results.results });
         console.log(this.props.children)
      });
  }

  render() {
    // uses index of the map as an id for each station
     const albums = this.state.results.map((album, index) => (
      <li
        className="radio-box__station"
        id={album.id}
        key={album.id}
        name={album.name}
        onClick={this.handleClick}
      >
        <div className="station-overflow flex-center-x">
          <img
            src={album.image}
            className="radio-box__album-image"
            alt={album.name}
          />
        </div>
      </li>
     ));

    return (
      <div>
        <div className="radio-box">
          <div className="search">
            <div className="search__header">
              <i class="fas fa-chevron-left"></i>
              Radio Player
              <i class="fas fa-ellipsis-v"></i>
            </div>
            <Search myClick={this.onClick} setState={p => {this.handleSearch(p)}}/>
          </div>
          <div className="radio-box__shell">
            <div className="overflow">
              <ul id="radio-box__radio-list">{albums}</ul>
            </div>
          </div>
          <div className="radio-box__now-playing">
            <div className="radio-box__current-album">
              <img src={this.state.currentAlbum.image} className="radio-box__album-image"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Radio;

