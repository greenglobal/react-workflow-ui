'use strict';

function DockerImage() {
  this.getDockerImageInfo = function(name, callback, errCallback) {
    $.ajax({
      url: 'https://hub.docker.com/v2/repositories/' + name,
      success: function(response) {
        if (response.count == 0) {
          errCallback(response);
        } else {
          callback(response);
        }
      },
      error: function(err) {
        errCallback(err);
      }
    });
  }
}
