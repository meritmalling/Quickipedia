var React = require('react');

module.exports = React.createClass({
  // propTypes:{
  //   onUpdate: React.PropTypes.func.isRequired
  // },
  // update: function(e){
  //   e.preventDefault();
  //   var value = this.refs.textInput.getDOMNode().value;
  //   this.props.onUpdate(value);
  // },
  render: function(){
    return (
      <div>
        <button className="btn btn-warning">random</button>
      </div>
    )
  }
});