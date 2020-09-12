#!/bin/bash
echo "added new playload"
git add ./client/src/config.json
git status
git commit -m "updating current public url"
git push origin head 
exit 0