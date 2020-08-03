class Db {
    constructor(mongoose) {
        const suggestionSchema = new mongoose.Schema({
            text: String,
            signatures: [{
                text: String,
                time : { type : Date, default: Date.now }
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
            time : { type : Date, default: Date.now }
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
                title: "Suggestion1",
                signatures: []
            });

            promises.push(suggestion1.save());

            let suggestion2 = new this.suggestionModel({
                title: "Suggestion2",
                signatures: []
            });

            promises.push(suggestion2.save());

            let suggestion3 = new this.suggestionModel({
                title: "Suggestion3",
                signatures: []
            });

            promises.push(suggestion3.save());

            let suggestion4 = new this.suggestionModel({
                title: "Suggestion4",
                signatures: []
            });

            promises.push(suggestion4.save());

            let suggestion5 = new this.suggestionModel({
                title: "Suggestion5",
                signatures: []
            });

            promises.push(suggestion5.save());

            return Promise.all(promises);
        }
    }
}
module.exports = mongoose => new Db(mongoose);
