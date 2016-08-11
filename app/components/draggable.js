'use strict';
import React from 'react';

require('jquery-ui/draggable');

class DraggableControl extends React.Component {
  componentDidMount() {
    $(this.refs.control).draggable({
      helper: "clone",
      start: function(e, ui) {
        $(ui.helper).addClass("imageDraggableHelper");
      }
    });;
  }

}

export default DraggableControl;
