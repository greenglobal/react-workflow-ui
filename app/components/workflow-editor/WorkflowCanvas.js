'use strict';
import React from 'react';
import vis from 'vis';
import Container from '../container.js';

require('../../node_modules/vis/dist/vis.css');
require('jquery-ui/droppable');
require('jquery-ui/dialog');

class WorkflowCanvas extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.droppable = null;

    this.state = {
      data: {
        nodes: new vis.DataSet(),
        edges: new vis.DataSet()
      },
      network: null,
      currentWorkflow: {
        hasEndNode: false,
        hasStartNode: false
      },
      hashContainers: [],
      di: {
        selected: null
      },
      loopContainers: []
    };

    if (this.props.options && this.props.options.props) {
      this.state.id = this.props.options.id;

      if (this.props.options.props.initControlStart) {
        this.addNode('Loop Start', {
          description: '',
          fixed: false,
          x: 0,
          y: 0,
          shape: 'circularImage',
          image: require('../../images/start.png'),
          label: 'Loop Start',
          type: 'flowcontrol-start',
          font: {
            size: 20
          },
          color: {
            background: '#FF9900'
          }
        });

        this.state.currentWorkflow.hasStartNode = true;
      }
    }

    this.locales = {
      en: {
        edit: 'Edit',
        del: 'Delete selected',
        back: 'Back',
        addNode: 'Add Container',
        addEdge: 'Add Link',
        editNode: 'Edit Container',
        editEdge: 'Edit Link',
        addDescription: 'Click in an empty space to place a new container.',
        edgeDescription: 'Click on a container and drag the link to another container to connect them.',
        editEdgeDescription: 'Click on the control points and drag them to a container to connect to it.',
        createEdgeError: 'Cannot link to a cluster.',
        deleteClusterError: 'Clusters cannot be deleted.',
        editClusterError: 'Clusters cannot be edited.'
      }
    };

    this._defaultOptions = {
      layout: {
        //randomSeed: seed
      }, // just to make sure the layout is the same when the locale is changed
      locale: 'en',
      locales: this.locales,
      height: '100%',
      width: '100%',
      groups: {
        loop: {
          color: { background: 'red' },
          borderWidth: 3
        }
      },
      edges: {
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 1
          },
        },
        shadow: true,
        smooth: {
          enabled: true,
          type: "dynamic",
          roundness: 0.5
        },
        physics: true,
        scaling: {
          min: 1,
          max: 15,
          label: { enabled: true,min: 14, max: 30, maxVisible: 30, drawThreshold: 5 },
          customScalingFunction: function(min, max, total, value) {
            if (max === min) {
              return 0.5;
            } else {
              var scale = 1 / (max - min);
              return Math.max(0, (value - min) * scale);
            }
          }
        },
        selectionWidth: 4
      },
      interaction: {
        dragView: true,
        zoomView: true,
        selectConnectedEdges: false,
        dragNodes: true,
        multiselect: false
      },
      manipulation: {
        enabled: true,
        initiallyActive: true,
        addNode: function(data, callback) {
          // filling in the popup DOM elements
          document.getElementById('operation').innerHTML = "Add Node";
          document.getElementById('node-id').value = data.id;
          document.getElementById('node-label').value = data.label;
          document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
          document.getElementById('cancelButton').onclick = clearPopUp.bind();
          document.getElementById('network-popUp').style.display = 'block';
        },
        editNode: function(data, callback) {
          // filling in the popup DOM elements
          document.getElementById('operation').innerHTML = "Edit Node";
          document.getElementById('node-id').value = data.id;
          document.getElementById('node-label').value = data.label;
          document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
          document.getElementById('cancelButton').onclick = cancelEdit.bind(this, callback);
          document.getElementById('network-popUp').style.display = 'block';
        },
        addEdge: (function(data, callback) {
          return this.addEdge(data, callback);
        }).bind(this)
      },
      physics: {
        solver: 'barnesHut',
        enabled: false
      }
    };
  }

  addEdge(linkOptions, callback) {
    var _from, _to;
    if (linkOptions.from != linkOptions.to) {
      _from = this.findContainer(linkOptions.from);
      _to = this.findContainer(linkOptions.to);

      console.log(_from, _to);

      if (_from.type == 'flowcontrol-condition') {
        linkOptions.type = 'flowcontrol-condition';
        if (['flowcontrol-condition', 'docker-image', 'flowcontrol-end', 'flowcontrol-loop'].indexOf(_to.type) != -1) {

          if (!_from.hasTrueCondition) {
            linkOptions.label = "True";
            _from.hasTrueCondition = true;
            linkOptions.smooth = {
              enabled: true,
              type: 'curvedCW'
            }

            linkOptions.typeValue = true;
          } else {
            linkOptions.label = "False";
            _from.hasFalseCondition = true;
            _from.allowAddLink = true;

            linkOptions.smooth = {
              enabled: true,
              type: 'curvedCCW'
            }
            linkOptions.typeValue = false;
          }

          linkOptions.shadow = true;
          linkOptions.dashes = true;
          linkOptions.color = {
            color: '#000000'
          }

          // allow link to end if there still a path
          if (['flowcontrol-end', 'flowcontrol-loop'].indexOf(_to.type) != -1) {
            if (!_from.hasTrueCondition || !_from.hasFalseCondition || _from.allowAddLink) {
              this.state.data['edges'].add(linkOptions);
              _from.allowAddLink = false;
            }
          } else {
            this.state.data['edges'].add(linkOptions);
          }

          if (_from.allowAddLink) {
            _from.allowAddLink = false;
          }
        }
      } else if (['flowcontrol-loop'].indexOf(_from.type) != -1) {
        linkOptions.type = 'ExitLoop';
        if (['docker-image', 'flowcontrol-condition'].indexOf(_to.type) != -1) {
          this.state.data['edges'].add(linkOptions);

          _from.allow = false;
        } else {
          this.state.data['edges'].add(linkOptions);
        }
      } else if (['docker-image', 'flowcontrol-start', 'flowcontrol-loop'].indexOf(_from.type) != -1 && _to.type == 'docker-image') {
        if (['docker-image'].indexOf(_from.type) != -1) {
          linkOptions.smooth = {
            enabled: true,
            type: 'straightCross'
          }
        }

        this.state.data['edges'].add(linkOptions);
      } else if (['flowcontrol-condition', 'flowcontrol-loop'].indexOf(_to.type) != -1) {
        if (_from.type != 'docker-image') {
          this.state.data['edges'].add(linkOptions);
        } else {
          this.state.data['edges'].add(linkOptions);
        }
      } else if (['flowcontrol-end'].indexOf(_to.type) != -1) {

        // not allow loop to exit
        if (['flowcontrol-loop'].indexOf(_from.type) == -1) {
          this.state.data['edges'].add(linkOptions);
        }
      } else {
        this.state.data['edges'].add(linkOptions);
      }
      // callback(data);
    }
  }

  release() {

  }

  selectEdge(params) {
    if (params.edges.length > 0) {

      var link = this.findLink(params.edges[0]);

      if (link) {
        _this.state['di'].selectedLink = link;
      } else {
        _this.state['di'].selectedLink = null;
      }

      var selector = '#linkProps';
      if (link.type && link.type == 'flowcontrol-condition') {
        selector = '#conditionProps';
      }

      $(selector).show();
      $(selector + ' .accordion-heading').each(function() {
        var $this = $(this);

        $this.find('.icon-toggle').addClass('open');
        $this.addClass('show');
        $this.next().slideDown(350);

      });

      currentLinkBinding = rivets.bind($('#linkProps'), {
        linkProps: _this.state['di'].selectedLink
      });
      console.log(currentBinding);
    }
  }

  deselectEdge(params) {
    _this.state['di'].selected = null;
    $('#linkProps, #conditionProps').hide();
    if (currentLinkBinding) {
      currentLinkBinding.unbind();
    }
  }

  selectNode(params) {
    // if selected item is a node
    // defaultBind.showingContainerProps = true;
    if (params.nodes.length > 0) {

      var node = this.findContainer(params.nodes[0]);

      if (node) {
        this.state['di'].selected = node;
      } else {
        this.state['di'].selected = null;
      }

      $('.item-props').hide();

      var $this;
      switch (node.type) {
        case 'flowcontrol-condition':
          $this = $('#conditionProps');
          break;
        default:
          $this = $('#containerProps');

          // currentBinding = rivets.bind($('#containerProps'), {
          //   containerProps: this.state['di'].selected
          // });
          break;
      }

      $this.show();
      $this.find('.accordion-heading:first').next().slideDown(350);
      $this.find('.accordion-heading:first .icon-toggle').addClass('open');
      $this.addClass('show');
    }
  }

  deselectNode(params) {
    this.state['di'].selected = null;
    $('#containerProps, #linkProps, #conditionProps').hide();
    //
    // if (currentBinding) {
    //   currentBinding.unbind();
    // }
    if (params.nodes.length == 0) {
      // TODO: Disable property inputs
    }
  }

  doubleClick(params) {
    if (params.nodes.length > 0) {
      var selectedNode = this.findContainer(params.nodes[0]);
      if (!selectedNode) {
        return;
      }

      var canvas = $(this.refs.canvas);

      if (selectedNode.type == 'flowcontrol-loop') {
        this.props.openWorkflow(this, selectedNode);
      }
    }
  }

  moveTo(options) {
    this.state.network.moveTo(options);
  }

  getNextId() {
    var id = 0;
    for (var key in this.state.data['nodes']._data) {
      if (id === 0) {
        id = parseInt(this.state.data['nodes']._data[key].index);
      } else {
        var _currentID = parseInt(this.state.data['nodes']._data[key].index);
        if (_currentID > id) {
          id = _currentID;
        }
      }
    }

    id++;

    return id;
  }

  addNode(label, options) {
    var _nextId = this.getNextId();
    var id = _nextId;
    var _this = this;

    if (_this.state.id) {
      id = _this.state.id + "-" + _nextId
    }

    try {
      var _defaultOptions = {
        id: id,
        index: _nextId,
        label: label + '\nID: ' + id,
        font: {
          align: 'left'
        },
        // common
        tag: label,
        version: 'Latest',
        description: options.description,
        shape: 'box',
        // Build
        buildTag: '',
        buildCpu: ''
      };

      var containerOptions = $.extend(_defaultOptions, options);
      // if (!isNaN(options.x)) {
      //   container.x = options.x;
      // }
      // if (!isNaN(options.y)) {
      //   container.y = options.y;
      // }

      _this.state.data['nodes'].add(containerOptions);
      var container = new Container(containerOptions);
      _this.state['hashContainers'].push(container);

      return container;
    } catch (err) {
      alert(err);
    }
  }

  findContainer(id) {
    for (var i in this.state.data['nodes']._data) {
      if (this.state.data['nodes']._data[i].id == id) {
        return this.state.data['nodes']._data[i];
      }
    }
    return null;
  }

  findLink(id) {
    for (var i in this.state.data['edges']._data) {
      if (this.state.data['edges']._data[i].id == id) {
        return this.state.data['edges']._data[i];
      }
    }
    return null;
  }

  componentDidMount() {
    var options = {};
    options = $.extend(this._defaultOptions, options);

    this.state.network = new vis.Network(this.refs.canvas, this.state.data, options);

    this.state.network.on('release', this.release.bind(this));
    this.state.network.on('selectEdge', this.selectEdge.bind(this));
    this.state.network.on('deselectEdge', this.deselectEdge.bind(this));
    this.state.network.on('selectNode', this.selectNode.bind(this));
    this.state.network.on('deselectNode', this.deselectNode.bind(this));
    this.state.network.on('doubleClick', this.doubleClick.bind(this));

    this.state.network.moveTo({
      position: {
        x: 0,
        y: 0
      },
      scale: 0.8
    });

    var canvas = $(this.refs.canvas);
    this.droppable = canvas.droppable({
      tolerance: 'pointer',
      drop: (function(event, ui) {
        event.preventDefault();

        var uiType = ui.draggable.attr('data-type');
        var canvasOffset = canvas.find("canvas").offset();

        var canvasPosition = this.state['network'].getViewPosition();
        var currentScale = this.state['network'].getScale();

        switch (uiType) {
          case 'flowcontrol-start':
            if (this.state['currentWorkflow'].hasStartNode) {
              return;
            }

            this.addNode(ui.helper.attr('data-tag'), {
              description: '',
              fixed: false,
              x: (ui.offset.left - canvasOffset.left - (canvas.find("canvas").width() / 2) + 150 + canvasPosition.x) / currentScale,
              y: (ui.offset.top - canvasOffset.top - (canvas.find("canvas").height() / 2) + 50 + canvasPosition.y) / currentScale,
              shape: 'circularImage',
              image: require('../../images/start.png'),
              label: 'Start',
              type: uiType,
              font: {
                size: 13
              },
              color: {
                background: '#FF9900'
              }
            });

            this.state['currentWorkflow'].hasStartNode = true;
            break;
          case 'flowcontrol-end':
            if (this.state['currentWorkflow'].hasEndNode) {
              return;
            }

            console.log('drop flowcontrol-end');
            this.addNode(ui.helper.attr('data-tag'), {
              description: '',
              fixed: false,
              x: (ui.offset.left - canvasOffset.left - (canvas.find("canvas").width() / 2) + 150 + canvasPosition.x) / currentScale,
              y: (ui.offset.top - canvasOffset.top - (canvas.find("canvas").height() / 2) + 50 + canvasPosition.y) / currentScale,
              shape: 'circularImage',
              image: require('../../images/exit.png'),
              label: 'End',
              type: uiType,
              font: {
                size: 13
              },
              color: {
                background: '#FF9900'
              }
            });

            this.state['currentWorkflow'].hasEndNode = true;
            break;
          case 'flowcontrol-condition':
            this.addNode(ui.helper.attr('data-tag'), {
              description: '',
              fixed: false,
              x: (ui.offset.left - canvasOffset.left - (canvas.find("canvas").width() / 2) + 150 + canvasPosition.x) / currentScale,
              y: (ui.offset.top - canvasOffset.top - (canvas.find("canvas").height() / 2) + 50 + canvasPosition.y) / currentScale,
              shape: 'image',
              image: require('../../images/condition.png'),
              label: 'Condition',
              type: uiType,
              font: {
                size: 13
              },
              color: {
                background: '#CA7AFF'
              }
            });
            break;

          case 'flowcontrol-loop':
            var options = {
              description: '',
              fixed: false,
              group: 'loop',
              x: (ui.offset.left - canvasOffset.left - (canvas.find("canvas").width() / 2) + 150 + canvasPosition.x) / currentScale,
              y: (ui.offset.top - canvasOffset.top - (canvas.find("canvas").height() / 2) + 50 + canvasPosition.y) / currentScale,
              shape: 'image',
              image: require('../../images/loop.png'),
              label: 'Loop',
              type: uiType,
              font: {
                size: 13
              },
              color: {
                background: '#D1D175'
              },
              initControlStart: true
            };
            var container = this.addNode(ui.helper.attr('data-tag'), options);

            this.props.onNewLoop(container);

            break;
          default:
            this.addNode(ui.helper.attr('data-tag'), {
              description: '',
              x: (ui.offset.left - canvasOffset.left - (canvas.find("canvas").width() / 2) + 150 + canvasPosition.x) / currentScale,
              y: (ui.offset.top - canvasOffset.top - (canvas.find("canvas").height() / 2) + 50 + canvasPosition.y) / currentScale,
              type: 'docker-image'
            });
        }
      }).bind(this)
    });
  };

  render() {
    return (
      <div style={{flex: '1'}}>
        <div className={this.props.className + ' flow-canvas'} ref='canvas' id={this.props.id}/>
      </div>
    );
  }

}

export default WorkflowCanvas;
