'use strict';
import React from 'react';

let classNames = require('classnames');

class ContainerProps extends React.Component {
  render() {
    return (
      <form className='form-action item-props' action="#" id="containerProps" onsubmit="return false;" style={{display: 'none'}}>
        <div className='wrap-content'>
          <dl className='accordion'>
            <dt className='accordion-heading'>
              <h4 className='title'>Common Options</h4>
              <i className='icon-toggle' />
            </dt>
            <dd className='accordion-content show'>
              <div className='form-group'>
                <label className='form-label' htmlFor="#">From:
                  <b rv-text="containerProps.tag" />
                </label>
              </div>
              <div className='form-group inline'>
                <label className='form-label' htmlFor="#">Version:</label>
                <select className='form-input' name id rv-value="containerProps.version">
                  <option value="Latest">Latest</option>
                  <option value={3.0}>3.0</option>
                  <option value={2.0}>2.0</option>
                  <option value={1.0}>1.0</option>
                </select>
              </div>
            </dd>
            <dt className='accordion-heading'>
              <h4 className='title'>Build Options</h4>
              <i className='icon-toggle' />
            </dt>
            <dd className='accordion-content'>
              <div className='form-group inline'>
                <label className='form-label' htmlFor="#">CPUs:</label>
                <select className='form-input' name id rv-value="containerProps.buildCpu">
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>
              <div className='form-group'>
                <label className='form-label' htmlFor="#" rv-value="containerProps.build.memory">Memory:</label>
                <select className='form-input' name id>
                  <option value="512 Mb">512 Mb</option>
                  <option value="1024 Mb">1024 Mb</option>
                  <option value="2048 Mb">2048 Mb</option>
                  <option value="4096 Mb">4096 Mb</option>
                </select>
              </div>
              <div className='form-group'>
                <label className='form-label' htmlFor="#">Tag (name:version):</label>
                <input className='form-input' type="text" name id rv-input="containerProps.build.tag" />
              </div>
              <div className='form-group'>
                <label className='form-label' htmlFor="#">Build script (Dockerfile):</label>
                <textarea className='form-input' name id cols={30} rows={10} rv-input="containerProps.build.dockerfile" defaultValue={"RUN apt-get install git RUN mkdir /data WORKDIR /data COPY data /data\n                      "} />
              </div>
              <div className='form-group'>
                <label className='form-label' htmlFor="#">Environments:</label>
                <textarea className='form-input' name id cols={30} rows={10} rv-input="containerProps.build.environments" defaultValue={""} />
              </div>
            </dd>
            <dt className='accordion-heading'>
              <h4 className='title'>Run Options</h4>
              <i className='icon-toggle' />
            </dt>
            <dd className='accordion-content'>
              <div className='form-group'>
                <label className='form-label' htmlFor="#">Name:</label>
                <input className='form-input' type="text" name id rv-input="containerProps.run.name" /></div>
              <div className='form-group'>
                <label className='form-label' htmlFor="#">Entry Point:</label>
                <input className='form-input' type="text" name id rv-input="containerProps.run.entrypoint" /></div>
              <div className='form-group'>
                <label className='form-label' htmlFor="#">Command:</label>
                <input className='form-input' type="text" name id rv-input="containerProps.run.cmd" /></div>
              <div className='form-group'>
                <label className='form-label' htmlFor="#">Ports:</label>
                <input className='form-input' type="text" name id rv-input="containerProps.run.ports" /></div>
              <div className='form-group'>
                <label className='form-label' htmlFor="#">Volumes:</label>
                <input className='form-input' type="text" name id rv-input="containerProps.run.volumes" /></div>
              <div className='form-group'>
                <label className='form-label' htmlFor="#">Detach:</label>
                <div className='radio radio-inline'>
                  <label htmlFor="radio1">
                    <input type="radio" id="radio1" name="detach" defaultChecked />
                    Yes
                  </label>
                  <label htmlFor="radio2">
                    <input type="radio" id="radio2" name="detach" />
                    No
                  </label>
                </div>
              </div>
              <fieldset className='form-fieldset'>
                <legend className='form-legend'>Network</legend>
                <div className='form-group'>
                  <label className='form-label' htmlFor="#">DNS(s):</label>
                  <textarea className='form-input' name id cols={30} rows={4} rv-input="containerProps.run.dns" defaultValue={""} />
                </div>
                <div className='form-group'>
                  <label className='form-label' htmlFor="#">Link Local IP:</label>
                  <input className='form-input' type="text" name id rv-input="containerProps.run.linkLocalIP" /></div>
              </fieldset>
              <div className='form-group'>
                <label className='form-label' htmlFor="#">Security Options:</label>
                <input className='form-input' type="text" name id rv-input="containerProps.run.securityOptions" /></div>
              <fieldset className='form-fieldset'>
                <legend className='form-legend'>Runtime Privilege</legend>
                <div className='form-group'>
                  <label className='form-label' htmlFor="#">Privileged:</label>
                  <div className='radio radio-inline'>
                    <label htmlFor="radio1">
                      <input type="radio" id="radio1" name="privileged" defaultChecked />
                      Yes
                    </label>
                    <label htmlFor="radio2">
                      <input type="radio" id="radio2" name="privileged" />
                      No
                    </label>
                  </div>
                </div>
              </fieldset>
            </dd>
          </dl>
        </div>
      </form>
    );
  }
}

export default ContainerProps;
