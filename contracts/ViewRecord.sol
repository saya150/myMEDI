// SPDX-License-Identifier: MIT
// contracts/MyToken.sol
pragma solidity >=0.4.0 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract ViewRecord is ERC721,AccessControl {

  // itemId -> Item
    mapping(uint => Item) public items;

    bytes32 public constant VIEWER_ROLE = keccak256("VIEWER_ROLE");
    bytes32 public constant PATIENT_ROLE = keccak256("PATIENT_ROLE");
     uint itemCount;
    struct Item {
      
        IERC721 nft;
        uint tokenId;
        string description;
        string nftName;
    }
      

    //Constructor()
    constructor() ERC721("MyMEDI", "MTKN") {
        // Grant the minter role to a specified account
         
        _setupRole(PATIENT_ROLE, msg.sender);
        _setupRole(DEFAULT_ADMIN_ROLE,msg.sender);
        
        
    }
  
     function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

     function makeItem(IERC721 _nft, uint _tokenId,string memory _description,string memory _recordName) external {
       
      itemCount++;
        // add new item to items mapping
        items[itemCount] = Item (
             _nft,
            _tokenId, 
            _description,
            _recordName
         
        );
       }

  function giveViewPermission(address viewer) public{
       _grantRole(VIEWER_ROLE, viewer);
       
 }
    function checkViewPermission() public returns(bool canViewPerm){
      
       if(hasRole(PATIENT_ROLE, msg.sender) ||hasRole(VIEWER_ROLE,msg.sender))
        return true;
        else
        {
        giveViewPermission(msg.sender);
        
        }

  }

}