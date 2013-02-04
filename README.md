README
======

The popular board-game, Settlers of Catan, is recreated in as a web game with nodejs on the server side of things. 
Players will log in, join games in the staging area, and play. 
Socket.io will be used for game transactions and Google OAuth will be used for user authentication. 
Many other clones already exist out in the internet, but none are built with node-jitsu.


Dependencies
============

node.js version 0.8.x and above

node-jitsu


Installation
============

Install node and node package manager from [http://nodejs.org](nodejs.org)

If you do not have `jitsu` installed you can install it via `npm install jitsu -g`

Usage
=====

# Starting application locally

    node app.js

*Now you can visit http://localhost:8080 to view your application*

# Deploy boilerplate to nodejitsu

    jitsu deploy


Planning and Fixes
==================

Currently, the biggest hassle is that javascript libraries are being tracked by this git repository. 
In the future, it would be nice to have these projects as submodules but then they might need other dependencies to compile, and that just adds to the hassle. 
So for the time being, these are being tracked to reduce loading time during testing.