// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import {RENT} from "./RENT.sol";

contract Avtomobil{
    bool started

    function Start(address _platform, uint _carid) public{
        (address owner, address _owner, uint until) = IPlatform(_platform).getCarInfo(_id)

        require(owner == msg.sender || _owner == msg.sender, "Not an owner!");
        if(_owner == msg.sender) {
            require(until <= block.timestamp, "Rental expired!");
            _;
        }

        started = true;
    }
}