//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface IRent {
    function counterOffer (bytes memory _id, uint _price, uint _timePeriod) external;
}