# Stevenwaskey 2016 Website


## Frameworks:

Bootstrap 4 SASS (SCSS syntax)
Angular 1.5.5
jQuery 2.1.4


## Dev Environment:

Vagrant (virtual machine environment)
Php (core)
MySql (rdbms server)
NodeJs (js application server)
Laravel (REST API)
NPM (nodejs package manager)
Bower (js package manager)
Gulp (workflow automater)


## Config Files:

Vagrantfile 
- sets box, network, start up scripts, etc. for provisioning Vagrant vm.

bootstrap.sh
 - script to be ran after Vagrant provisioning.  
 - This install things like nginx, mysql, php, curl, node, etc.
 - Performs other start up functions.
 
bower.json
- sets the default bower_components direction for `bower install`

gulpfile.js
- defines workflow tasks

package.json
- defines npm modules & any local project nodejs scripts
