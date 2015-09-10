var React = require('react');
var SearchForm = require('./SearchForm');
var RandomSearch = require('./RandomSearch');


var TuneSearch = React.createClass({
  getInitialState: function(){
    return {
      searchTerm:'',
      results: {}
    };
  },
  customSearch: function(value){
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
  randomSearch: function(){
    console.log('random');
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
    ajax.open('GET','/random');
    ajax.send();
  },
  test: function() {
    alert('test');
  },
  render: function(){
    return (
      <div className="row">
        <h1 className="text-center">Quickipedia</h1>
        <div className="col-xs-6 col-xs-offset-3">
          <SearchForm onUpdate={this.customSearch} />
          <RandomSearch onClick={this.test} />
          <div>{this.state.results.image}</div>
          <h2>{this.state.results.title} </h2>
          <div> {this.state.results.summary} </div>

        </div>
      </div>
    );
  }
});

module.exports = TuneSearch;

