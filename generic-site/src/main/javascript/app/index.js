$ = require('jquery');
require('bootstrap');

const React = require('react');
const ReactDOM = require('react-dom');
const TimeDisplay = require('./components/util/TimeDisplay');

$(document).ready(() => {
  ReactDOM.render(
    <TimeDisplay date={new Date()}/>,
    document.getElementById('TimeDisplay')
  );
});
