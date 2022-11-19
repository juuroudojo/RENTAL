// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Avtomobil{
    // Якщо малишка твоя - все файно, двигун жуже, і в добру путь, якщо крадун - треба або орендувати, або свою купляти, не поїдеш
    function ZavestyDvygun() public{
        require(Car.owner==msg.sender || Car._owner== msg.sender, , "Brrr, Brrr, Brrr, Zagloh");
        dvygun.vroooooom();
        if(Car.model == Zhygul) {
            revert("Brrr, Brrr, Brrr, Zagloh");
        }
    }
}