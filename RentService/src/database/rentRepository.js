import RentModel from "./rentModel";

class RentRepository {

    async Rents(customerId){

        const rents = await RentModel.find({customerId });
        
        return rents;

    }

    async createNewRent (customerId, bookId){
        // const rent = 
    }
}