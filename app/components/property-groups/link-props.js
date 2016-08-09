'use strict';
import React from 'react';

let classNames = require('classnames');

class LinkProps extends React.Component {
  render() {
    return (
      <form className='form-action item-props' action="#" id="linkProps" onsubmit="return false;">
        <div className='wrap-content'>
          <dl className='accordion'>
            <dt className='accordion-heading'>
              <h4 className='title'>Link Options</h4>
              <i className='icon-toggle' />
            </dt>
            <dd className='accordion-content show'>
              <div className='form-group inline'>
                <label className='form-label' htmlFor="#">Name:</label>
                <input className='form-input' type="text" name id rv-input="linkProps.name" /></div>
            </dd>
          </dl>
        </div>
      </form>
    );
  }
}

export default LinkProps;
