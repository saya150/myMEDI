// contracts/MyToken.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract nftRecord is AccessControl,ERC721URIStorage {
    // Create a new role identifier for the minter role
    bytes32 public constant DCREATOR_ROLE = keccak256("DCREATOR_ROLE");//with role permission creator or viewer
    bytes32 public constant PATIENT_ROLE = keccak256("PATIENT_ROLE");//by default creator and viewer
    address patient;
    uint public tokenCount;
   
 

    constructor() ERC721("nftRecord", "MTKN") {
        // Grant the minter role to a specified account
        patient=msg.sender;
        _setupRole(DEFAULT_ADMIN_ROLE,patient);
        _setupRole(PATIENT_ROLE,patient);
        
   }

     
     function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }


    function givePermission(address minter) public{
       _grantRole(DCREATOR_ROLE, minter);
      
}

    function mint(string memory tokenURI)external payable returns(uint _tokenCount) {
       
        if(hasRole(PATIENT_ROLE, msg.sender)  || hasRole(DCREATOR_ROLE, msg.sender))
        {

          tokenCount++;
         _safeMint(patient, tokenCount);
         _setTokenURI(tokenCount, tokenURI);
          return(tokenCount);
       }
       else{
            givePermission(msg.sender);
        }
    }

    
    
}
