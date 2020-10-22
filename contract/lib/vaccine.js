'use strict';

class Vaccine {

    constructor(meta) {
        let created=Date.now();
        this.id=meta.id;
        this.batch=created + meta.batch;
        this.provider=null;
        this.patient=null;
        this.given=null;
    }


    static fromBuffer(buffer) {
        return Vaccine.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    serialize(){
        return JSON.stringify(this);
    }
    static deserialize(data) {
        let json = JSON.parse(data.toString());
        let v = Vaccine[json.class];
        if (!objClass) {
            throw new Error(`Unknown class of ${json.class}`);
        }
        let object = new (Vaccine)(json);

        return object;
    }
    

    static getClass() {
        return 'Vaccine';
    }
}

module.exports = Vaccine;