import React,{Component} from 'react';
import { ReactComponent as Logo } from './logo.svg';

export class Home extends Component{
    render(){
        return(
            <div>
                <h3>The Home Page</h3>
                <h2>It is {new Date().toLocaleTimeString()}.</h2>
                <Logo />
            </div>
        )
    }
}