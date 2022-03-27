import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import CreateRecord from './CreateRecord';
import Permission from './Permission';
import Share from './Share';
import ViewRecords from './ViewRecords';
import Navigation from './Navigation';



//const client = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values



class App extends Component{

    

  

    render (){

        return (

            <BrowserRouter>

                <div className='App'>
                    <>

                        <Navigation/>

                    </>
                    <div>

                        <Routes>
                            <Route path="/" element={<Home />}>

                            </Route>
                            <Route path="/createRecord" element={<CreateRecord />}>

                            </Route>
                            <Route path="/permission" element={<Permission />}>

                            </Route>
                            <Route path="/share" element={<Share />}>

                            </Route>
                            <Route path="/view" element={<ViewRecords />}>

                            </Route>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>


        );
    }

}
export default App;
