'use strict';
import React from 'react';

class Accordion extends React.Component {
  componentDidMount() {
    // console.log(this);
  }
  render() {
    return (
      <dl className='accordion'>
        {this.props.children}
      </dl>
    );
  }

}

export default Accordion;
