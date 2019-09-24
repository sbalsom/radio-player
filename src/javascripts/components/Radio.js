import React, { Component } from "react";
import Search from './Search'

class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      results: [],
      currentAlbum: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  // componentWillUpdate() {
  //   // in case i need to catch something before updating
  // }
  componentDidUpdate(prevProps, prevState) {
    // updates the current station display box only if one is selected
      // console.log(this.state.results);
      // console.log(this.state.albums);
      console.log(this.state.currentAlbum);

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

     // let firstTrack = ''
     // if(this.state.currentAlbum.tracks) {
     //  firstTrack = this.state.currentAlbum.tracks[0].name
     // }
     // dynamic download button
     let downloadButton = ''
     if(this.state.currentAlbum !== null) {
      downloadButton = <a href={this.state.currentAlbum.zip}>
      <i className="fas fa-download download-button"></i></a>
     }
     // dynamic album info
     let currentAlbumInfo = ''
      if(this.state.currentAlbum !== null) {
        currentAlbumInfo = <>
          <h3>{this.state.currentAlbum.name}</h3>
          <h4>{this.state.currentAlbum.artist_name}</h4>
        </>
      }
      // dynamic album image
      let albumImage = ''
      if(this.state.currentAlbum !== null) {
        albumImage = <img src={this.state.currentAlbum.image} className="radio-box__album-image now-playing__album-image"/>
      }

    return (
      <div>
        <div className="radio-box">
          <div className="search">
            <div className="search__header">
              <i className="fas fa-chevron-left"></i>
              Search By Album
              <i className="fas fa-ellipsis-v"></i>
            </div>
            <div className="flex-center-x ">
              <Search myClick={this.onClick} setState={p => {this.handleSearch(p)}}/>
            </div>
          </div>
          <div className="radio-box__shell">
          <div className="radio-box__actions"></div>
            <div className="overflow">
              <ul id="radio-box__radio-list">{albums}</ul>
            </div>
          </div>
          <div className="radio-box__now-playing">
            <div className="now-playing__buttons">
            {downloadButton}
            </div>
            <div className="now-playing__album flex">
              {albumImage}
              <div className="now-playing__album-info">
                {currentAlbumInfo}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Radio;

