#!/bin/bash

NODE_ENV=""

echo "CACHE_TAG=$1"

if [ "$1" == "staging" ]; then NODE_ENV="-staging"; fi
npm run build${NODE_ENV}
