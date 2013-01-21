README
======

This is an online board game modeled after the popular Settlers of Catan. This project is a work in progress.


Dependencies
============

# node.js

# Express boilerplate

[http://expressjs.com](http://express.js.com)

*If you do not have `jitsu` installed you can install it via `npm install jitsu -g`*


Installation
============

Install node and node package manager from [http://nodejs.org](nodejs.org)


Usage
=====

# Starting boilerplate locally

    node app.js

*Now you can visit http://localhost:8080 to view your application*

# Deploy boilerplate to nodejitsu

    jitsu deploy

*You will now be prompted for a `subdomain` to deploy your application on*


Planning and Fixes
==================

Currently, the biggest hassle is that javascript libraries are being tracked by this git repository. In the future, it would be nice to have these projects as submodules but then they might need other dependencies to compile, and that just adds to the hassle. So for the time being, these are being tracked to reduce loading time during testing.