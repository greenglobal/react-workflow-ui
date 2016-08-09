import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Immutable from 'immutable'
import Header from './Header';
import OpsTabs from './ops-menu/tabs';
import ConditionalProps from './property-groups/conditional-props';
import LinkProps from './property-groups/link-props';
import ContainerProps from './property-groups/container-props';
import CommandWindow from './command-window';

let classNames = require('classnames');

export class App extends React.Component {
  render() {
    return (
      <div className='container-full'>
        <Header/>
        <div className='main-content'>
          <div className='col-left'>
            <OpsTabs/>
          </div>
          <div className='col-primary demo' id="myCanvas"/>
          <div className='col-right'>
            <ConditionalProps/>
            <LinkProps/>
            <ContainerProps/>
            <div className='wrap-bottom btn-getstarted'>
              <button className='button-start' type="submit">Get started</button>
            </div>
          </div>
        </div>
        <div className='bottom-content'>
          <CommandWindow/>
        </div>
        <div id="popupLoops" style={{display: 'none'}}/>
      </div>
    );
  }
}
