'use strict';
import React from 'react';

let classNames = require('classnames');

class ConditionalProps extends React.Component {
  render() {
    return (
      <form className='form-action item-props-conditional' style={{display: 'none'}} action="#" id="conditionProps" onsubmit="return false;">
        <div className='wrap-content'>
          <dl className='accordion'>
            <dt className='accordion-heading'>
              <h4 className='title'>Condition Properties</h4>
              <i className='icon-toggle' />
            </dt>
            <dd className='accordion-content show'>
              <div className='form-group inline'>
                <label className='form-label' htmlFor="#">Expression:</label>
                <input className='form-input' type="text" name id rv-input="linkProps.name" /></div>
            </dd>
          </dl>
        </div>
      </form>
    );
  }
}

export default ConditionalProps;
