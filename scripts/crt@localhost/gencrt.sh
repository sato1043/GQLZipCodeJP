#! /bin/bash

openssl req -quiet \
-x509 -newkey rsa:2048 -nodes -sha256 \
-out localhost.crt \
-keyout localhost.key \
-subj '/CN=localhost' -extensions EXT \
-config <(printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
