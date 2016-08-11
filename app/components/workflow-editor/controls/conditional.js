'use strict';
import React from 'react';
import DraggableControl from '../../draggable';
let imgCondition = require('../../../images/condition-white.png');

class FlowControlConditional extends DraggableControl {

  render() {
    return (
      <li className='list' data-type="flowcontrol-condition" ref='control'>
        <div className='area-image'>
          <img className='image' src={imgCondition} alt="image logo" />
        </div>
        <div className='area-content'>
          <h3 className='title'>
            <a className='link' href="#">Condition</a>
          </h3>
        </div>
      </li>
    );
  }

}

export default FlowControlConditional;
