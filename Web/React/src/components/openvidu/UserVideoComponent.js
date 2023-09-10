import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';

export default class UserVideoComponent extends Component {

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }

    render() {
        return (
            <div style={{height:"100%"}}>
                {this.props.streamManager !== undefined ? (
                    <div className="streamcomponent" style={{height:"100%"}}>
                        <OpenViduVideoComponent streamManager={this.props.streamManager}/>
                        <div><p>{this.getNicknameTag()}</p></div>
                    </div>
                ) : null}
            </div>
        );
    }
}
