import { artifacts, ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());


  // Get the ContractFactories and Signers here.
  const Car = await ethers.getContractFactory("Car");
  const PROXY = await ethers.getContractFactory("Proxy");
  const RENT = await ethers.getContractFactory("Rent");
  // deploy contracts
  const car = await Car.deploy();
  const proxy = await PROXY.deploy();
  const rent = await RENT.deploy();

  // Save copies of each contracts abi and address to the frontend.
  saveFrontendFiles(car, "Car");
  saveFrontendFiles(proxy, "Proxy");
  saveFrontendFiles(rent, "Rent");
}

function saveFrontendFiles(contract: any, name: any) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
