import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat"
import { Contract, ContractFactory, BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { readFile } from "fs/promises";
var Web3 = require('web3');
var web3 = new Web3('http://localhost:8545');

describe("Rent", () => {
    let Rental: ContractFactory;
    let rental: Contract;
    let Denji: SignerWithAddress;
    let Power: SignerWithAddress;
    let Makima: SignerWithAddress;
    let hash: string;
    let hash1: string;

    before(async () => {
        [Denji, Power, Makima] = await ethers.getSigners();
    });

    beforeEach(async () => {
        Rental = await ethers.getContractFactory("RENT");
        rental = await Rental.deploy();
        await rental.deployed();
    })

    describe("List Offer", async () => {
        it("Should list an offer", async () => {
            await rental.addCar(1, Denji.address);
            await rental.listOffer(1, ethers.utils.parseEther("2"), 345123);

        });

        it("Should fail to list an offer: Not an owner!", async () => {
            expect(rental.connect(Power).listOffer(1, ethers.utils.parseEther("3"))).to.be.revertedWith("Not an owner");
        });
    })

    describe("counterOffer", async () => {
        it("Should list a counterOffer", async () => {
            expect(rental.connect(Makima).counterOffer()).to
        });

        it("Should fail to counterOffer: Offer doesn't exist!", async () => {
            expect(rental.connect(Power).counterOffer("WrongHash", 0, 200)).to.be.revertedWith("Offer doesn't exist!");
        });

        it("Should fair to counterOffer: CounterOffer already exists!", async () => {

        });
    })

    describe("Approve", async () => {
        it("Should approve as buyer", async () => {
            await rental.addCar(1, Denji.address)
            await rental.listOffer(1, ethers.utils.parseEther("2"), 300);

            hash = await rental.hashes(0);

            expect(rental.connect(Power).approve(hash));
        });

        it("Should approve as a seller", async () => {
            await rental.addCar(1, Denji.address);
            await rental.listOffer(1, ethers.utils.parseEther("2"), 100000);
            hash = await rental.hashes(0)
            await rental.connect(Makima).counterOffer(hash, ethers.utils.parseEther("1.7"), 97000);

            hash1 = await rental.hashes(1);

            await rental.approve(hash1, 0);
        });

        it("Should fail to approve: Counteroffer doesn't exist!", async () => {
            expect(rental.approve("WrongHash", 0)).to.be.revertedWith("Counteroffer doesn't exist or You are not a seller!");
        });

        it("Should fail to approve: You are not a seller!", async () => {
            await rental.addCar(1, Denji.address);
            const hash = await rental.listOffer(1, ethers.utils.parseEther("2"), 100000)
            expect(rental.connect(Makima).approve(hash, 0)).to.be.revertedWith("Counteroffer doesn't exist or You are not a seller!");
        });

        it("Should fail to approve: Not a buyer", async () => {
            await rental.addCar(1, Denji.address);
            const hash = await rental.listOffer(1, ethers.utils.parseEther("2"), 100000)
            expect(rental.connect(Makima).approve(hash, 1)).to.be.revertedWith("Not a buyer");
        });
    })

    describe("finaliseDeal", async () => {
        it("should emit Deal event", async () => {
            await rental.addCar(1, Denji.address);
            await rental.listOffer(1, ethers.utils.parseEther("2"), 345123);

            hash = await rental.hashes(0);

            await rental.approve(hash, 0);

            expect(await rental.finaliseDeal(hash, Power.address)).to.emit(rental, "Deal");
        });

    })

    describe("Internal function", async () => {
        it("getListingInfo", async () => {
            await rental.addCar(1, Denji.address);
            await rental.listOffer(1, 20, 30);
            let hash = await rental.hashes(0);
            await rental.getListingInfo(hash);
        })

        it("getCarInfo", async () => {
            await rental.addCar(1, Denji.address);
            await rental.getCarInfo(1);
        })
    })
})