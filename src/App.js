import React, { Component } from 'react';
import Quote from './components/Quote';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {  
    quotes: {q: "", a: ""},
    colors: ["#393E46", "#521262", "#903749", "#00ADB5", "#FF2E63", "#B83B5E", "#6A2C70", "#48466D"],
    currentColorId: 0,
    styles: {
      backgroundColor: ""
    }
  };

  ajax = () => {
    let self = this;
    axios.get('https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1')
    .then(function (data) {      
      let response = JSON.parse(data.request.response);      
      let temp = document.createElement('div');
      temp.innerHTML = response[0].content;      // remove html entities like #&98; etc..
      let quote = temp.innerHTML.replace(/<\/?[^>]+(>|$)/g, ""); // remove <p> </p> tags
      temp.innerHTML = response[0].title;
      let author = temp.innerHTML.replace(/<\/?[^>]+(>|$)/g, ""); // remove <p> </p> tags 
      self.setState({
        //quotes: self.state.quotes.concat( { q: quote, a: author} )
        quotes: { q: quote, a: author }
      });
      
      // change color
      self.changeColor();           
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  componentDidMount = () => {            
    this.ajax();      
  };
  
  changeColor = () => {
      let id = (this.state.currentColorId + 1) % (this.state.colors.length);          
      let styles = {
        backgroundColor: this.state.colors[this.state.currentColorId]
      };      
      this.setState({
        currentColorId: id,
        styles: styles
      });      
  };

  handleNext = () => {    
    this.ajax();        
  };

  render() {
    return (
      <div className="App">                      
        <h1 className="App-intro">
          Inspirational Quotes
        </h1>
        <Quote quote={this.state.quotes.q} 
               author={this.state.quotes.a} 
               next={this.handleNext}
               styles={this.state.styles}/>
        <footer>
          <p>Quotes API : <u><a href="https://quotesondesign.com">QuotesOnDesign</a></u> </p>
        </footer>
      </div>
    );
  }
}

export default App;
