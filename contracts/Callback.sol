//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Callback {
    function callback(uint price, address receiver) public {
        (bool success, ) = receiver.call{value: price}("");
        require(true);
    }
}
