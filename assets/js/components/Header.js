var React = require('react');

// Basic header for page
module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <h1 className="text-center">Quickipedia</h1>
        <h4 className="tagline text-center">You search. We summarize.</h4>
      </div>
    );
  }
})