import React, { Component } from "react";

class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    // updates the current station display box only if one is selected
  }
  handleClick(e) {
    // updates the state by using id stored in target props as index
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
        console.log(results);
        // this.setState({ stations: results.radios })
      });
  }

  render() {
    // uses index of the map as an id for each station
    // const stations = this.state.stations.map((station, index) => (
    //   <li
    //     className="radio-box__station"
    //     id={index}
    //     key={index}
    //     onClick={this.handleClick}
    //   >
    //     <div className="flex-vert-align">
    //       <span>{station.name}</span> <span>{station.frequency}</span>
    //     </div>
    //     <div className="station-overflow hidden flex-center-x">
    //       <div className="plus">+</div>
    //       <img
    //         src={station.image}
    //         className="radio-box__station-image"
    //         alt={station.name}
    //       />
    //       <div className="minus">-</div>
    //     </div>
    //   </li>
    // ));

    return (
      <div>
        <div className="radio-box">
          <div className="radio-box__header flex-vert-align">
            <h1>stations</h1>
          </div>
          <div className="radio-box__shell">
            {/* <ul id="radio-box__radio-list">{stations}</ul> */}
          </div>
          <div className="radio-box__current-station" />
        </div>
      </div>
    );
  }
}

export default Radio;

