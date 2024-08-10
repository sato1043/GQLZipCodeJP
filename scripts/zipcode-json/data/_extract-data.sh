#! /bin/sh
unzip -o jigyosyo.zip
mv JIGYOSYO.CSV jigyosyo.csv.tmp
iconv -c -f SJIS -t UTF-8 jigyosyo.csv.tmp > jigyosyo.csv
rm jigyosyo.csv.tmp

unzip -o utf_ken_all.zip

