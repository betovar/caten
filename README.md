README
======

The popular board-game, Settlers of Catan, is recreated in as a web game with nodejs on the server side of things. 
Players will log in, join games in the staging area, and play. 
Socket.io will be used for game transactions and Google OAuth will be used for user authentication. 
Many other clones already exist out in the internet, but none are built with node-jitsu.


Dependencies
============

* node.js (version 0.8.x and above)
* node-jitsu


Installation
============

Install node and node package manager from [nodejs.org](http://nodejs.org)

To deploy publically on node-jitsu you must have `jitsu` installed
Install it via `npm install jitsu -g`

Usage
=====

Start application locally:

    node app.js

Now you can visit http://localhost:8080 to play your caten game

Deploy to nodejitsu:

    jitsu deploy

Now you can visit `http://username.appname.jit.su` to play your caten game

Gameplay
========

A player joins a game by being one of the first four clients to connect to the caten game server.
This connection is tracked by socket.io, so no authentication is in place at this time (March 2013).
The game begins when the fourth and final player joins.
Every client after that who connects is merely an observer.

Demo in Development
===================

Check out the demo at http://betovar.caten.jit.su
