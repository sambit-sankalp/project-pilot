/* eslint-disable */
import React, { useState, useContext, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { TextField, Button, styled } from '@mui/material';
import { createProfile, getProfiles } from '../../Lens/query';
import { createAccount } from '../../Lens/utils/pilot-utils';
import Loading from '../marginals/loading';
import Web3Context from '../../context';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#7f5af0',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#7f5af0',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#7f5af0',
    },
    '&:hover fieldset': {
      borderColor: '#7f5af0',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#7f5af0',
    },
  },
});

export default function AddressForm() {
  const { pilotContract, account } = useContext(Web3Context);
  useEffect(() => {
    account.currentAccount && getProfile();
    account.currentAccount && getProfile();
  }, [account.currentAccount]);
  const [handleName, setHandleName] = useState('');
  const [handleName1, setHandleName1] = useState('');
  const [flag, setFlag] = useState(false);
  const handleUsername = (event) => {
    setHandleName1(() => ([event.target.name] = event.target.value));
  };

  const handleRegister = async () => {
    setFlag(true);
    const obj = {
      handle: handleName1,
      followModule: {
        freeFollowModule: true,
      },
    };

    // eslint-disable-next-line
    await createProfile(obj)
      .then(() => {
        alert('Username is available');
        setTimeout(function () {
          setFlag(false);
        }, 10000);
        setTimeout(function () {
          window.location.href = '/signup';
        }, 10000);
      })
      .catch((e) => {
        setFlag(false);
        alert('Try with a different username and Make Sure You have logged in to Lens');
      });
    //console.log(res);
  };
  const confirmUsername = async () => {
    //setFlag(true)
    const res3 = await getProfile();
    setHandleName(res3.handle);
    await createAccount(pilotContract, res3.id, account.currentAccount);
    //setFlag(false)
    alert('Handle Created, Click On next!');
  };

  const getProfile = async () => {
    const a = {
      ownedBy: [`${account.currentAccount}`],
      limit: 50,
    };
    const res2 = await getProfiles(a);
    console.log(res2);
    const res = res2.data.profiles.items[res2.data.profiles.items.length - 1];
    setHandleName(res ? res.handle : null);
    return res;
  };
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ color: '#fffffe' }}>
        Username
      </Typography>
      {!handleName ? (
        flag ? (
          <div align="center">
            <Loading />
          </div>
        ) : (
          <Grid item xs={12}>
            <CssTextField
              required
              fullWidth
              id="handleName1"
              label="Enter Username"
              InputLabelProps={{
                style: { color: ' #fffffe' },
              }}
              InputProps={{
                style: { color: '#fffffe' },
              }}
              name="handleName1"
              onChange={handleUsername}
            />
            <Button
              fullWidth
              sx={{ mt: 2, backgroundColor: '#7f5af0' }}
              variant="contained"
              component="span"
              onClick={handleRegister}
            >
              Check availability
            </Button>
          </Grid>
        )
      ) : (
        <Grid item xs={12} sx={{ color: '#fffffe' }}>
          {handleName} is available
          <Button
            fullWidth
            sx={{ mt: 2, backgroundColor: '#7f5af0' }}
            variant="contained"
            component="span"
            onClick={confirmUsername}
          >
            Proceed to Register
          </Button>
        </Grid>
      )}
    </>
  );
}
