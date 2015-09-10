var React = require('react');
var SearchForm = require('./SearchForm');
var Header = require('./Header');
var SearchResult = require('./SearchResult');

var TuneSearch = React.createClass({
  getInitialState: function(){
    this.wikiSearch(false);
    return {
      searchTerm:'superman',
      results: {},
      status: 'What can we learn about today...'
    };
  },
  wikiSearch: function(value){
    this.setState({searchTerm: value,status: 'Let me take a few seconds to summarize that for you...'});
    console.log('value is', value);
    // console.log('search term is', this.state.searchTerm);

    var self = this;
    var ajax = new XMLHttpRequest();
    ajax.addEventListener('load',function(){
      try {
        var data = JSON.parse(this.responseText);
        console.log(data)
        self.setState({results:data,status:''});
      } catch(e) {
        self.setState({results:{}});
      }
    });
    console.log('value is', value === true);

    var url = (typeof value === 'string') ? '/summary?q=' + value : '/random';
    ajax.open('GET',url);
    ajax.send();
  },
  render: function(){
    return (
      <div className="row">
        <Header />
        <div className="search-area col-xs-8 col-xs-offset-2">
          <SearchForm onUpdate={this.wikiSearch} />
          <span className="status">{this.state.status}</span>
          <SearchResult data={this.state.results} />
          <em className="error animated zoomInUp">{this.state.results.msg}</em>
        </div>
      </div>
    );
  }
});

module.exports = TuneSearch;

