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
    this.stackWorkflows = [];
  }

  openWorkflow(currentWorkflow, props) {
    var currentCanvas = $(currentWorkflow.refs.canvas);

    var _app = this;

    var nextWorkflow = this.refs['workflow-ref-' + props.id];
    $("#popup-workflow-loop-" + props.id).dialog({
      position: {
        collision: "fit flip",
        of: '#myCanvas'
      },
      draggable: true,
      resizable: true,
      width: $('#myCanvas').outerWidth(),
      height: $('#myCanvas').height(),
      title: 'Workflow for the loop',
      dialogClass: "dialog-subworkflow",

      close: function(event, ui) {
        currentCanvas.droppable( "enable" );

        _app.stackWorkflows.pop();
      },
      open: function( event, ui ) {
        currentCanvas.droppable( "disable" );

        _app.stackWorkflows.push(nextWorkflow);
      }
    });

    nextWorkflow.moveTo({
      position: {
        x: 0,
        y: 0
      }
    });
  }

  addLoop(container) {
    this.setState({loopContainers: [...this.state.loopContainers, container]});
  }

  componentDidMount() {
    this.stackWorkflows.push(this.refs.rootWorkflow);
  }

  render() {
    return (
      <div className='container-full'>
        <Header/>
        <div className='main-content'>
          <div className='col-left'>
            <OpsTabs/>
          </div>
          <WorkflowCanvas className='col-primary demo' id="myCanvas"
            onNewLoop={this.addLoop.bind(this)}
            openWorkflow={this.openWorkflow.bind(this)}
            ref="rootWorkflow"
          />
          <div style={{display: 'none'}} ref='container'>
            {
              this.state.loopContainers.map((container) =>
                <div className="dialog-workflow" key={container.id} id={"popup-workflow-loop-" + container.id}>
                  <WorkflowCanvas className='loop-canvas' options={container}
                    onNewLoop={this.addLoop.bind(this)}
                    ref={'workflow-ref-' + container.id}
                    openWorkflow={this.openWorkflow.bind(this)}
                  />
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
