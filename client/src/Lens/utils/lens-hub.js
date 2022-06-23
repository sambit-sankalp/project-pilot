import { getSigner } from './ethersService';
import { ethers } from 'ethers';
import LENS_HUB_ABI from '../../contracts/Lens.json';
import LENS_PERIPHERY_ABI from '../../contracts/LensPeriphery.json';

// lens contract info can all be found on the deployed
// contract address on polygon.
// not defining here as it will bloat the code example
const LENS_HUB_CONTRACT_ADDRESS = '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82';
const LENS_PERIPHERY_CONTRACT = '0xD5037d72877808cdE7F669563e9389930AF404E8';
export const lensHub = new ethers.Contract(LENS_HUB_CONTRACT_ADDRESS, LENS_HUB_ABI, getSigner());

// lens periphery contract info can all be found on the deployed
// contract address on polygon.
// not defining here as it will bloat the code example
export const lensPeriphery = new ethers.Contract(LENS_PERIPHERY_CONTRACT, LENS_PERIPHERY_ABI, getSigner());
