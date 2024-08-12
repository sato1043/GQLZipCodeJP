#! /bin/bash
[ -e .env ] && cp .env .env.bak
cat .env.example | sed -E '/(APIKEY_PASSPHRASE|APIKEY_SALT|APIKEY_CODELIST|TEST_APIKEY)/d' > .env
npx dotenvx --quiet run -- npx tsx ../keytool -i >> .env

(cd ../.. ; \
[ -e .env ] && cp .env .env.bak ; \
cp scripts/env@localhost/.env .env )
