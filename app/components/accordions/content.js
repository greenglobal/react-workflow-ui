'use strict';
import React from 'react';

class AccordionContent extends React.Component {

  render() {
    return (
      <dd className='accordion-content' style={{paddingTop: 0}} ref='tabContent'>
        {this.props.children}
      </dd>
    );
  }

}

export default AccordionContent;
