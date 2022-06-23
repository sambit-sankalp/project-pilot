import { signedTypeData, splitSignature } from './ethersService';
import { createSetProfileImageUriTypedData } from '../query';
import { lensHub } from './lens-hub';

export const setProfileImageUriNormal = async (id, uri) => {
  // hard coded to make the code example clear
  const setProfileImageUriRequest = {
    profileId: id,
    url: uri,
  };

  const result = await createSetProfileImageUriTypedData(setProfileImageUriRequest);
  const typedData = result.data.createSetProfileImageURITypedData.typedData;

  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
  const { v, r, s } = splitSignature(signature);

  const tx = await lensHub.setProfileImageURIWithSig({
    profileId: typedData.value.profileId,
    imageURI: typedData.value.imageURI,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  console.log(tx.hash);
  // 0x64464dc0de5aac614a82dfd946fc0e17105ff6ed177b7d677ddb88ec772c52d3
  // you can look at how to know when its been indexed here:
  //   - https://docs.lens.dev/docs/has-transaction-been-indexed
};
