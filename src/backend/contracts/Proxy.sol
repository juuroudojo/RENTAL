//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;


// This Proxy is not to be used in real project, it serves the sole reason for me to experiment with assembly and proxies
contract Proxy {
    address implementation;
    address owner;

    function initialize() external {

    }

    modifier onlyOwner {
        require(msg.sender==owner, "Not an owner!");
        _;
    }

    function setImplementation(address _implementation) public onlyOwner {
        implementation = _implementation;
    }
    
    function _delegate(address _imp) internal virtual{
        assembly {
            calldatacopy(0, 0, calldatasize())

            let result:= delegatecall(gas(), _imp, 0, calldatasize(), 0, 0)

            returndatacopy(0, 0, returndatasize())

            switch result
            case 0{
                revert(0, returndatasize())
            }
            default{
                return(0, returndatasize())
            }
        }
    }

    receive() external payable{
        _delegate(implementation);
    }
}