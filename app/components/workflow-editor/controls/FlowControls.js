'use strict';
import React from 'react';

class FlowControls extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <ul className={this.props.className}>
        {this.props.children}
      </ul>
    );
  }

}

export default FlowControls;
