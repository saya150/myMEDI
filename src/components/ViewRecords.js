import React, { Component } from 'react';
import Web3 from 'web3';
import { useState,useRef  } from 'react';
import { Row, Form, Button,Col, Card, } from 'react-bootstrap'
import nftRecordAddress from '../contractsData/nftRecord-address.json';
import ViewRecordAddress from '../contractsData/viewRecord-address.json';
import nftAbi from '../contractsData/abis/nftRecord.json';
import viewAbi from '../contractsData/abis/ViewRecord.json';
import { ethers } from "ethers";
import cardImage from "../components/image/covidtest.jpg"
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these valuesc


const ViewRecord = () => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
      const [account, setAccount] = useState('')

    
     

      // Get provider from Metamask
     const provider = new ethers.providers.Web3Provider(window.ethereum)
     //get signer
     const signer = provider.getSigner()

     
      const  View = new ethers.Contract(ViewRecordAddress.address,viewAbi.abi,signer);
        console.log(ViewRecordAddress.address)
      const  NFT = new ethers.Contract(nftRecordAddress.address,nftAbi.abi,signer);
   
      //const t= loadViewRecord()
   
        const loadViewRecord = async () =>{
        const Accounts =await window.ethereum.request({ method: "eth_requestAccounts" });
       
        setAccount(Accounts[0]);
       
        const itemCount= await NFT.itemCount;
        console.log(itemCount); //undefined
        try{
        let items =[]
       
        for (let i = 1; i <= itemCount; i++) {
            const item = await View.items(i)
             // get uri url from nft contract
            const uri = await NFT.tokenURI(item.tokenId)
            console.log(uri)
             // use uri to fetch the nft metadata stored on ipfs 
             const response = await fetch(uri)
             console.log(response)
             const metadata = await response.json()
          // Add item to items array
             items.push({
                image: metadata.image,
                itemId: item.itemId,
                description: metadata.description,
                name: metadata.name,
                
              })
            }
              setLoading(false)
              setItems(items)
        
        }catch(err)
        {
          console.log(err)
        } 

      }
        
     
    
    
    //   if(!View.checkViewPermission()){
    //       return(
    //           <div>
    //             <main style={{ padding: "1rem 0" }}>
    //             <h2>No View Permission</h2>
    //           </main>  
    //           </div>
    //       )
    //   }
    //  else{
    //    connection();
    //    loadViewRecord();
     return (
     
        <div className="flex justify-center">
          {View.checkViewPermission() ?
          <div className="px-5 container">
            <Row xs={4} md={6} lg={8} className="g-4 py-5">
          <Col className="overflow-hidden">
            <Card>
              <Card.Img variant='top' src={cardImage}/>
              <Card.Title>covid test</Card.Title>
              <Card.Text>
                         Negative all good!
                        </Card.Text>
            </Card>
            </Col>
            </Row>
            </div>
          :(
            <main style={{ padding: "1rem 0" }}>
                <h2>No Permission</h2>
             </main>
          )}
          </div>
            //  <div>
            // {items.length > 0 ?
            // <div className="px-5 container">
            //   <Row xs={1} md={2} lg={4} className="g-4 py-5">
            //     {items.map((item, idx) => (
            //       <Col key={idx} className="overflow-hidden">
            //         <Card>
            //           <Card.Img variant="top" src={item.image} />
            //           <Card.Body color="secondary">
            //             <Card.Title>{item.name}</Card.Title>
            //             <Card.Text>
            //               {item.description}
            //             </Card.Text>
            //           </Card.Body>
            //           <Card.Footer>
                        
            //           </Card.Footer>
            //         </Card>
            //       </Col>
            //     ))}
            //   </Row>
            // </div>
            // : (
            //   <main style={{ padding: "1rem 0" }}>
            //     <h2>No listed Records</h2>
            //   </main>
            //)}
          //    </div>:(
          //     <main style={{ padding: "1rem 0" }}>
          //       <h2>No View Permission</h2>
          //     </main>
          //    )
          // }
           
          
      );
}
//}
export default ViewRecord;