'use strict';
import React from 'react';

let classNames = require('classnames');

class CommandWindow extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      
    };
  }

  componentDidMount() {

  };

  render() {
    return (
      <div className='bottom-content'>
        <ul className='tabs'>
          <li className='tab-link current' data-tab="tab-1">Host</li>
          <li className='tab-link' data-tab="tab-2">Guest</li>
        </ul>
        <div id="tab-1" className='tab-content current'>
          <div className='cmd' id="containerHostCommandInput">
            <span style={{color: 'red', padding: '0 5px'}}>&gt;&gt;</span>
            <form className='typing-cmd' action="./" name="formTyping" onsubmit="return false;">
              <input className='typing' type="text" name="typing" autofocus id="hostCommandInput" autoComplete="off" />
            </form>
          </div>
        </div>
        <div id="tab-2" className='tab-content'>
          <div className='cmd' id="containerGuessCommandInput">
            <span style={{color: 'red', padding: '0 5px'}}>&gt;&gt;</span>
            <form className='typing-cmd' action="./" name="formTyping" onsubmit="return false;">
              <input className='typing' type="text" name="typing" autofocus id="guessCommandInput" autoComplete="off" />
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default CommandWindow;
