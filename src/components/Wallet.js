import { ethers } from "ethers";
import { useState } from "react";
import { Navbar, Nav, Button, } from 'react-bootstrap'
import React from 'react';


const networks = {
    polygon: {
        chainId: `0x${Number(80001).toString(16)}`,
        chainName: "Polygon Testnet",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
        },
        rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    },
};

const Wallet = () => {
   
    const [account, setAccount] = useState(null);

    const connectWallet = async () => {
        const accounts =await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0])
       if(account)
       alert("Wallet Connected")
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        if (provider.network !== "matic") {
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        ...networks["polygon"],
                    },
                ],
            });
        }
       
      

         
    }
  

    return (
        <Button onClick={connectWallet} variant="outline-light">Connect Wallet<br/>{account}</Button>
            
      
    );
};


export default Wallet;