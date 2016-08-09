'use strict';
import React from 'react';

class AccordionHeader extends React.Component {
  componentDidMount() {
    // console.log(this);
  }
  render() {
    return (
      <dt className='accordion-heading show' ref='tabHeading'>
        <h4 className='title'>{this.props.title}</h4>
        <i className='icon-toggle' />
      </dt>
    );
  }

}

export default AccordionHeader;
