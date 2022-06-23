import { ethers, utils } from 'ethers';
import omitDeep from 'omit-deep';

// This code will assume you are using MetaMask.
// It will also assume that you have already done all the connecting to metamask
// this is purely here to show you how the public API hooks together
export const ethersProvider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : null;

export const getSigner = () => {
  if (!window.ethereum) {
    return null;
  }
  return ethersProvider.getSigner();
};

export const getAddressFromSigner = () => {
  if (!window.ethereum) {
    return null;
  }
  return getSigner().address;
};

export const init = async () => {
  if (!window.ethereum) {
    return null;
  }
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  return accounts[0];
};

export const signedTypeData = (domain, types, value) => {
  if (!window.ethereum) {
    return null;
  }
  const signer = getSigner();
  // remove the __typedname from the signature!
  return signer._signTypedData(
    omitDeep(domain, '__typename'),
    omitDeep(types, '__typename'),
    omitDeep(value, '__typename')
  );
};

export const splitSignature = (signature) => {
  return utils.splitSignature(signature);
};

export const sendTx = (transaction) => {
  const signer = ethersProvider.getSigner();
  return signer.sendTransaction(transaction);
};

export const signText = (text) => {
  return ethersProvider.signMessage(text);
};
