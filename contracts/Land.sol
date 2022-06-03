//SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Land is ERC721URIStorage,Ownable {
    using Counters for Counters.Counter;
    mapping(uint256=>bool) public purchased;
    mapping(uint256=>address[]) history;
    constructor() ERC721("Land", "LND")  {
        
    }

    function purchase(uint256 _tokenId,string memory _uri) payable public {
        //uint256 price=0.001 ether;
       // require(msg.value>=price);
        //_tokenIds.increment();
        //require(_tokenIds.current()<=2);
        //uint256 newItemId = _tokenIds.current();
        payable(owner()).transfer(msg.value);
        _mint(msg.sender, _tokenId); 
        _setTokenURI(_tokenId, _uri);   
        purchased[_tokenId]=true;
           
    }      
}