const React = require('react');

module.exports = class TimeDisplay extends React.Component {
  render() {
    return (
      <div>
        It is {this.props.date.toTimeString()}
      </div>
    );
  }
};
