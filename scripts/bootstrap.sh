#!/usr/bin/env bash

# Update Repos.
sudo apt-get update

# Install Packages.
sudo apt-get install -y nginx curl php5-fpm php5-cli php5-curl php5-cli git 

# Get & install newest stable NodeJS
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs

# Load NPM global packages used for workflow.
sudo npm install gulp bower -g

# Install composer globally
sudo curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer

# Make sure to complete nginx site conf.
# Create symlink from www public folder to the Vagrant synced folder.
sudo ln -fs /vagrant /var/www

# NPM modules are not installed here
# since it maybe required for NodeJS to 
# set up OS-specific bindings.

# PHP-FPM will likely need it's listen port or socket setup.
# Make sure to match up the appropriate protocol in the
# respective nginx vhost config file.
# For example, to listen on 127.0.0.1:9000, you would 
# uncomment the php block in a default nginx config file.
# Then, comment out the 1 or 2 lines that DO NOT match the 
# selected protocol.

# If using php5-cgi, or sockless connection, use:
# fastcgi_pass 127.0.0.1:9000;

# If using php5-fpm w/ sock connection, use:
# fastcgi_pass unix:/var/run/php5-fpm.sock;

# If you'd like to remove trailing slashes,
# add the following line to the `server{}` block
# in your nginx conf.
# rewrite ^/(.*)/$ /$1 permanent;

# Then, make sure php5 matches.
# Look for `listen` directive in:
# /etc/php5/fpm/pool.d/www.conf
