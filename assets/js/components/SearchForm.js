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
      <form onSubmit={this.update} className="form search-form form-inline">
        <div className="form-group">
          <input ref="textInput" autofocus type="text" placeholder="Search Wikipedia" className="form-control search-text" />
          <input type="submit" value="search" className="btn btn-primary" />
        </div>
      </form>
    )
  }
});