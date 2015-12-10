var React = require('react');
var SearchForm = require('./SearchForm');
var Header = require('./Header');
var SearchResult = require('./SearchResult');

var Search = React.createClass({
  getInitialState: function(){
    return {
      searchTerm:'',
      results: {},
      // Status tells what is happening
      status: 'What can we learn about today...',
      // Optional msg to indicate that something unexpected happened (no results, etc)
      msg: ''
    };
  },
  componentDidMount: function() {
    this.wikiSearch(false);
  },
  // conducts search for article to summarize, either specific or random (no result reverts to random)
  wikiSearch: function(value){
    this.setState({searchTerm: value,status: 'Let me take a few seconds to summarize that for you...'});
    // finding a way to use "bind" here would be better, but for now, set "self" to store "this"
    var self = this;
    var ajax = new XMLHttpRequest();
    // specifies what happens when data has loaded
    ajax.addEventListener('load',function(){
      try {
        var data = JSON.parse(this.responseText);
        self.setState({results:data,status:data.msg,msg:''});
        if (data.msg) {
          // response when user enters text that does not match an exact Wikipedia result
          self.setState({msg: "Sorry, we couldn't find a Wikipedia article matching your search. But maybe you'll find this interesting..."})
          // restarts search, but for random article
          self.wikiSearch(false);
        }
      } catch(e) {
        // in case of any unexpected errors
        self.setState({results:{},status:"Sorry, we couldn't find a Wikipedia article matching your search."});
      }
    });
    // determines whether to try to get random or specific article; api data from backend is delivered to these routes
    var url = (typeof value === 'string') ? '/summary?q=' + value : '/random';
    ajax.open('GET',url);
    ajax.send();
  },
  render: function(){
    return (
      <div className="row">
        <Header />
        <div className="search-area col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2">
          <SearchForm onUpdate={this.wikiSearch} />
          <em className="error">{this.state.msg}</em>
          <span className="status">{this.state.status}</span>
          <SearchResult data={this.state.results} />
        </div>
      </div>
    );
  }
});

module.exports = Search;

