var React = require('react');

// displays results
module.exports = React.createClass({
  render: function() {
    var hide = 'nothing';
    return (
      <div className={"search-result " + hide}>
        <h2><a target="_blank" title="Read the details on Wikipedia" href={this.props.data.link}>{this.props.data.title}</a></h2>
        <img src={this.props.data.image} />
        <div>{this.props.data.summary} </div>
        <div className="clearfix"></div>
      </div>
    )
  }

})