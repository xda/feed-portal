#!/bin/bash

NODE_ENV=""

echo "CACHE_TAG=$1"
echo "CONVERT_TOKEN_CLIENT_ID=$2"
echo "CONVERT_TOKEN_CLIENT_SECRET=$3"

if ! [[ -z "$2" && -z "$3" ]]; then
    export CONVERT_TOKEN_CLIENT_ID=$2
    export CONVERT_TOKEN_CLIENT_SECRET=$3
fi

if [ "$1" == "staging" ]; then NODE_ENV="-staging"; fi
if [ "$1" == "docker" ]; then NODE_ENV="-docker"; fi
npm run build${NODE_ENV}
