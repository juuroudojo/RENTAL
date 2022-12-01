// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import {ICallback} from "./interfaces/ICallback.sol";

contract RENT {
    
    // added by comprido96
    event AddedCar(uint indexed Id, address Owner);

    event CounterOffer (address indexed Owner, address Customer, uint Price, uint TimePeriod);
    event Proposal (address indexed Owner,uint Price, uint TimePeriod );
    event Deal (address indexed seller, address indexed buyer, uint price, uint timePeriod);
    
    // OorCo := Offer or Counter Offer
    enum OorCO {
        O, 
        CO 
    }

    enum Status {
        Inactive,
        Active
    }

    struct Car {
        uint id; // added by comprido96
        address owner;
        address _owner;
        uint _until;
    }
   
    struct Offer {
        address seller;
        address buyer;
        uint price;
        uint timePeriod;
        bool bappoval; // buyer approval
        bool sapproval; // seller approval
        uint carId;
        Status status;
        OorCO oorco;
    }

    mapping (uint=>Car) cars;
    mapping (bytes=>Offer) listings;
    mapping (address => mapping(uint => bool)) isOwner;
    bytes[] public hashes;
    constructor() {
    }

    modifier onlyContract() {
        require(msg.sender == address(this));
        _;
    }

    function listOffer(uint _car, uint _price, uint _timePeriod) 
            
            public returns(bytes memory hash){
        require(isOwner[msg.sender][_car], "Not an owner!");
        bytes memory hashId = abi.encode(block.timestamp, _car, msg.sender);
        Offer storage d = listings[hashId];
        
        d.seller = msg.sender;
        d.timePeriod = _timePeriod;
        d.oorco = OorCO.O;
        d.price = _price;

        hashes.push(hashId);

        emit Proposal (msg.sender, _price, _timePeriod);

        return hashId;
    }
    //  TODO: Should create a new offer with unique hash having bapproval set to true and sapproval to false;
    function counterOffer(bytes memory _id, uint _price, uint _timePeriod) public returns(bytes memory hash) {
        Offer memory _o = listings[_id];
       
        require(_o.status == Status.Active || _o.oorco == OorCO.O,
            "Offer doesn't exist!");
        require(_o.status != Status.Active  || _o.oorco == OorCO.CO,
            "Counter offer already exists!");

        bytes memory _hash = abi.encodePacked(block.timestamp, _id, msg.sender);
        Offer storage o = listings[_hash];
        o.buyer = msg.sender;
        o.seller = _o.seller;
        o.price = _price;
        o.oorco = OorCO.CO;
        o.timePeriod = _timePeriod;
        o.bappoval = true;
        o.sapproval = false;

        emit CounterOffer(_o.buyer, msg.sender, _price, _timePeriod);

        hashes.push(_hash);

        return _hash;
    }

    // @param _id Offer id
    // @param _sellerOrBuyer 0 for seller, 1 for buyer

    function approve(bytes memory _id, bool _sellerOrBuyer) public {
        
        Offer memory d = listings[_id];
        if(!_sellerOrBuyer) {
            require(d.oorco == OorCO.CO && d.seller == msg.sender, 
            "Counteroffer doesn't exist or You are not a seller!");
            d.sapproval = false;
        } else {
            require(d.buyer == msg.sender, "Not a buyer");
            d.bappoval = true;
        }
        // if (d.sapproval || d.bappoval) {
            //finaliseDeal(_id, d.buyer);
    }

    // If when calling a router to take funds buyer has to pay it reverts - the offer should be terminated and the buyer receives 1 of 3 warnings for sabotaging
    function finaliseDeal(bytes memory _id, address _buyer) public onlyContract {
        Offer memory _offer = listings[_id];
        // Router pays the price in the callback function
        ICallback(_buyer).callback(_offer.price);
        // should check if money arrived *check uniswapv3pool*
        // require();
        Car storage car = cars[_offer.carId];
        car._owner = _buyer;
        car._until = block.timestamp + _offer.timePeriod; 

        emit Deal(_offer.seller, _offer.buyer, _offer.price, _offer.timePeriod);
    }

    function getCarInfo(uint _id) public view returns(address, address, uint) {
        Car memory c = cars[_id];
        return(c.owner, c._owner, c._until);
    }

    function getListingInfo(bytes memory _hashId) public view returns(address seller, address buyer, uint price, uint timePeriod, bool bapproval, bool sapproval, uint carId, Status status, OorCO oorco) {
        Offer memory o = listings[_hashId];

        return(
        o.seller,
        o.buyer,
        o.price,
        o.timePeriod,
        o.bappoval,
        o.sapproval,
        o.carId,
        o.status,
        o.oorco);
    }

    // added by comprido96
    function addCar(uint id, address owner) public {
        Car storage c = cars[id];

        c.id = id;
        c.owner = owner;

        isOwner[owner][id] = true;

        emit AddedCar(id, owner);
    }
}