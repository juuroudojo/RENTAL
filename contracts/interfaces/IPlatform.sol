// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface IPlatform {
    function getCarInfo(uint _id) external view returns(address, address, uint);
}