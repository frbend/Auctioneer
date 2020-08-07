class Db {
    constructor(mongoose) {
        const suggestionSchema = new mongoose.Schema({
            title: String,
            signatures: [{
                text: String,
                //number: Number
            }]
        });
        this.suggestionModel = mongoose.model('suggestion', suggestionSchema);
    }

    async getAllSuggestions() {
        try {
            return await this.suggestionModel.find({});
        } catch (error) {
            console.error("getSuggestions: ", error.message);
            return {};
        }
    }

    async getSuggestion(id) {
        try {
            return await this.suggestionModel.findById(id);
        } catch (error) {
            console.error("getSuggestion: ", error.message);
            return {};
        }
    }

    async createSuggestion(newSuggestion){
        let suggestion = new this.suggestionModel(newSuggestion);
        return await suggestion.save();
    }

    async createSignature(id, newSignature) {
        let signature = {
            text: newSignature,
            number: newSignature
        };

        const suggestion = await this.getSuggestion(id);
        suggestion.signatures.push(signature);
        return await suggestion.save();
    }


    /***some dummy data ***/
    async fillIfEmpty() {
        let l = (await this.getAllSuggestions()).length;
        console.log("Suggestion collection size:", l);

        if (l === 0) {
            console.log("Adding data test data into empty db!");
            let promises = [];
            let suggestion1 = new this.suggestionModel({
                title: "Auction Item 1",
                description: "Description of the item",
                author: "frbend",
                signatures: [
                    "Bid made by: frbend, 12kr at 07/08/2020, 08:24:04"
                ]
            });

            promises.push(suggestion1.save());

            let suggestion2 = new this.suggestionModel({
                title: "Auction Item 2",
                description: "Description of the item",
                author: "frbend",
                signatures: [
                    "Bid made by: frbend, 1800kr at 07/08/2020, 08:25:04"
                ]
            });

            promises.push(suggestion2.save());

            let suggestion3 = new this.suggestionModel({
                title: "Auction Item 3",
                description: "Description of the item",
                author: "frbend",
                signatures: [
                    "Bid made by: frbend, 8kr at 07/08/2020, 08:20:04"
                ]
            });

            promises.push(suggestion3.save());

            let suggestion4 = new this.suggestionModel({
                title: "Auction Item 4",
                description: "Description of the item",
                author: "frbend",
                signatures: [
                    "Bid made by: frbend, 12kr at 07/08/2020, 09:14:00"
                ]
            });

            promises.push(suggestion4.save());

            let suggestion5 = new this.suggestionModel({
                title: "Auction Item 5",
                description: "Description of the item",
                author: "frbend",
                signatures: [
                    "Bid made by: frbend, 100kr at 07/08/2020, 10:10:02"
                ]
            });

            promises.push(suggestion5.save());

            return Promise.all(promises);
        }
    }
}
module.exports = mongoose => new Db(mongoose);
