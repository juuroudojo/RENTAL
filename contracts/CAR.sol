// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import {RENT} from "./RENT.sol";
import {IPlatform} from "./interfaces/IPlatform.sol";

contract Car {
    event Started(address owner, uint timestamp, uint duration);

    bool started;

    function Start(address _platform, uint _carid) public {
        (address owner, address _owner, uint until) = IPlatform(_platform)
            .getCarInfo(_carid);

        require(owner == msg.sender || _owner == msg.sender, "Not an owner!");
        if (_owner == msg.sender) {
            require(until <= block.timestamp, "Rental expired!");
        }

        started = true;

        emit Started(owner, block.timestamp, until);
    }
}
