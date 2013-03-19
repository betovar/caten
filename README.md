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

License
=======

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

Demo in Development
===================

Check out the demo at http://betovar.caten.jit.su

