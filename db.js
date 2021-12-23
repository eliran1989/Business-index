//DataBase file

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const dbConnectionString = "mongodb+srv://romanbr87:qazqaz12@walla.co.il@cluster0.gaih6.mongodb.net/BusinessIndex?retryWrites=true&w=majority";

mongoose.set('debug', true);
mongoose.Promise = Promise;

let options = { useNewUrlParser : true, autoIndex : true, promiseLibrary : global.Promise, useUnifiedTopology: true};
mongoose.connect(dbConnectionString, options);

/*run().then(() => console.log('done')).catch(error => console.error(error.stack));
async function run() {
  await mongoose.connect(config.dbConnectionString, options);
}*/


var db = mongoose.connection;
db.on('error', console.error.bind(console, ''));

db.once('open',function () {
    console.log('\nConnected: ' + db.readyState);
}).on('error',function (error) {
	console.log("Ready state: " + db.readyState);	
    console.log('CONNECTION ERROR:',error);
});

var Schema = mongoose.Schema;
var typesSchema, Types; 
var businessSchema, Business;

CreateTables ();
	

//Creates tables and schemes
function CreateTables () {
	try {
		typesSchema = new mongoose.Schema ({
			gsx$type: { type: String, unique : true, required : true }
		});
		typesSchema.plugin(uniqueValidator, 'Error, expected {PATH} to be unique.');  
		
		businessSchema = new mongoose.Schema ({
			gsx$type: { type: mongoose.ObjectId, ref: 'BusinessTypes', required : true},
			gsx$name: { type: String, unique : true, required : true},
			gsx$logo: { type: String, unique : true },
			gsx$logoheight: { type: Number, min: 200, max: 500, required : true},
			gsx$logowidth: { type: Number, min: 200, max: 500, required : true},
			gsx$address: { type: String, unique : true },
			gsx$city: { type: String, required : true},
			gsx$phone :  { type: String, required : true},
			gsx$phone2 :  String,
			gsx$phone3 :  String,
			gsx$facebook :  String,
			gsx$instagram :  String,
			gsx$website :  String,
			gsx$email :  String,
			gsx$whatsapp :  String,
			gsx$desc :  { type: String, required : true},
			gsx$link : { type: String, required : true, unique : true },
			gsx$active : { type: Boolean, required : true}
		});
		
		businessSchema.plugin(uniqueValidator, 'Error, expected {PATH} to be unique.'); 
		
		Types = mongoose.model('BusinessTypes', typesSchema);
		Business = mongoose.model ("Business", businessSchema);

	}
	catch (e) { console.log (e) }
}
 
module.exports.db = db;
module.exports.Types = Types;
module.exports.Business = Business;