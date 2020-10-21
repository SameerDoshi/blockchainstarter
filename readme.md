# Setup
## install docker"
sudo apt update
sudo apt install docker.io

## Install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

## Install Node
curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
sudo apt-get install -y nodejs


## Install fabric samples
curl -sSL https://bit.ly/2ysbOFE | bash -s

## Start the test network
./network.sh up createChannel -c mychannel -ca
## Deploy the code
./network.sh deployCC -ccn basic -ccl javascript

## Start the app
cd fabric-samples/asset-transfer-basic/application-javascript
npm install
node app.js

# Vaccine Sample

Based off of [Commercial Paper](https://github.com/hyperledger/fabric-samples/blob/master/commercial-paper/organization/digibank/contract/ledger-api/statelist.js)

In our sample we'll use blockchain to allow the general public to verify a person has been given two does of a vaccine

Organizations:
1 Pharama
    - Produces new dose 
    - Sells dose to a provider
2 Provider
    - Gives vaccine to a patient
3 Public
    - Verifies that patient got a vaccine
    - Verifies provider got dose 1 and 2 from pharma

Our smart contract object will look like:
```
{
    dose_id:"GUID",
    batch_id: "GUID"
    provider_ID: "GUID",
    patient_id: "GUID",
    given:DATE     
}
```

Our contract needs methods to:
1. Create new dose
2. Sell to provider
3. Give dose to patient
4. Match patient with provider 
We don't track Provider or Patient and just use GUIDS.

