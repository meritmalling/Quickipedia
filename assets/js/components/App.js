var React = require('react');
var SearchForm = require('./SearchForm');

var TuneSearch = React.createClass({
  getInitialState: function(){
    return {
      searchTerm:'',
      results: {}
    };
  },
  updateSearch: function(value){
    this.setState({searchTerm: value});
    var self = this;
    var ajax = new XMLHttpRequest();
    ajax.addEventListener('load',function(){
      try {
        var data = JSON.parse(this.responseText);
        console.log(data)
        self.setState({results:data});
      } catch(e) {
        self.setState({results:{}});
      }
    });
    ajax.open('GET','/summary?q=' + value);
    ajax.send();
  },
  render: function(){

    return (
      <div className="row">
        <div className="col-xs-6 col-xs-offset-3">
          <SearchForm onUpdate={this.updateSearch} />
          <div> {this.state.results.summary} </div>
        </div>
      </div>
    );
  }
});

module.exports = TuneSearch;

