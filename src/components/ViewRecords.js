import React, { Component } from 'react';
import Web3 from 'web3';
import { useState,useRef  } from 'react';
import { Row, Form, Button,Col, Card, } from 'react-bootstrap'
import nftRecordAddress from '../contractsData/nftRecord-address.json';
import ViewRecordAddress from '../contractsData/viewRecord-address.json';
import nftAbi from '../contractsData/abis/nftRecord.json';
import viewAbi from '../contractsData/abis/ViewRecord.json';
import { ethers } from "ethers";

import { useEffect } from 'react';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these valuesc


const ViewRecord = () => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
      const [account, setAccount] = useState('')

    
     

        
      useEffect(() => {
        const loadViewRecord = async () =>{
          // Get provider from Metamask
          console.log(1)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        //get signer
        const signer = provider.getSigner()

     
      const  View = new ethers.Contract(ViewRecordAddress.address,viewAbi.abi,signer);
        console.log(ViewRecordAddress.address)
      const  NFT = new ethers.Contract(nftRecordAddress.address,nftAbi.abi,signer);
      console.log(NFT.address)
      console.log(NFT.tokenCount())

        const Accounts =await window.ethereum.request({ method: "eth_requestAccounts" });
       
        setAccount(Accounts[0]);
       console.log(Accounts[0])
        const itemCount= await View.itemCount();
        console.log(2)
        console.log(itemCount); 
        try{
        let items =[]
       console.log(3)
     
        for (let i = 1; i <= itemCount; i++) {
        
          console.log(i)
            const item = await View.items(i)
           console.log(item)
             // get uri url from nft contract
            
            const uri = await NFT.tokenURI(item.tokenId)
            
             // use uri to fetch the nft metadata stored on ipfs 
             const response = await fetch(uri)
            
             const metadata = await response.json()
             
          // Add item to items array
             items.push({
                image: metadata.image,
                itemId: item.itemId,
                description: metadata.description,
                name: metadata.name,
                
              })
           
              
            }
            console.log(items)

              setLoading(false)
              setItems(items)
        
          }catch(err)
          {
          console.log(err)
         } 

         }
      loadViewRecord()
      },[]);

      
     
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h2>Loading...</h2>
        </main>
      )
    
  
     return (
     
            
        <div className="flex justify-center">
           
        {items.length > 0 ?
          <div className="px-5 container">
            <Row xs={1} md={2} lg={4} className="g-4 py-5">
              {items.map((item, idx) => (
                <Col key={idx} className="overflow-hidden">
                  <Card>
                    <Card.Header>
                     
                    </Card.Header>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body color="secondary">
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                        {item.description}
                      </Card.Text>
                    </Card.Body>
                  
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          : (
            <main style={{ padding: "1rem 0" }}>
              <h2>No listed assets</h2>
            </main>
          )}
      </div>
    );
  }

export default ViewRecord;