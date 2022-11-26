import './App.css';
import { useState, useEffect} from 'react';
import { ethers } from 'ethers';

import PageButton from './components/PageButton';
import ConnectButton from './components/connectButton';
import { GearFill } from 'react-bootstrap-icons';
import ConfigModal from './components/ConfigModal';

function App() {
  const [provider, setProvider] = useState(undefined)
  const [signer, setSigner] = useState(undefined)
  const [signerAddress, setSignerAddress] = useState(undefined)
  const [showModal, setShowModal] = useState(undefined)

  useEffect(() => {
    const onLoad = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
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
  

  return (
    <div className="App">
      <div className="appNav">
        <div className="my-2 buttonContainer buttonContainerTop">
          <PageButton name={"AddOffer"} isBold={true} />
          <PageButton name={"Offers"}  />
          <PageButton name={"My Offers"}  />
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
        <div className='swapContainer'>
        <div className='swapHeader'> 
          <span className='swapText'> Add Offer </span>
           </div>
          <div className='buttonContainer3' onClick={() => setShowModal(true)}>
            {"Choose car"}
            {showModal && (
              <ConfigModal
                onClose={() => setShowModal(false)}
                 />
            )}
          </div>
          <div className='buttonContainer3' onClick={() => setShowModal(true)}>
            {"Set Price"}
            {showModal && (
              <ConfigModal
                onClose={() => setShowModal(false)}
                 />
            )}
          </div>
          </div>
        </div>
    </div>
  );
}

export default App;
