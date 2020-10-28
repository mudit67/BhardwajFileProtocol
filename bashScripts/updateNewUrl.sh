#!/bin/bash
echo "added new playload"
git add ./client/public/config.js ./client/build/config.js
git status
git commit -m "updating current public url"
git push origin HEAD
exit 0
