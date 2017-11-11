import React, { Component } from 'react';


export default class Quote extends Component {
    
    tweet = () => {
        let author = this.props.author.split(" ")[0];
        let tweetUrl = 'https://twitter.com/home?status=' +
        encodeURIComponent(this.props.quote) + encodeURIComponent('#'+author) +'+%23FreeCodeCamp+%23Quotes';                
        window.open(tweetUrl);
    }
    

    render() {      
      return (
          <div className="main" style={this.props.styles} >
            <div className="Quote">                      
                <p className="Quote-body">            
                    <i className="fa fa-quote-left" aria-hidden="true"></i>&nbsp;
                        {this.props.quote}                    
                </p>
                <p className="Quote-author">
                    - {this.props.author}
                </p>  
            </div>
            <div className="Quote-Action" >                           
                <button className="btn" onClick={this.props.next}><i className="fa fa-2x fa-chevron-right" aria-hidden="true"></i></button>
                <button className="btn share" onClick={this.tweet}><i className="fa fa-2x fa-twitter" aria-hidden="true"></i></button>
            </div>
        </div>
      );
    }
  }