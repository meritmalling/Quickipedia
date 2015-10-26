var React = require('react');
var RandomSearch = require('./RandomSearch');

module.exports = React.createClass({
  propTypes:{
    onUpdate: React.PropTypes.func.isRequired
  },
  update: function(e){
    // console.log('update')
    e.preventDefault();
    var value = this.refs.textInput.getDOMNode().value;
    this.props.onUpdate(value);
  },
  random: function(e){
    // console.log('random');
    e.preventDefault();
    var value = false;
    this.props.onUpdate(value);
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