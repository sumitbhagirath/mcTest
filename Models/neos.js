var Schema = mongoose.Schema;

var neoSchema = new Schema({
    date:{type: Date, required: true},
    reference:{type:String, unique:true},
    name:{type:String, required:true},
    speed:{type:Number, required:true},
    isHazardous:{type:Boolean, required:true}
});

module.exports = mongoose.model('neo', neoSchema);