export const createAccount = async (instance, id, acc) => {
  if (!instance) {
    return null;
  }
  await instance.methods.createAccount(id).send({ from: acc });
};
export const allPilotAccounts = async (instance) => {
  //console.log(instance)
  if (!instance) {
    return null;
  }
  const accounts = await instance.methods.creators().call();
  return await Promise.all(
    accounts.map(async (add) => {
      const { profileId, isActive, creatorAddress } = await instance.methods.creatorList(add).call();

      return {
        id: profileId,
        isActive: isActive,
        creatorAddress: creatorAddress,
      };
    })
  ).then((values) => values.filter((value) => value.isActive));
};

export const getProfileId = async (instance, add) => {
  const res = await instance.method.getCreatorId(add).call();
  return res;
};

export const follow = async (instance, add) => {
  const res = await instance.follow([add], [0x0]);
  console.log(res);
  setTimeout(window.location.reload(false), 2000);
};
