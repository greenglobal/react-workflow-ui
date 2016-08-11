'use strict';
import React from 'react';

class AccordionContent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: this.props.show
    };
  }

  componentDidMount() {
    if (this.state.show) {
      $(this.refs.tabContent).show();
    }
  };

  handleClick(showing) {
    let tabContent = $(this.refs.tabContent);

    if (showing) {
      tabContent.slideUp(350);
    } else {
      tabContent.slideDown(350);
    }
  }

  render() {
    return (
      <dd className='accordion-content' style={{paddingTop: 0}} ref='tabContent'>
        {this.props.children}
      </dd>
    );
  }

}

export default AccordionContent;
