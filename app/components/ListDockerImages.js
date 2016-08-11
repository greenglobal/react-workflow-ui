'use strict';
import React from 'react';
import Accordion from './accordions';
let Isvg = require('react-inlinesvg');
let logo = require("../images/mini-logo-white-inset.png");

class ListDockerImages extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      searchTerm: '',
      initial: true,
      searching: false,
      listDockerImages: []
    };

    this.searchTimeout = null;

    this.exampleResponse = {
      "count": 3756,
      "next": "https://hub.docker.com/v2/search/repositories/?query=mysql&page=2&page_size=20",
      "previous": null,
      "results": [{
        "star_count": 2547,
        "pull_count": 20803174,
        "repo_owner": null,
        "short_description": "MySQL is a widely used, open-source relational database management system (RDBMS).",
        "is_automated": false,
        "is_official": true,
        "repo_name": "mysql"
      }, {
        "star_count": 164,
        "pull_count": 211591,
        "repo_owner": null,
        "short_description": "Optimized MySQL Server Docker images. Created, maintained and supported by the MySQL team at Oracle",
        "is_automated": true,
        "is_official": false,
        "repo_name": "mysql/mysql-server"
      }, {
        "star_count": 0,
        "pull_count": 1191,
        "repo_owner": null,
        "short_description": "MySQL (MariaDB fork) Docker image.",
        "is_automated": true,
        "is_official": false,
        "repo_name": "tozd/mysql"
      }, {
        "star_count": 45,
        "pull_count": 5857293,
        "repo_owner": null,
        "short_description": "Image containing mysql. Optimized to be linked to another image/container.",
        "is_automated": true,
        "is_official": false,
        "repo_name": "centurylink/mysql"
      }, {
        "star_count": 8,
        "pull_count": 48941,
        "repo_owner": null,
        "short_description": "Centos/Debian Based Customizable MySQL Container - Updated 06/16/2016",
        "is_automated": true,
        "is_official": false,
        "repo_name": "appcontainers/mysql"
      }, {
        "star_count": 2,
        "pull_count": 729,
        "repo_owner": null,
        "short_description": "Docker Mysql",
        "is_automated": true,
        "is_official": false,
        "repo_name": "alterway/mysql"
      }, {
        "star_count": 2,
        "pull_count": 499,
        "repo_owner": null,
        "short_description": "MySQL for Drupal",
        "is_automated": true,
        "is_official": false,
        "repo_name": "drupaldocker/mysql"
      }, {
        "star_count": 2,
        "pull_count": 395,
        "repo_owner": null,
        "short_description": "Yfix docker built mysql",
        "is_automated": true,
        "is_official": false,
        "repo_name": "yfix/mysql"
      }, {
        "star_count": 1,
        "pull_count": 486,
        "repo_owner": null,
        "short_description": "MySQL server image",
        "is_automated": true,
        "is_official": false,
        "repo_name": "phpmentors/mysql"
      }, {
        "star_count": 0,
        "pull_count": 247670,
        "repo_owner": null,
        "short_description": "Improved `mysql` service with support for `mysqld_safe` and `fixtures` loaded from `mysqldump.sql`",
        "is_automated": true,
        "is_official": false,
        "repo_name": "cloudposse/mysql"
      }, {
        "star_count": 0,
        "pull_count": 805,
        "repo_owner": null,
        "short_description": "MySQL service for nanobox.io",
        "is_automated": true,
        "is_official": false,
        "repo_name": "nanobox/mysql"
      }, {
        "star_count": 36,
        "pull_count": 1192550,
        "repo_owner": null,
        "short_description": "",
        "is_automated": true,
        "is_official": false,
        "repo_name": "sameersbn/mysql"
      }, {
        "star_count": 0,
        "pull_count": 2111,
        "repo_owner": null,
        "short_description": "Build for MySQL. Project available on https://github.com/vukor/docker-web-stack",
        "is_automated": true,
        "is_official": false,
        "repo_name": "vukor/mysql"
      }, {
        "star_count": 6,
        "pull_count": 1485,
        "repo_owner": null,
        "short_description": "MySQL Server based on Ubuntu 14.04",
        "is_automated": true,
        "is_official": false,
        "repo_name": "marvambass/mysql"
      }, {
        "star_count": 0,
        "pull_count": 1770,
        "repo_owner": null,
        "short_description": "MySQL is a widely used, open-source relational database management system (RDBMS).",
        "is_automated": true,
        "is_official": false,
        "repo_name": "lancehudson/docker-mysql"
      }, {
        "star_count": 1,
        "pull_count": 104,
        "repo_owner": null,
        "short_description": "MySQL images with my own config files.",
        "is_automated": true,
        "is_official": false,
        "repo_name": "sin30/mysql"
      }, {
        "star_count": 2,
        "pull_count": 3131,
        "repo_owner": null,
        "short_description": "Docker image to run MySQL by Azuki - http://azk.io",
        "is_automated": true,
        "is_official": false,
        "repo_name": "azukiapp/mysql"
      }, {
        "star_count": 1,
        "pull_count": 75,
        "repo_owner": null,
        "short_description": "mysql",
        "is_automated": true,
        "is_official": false,
        "repo_name": "kaluzki/mysql"
      }, {
        "star_count": 0,
        "pull_count": 113,
        "repo_owner": null,
        "short_description": "akilli/base based MySQL image",
        "is_automated": true,
        "is_official": false,
        "repo_name": "akilli/mysql"
      }, {
        "star_count": 0,
        "pull_count": 208,
        "repo_owner": null,
        "short_description": "MySQL",
        "is_automated": true,
        "is_official": false,
        "repo_name": "livingobjects/mysql"
      }]
    };
  }

  componentDidMount() {

  };

  handleSearch(name, value) {
    if (this.searchTimeout)
      clearTimeout(this.searchTimeout);

    let searchTerm = value.target.value;
    let _this = this;

    this.searchTimeout = setTimeout(function() {
      if (searchTerm.length <= 1) {
        return;
      }

      _this.setState({initial: false});
      _this.setState({searching: true});

      let url = 'https://hub.docker.com/v2/search/repositories/?page=1&query=' + encodeURIComponent(searchTerm) + '&page_size=20';

      $.ajax({
        url: url,
        success: function(response) {
          _this.setState({searching: false});
          console.log(response);
          _this.setState({listDockerImages: response.results});

          // applyDragDrop();
        },
        error: function(response) {
          _this.setState({searching: false});
        }
      })
    }, 500);
  }

  render() {
    return (
      <Accordion title="Docker Images">
        <form className='form-search' action="#" onsubmit="return false;">
          <input name='searchTerm' className='form-input' type="text" placeholder="Search for docker images..." id="txtSearchDockerImages" onKeyUp={this.handleSearch.bind(this, 'searchTerm')}/>
          <button className='button button-icon'>
            <Isvg src="../../images/search.svg" alt="search icon" width={35} height={35} >

            </Isvg>
          </button>
        </form>
        <div id="listDockerImages" ref="listDockerImages">
          {
            this.state.initial ?
            <ul className='list-result' id="listDockerImages">
              <li className='no-result'>Please search for docker images.</li>
            </ul>
            : this.state.searching ?
            <ul className="list-result">
              <li className="searching">Looking for docker images ...</li>
            </ul>
            :
            this.state.listDockerImages ?
            <ul className="list-result" id="listDockerImages">
              {
              this.state.listDockerImages.length > 0 ?
              this.state.listDockerImages.map((item) =>
                <li className="list" data-tag={item.repo_name} key={item.repo_name}>
                  <div className="area-image">
                    {
                    item.is_official ?
                    <img className="image" src={"https://hub.docker.com/public/images/official/" + item.repo_name + ".png"} alt="image logo"/>
                    :
                    <img className="image" src={logo} alt="image logo"/>
                    }
                  </div>
                  <div className="area-content">
                    <h3 className="title"><a className="link" href="#">{item.repo_name}</a></h3>
                    <p className="desc"><strong>Description:</strong> {item.short_description}</p>
                  </div>
                </li>
              )
              :
              <li class='no-result'>No result found.</li>
              }
            </ul>
            :
            ''
          }
        </div>
    </Accordion>
    );
  }
}

export default ListDockerImages;
