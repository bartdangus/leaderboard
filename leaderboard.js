
PlayersList = new Mongo.Collection('players');

//the above code is running on both the client/server side so it CANNOT
//be in any of the folder named client/server

//A common conveention is place the above code and those like it
//within a "collection.js" file, but the name has no special meaning