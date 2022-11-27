import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Route, Routes, Navigate } from "react-router-dom";

import PageButton from './components/PageButton';
import ConnectButton from './components/connectButton';
import { GearFill } from 'react-bootstrap-icons';
import ConfigModal from './components/ConfigModal';
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Offers from "./pages/Offers";
import MyOffers from "./pages/MyOffers";
import AddOffer from "./pages/AddOffer";
import MyRentals from "./pages/MyRentals";
import MustConnect from './pages/MustConnect';

function App() {
  const [provider, setProvider] = useState(undefined)
  const [signer, setSigner] = useState(undefined)
  const [signerAddress, setSignerAddress] = useState(undefined)
  const [showModal, setShowModal] = useState(undefined)
  const [offers, setOffers] = useState([])

  useEffect(() => {
    const onLoad = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)
    }
    onLoad()
  }, [])

  const getSigner = async provider => {
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer)
  }
  const isConnected = () => signer !== undefined
  const getWalletAddress = () => {
    signer.getAddress()
      .then(address => {
        setSignerAddress(address)
      })
  }

  if (signer !== undefined) {
    getWalletAddress()
  }

  const cars = [{ id: 0, owner: 'fede', price: 100, model: "Lambo", until: 10, format: "hours" },
  { id: 1, owner: 'fede', price: 150, model: "Ferrari", until: 12, format: "hours" },
  { id: 2, owner: 'daniel', price: 200, model: "Bugatti", until: 20, format: "hours" }
  ];


  //setOffers(oldArray => [...oldArray, cars]);


  /* for local development only
  *
  *
  * 
  */
  const timeConversion = { hours: 60 * 60, days: 24 * 60 * 60, weeks: 7 * 24 * 60 * 60 }

  /*
  *
  *
  * 
  */

  return (
    <div className="App">
      <div className="appNav"><Navbar /></div>
      <div className="rightNav">
        <div className="connectButtonContainer">
          <ConnectButton
            provider={provider}
            isConnected={isConnected}
            signerAddress={signerAddress}
            getSigner={getSigner}
          />
        </div>
      </div>

      <div className="appBody">
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/offers" element={< Offers offers={cars} />} />
          <Route
            exact
            path="/addoffer"
            element={
              isConnected() ? (
                <AddOffer offers={offers} />
              ) : (
                <MustConnect />
              )
            }
          />
          <Route
            exact
            path="/myoffers"
            element={
              isConnected() ? (
                <MyOffers />
              ) : (
                <MustConnect />
              )
            }
          />
          <Route
            exact
            path="/myrentals"
            element={
              isConnected() ? (
                <MyRentals />
              ) : (
                <MustConnect />
              )
            }
          />
        </Routes>
      </div>
    </div>


    /*
        <div className="App">
          <div className="appNav">
            <div className="my-2 buttonContainer buttonContainerTop">
              <PageButton name={"AddOffer"} isBold={true} />
              <PageButton name={"Offers"} />
              <PageButton name={"My Offers"} />
              <PageButton name={"My Rentals"} />
            </div>
    
            <div className="rightNav">
              <div className="connectButtonContainer">
                <ConnectButton
                  provider={provider}
                  isConnected={isConnected}
                  signerAddress={signerAddress}
                  getSigner={getSigner}
                />
              </div>
              <div className="my-2 buttonContainer">
                <PageButton name={"Info"} isBold={true} />
              </div>
            </div>
          </div>
    
          <div className="appBody">
    
          </div>
        </div>
        */
  );

}

export default App;
