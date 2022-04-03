import React, { Component } from 'react';
import Web3 from 'web3';
import { useState,useRef  } from 'react';
import { Row, Form, Button } from 'react-bootstrap'

import nftRecordAddress from '../contractsData/nftRecord-address.json';
import ViewRecordAddress from '../contractsData/viewRecord-address.json';
import nftAbi from '../contractsData/abis/nftRecord.json';
import viewAbi from '../contractsData/abis/ViewRecord.json';
import { ethers } from "ethers";
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these valuesc


const CreateRecord =() => {
   
    const [values, setValues] = useState({
        name: "",
        fileURL:``,
        description: "",
      });
      const [account, setAccount] = useState('')
      //const [address, setAddress] = useState('')
   

    const uploadToIPFS = async (event) => {
        event.preventDefault()
        const file = event.target.files[0]
        if (typeof file !== 'undefined') {
            
          try {
            const result = await ipfs.add(file)
            console.log(result)
            const fileURL=`https://ipfs.infura.io/ipfs/${result.path}`
             setValues({ ...values, fileURL})
           console.log(fileURL)
          } catch (error){
            console.log("ipfs image upload error: ", error)
          }
        }
      }
    
       const createNFT = async () => {
        console.log("create nft");
       const{name,description,fileURL} = values;
       if(!name || !description || !fileURL) 
       {
        console.log(name)
        console.log(description)
        console.log(fileURL)
           return;
        }
       
       //upload to ipfs
       try{
        console.log("trying to add data");
       const data = JSON.stringify({
           name,
           description,
           image: fileURL
       });
      console.log("metadata addded");
           const added = await ipfs.add(data);
           const url = `https://ipfs.infura.io/ipfs/${added.path}`
           //pass url to polygon
           
           mintThenList(url);
       }catch(err){
     console.log("error uploading to ipfs",err);
       }

    }
        
         const mintThenList = async (url) => {
          
   
            const accounts =await window.ethereum.request({ method: "eth_requestAccounts" });
            setAccount(accounts[0]);

            // Get provider from Metamask
           const provider = new ethers.providers.Web3Provider(window.ethereum)
       
           // Set signer
           const signer = provider.getSigner()
            console.log(signer.getAddress());
            
            try{
                const View = new ethers.Contract(ViewRecordAddress.address,viewAbi.abi,signer);
                console.log(ViewRecordAddress.address)
                const NFT = new ethers.Contract(nftRecordAddress.address,nftAbi.abi,signer);
                console.log(NFT.tokenCount);
                
               
             let minted = await(await NFT.mint(url)).wait()
            console.log(minted)
             
                const id = await NFT.tokenCount()
                console.log(id);
                if(id)
                alert("minted successfully")
                else
                alert("not successful")
                 // get tokenId of new nft 
                
                  // add nft to marketplace

                  // approve marketplace to spend nft
                  await(await NFT.setApprovalForAll(View.address, true)).wait()
                
              
                 let added = await(await View.makeItem(NFT.address,id,values.description,values.name)).wait()
                 console.log(added)
                
                 
                 console.log(NFT.tokenCount())
                 console.log(View.itemCount())
                }catch(e)
                {
                 
                 console.log(e)
             }
           
          }
         
           
           
        
        

          const handleChange = (e) => {
            e.persist();
            console.log("handler addded");
            setValues((prevValues) => {
                return {
                  ...prevValues,
                  [e.target.name]: e.target.value,
                };
              });
          };

          
        
      return (
            <div className="container-fluid mt-5 app">
                
                <Row>
                    <div>
                        <h3 className="text-center">Welcome to MyMEDI(A Medical Records Blockchain)</h3>
                    </div>
                    <main role="main" className="col-lg-12 d-flex text-center">

                        <div className="content mr-auto ml-auto">
                           
                            <p>&nbsp;</p>
                            <h2>Create a new medical record</h2>
                          
                            <Form.Control type="file" required name="file" onChange={uploadToIPFS} />
                            <Form.Control onChange={handleChange} size="lg" required type="text" placeholder="Record Name" name="name" />
                            <Form.Control onChange={handleChange} size="lg" required  name="description" as="textarea" placeholder="Doctor's note" />
                           
                            <div className="d-grid px-0">
                            <Button  variant="primary" size="lg" onClick={createNFT}> 
                            {/*  */}
                            Create
                            </Button>
                         </div>
                        
                
                            {/* <form className="form-horizontal form" id="patientForm"  > */}
                            {/* onSubmit={this.onSubmit} */}
                                {/* <div className="form-group" >
                                    <label>Record name  :
                                        <input type="text" placeholder="Record identification name" />
                                    </label>
                                </div>
                             
                                <div className="form-group">
                                    <label>Doctor note  :
                                        <input type="text" placeholder="Enter symptoms, ailments, medications etc." />
                                    </label>
                                </div>

                                <div className="form-group">
                                    <label>Upload the medical record file  :
                                        <input type='file'  />
                                        {/* onChange={this.captureFile} */}
                                        {/* <button type="submit" class="btn btn-primary">Submit</button>
                                    </label>
                                </div>

                            </form> */} 
                          
                          
                          
                        </div>
                       
                    </main>
                    </Row>
                </div>
                


            );

        }
    

export default CreateRecord;