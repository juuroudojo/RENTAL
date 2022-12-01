//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Callback {
    function callback(uint price) public {
        (bool success,) = msg.sender.call{value:price}("");
        require(success);
    }
}