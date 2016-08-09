'use strict';
import React from 'react';

let classNames = require('classnames');
let imgStart = require('../../images/start.png');
let imgExit = require('../../images/exit.png');
let imgCondition = require('../../images/condition-white.png');
let imgLoop = require('../../images/loop-white.png');
let imgSearch = require('../../images/search.svg');

class DevOpsMenu extends React.Component {

  render() {
    return (
      <div id="tabs-devops">
        <dl className='accordion'>
          <dt className='accordion-heading show'>
            <h4 className='title'>Workflow Controls</h4>
            <i className='icon-toggle' />
          </dt>
          <dd className='accordion-content' style={{paddingTop: 0}}>
            <div id="listWorkflowControls">
              <ul className='list-result'>
                <li className='list' data-type="flowcontrol-start">
                  <div className='area-image'>
                    <img className='image' src={imgStart} alt="image logo" /></div>
                  <div className='area-content'>
                    <h3 className='title'>
                      <a className='link' href="#">Start</a>
                    </h3>
                  </div>
                </li>
                <li className='list' data-type="flowcontrol-end">
                  <div className='area-image'>
                    <img className='image' src={imgExit} alt="image logo" /></div>
                  <div className='area-content'>
                    <h3 className='title'>
                      <a className='link' href="#">Exit</a>
                    </h3>
                  </div>
                </li>
                <li className='list' data-type="flowcontrol-condition">
                  <div className='area-image'>
                    <img className='image' src={imgCondition} alt="image logo" /></div>
                  <div className='area-content'>
                    <h3 className='title'>
                      <a className='link' href="#">Condition</a>
                    </h3>
                  </div>
                </li>
                <li className='list' data-type="flowcontrol-loop">
                  <div className='area-image'>
                    <img className='image' src={imgLoop} alt="image logo" /></div>
                  <div className='area-content'>
                    <h3 className='title'>
                      <a className='link' href="#">Loop</a>
                    </h3>
                  </div>
                </li>
              </ul>
            </div>
          </dd>
        </dl>
        <dl className='accordion'>
          <dt className='accordion-heading'>
            <h4 className='title'>Docker Images</h4>
            <i className='icon-toggle' />
          </dt>
          <dd className='accordion-content' style={{display: 'none'}}>
            <form className='form-search' action="#" onsubmit="return false;">
              <input className='form-input' type="text" placeholder="Search for docker images..." id="txtSearchDockerImages" />
              <button className='button button-icon'>
                <img src={imgSearch} alt="search icon" width={35} height={35} /></button>
            </form>
            <div id="listDockerImages">
              <ul className='list-result' id="listDockerImages">
                <li className='no-result'>Please search for docker images.</li>
              </ul>
            </div>
          </dd>
        </dl>
      </div>
    );
  }
}

export default DevOpsMenu;
