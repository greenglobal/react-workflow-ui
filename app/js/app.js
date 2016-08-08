var nodes = [];
var edges = [];
var connectionCount = [];
var network = null;
var template;
var hashContainers = [];
var currentDataContainer = [];
currentDataContainer.push(window);

var di = {
  selected: null,
  showContainerProps: false
};

var loopDataContainer = {};


var searchTimeout;

function doSearch(event) {
  if (searchTimeout)
    clearTimeout(searchTimeout);


  searchTimeout = setTimeout(function() {
    var searchTerm = $('#txtSearchDockerImages').val();
    if (searchTerm.length <= 1) {
      return;
    }

    var url = 'https://hub.docker.com/v2/search/repositories/?page=1&query=' + encodeURIComponent(searchTerm) + '&page_size=20';

    $('#listDockerImages ul').remove();
    $('#listDockerImages').append($('<ul class="list-result"><li class="searching">Looking for docker images ...</li></ul>'));
    $.ajax({
      url: url,
      success: function(response) {
        var html = template(response);

        $('#listDockerImages ul').remove();
        $('#listDockerImages').append(html);

        applyDragDrop();
      }
    })
  }, 500);
}

var dockerImage = new DockerImage();

$(document).ready(function() {
  $('#txtSearchDockerImages').keyup(doSearch);

  var source = $("#listDockerImageItemTemplate").html();
  template = Handlebars.compile(source);

  // Add tabs terminal
  $('.tabs li').click(function() {
    var tab_id = $(this).attr('data-tab');

    $('.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#" + tab_id).addClass('current');
  });

  // Resizable
  // $('.bottom-content').resizable({
  //   handles: "n",
  //   minHeight: 100,
  //   maxHeight: 200
  // });

  // Accordion
  $('.accordion .accordion-heading.show').next().show();

  $('.accordion .accordion-heading').click(function() {
    var $this = $(this);
    var isShowing = false;

    if ($this.hasClass('show')) {
      isShowing = true;
    }

    var allAccordion = $this.parent().parent().find('.accordion-heading.show').each(function(index, elem) {
      if ($this != $(elem)) {
        $(elem).removeClass('show');
        $(elem).next().slideUp(350);
        $(elem).find('.icon-toggle').removeClass('open');
      }
    });

    if (!isShowing) {
      $this.find('.icon-toggle').addClass('open');
      $this.addClass('show');
      $this.next().slideDown(350);
    }
  });

  // testing only
  // var response = {
  //   "count": 3756,
  //   "next": "https://hub.docker.com/v2/search/repositories/?query=mysql&page=2&page_size=20",
  //   "previous": null,
  //   "results": [{
  //     "star_count": 2547,
  //     "pull_count": 20803174,
  //     "repo_owner": null,
  //     "short_description": "MySQL is a widely used, open-source relational database management system (RDBMS).",
  //     "is_automated": false,
  //     "is_official": true,
  //     "repo_name": "mysql"
  //   }, {
  //     "star_count": 164,
  //     "pull_count": 211591,
  //     "repo_owner": null,
  //     "short_description": "Optimized MySQL Server Docker images. Created, maintained and supported by the MySQL team at Oracle",
  //     "is_automated": true,
  //     "is_official": false,
  //     "repo_name": "mysql/mysql-server"
  //   }, {
  //     "star_count": 0,
  //     "pull_count": 1191,
  //     "repo_owner": null,
  //     "short_description": "MySQL (MariaDB fork) Docker image.",
  //     "is_automated": true,
  //     "is_official": false,
  //     "repo_name": "tozd/mysql"
  //   }, {
  //     "star_count": 45,
  //     "pull_count": 5857293,
  //     "repo_owner": null,
  //     "short_description": "Image containing mysql. Optimized to be linked to another image/container.",
  //     "is_automated": true,
  //     "is_official": false,
  //     "repo_name": "centurylink/mysql"
  //   }, {
  //     "star_count": 8,
  //     "pull_count": 48941,
  //     "repo_owner": null,
  //     "short_description": "Centos/Debian Based Customizable MySQL Container - Updated 06/16/2016",
  //     "is_automated": true,
  //     "is_official": false,
  //     "repo_name": "appcontainers/mysql"
  //   }, {
  //     "star_count": 2,
  //     "pull_count": 729,
  //     "repo_owner": null,
  //     "short_description": "Docker Mysql",
  //     "is_automated": true,
  //     "is_official": false,
  //     "repo_name": "alterway/mysql"
  //   }, {
  //     "star_count": 2,
  //     "pull_count": 499,
  //     "repo_owner": null,
  //     "short_description": "MySQL for Drupal",
  //     "is_automated": true,
  //     "is_official": false,
  //     "repo_name": "drupaldocker/mysql"
  //   }, {
  //     "star_count": 2,
  //     "pull_count": 395,
  //     "repo_owner": null,
  //     "short_description": "Yfix docker built mysql",
  //     "is_automated": true,
  //     "is_official": false,
  //     "repo_name": "yfix/mysql"
  //   }, {
  //     "star_count": 1,
  //     "pull_count": 486,
  //     "repo_owner": null,
  //     "short_description": "MySQL server image",
  //     "is_automated": true,
  //     "is_official": false,
  //     "repo_name": "phpmentors/mysql"
  //   }, {
  //     "star_count": 0,
  //     "pull_count": 247670,
  //     "repo_owner": null,
  //     "short_description": "Improved `mysql` service with support for `mysqld_safe` and `fixtures` loaded from `mysqldump.sql`",
  //     "is_automated": true,
  //     "is_official": false,
  //     "repo_name": "cloudposse/mysql"
  //   }, {
  //     "star_count": 0,
  //     "pull_count": 805,
  //     "repo_owner": null,
  //     "short_description": "MySQL service for nanobox.io",
  //     "is_automated": true,
  //     "is_official": false,
  //     "repo_name": "nanobox/mysql"
  //   }, {
  //     "star_count": 36,
  //     "pull_count": 1192550,
  //     "repo_owner": null,
  //     "short_description": "",
  //     "is_automated": true,
  //     "is_official": false,
  //     "repo_name": "sameersbn/mysql"
  //   }, {
  //     "star_count": 0,
  //     "pull_count": 2111,
  //     "repo_owner": null,
  //     "short_description": "Build for MySQL. Project available on https://github.com/vukor/docker-web-stack",
  //     "is_automated": true,
  //     "is_official": false,
  //     "repo_name": "vukor/mysql"
  //   }, {
  //     "star_count": 6,
  //     "pull_count": 1485,
  //     "repo_owner": null,
  //     "short_description": "MySQL Server based on Ubuntu 14.04",
  //     "is_automated": true,
  //     "is_official": false,
  //     "repo_name": "marvambass/mysql"
  //   }, {
  //     "star_count": 0,
  //     "pull_count": 1770,
  //     "repo_owner": null,
  //     "short_description": "MySQL is a widely used, open-source relational database management system (RDBMS).",
  //     "is_automated": true,
  //     "is_official": false,
  //     "repo_name": "lancehudson/docker-mysql"
  //   }, {
  //     "star_count": 1,
  //     "pull_count": 104,
  //     "repo_owner": null,
  //     "short_description": "MySQL images with my own config files.",
  //     "is_automated": true,
  //     "is_official": false,
  //     "repo_name": "sin30/mysql"
  //   }, {
  //     "star_count": 2,
  //     "pull_count": 3131,
  //     "repo_owner": null,
  //     "short_description": "Docker image to run MySQL by Azuki - http://azk.io",
  //     "is_automated": true,
  //     "is_official": false,
  //     "repo_name": "azukiapp/mysql"
  //   }, {
  //     "star_count": 1,
  //     "pull_count": 75,
  //     "repo_owner": null,
  //     "short_description": "mysql",
  //     "is_automated": true,
  //     "is_official": false,
  //     "repo_name": "kaluzki/mysql"
  //   }, {
  //     "star_count": 0,
  //     "pull_count": 113,
  //     "repo_owner": null,
  //     "short_description": "akilli/base based MySQL image",
  //     "is_automated": true,
  //     "is_official": false,
  //     "repo_name": "akilli/mysql"
  //   }, {
  //     "star_count": 0,
  //     "pull_count": 208,
  //     "repo_owner": null,
  //     "short_description": "MySQL",
  //     "is_automated": true,
  //     "is_official": false,
  //     "repo_name": "livingobjects/mysql"
  //   }]
  // };
  // var html = template(response);
  //
  // $('#listDockerImages ul').remove();
  // $('#listDockerImages').append(html);

  applyDragDrop();

  $('#hostCommandInput').keyup(function(event) {
    if (event.which == 13) {
      var val = $('#hostCommandInput').val();
      if (val.trim() != '') {
        sendHostCommand(val);
      }
    }
  });

  $("#tabs-ops").tabs();
});

var cmdHistory = [];

function isContainerExisted(idOrName, dataContainer) {
  if (!dataContainer) {
    dataContainer = window;
  }
  for (var key in dataContainer['nodes']._data) {
    if (key == idOrName) {
      return true;
    }
  }
  return false;
}

var CommandLogger = {
  invalidCommand: function(cmd) {
    $('#containerHostCommandInput').before($('<div class="cmd">Unknown command: <i>' + cmd + '</i></div>'));
  },
  containerNotExist: function(idOrName) {
    $('#containerHostCommandInput').before($('<div class="cmd"><i>Container \"' + idOrName + '\" not exist</i></div>'));
  },
  imageNotExist: function(idOrName) {
    $('#containerHostCommandInput').before($('<div class="cmd"><i>Image: \"' + idOrName + '\" not exist</i></div>'));
  },
  log: function(str) {
    $('#containerHostCommandInput').before($('<div class="cmd">' + str + '</div>'));
  }
}


function sendHostCommand(cmd) {
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

var defaultBind = {
  showingContainerProps: false
};

function setupDroppable(canvas, dataContainer) {
  if (!dataContainer) {
    dataContainer = window;
  }

  canvas.droppable({
    tolerance: 'pointer',
    drop: function(event, ui) {
      if (currentDataContainer[currentDataContainer.length - 1].id !== dataContainer.id) {
        return;
      }

      event.preventDefault();

      var uiType = ui.draggable.attr('data-type');
      var canvasOffset = canvas.find("canvas").offset();

      var canvasPosition = dataContainer['network'].getViewPosition();
      var currentScale = dataContainer['network'].getScale();

      switch (uiType) {
        case 'flowcontrol-start':
          if (dataContainer['currentWorkflow'].hasStartNode) {
            return;
          }

          addNode(ui.helper.attr('data-tag'), {
            description: '',
            fixed: false,
            x: (ui.offset.left - canvasOffset.left - (canvas.find("canvas").width() / 2) + 150 + canvasPosition.x) / currentScale,
            y: (ui.offset.top - canvasOffset.top - (canvas.find("canvas").height() / 2) + 50 + canvasPosition.y) / currentScale,
            shape: 'circularImage',
            image: 'images/start.png',
            label: 'Start',
            type: uiType,
            font: {
              size: 13
            },
            color: {
              background: '#FF9900'
            }
          }, dataContainer);

          dataContainer['currentWorkflow'].hasStartNode = true;
          break;
        case 'flowcontrol-end':
          if (dataContainer['currentWorkflow'].hasEndNode) {
            return;
          }

          console.log('drop flowcontrol-end');
          addNode(ui.helper.attr('data-tag'), {
            description: '',
            fixed: false,
            x: (ui.offset.left - canvasOffset.left - (canvas.find("canvas").width() / 2) + 150 + canvasPosition.x) / currentScale,
            y: (ui.offset.top - canvasOffset.top - (canvas.find("canvas").height() / 2) + 50 + canvasPosition.y) / currentScale,
            shape: 'circularImage',
            image: 'images/exit.png',
            label: 'End',
            type: uiType,
            font: {
              size: 13
            },
            color: {
              background: '#FF9900'
            }
          }, dataContainer);

          dataContainer['currentWorkflow'].hasEndNode = true;
          break;
        case 'flowcontrol-condition':
          addNode(ui.helper.attr('data-tag'), {
            description: '',
            fixed: false,
            x: (ui.offset.left - canvasOffset.left - (canvas.find("canvas").width() / 2) + 150 + canvasPosition.x) / currentScale,
            y: (ui.offset.top - canvasOffset.top - (canvas.find("canvas").height() / 2) + 50 + canvasPosition.y) / currentScale,
            shape: 'image',
            image: 'images/condition.png',
            label: 'Condition',
            type: uiType,
            font: {
              size: 13
            },
            color: {
              background: '#CA7AFF'
            }
          }, dataContainer);
          break;

        case 'flowcontrol-loop':
          var options = {
            description: '',
            fixed: false,
            group: 'loop',
            x: (ui.offset.left - canvasOffset.left - (canvas.find("canvas").width() / 2) + 150 + canvasPosition.x) / currentScale,
            y: (ui.offset.top - canvasOffset.top - (canvas.find("canvas").height() / 2) + 50 + canvasPosition.y) / currentScale,
            shape: 'image',
            image: 'images/loop.png',
            label: 'Loop',
            type: uiType,
            font: {
              size: 13
            },
            color: {
              background: '#D1D175'
            }
          };
          var container = addNode(ui.helper.attr('data-tag'), options, dataContainer);

          $('#popupLoops').append($('<div class="dialog-workflow" id="popup-workflow-loop-' + container.id + '"><div class="loop-canvas"></div></div>'));
          loopDataContainer['data-' + container.id] = initDataContainer({
            id: container.id
          });

          draw('#popup-workflow-loop-' + container.id + ' .loop-canvas', {}, loopDataContainer['data-' + container.id]);

          setupDroppable($('#popup-workflow-loop-' + container.id + ' .loop-canvas'), loopDataContainer['data-' + container.id]);
          break;
        default:
          addNode(ui.helper.attr('data-tag'), {
            description: '',
            x: (ui.offset.left - canvasOffset.left - (canvas.find("canvas").width() / 2) + 150 + canvasPosition.x) / currentScale,
            y: (ui.offset.top - canvasOffset.top - (canvas.find("canvas").height() / 2) + 50 + canvasPosition.y) / currentScale,
            type: 'docker-image'
          }, dataContainer);
      }
    }
  });
}

function applyDragDrop() {
  $("#listDockerImages li, #listWorkflowControls li").draggable({
    helper: "clone",
    start: function(e, ui) {
      $(ui.helper).addClass("imageDraggableHelper");
    }
  });

  setupDroppable($("#myCanvas"), window);

  $('#containerProps').hide();
  $('#linkProps').hide();

  rivets.bind($('#containerProps'), defaultBind);
}


var nodesData = [],
  edgesData = [];
var seed = 2;

function destroy(dataContainer) {
  if (!dataContainer) {
    dataContainer = window;
  }

  if (dataContainer['network'] !== null) {
    dataContainer['network'].destroy();
    dataContainer['network'] = null;
  }
}

function getNextId(dataContainer) {
  if (!dataContainer) {
    dataContainer = window;
  }
  var id = 0;
  for (var key in dataContainer['nodes']._data) {
    if (id === 0) {
      id = parseInt(dataContainer['nodes']._data[key].index);
    } else {
      var _currentID = parseInt(dataContainer['nodes']._data[key].index);
      if (_currentID > id) {
        id = _currentID;
      }
    }
  }

  id++;

  return id;
}

function linkContainers(srcID, desId, dataContainer) {
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

function addNode(label, options, dataContainer) {
  if (!dataContainer) {
    dataContainer = window;
  }

  var _nextId = getNextId(dataContainer);
  var id = _nextId;

  if (dataContainer.id) {
    id = dataContainer.id + "-" + _nextId
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

    dataContainer['nodes'].add(containerOptions);
    var container = new Container(containerOptions);
    dataContainer['hashContainers'].push(container);

    return container;
  } catch (err) {
    alert(err);
  }
}

function findContainer(id, dataContainer) {
  if (!dataContainer) {
    dataContainer = window;
  }

  for (var i in dataContainer['nodes']._data) {
    if (dataContainer['nodes']._data[i].id == id) {
      return dataContainer['nodes']._data[i];
    }
  }
  return null;
}

function findLink(id, dataContainer) {
  for (var i in dataContainer['edges']._data) {
    if (dataContainer['edges']._data[i].id == id) {
      return dataContainer['edges']._data[i];
    }
  }
  return null;
}

function addEdge(linkOptions, callback, dataContainer) {
  if (!dataContainer) {
    dataContainer = window;
  }
  var _from, _to;
  if (linkOptions.from != linkOptions.to) {
    _from = findContainer(linkOptions.from, dataContainer);
    _to = findContainer(linkOptions.to, dataContainer);

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
            dataContainer['edges'].add(linkOptions);
            _from.allowAddLink = false;
          }
        } else {
          dataContainer['edges'].add(linkOptions);
        }

        if (_from.allowAddLink) {
          _from.allowAddLink = false;
        }
      }
    } else if (['flowcontrol-loop'].indexOf(_from.type) != -1) {
      linkOptions.type = 'ExitLoop';
      if (['docker-image', 'flowcontrol-condition'].indexOf(_to.type) != -1) {
        dataContainer['edges'].add(linkOptions);

        _from.allow = false;
      }
    } else if (['docker-image', 'flowcontrol-start', 'flowcontrol-loop'].indexOf(_from.type) != -1 && _to.type == 'docker-image') {
      if (['docker-image'].indexOf(_from.type) != -1) {
        linkOptions.smooth = {
          enabled: true,
          type: 'straightCross'
        }
      }

      dataContainer['edges'].add(linkOptions);
    } else if (['flowcontrol-condition', 'flowcontrol-loop'].indexOf(_to.type) != -1) {
      if (_from.type != 'docker-image') {
        dataContainer['edges'].add(linkOptions);
      } else {
        dataContainer['edges'].add(linkOptions);
      }
    } else if (['flowcontrol-end'].indexOf(_to.type) != -1) {

      // not allow loop to exit
      if (['flowcontrol-loop'].indexOf(_from.type) == -1) {
        dataContainer['edges'].add(linkOptions);
      }
    } else {
      dataContainer['edges'].add(linkOptions);
    }
    // callback(data);
  }
}

