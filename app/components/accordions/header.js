'use strict';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

class AccordionHeader extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: this.props.show
    };
  }

  handleClick() {
    let tabHeading = $(this.refs.tabHeading);

    this.props.handleClick(this.state.show);
    if (this.state.show) {
      this.setState({show: false});
      tabHeading.find('.icon-toggle').removeClass('open');
    } else {
      this.setState({show: true});
      tabHeading.find('.icon-toggle').addClass('open');
    }
  }

  componentDidMount() {
    let tabHeading = this.refs.tabHeading;
    if (this.state.show) {
      $(tabHeading).find('.icon-toggle').addClass('open');
    }
  }

  render() {
    return (
      <dt className='accordion-heading' ref='tabHeading' onClick={this.handleClick.bind(this)}>
        <h4 className='title'>{this.props.title}</h4>
        <i className='icon-toggle' />
      </dt>
    );
  }

}

export default AccordionHeader;
