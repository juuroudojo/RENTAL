//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface ICallback {
    function callback(uint price) external;
}