function initDataContainer(container) {
  if (!container) {
    container = window;
    container.id = 'window';
  }

  container.currentWorkflow = {
    hasEndNode: false,
    hasStartNode: false
  }

  container['hashContainers'] = [];
  container['di'] = {
    selected: null
  };

  return container;
}

function draw(selector, options, dataContainer) {
  var canvas = $(selector);

  if (!dataContainer) {
    dataContainer = window;
  }

  // destroy(dataContainer);
  dataContainer['nodes'] = new vis.DataSet();
  dataContainer['edges'] = new vis.DataSet();

  if (!dataContainer.document) {
    // var canvasPosition = dataContainer['network'].getViewPosition();

    var node = addNode('Loop Start', {
      description: '',
      fixed: false,
      //x: ((canvas.find("canvas").width() / 2) + 150 + canvasPosition.x) / currentScale,
      //y: ((canvas.find("canvas").height() / 2) + 50 + canvasPosition.y) / currentScale,
      x: 0,
      y: 0,
      shape: 'circularImage',
      image: 'images/start.png',
      label: 'Loop Start',
      type: 'flowcontrol-start',
      font: {
        size: 20
      },
      color: {
        background: '#FF9900'
      }
    }, dataContainer);

    dataContainer['currentWorkflow'].hasStartNode = true;
  }

  dataContainer['data'] = {
    nodes: dataContainer['nodes'],
    edges: dataContainer['edges']
  };

  // create a network
  dataContainer['container'] = canvas[0];

  var locales = {
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
  }

  var _defaultOptions = {
    layout: {
      randomSeed: seed
    }, // just to make sure the layout is the same when the locale is changed
    locale: 'en',
    locales: locales,
    height: '100%',
    width: '100%',
    groups: {
      loop: {
        color: {
          background: 'red'
        },
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
        label: {
          enabled: true,
          min: 14,
          max: 30,
          maxVisible: 30,
          drawThreshold: 5
        },
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
      addEdge: function(data, callback) {
        return addEdge(data, callback, dataContainer);
      }
    },
    physics: {
      solver: 'barnesHut',
      enabled: false
    }
  };

  var options = $.extend(_defaultOptions, options);

  rivets.binders.input = {
    publishes: true,
    routine: rivets.binders.value.routine,
    bind: function(el) {
      el.addEventListener('input', this.publish);
    },
    unbind: function(el) {
      el.removeEventListener('input', this.publish);
    }
  };

  dataContainer['network'] = new vis.Network(dataContainer['container'], dataContainer['data'], options);

  dataContainer['network'].moveTo({
    position: {
      x: 0,
      y: 0
    },
    scale: 0.8
  });
  dataContainer['network'].on('release', function(a, b, c, d) {
    console.log(a, b, c, d);
  });

  var currentBinding = null;
  var currentLinkBinding = null;

  dataContainer['network'].on("deselectEdge", function(params) {
    dataContainer['di'].selected = null;
    $('#linkProps, #conditionProps').hide();
    if (currentLinkBinding) {
      currentLinkBinding.unbind();
    }

  });

  dataContainer['network'].on("selectEdge", function(params) {
    if (params.edges.length > 0) {

      var link = findLink(params.edges[0], dataContainer);

      if (link) {
        dataContainer['di'].selectedLink = link;
      } else {
        dataContainer['di'].selectedLink = null;
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
        linkProps: dataContainer['di'].selectedLink
      });
      console.log(currentBinding);
    }
  });

  dataContainer['network'].on("doubleClick", function(params) {

    if (params.nodes.length > 0) {
      var selectedNode = findContainer(params.nodes[0], dataContainer);
      if (!selectedNode) {
        return;
      }

      currentDataContainer.push(loopDataContainer['data-' + selectedNode.id]);

      console.log('Double click on: ', selectedNode);

      if (selectedNode.type == 'flowcontrol-loop') {
        $("#popup-workflow-loop-" + selectedNode.id).dialog({
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
            currentDataContainer.pop();
          }
        });

        loopDataContainer['data-' + selectedNode.id]['network'].moveTo({
          position: {
            x: 0,
            y: 0
          }
        });
      }
    }
  });
  dataContainer['network'].on("selectNode", function(params) {
    // if selected item is a node
    defaultBind.showingContainerProps = true;
    if (params.nodes.length > 0) {
      var node = findContainer(params.nodes[0], dataContainer);

      console.log(node);
      if (node) {
        dataContainer['di'].selected = node;
      } else {
        dataContainer['di'].selected = null;
      }

      $('.item-props').hide();

      var $this;
      switch (node.type) {
        case 'flowcontrol-condition':
          $this = $('#conditionProps');
          break;
        default:
          $this = $('#containerProps');

          currentBinding = rivets.bind($('#containerProps'), {
            containerProps: dataContainer['di'].selected
          });
          break;
      }

      $this.show();
      $this.find('.accordion-heading:first').next().slideDown(350);
      $this.find('.accordion-heading:first .icon-toggle').addClass('open');
      $this.addClass('show');
    }
  });

  dataContainer['network'].on("deselectNode", function(params) {
    dataContainer['di'].selected = null;
    $('#containerProps, #linkProps, #conditionProps').hide();
    if (currentBinding) {
      currentBinding.unbind();
    }
    if (params.nodes.length == 0) {
      // TODO: Disable property inputs
    }
  });

}

function clearPopUp() {
  document.getElementById('saveButton').onclick = null;
  document.getElementById('cancelButton').onclick = null;
  document.getElementById('network-popUp').style.display = 'none';
}

function cancelEdit(callback) {
  clearPopUp();
  callback(null);
}

function saveData(data, callback) {
  data.id = document.getElementById('node-id').value;
  data.label = document.getElementById('node-label').value;
  clearPopUp();
  callback(data);
}

Handlebars.registerHelper('isEmpty', function(arr, options) {
  if (arr.length == 0) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper('isDefined', function(obj, options) {
  if (obj) {
    return options.fn(this);
  }
  return options.inverse(this);
});
