import React, { Component } from 'react';

class Search extends Component {
 constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

 handleInputChange() {
   this.setState({
     query: this.search.value
   },
   () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length !== 0) {
          this.getInfo()
        }
      }
    })
 }

 getInfo() {

  const handleErrors = response => {
      if (!response.ok)
        console.error(`${response.status}: ${response.statusText}`);
      return response.json();
    };
    console.log(this.state.query);

  fetch(
      `https://api.jamendo.com/v3.0/albums/?client_id=3cbc4327&format=jsonpretty&namesearch=${this.state.query}`
    )
      .then(handleErrors)
      .then(results => {
        console.log(results);
         this.props.setState(results.results);
      });
 }

 render() {
   return (
     <form>
       <input
         placeholder="Search for an album..."
         ref={input => this.search = input}
         onChange={this.handleInputChange}
         className="search__input"
       />
     </form>
   )
 }
}

export default Search
