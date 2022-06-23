const ipfsClient = require('ipfs-http-client');
const projectId = '277J4qfFtNMoU4VjPgwkSC7agwj';
const projectSecret = '25dbbdefd169318ba0dd5d82708f080a';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
//console.log(auth)
const client = ipfsClient.create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
  apiPath: '/api/v0',
});
export default client;
