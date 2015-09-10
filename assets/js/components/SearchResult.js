var React = require('react');

module.exports = React.createClass({
  render: function() {
    var hide = 'nothing'
    return (
      <div className={"search-result " + hide}>
        <h2>{this.props.data.title} </h2>
        <img src={this.props.data.image} />
        <div>{this.props.data.summary} </div>
        <div className="clearfix"></div>
      </div>
    )
  }

})