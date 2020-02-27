## SSL setup
Follow the required steps that are provided bellow in order to setup SSL support

Create files with the following names and required content;
- ./origin.crt    - the server certificate (eg. origin certificate)
- ./private.key   - the server private key (eg. secret key)

These certificates are required to for SSL support.
After creating the certificate files, modify the NGINX config (file ../nginx.prod.conf)