import { signedTypeData, splitSignature } from './ethersService';
import { createSetProfileMetadataTypedData } from '../query';
import { lensPeriphery } from './lens-hub';

export const setProfileMetadata = async (id, metadata) => {
  const createProfileMetadataRequest = {
    profileId: id,
    metadata: metadata,
  };

  const result = await createSetProfileMetadataTypedData(
    createProfileMetadataRequest.profileId,
    createProfileMetadataRequest.metadata
  );
  console.log(result);
  const typedData = result.data.createSetProfileMetadataTypedData.typedData;

  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
  const { v, r, s } = splitSignature(signature);

  const tx = await lensPeriphery.setProfileMetadataURIWithSig({
    profileId: createProfileMetadataRequest.profileId,
    metadata: createProfileMetadataRequest.metadata,
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
