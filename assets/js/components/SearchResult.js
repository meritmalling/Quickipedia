var React = require('react');

module.exports = React.createClass({
  render: function() {
    var hide = 'nothing'
    return (
      <div className={"search-result " + hide}>
        <h2>{this.props.data.title} </h2>
        <div>{this.props.data.summary} </div>
        <img src={this.props.data.image} />
      </div>
    )
  }

})