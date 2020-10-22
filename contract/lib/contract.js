'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');


const Vaccine = require('./vaccine.js');




/**
 * Define vaccine smart contract by extending Fabric Contract class
 *
 */
class VaccineContract extends Contract {

    constructor() {
        // Unique namespace when multiple contracts per chaincode file
        super('org.contoso.vaccine');
    }

    /**
     * Define a custom context for vaccines
    */
    createContext() {
        return new VaccineContext();
    }

    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async instantiate(ctx) {
        // No implementation required with this example
        // It could be where data migration is performed, if necessary
        console.log('Instantiate the contract');
    }

    /**
     * Create New Vaccine
     *
     * @param {Context} ctx the transaction context
     * @param {String} id of this dose (ex: 1, 2, 3)
     * @param {String} batch id of this dose (ex: 001) will be prepended by date
    */
    async create(ctx, id, batch) {

        
        let vaccine = new Vaccine({id:id,batch:batch});

        // Add the paper to the list of all similar commercial papers in the ledger world state
        let key = ctx.stub.createCompositeKey("org.contoso.vaccine", id);
        let data = vaccine.serialize();
        await ctx.stub.putState(key, data);
        
        return vaccine;
    }

    /**
     * Transfer Ownership of Vaccine to a Provider
     *
     * @param {Context} ctx the transaction context
     * @param {String} id dose id (ex: 1,2)
     * @param {String} provider name (ex: Acme Hospitals)
    */
    async sell(ctx, id, provider) {

        // Retrieve the current paper using key fields provided
        let vaccineKey = ctx.stub.createCompositeKey("org.contoso.vaccine", id);
        let data = await ctx.stub.getState(vaccineKey);
        if (!(data && data.toString('utf8'))) {
           throw new Error("Vaccine with ID " + id + " not found");
        }
        let vaccine = Vaccine.deserialize(data);
        vaccine.provider=provider;

        // Update the paper
         data = vaccine.serialize();
        await this.ctx.stub.putState(vaccineKey, data);
        return vaccine;
    }

    /**
     * Inject Vaccine
     *
     * @param {Context} ctx the transaction context
     * @param {id} dose id
     * @param {patient} patient id (ex: Sameer)
    */
    async inject(ctx, id, patient) {
        let vaccineKey = ctx.stub.createCompositeKey("org.contoso.vaccine", id);
        let data = await ctx.stub.getState(vaccineKey);
        if (!(data && data.toString('utf8'))) {
           throw new Error("Vaccine with ID " + id + " not found");
        }
        let vaccine = Vaccine.deserialize(data);
        vaccine.patient=patient;

        // Update the paper
        data = vaccine.serialize();
        await this.ctx.stub.putState(vaccineKey, data);
        return vaccine;
    }

}

module.exports = VaccineContract;