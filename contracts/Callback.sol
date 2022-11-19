//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import ""

contract Callback {
    function CounterOffer() public {

    }

    function approve() public {

    }

    function callback(uint price) public {
        (bool success,) = msg.sender.call{value:price}("");
        require(success);
    }
}