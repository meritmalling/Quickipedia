var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <span>
        <button onClick={this.props.onClick} className="btn btn-warning random-search">random</button>
      </span>
    )
  }

})
