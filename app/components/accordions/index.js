'use strict';
import React from 'react';
import AccordionHeader from './header';
import AccordionContent from '../accordions/content';

class Accordion extends React.Component {
  componentDidMount() {
    // code block goes here
  }

  handleClick(isShowing) {
    this.refs.thisContent.handleClick(isShowing);
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) =>
        React.cloneElement(child, {

        })
    );

    return (
      <dl className='accordion'>
        <AccordionHeader {...this.props} handleClick={this.handleClick.bind(this)}></AccordionHeader>
        <AccordionContent show={this.props.show} ref="thisContent">
          {childrenWithProps}
        </AccordionContent>
      </dl>
    );
  }

}

export default Accordion;
