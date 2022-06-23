import React, { useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { TextField, Button, styled } from '@mui/material';
import { setProfileMetadata } from '../../Lens/utils/setProfileMetadata';
import { v4 as uuidv4 } from 'uuid';
import client from '../../Lens/utils/ipfs';
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

export default function PaymentForm() {
  const [Coverimage, setCoverImage] = useState();
  const [CoverimageURI, setCoverImageURI] = useState();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const { profileId } = useContext(Web3Context);
  const handleCoverImage = (event) => {
    setCoverImage(event.target.files[0]);
  };

  const handlename = (event) => {
    setName(() => ([event.target.name] = event.target.value));
  };
  const handleBio = (event) => {
    setBio(() => ([event.target.name] = event.target.value));
  };
  const UploadImage = async () => {
    const data = new FormData();
    data.append('file', Coverimage);
    data.append('upload_preset', 'mystiq');
    data.append('cloud_name', 'doybtqm8h');
    await fetch('https://api.cloudinary.com/v1_1/doybtqm8h/image/upload', {
      method: 'post',
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCoverImageURI(data.url);
        //console.log('Image Uploaded')
        alert('Cover Image Uploaded');
      })
      .catch((err) => console.log(err));
  };

  const handleData = async () => {
    const obj = {
      version: '1.0.0',
      metadata_id: uuidv4(),
      name: name,
      bio: bio,
      cover_picture: CoverimageURI,
      attributes: null,
    };

    const result = await client.add(JSON.stringify(obj));
    const str = 'https://ipfs.io/ipfs/';
    const finalResult = str.concat(String(result.path));
    //console.log(result)
    // console.log(finalResult);

    await setProfileMetadata(profileId, finalResult);
    alert('Details Added');
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom sx={{ color: '#fffffe' }}>
        Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CssTextField
            onChange={handlename}
            name="name"
            InputLabelProps={{
              style: { color: ' #fffffe' },
            }}
            InputProps={{
              style: { color: '#fffffe' },
            }}
            required
            fullWidth
            id="name"
            label="Name"
          />
        </Grid>
        <Grid item xs={12}>
          <CssTextField
            required
            fullWidth
            multiline
            minRows={5}
            InputLabelProps={{
              style: { color: ' #fffffe' },
            }}
            InputProps={{
              style: { color: '#fffffe' },
            }}
            content="content"
            label="Bio"
            name="bio"
            id="content"
            autoComplete="content"
            onChange={handleBio}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <div className="input-group mb-3">
                <input type="file" className="form-control" id="inputGroupFile02" onChange={handleCoverImage} />
                <label className="input-group-text" for="inputGroupFile02">
                  Upload Cover Image
                </label>
              </div>
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                variant="contained"
                component="span"
                sx={{ mb: 3, backgroundColor: '#7f5af0' }}
                onClick={() => UploadImage()}
              >
                Upload Image
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            sx={{ backgroundColor: '#7f5af0' }}
            variant="contained"
            component="span"
            onClick={handleData}
          >
            Submit Details
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
