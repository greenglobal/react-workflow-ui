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
import WorkflowCanvas from './workflow-editor/WorkflowCanvas';

let classNames = require('classnames');

export class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loopContainers: []
    };
  }

  addLoop(container) {
    this.setState({loopContainers: [...this.state.loopContainers, container]});
  }

  render() {
    return (
      <div className='container-full'>
        <Header/>
        <div className='main-content'>
          <div className='col-left'>
            <OpsTabs/>
          </div>
          <WorkflowCanvas className='col-primary demo' id="myCanvas" onNewLoop={this.addLoop.bind(this)}/>
          <div style={{display: 'none'}} ref='container'>
            {
              this.state.loopContainers.map((container) =>
                <div className="dialog-workflow" key={container.id} id={"popup-workflow-loop-" + container.id}>
                  <WorkflowCanvas className='loop-canvas' options={container} onNewLoop={this.addLoop.bind(this)}/>
                </div>
              )
            }
          </div>
          <div className='col-right'>
            <ConditionalProps/>
            <LinkProps/>
            <ContainerProps/>
            <div className='wrap-bottom btn-getstarted'>
              <button className='button-start' type="submit">Get started</button>
            </div>
          </div>
        </div>
        <CommandWindow/>
        <div id="popupLoops" style={{display: 'none'}}/>
      </div>
    );
  }
}
