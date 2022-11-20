// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract RENT {
    
    event CounterOffer (address indexed Owner, address Customer, uint Price, uint TimePeriod);
    event Offer (address indexed Owner,uint Price, uint TimePeriod );
    event Deal (address indexed seller, address indexed buyer, uint price, uint timePeriod);
    
    struct Car {
        address owner;
        address _owner;
        uint _until;
    }

    enum OorCO {
        O,
        CO
    }
    
    struct offer {
        address seller;
        address buyer
        uint price;
        uint timePeriod;
        bool bappoval;
        bool sapproval;
        uint carId;
        Status status;
        OorCO oorco;
    }

    mapping (uint=>Car) cars;
    mapping (bytes=>offer) listings;
    mapping (address => mapping(uint => bool)) owner;
    
    constructor() {}

    modifier onlyContract() {
        require(msg.sender == address(this));
        _;
    }

    function ListOffer(uint _car, uint _price, uint _timePeriod) public {
        require(owner[msg.sender][_car], "Not an owner!");
        bytes memory hashid = abi.encode(block.timestamp, _car, msg.sender);
        offer storage d = listings[hashid];
        
        d.owner = msg.sender;
        d.requiredChecks = ownQT;
        d.status = Active;
        d.requiredChecks = ownQT;
        d.status = Pending;

        d.id = hashid;
        d.timePeriod = _timePeriod;
        d.oorco.o;
        d.price = _price;
    }
    //  TODO: Should create a new offer with unique hash having bapproval set to true and sapproval to false;
    function CounterOffer(bytes memory _id, uint _price, uint _timePeriod) public {
        offer memory _o = listings[_id];
       
        require(_o.active, "Offer doesn't exist!");
        require(_o.active.oorco != 1, "Counter offer already exists!");

        bytes _hash = abi.encodePacked(block.timestamp, _id, msg.sender);
        offer storage o = listings[_hash];
        o.seller = msg.sender;
        o.price = _price;
        o.oorco = 1;
        o.timePeriod = _timePeriod;
        o.bappoval = true;
        o.sapproval = false;

        emit CounterOffer(_o.owner, msg.sender, _price, _timePeriod);
    }

    // @param _id Offer id
    // @param _sellerOrBuyer 0 for seller, 1 for buyer

    function Approve(bytes memory _id, bool _sellerOrBuyer) public {
        
        offer memory d = listings[_id];
        if(_sellerOrBuyer) {
            require(d.OorCO.co && d.seller == msg.sender, "Counteroffer doesn't exist or You are not a seller!");
            d.sapproval = false;
        } else {
            require(d.buyer == msg.sender, "Not a buyer");
            d.bappoval = true;
        }
        // if (d.sapproval || d.bappoval) {
            finaliseDeal(_id, d.buyer)
        // }
    }

    // If when calling a router to take funds buyer has to pay it reverts - the offer should be terminated and the buyer receives 1 of 3 warnings for sabotaging
    function finaliseDeal(bytes _id, address _buyer) public onlyContract {
        offer memory _offer = listings[id];
        // Router pays the price in the callback function
        ICallback.(_buyer).Callback(uint _offer.price);
        // should check if money arrived *check uniswapv3pool*
        require();
        Car storage car = cars[_offer.CAR];
        car._owner = _caller;
        car.until = block.timestamp + _offer.timePeriod;   
    }

    function getCarInfo(uint _id) public view returns(address, address, uint) {
        Car memory c = cars[_id];
        return(c.owner, c._owner, c.until);
    }

    function getListingInfo(bytes _hashId) public view returns() {

    }
}