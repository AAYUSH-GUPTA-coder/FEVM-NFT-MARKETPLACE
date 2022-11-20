// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract FvmNFT is ERC721URIStorage {
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    function mint(address _to, uint _number, string memory _tokenURI) public {
        for (uint i = 0; i < _number; i++) {
         // Mint the token
        _mint(_to, i);

        // setting default token Metadata 
        _setTokenURI(i, _tokenURI);
        }
    }
}