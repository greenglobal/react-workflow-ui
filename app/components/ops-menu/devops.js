'use strict';
import React from 'react';

import Accordion from '../accordions';
import ListDockerImages from '../ListDockerImages';
import { FlowControls, FlowControlStart, FlowControlExit, FlowControlLoop, FlowControlConditional } from '../workflow-editor/controls';

class DevOpsMenu extends React.Component {
  componentDidMount() {
    // $(this.refs.tabContent.refs.tabContent).show();
  }

  render() {
    return (
      <div id="tabs-devops" ref='thisTab'>
        <Accordion show={true} title="Workflow Controls">
          <div id="listWorkflowControls">
            <FlowControls className='list-result'>
              <FlowControlStart/>
              <FlowControlExit/>
              <FlowControlConditional/>
              <FlowControlLoop/>
            </FlowControls>
          </div>
        </Accordion>
        <ListDockerImages/>
      </div>
    );
  }
}

export default DevOpsMenu;
