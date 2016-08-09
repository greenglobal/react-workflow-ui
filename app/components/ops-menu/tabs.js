'use strict';
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ITOpsMenu from './itops';
import DevOpsMenu from './devops';

require('jquery-ui/tabs');
require('jquery-ui-css/tabs.css');

class OpsTabs extends React.Component {
  constructor(props, context) {
    super(props, context);
  };

  handleSelect() {
    console.log('test');
  }

  componentDidMount() {
    console.log($('#tabs-ops'));
    $('#tabs-ops').tabs();
  }

  render() {
    return (
      <div id='tabs-ops'>
        <ul>
          <li><a href="#tabs-devops">DevOps</a></li>
          <li><a href="#tabs-itops">ITOps</a></li>
        </ul>
        <DevOpsMenu/>
        <ITOpsMenu/>
      </div>
    );
  }
}

export default OpsTabs;
