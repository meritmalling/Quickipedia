var React = require('react');

module.exports = React.createClass({
  propTypes:{
    onUpdate: React.PropTypes.func.isRequired
  },
  update: function(e){
    e.preventDefault();
    var value = this.refs.textInput.getDOMNode().value;
    this.props.onUpdate(value);
  },
  render: function(){
    return (
      <form onSubmit={this.update} className="form">
        <input ref="textInput" type="text" placeholder="Search Wikipedia" className="form-control" />
        <input type="submit" value="search" className="btn btn-primary" />
      </form>
    )
  }
});