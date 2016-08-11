'use strict';
import React from 'react';

let classNames = require('classnames');

class CommandLogger {
  static invalidCommand(cmd) {
    $('#containerHostCommandInput').before($('<div class="cmd">Unknown command: <i>' + cmd + '</i></div>'));
  };

  static containerNotExist(idOrName) {
    $('#containerHostCommandInput').before($('<div class="cmd"><i>Container \"' + idOrName + '\" not exist</i></div>'));
  };

  static imageNotExist(idOrName) {
    $('#containerHostCommandInput').before($('<div class="cmd"><i>Image: \"' + idOrName + '\" not exist</i></div>'));
  };

  static log(str) {
    $('#containerHostCommandInput').before($('<div class="cmd">' + str + '</div>'));
  };
}

class CommandWindow extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('submit');
    return false;
  }

  handleCommand(event, data) {
    if (event.which == 13) {
      let val = event.target.value;

      if (val.trim() != '') {
        this.sendHostCommand(val);
      }
    }
  }

  sendHostCommand(cmd) {
    var dataContainer = currentDataContainer[currentDataContainer.length];

    var addContainerPattern = /^workflow add ([\w\-\/\:\d]*)$/;
    var linkContainerPattern = /^workflow link ([\w\-\/\:\d]*) ([\w\-\/\:\d]*)$/;
    var testAdd = cmd.match(addContainerPattern);

    if (testAdd) {
      var imageName = testAdd[1];

      dockerImage.getDockerImageInfo(imageName, function(response) {
        console.log(response);
        addNode(imageName, {}, dataContainer);
        $('#containerHostCommandInput').before($('<div class="cmd">' + cmd + '</div>'));
      }, function(err) {
        CommandLogger.imageNotExist(imageName);
      });


    } else if (cmd.match(linkContainerPattern)) {
      var testLink = cmd.match(linkContainerPattern);

      linkContainers(testLink[1], testLink[2], dataContainer);
    } else {
      CommandLogger.invalidCommand(cmd);
    }

    cmdHistory.push(cmd);
    // clean up
    $('#hostCommandInput').val('');
  }

  linkContainers(srcID, desId, dataContainer) {
    if (!dataContainer) {
      dataContainer = window;
    }
    // check if id1 && id2 has existed
    if (!isContainerExisted(srcID, dataContainer)) {
      CommandLogger.containerNotExist(srcID);
    } else if (!isContainerExisted(desId, dataContainer)) {
      CommandLogger.containerNotExist(desId);
    } else {
      dataContainer['edges'].add({
        from: srcID,
        to: desId
      });
    }
  }

  componentDidMount() {

  };

  render() {
    return (
      <div className='bottom-content'>
        <ul className='tabs'>
          <li className='tab-link current' data-tab="tab-1">Command Window</li>
        </ul>
        <div id="tab-1" className='tab-content current'>
          <div className='cmd' id="containerHostCommandInput">
            <span style={{color: 'red', padding: '0 5px'}}>&gt;&gt;</span>
            <form className='typing-cmd' action="./" name="formTyping" onSubmit={this.handleSubmit.bind(this)}>
              <input className='typing' type="text" name="typing" autofocus id="hostCommandInput" autoComplete="off" onKeyUp={this.handleCommand.bind(this)}/>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default CommandWindow;
