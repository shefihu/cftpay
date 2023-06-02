#!/bin/bash

# rm running container
docker container stop cftpay

docker container rm cftpay

# re build image
sh ./prepare.sh

# remove running container
 docker run --publish 5500:4173 -d --name cftpay cft-frontend/cftpay
 


# deploy webapp service
# docker compose -f docker-compose-dev.yml up --build