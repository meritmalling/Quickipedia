var React = require('react');
var RandomSearch = require('./RandomSearch');

// handles search input, search button and random button (pulling in RandomSearch component)
module.exports = React.createClass({
  propTypes:{
    onUpdate: React.PropTypes.func.isRequired
  },
  update: function(e){
    e.preventDefault();
    // gets search term through accessing the node affiliated with the ref "textInput"
    var value = this.refs.textInput.getDOMNode().value;
    // passes search term to onUpdate as "value"
    this.props.onUpdate(value);
  },
  random: function(e){
    e.preventDefault();
    // Passes "false" instead of search term value, so that in App.js a "random" article is requested
    this.props.onUpdate(false);
  },
  render: function(){
    return (
      <form onSubmit={this.update} className="form search-form form-inline">
        <div className="form-group" id="search-form-group">
          <input ref="textInput" autofocus type="text" placeholder="Search Wikipedia" className="form-control search-text" />
          <input type="submit" value="search" className="btn btn-primary search-btn" />
          <RandomSearch onClick={this.random} />
        </div>
      </form>
    )
  }
});