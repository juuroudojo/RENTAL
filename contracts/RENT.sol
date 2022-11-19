// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract RENT {
    
    event CounterOffer (address indexed Owner, address Customer, uint Price, uint TimePeriod);
    event Offer (address indexed Owner,uint Price, uint TimePeriod );
    
    struct Car {
        uint id;
        address owner;
        address _owner;
        uint _until;
    }

    enum Status {
        Inactive,
        Pending,
        Active
    }

    enum OorCO {
        O,
        CO
    }
    
    struct offer {
        address owner;
        uint requiredChecks;
        bytes id;
        uint price;
        uint timePeriod;
        uint bappoval;
        uint sapproval;
        Car CAR;
        Status status;
        OorCO oorco;
    }

    mapping (uint=>Car) cars;
    mapping (bytes=>offer) listings;
    mapping (uint=>proposal) proposals;
    mapping (address => mapping(uint => bool)) owner;
    mapping (uint=>uint) approvals;
    mapping (uint=>)
    
    constructor() {}

    modifier onlyContract() {
        require(msg.sender == address(this));
        _;
    }

    //В шлюбному агентстві:

    // — Ви кому, міс, перевагу віддаєте, брюнету чи блондину?
    // — Мені б хотілось рудого! В мене меблі червоного кольору! 😂😂😂😂😂😂😂
    // 😂😅😅😅😅😅

    function ListOffer(uint _car, uint _price, uint _timePeriod) public {
        require(owner[msg.sender][_car], "Not an owner!");
        bytes memory hashid = abi.encode(block.timestamp, _car, msg.sender);
        offer storage d = listings[hashid];
        uint ownQT = cars[_car].owners.lenght;
        
        if (ownQT = 1) {
            d.owner = msg.sender;
            d.requiredChecks = ownQT;
            d.status = Active;
        } else {
            d.requiredChecks = ownQT;
            d.status = Pending;
        }

        d.id = hashid;
        d.timePeriod = _timePeriod;
        d.oorco.o;
        d.price = _price;
    }
    
    function PendingDeal() public onlyContract{
        
    }

    // Мужик може ревесивнупропозицію тровати, ну тупо торгуватись, аргументує айді карту, суму, на скік хоч орендувати
    function CounterOffer(bytes memory _id, uint _price, uint _timePeriod) public {
        require(listings[_id].active, "Offer doesn't exist!");

        emit CounterOffer(listings[_id].owner, msg.sender, _price, _timePeriod);
    }

    // @param _id Offer id
    // @param _sellerOrBuyer 0 for seller, 1 for buyer
    function Approve(bytes memory _id, bool _sellerOrBuyer) public {
        offer memory d = listings[_id];
        if(_sellerOrBuyer) {
            require(owner[msg.sender][_id]);

        }
        
    }

    // Щедрий вечір, добрий вечір,
    // Добрим людям на здоров’я!

    // А в тім саду три тереми:
    // Щедрий вечір, добрий вечір,
    // Добрим людям на здоров’я!

    // У першому – красне сонце,
    // Щедрий вечір, добрий вечір,
    // Добрим людям на здоров’я!

    // У другому – ясен місяць,
    // Щедрий вечір, добрий вечір
    // Добрим людям на здоров’я!

    // А в третьому – дрібні зірки,
    // Щедрий вечір, добрий вечір,
    // Добрим людям на здоров’я!

    function finaliseDeal(bytes _id, address _caller) public onlyContract {
        offer memory _offer = listings[id];
        if(_caller = _offer.owner) {

        } else {
            if(_offer.status.Active) {
                // Router pays the price in the callback function
                ICallback.(_caller).Callback(uint _offer.price);
                require();
                Car storage car =_offer.CAR;
                car._owner = _caller;
                car.until = block.timestamp + _offer.timePeriod;
            }
        }
    }
}