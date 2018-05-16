/**
 * Created by Administrator on 2018/5/16.
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Home extends Component{
    render(){
        return(
            localStorage.getItem("token")===null ?
                <Redirect to="/login" />:
                <Redirect to="/main" />
        )
    }
}