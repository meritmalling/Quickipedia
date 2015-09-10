var React = require('react');
var SearchForm = require('./SearchForm');
var Header = require('./Header');
var SearchResult = require('./SearchResult');

var TuneSearch = React.createClass({
  getInitialState: function(){
    return {
      searchTerm:'',
      results: {},
      status: 'What can we learn about today...',
      msg: ''
    };
  },
  componentDidMount: function() {
    this.wikiSearch(false);
  },
  wikiSearch: function(value){
    this.setState({searchTerm: value,status: 'Let me take a few seconds to summarize that for you...'});
    console.log('value is', value);
    console.log('message', this.state.msg);

    console.log('search term is', this.state.searchTerm);

    var self = this;
    var ajax = new XMLHttpRequest();
    ajax.addEventListener('load',function(){
      try {
        var data = JSON.parse(this.responseText);
        console.log(data)
        self.setState({results:data,status:data.msg,msg:''});
        if (data.msg) {
          console.log('logged');
          self.setState({msg: "Sorry, we couldn't find a Wikipedia article matching your search. But maybe you'll find this interesting..."})
          self.wikiSearch(false);
        }
      } catch(e) {
        self.setState({results:{},status:"Sorry, we couldn't find a Wikipedia article matching your search."});
      }
    });
    // console.log('value is', value === true);

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

module.exports = TuneSearch;

