#!/bin/bash
echo $1 > ./client/src/config.json

echo "added new playload"

git add ./client/src/config.json
git status
# git commit -m "updating current public url"
# git push origin head 