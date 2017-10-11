#!/usr/bin/env bash
docker build -f Dockerfile.mongo -t mongo .
docker build -f Dockerfile.node -t application .
docker build -f Dockerfile.nginx -t nginx .

docker run --name mongo -p 27017:27017 -ti mongo:latest
docker run --name application -p 8080:8080 -ti application:latest
docker run --name nginx -p 80:80 -ti nginx:latest