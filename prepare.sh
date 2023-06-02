#!/bin/bash

echo "Preparing cftpay frontend"
docker image rm cft-frontend/cftpay
docker build --tag cft-frontend/cftpay --no-cache .