import React, { Component } from 'react';
import './App.css';
import {
    Link
} from "react-router-dom";

class Home extends Component {
    render(){
    return (
        <div>
          
        <div className="container-fluid mt-5 app">
            <div className="row">
                <div>
                    <h3 className="text-center">Welcome to MyMEDI(A Medical Records Blockchain)</h3>
                </div>
                <main role="main" className="col-lg-12 d-flex text-center">

                    <div className="content mr-auto ml-auto">
                        <p>&nbsp;</p>
                        <div className="row">

                            <hr />
                            <br />
                            <br />
                            <h3 className="text-center">Choose Your Profile</h3>
                            <hr />
                         </div>
                        <br />
                        <br />
                        <div className="row">
                            <div className="col text-center">
                             <a className="btn btn-primary btn-lg" href="Permission">Provider</a>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col text-center">
                                <a className="btn btn-primary btn-lg" href="CreateRecord">Patient</a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
       </div>
        );
}
}

export default Home;