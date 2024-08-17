#! /bin/bash
DIR=$1
[ -z "$DIR" ] && exit 1
[ -d $DIR ] || exit 2

checked=0
count=0
for f in $(find $DIR -name "*.ts"); do
  checked=$(($checked + 1))
  grep -qE "import\s+.*\s+from\s+'\..*[^.][^t][^s]'" $f
  if [ $? -eq 0 ]; then
    count=$(($count + 1))
    sed -i '' -E "s/(import[[:space:]]+.*[[:space:]]'\..*[^.][^t][^s])'/\1.ts'/" $f
  fi
done
echo import checked $checked file\(s\), fixed $count file\(s\)
exit 0

