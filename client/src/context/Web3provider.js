/* eslint-disable */
import React, { useState } from 'react';
import Pilot from '../contracts/Pilot.json';
import LensAbi from '../contracts/Lens.json';
import { Web3Context } from './index';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { generateChallenge, authenticate, refreshAuth, getProfiles } from '../Lens/query';
import jwt_decode from 'jwt-decode';
import { lensHub } from '../Lens/utils/lens-hub';

const Web3Provider = ({ children }) => {
  //const [chainId,setChain]=useState("")
  const [account, setAccount] = useState({
    accounts: null,
    currentAccount: null,
  });
  const [pilotContract, setPilotContract] = useState('');
  const [lensContract, setLensContract] = useState('');
  const [loginStat, setStat] = useState(false);
  const [profileId, setProfileId] = useState('');

  // const connectWeb3 = new Promise(async (resolve) => {
  //   const web3 = await getWeb3();
  //   resolve(web3);
  // });
  //Connect Wallet utility
  // const randomNumber = Math.round(Math.random() * 1000000);
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount({
        accounts: accounts,
        currentAccount: accounts[0],
      });

      // console.log('Connected', accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    checkStatus();
    refresh();

    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have metamask!');
      return;
    } else {
      // console.log('We have the ethereum object');
    }

    var web3 = new Web3(window.ethereum);

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    const chain = await web3.eth.getChainId();
    //setChain(chain)
    // console.log('chain ID:', chain);
    setAccount({
      accounts: accounts,
      currentAccount: accounts[0],
    });

    //console.log("lensLogin")

    if (accounts.length !== 0) {
      //const account = accounts[0];
      // console.log('Found an authorized account:', account);
      // login(accounts[0])
      //console.log(chain)

      getContract(chain);
      await getProfile(accounts[0]);
    } else {
      //console.log('No authorized account found');
    }
  };
  const getContract = (chain) => {
    //console.log(provider,signer);
    var web3 = new Web3(window.ethereum);
    //console.log(LensAbi)
    //const networkId = await web3.eth.net.getId();
    const PilotdeployedNetwork = Pilot.networks[chain];
    const LensdeployedNetwork = chain;
    const lensAddress = '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82';

    const PilotInstance = new web3.eth.Contract(Pilot.abi, PilotdeployedNetwork && PilotdeployedNetwork.address);
    const lensInstance = new web3.eth.Contract(LensAbi, LensdeployedNetwork && lensAddress);
    //console.log(account.currentAccount)

    //console.log(instance)
    setPilotContract(PilotInstance);
    setLensContract(lensInstance);
  };
  const sign = (text) => {
    const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = ethersProvider.getSigner();
    return signer.signMessage(text);
  };

  const login = async (account) => {
    if (!account) {
      return false;
    }

    // we request a challenge from the server
    const challengeResponse = await generateChallenge(account);

    // sign the text with the wallet
    const signature = await sign(challengeResponse.data.challenge.text);

    const accessTokens = await authenticate(account, signature);
    console.log(accessTokens);
    localStorage.setItem('refershToken', accessTokens.data.authenticate.refreshToken);
    localStorage.setItem('accessToken', accessTokens.data.authenticate.accessToken);
    window.location.reload();
  };
  const checkStatus = () => {
    if (!localStorage.getItem('refershToken')) {
      return;
    }
    const a = localStorage.getItem('refershToken');
    const res = jwt_decode(a);
    if (res.exp < Date.now()) setStat(true);
  };
  const refresh = async () => {
    if (!localStorage.getItem('accessToken')) {
      return;
    }
    const a = localStorage.getItem('accessToken');
    const res = jwt_decode(a);
    if (res.exp < Date.now()) {
      const b = await refreshAuth(localStorage.getItem('refershToken'));
      localStorage.setItem('accessToken', b.data.refresh.accessToken);
    }
  };
  const getProfile = async (accounts) => {
    const a = {
      ownedBy: [`${accounts}`],
      limit: 50,
    };
    const res2 = await getProfiles(a);
    //console.log(res2);
    const res = res2.data.profiles.items.length
      ? res2.data.profiles.items[res2.data.profiles.items.length - 1].id
      : null;
    setProfileId(res);
  };

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        checkIfWalletIsConnected,
        account,
        pilotContract,
        lensContract,
        loginStat,
        login,
        profileId,
        lensHub,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
export default Web3Provider;
