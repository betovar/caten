/*
 * new game constructor
 */

var random = require('node-random'),
  db = require('./database.js');

var basic = {
  'chits': [
    5,  2,  6,  3,  8, 10,  9, 12, 11,
    4,  8, 10,  9,  4,  5,  6,  3, 11 ],
  'geometry': [
    { x: -173, y: 300 },
    { x: 0, y: 300 },
    { x: 173, y: 300 },
    { x: 260, y: 150 },
    { x: 346, y: 0 },
    { x: 260, y: -150 },
    { x: 173, y: -300 },
    { x: 0, y: -300 },
    { x: -173, y: -300 },
    { x: -260, y: -150 },
    { x: -346, y: 0 },
    { x: -260, y: 150 },
    { x: -87, y: 150 },
    { x: 87, y: 150 },
    { x: 173, y: 0 },
    { x: 87, y: -150 },
    { x: -87, y: -150 },
    { x: -173, y: 0 },
    { x: 0, y: 0 } ],
  'ports': [
    {x:-173, y:300, angle:120 },
    {x:0, y:300, angle:60 },
    {x:260, y:150, angle:60 },
    {x:346, y:0, angle:0 },
    {x:260, y:-150, angle:-60 },
    {x:0, y:-300, angle:-60 },
    {x:-173.2, y:-300, angle:-120 },
    {x:-260, y:-150, angle:180 },
    {x:-260, y:150, angle:180 } ],
  'ocean': ""
};

var expansion = {
  'chits': [
    2,  5,  4,  6,  3,  9,  8, 11, 11, 10,  6,  3,  8,  4,
    8, 10, 11, 12, 10,  5,  4,  9,  5,  9, 12,  3,  2,  6 ],
  'geometry': [],
  'ports': [],
  'ocean': ""
};

  var hexes = [
    "quarry",  "fields",  "forest",  "quarry",
    "fields",  "pasture", "fields",  "pasture",
    "forest",  "hills",   "desert",  "hills",
    "pasture", "pasture", "forest",  "hills",
    "quarry",  "forest",  "fields",
    "desert",  "fields",  "fields",  "forest",
    "forest",  "pasture", "pasture", "quarry",
    "quarry",  "hills",   "hills" ],
  harbor = [
    "generic", "lumber",  "brick",
    "generic", "generic", "wool",
    "generic", "ore",     "grain",
    "wool",   "generic" ],
  stack = [
    {type:"knight"}, {type:"knight"},
    {type:"knight"}, {type:"knight"},
    {type:"knight"}, {type:"knight"},
    {type:"knight"}, {type:"knight"},
    {type:"knight"}, {type:"knight"},
    {type:"knight"}, {type:"knight"},
    {type:"knight"}, {type:"knight"},
    {type:"progress", title:"monopoly"},
    {type:"progress", title:"monopoly"},
    {type:"progress", title:"invention"},
    {type:"progress", title:"invention"},
    {type:"progress", title:"construction"},
    {type:"progress", title:"construction"},
    {type:"victory", title:"chapel"},
    {type:"victory", title:"library"},
    {type:"victory", title:"market"},
    {type:"victory", title:"palace"},
    {type:"victory", title:"university"},
    {type:"knight"}, {type:"knight"},
    {type:"knight"}, {type:"knight"},
    {type:"knight"}, {type:"knight"},
    {type:"progress", title:"monopoly"},
    {type:"progress", title:"invention"},
    {type:"progress", title:"construction"} ],
  shapes = {
    'port': {cir:{cx:86,r:50},rec:{y:-20,w:50,h:40,rx:3}},
    'hex': "86.6,50 0,100 -86.6,50 -86.6,-50 0,-100 86.6,-50",
    'road': "M 0 -35 L 0 35",
    'town': "-15,15 -15,-5 0,-15 15,-5 15,15",
    'city': "-15,-5 -15,-15 0,-25 15,-15 15,-5 30,-5 30,15 -30,15 -30,-5"
  };

exports.what = function( gameid ) {
  if (!db.exists('how:form:'+gameid)) {
    return new Error("Form doesn't exist");
  }
  var how = hmgetall('how:form:'+gameid);
  db.hmset('what:form:'+gameid,
    'start', Date(),
    'chat', "Keyboard", //FIXME: v1.0
    'title', "Caten", //FIXME v1.0
    'locale', "en" //FIXME: to be set by user record
  );
  //hexes, chits, stack, harbors
  switch (how.size) {
  case 'expansion':
    if (how.profile)createSequence(gameid, 'hexes', 30);
    createSequence(gameid, 'chits', 28);
    createSequence(gameid, 'stack', 34);
    createSequence(gameid, 'harbors', 11);
    break;
  default:
    createSequence(gameid, 'hexes', 19);
    createSequence(gameid, 'chits', 18);
    createSequence(gameid, 'stack', 25);
    createSequence(gameid, 'harbors', 9);
    break;
  }
  //seat sequence
  switch (how.sequence) {
    case "Randomized":
      createSequence(gameid, 'sequence', how.count);
      break;
    case "Order by Join":
    case "Reverse by Join":
    case "Select":
    default:
      db.lpush('what:sequence:'+gameid, range(how.count) );
      break;
  }
};

exports.how = function( form ) {
  var gameid = newGameID();
  if (db.exists('how:form'+gameid)) {
    return new Error("Game already exists");
  }
  db.hmset('how:form:'+gameid,
    'size', form.size,
    'count', form.count,
    'victory', form.victory,
    'visibility', form.visibility,
    'password', form.password,
    'placement', form.placement,
    'sequence', form.sequence,
    'architect', form.architect,
    'sidekick', form.sidekick,
    'sheriff', form.sheriff,
    'timer', form.timer,
  );
};

function newGameID() {
  random.strings({ // an 8 character random string
    "length": 8,
    "number": 1
  }, function(err, data) {
    if (err) throw err;
    return data;
  });
}

function createSequence( gameid, key, length ) {
  if (length === undefined) {
    console.log("cannot createSequence, length undefined");
  }
  random.sequences({
    "minimum": 0,
    "maximum": length-1
  }, function(err, data) {
    if (err) throw err;
    db.lpush('what:'+key+':'+gameid, data);
  });
}

function range( n ) {
  var arr = new Array(n);
  for (var i=0; i<n; i++ ) {
    arr.push(i);
  }
  return arr;
}