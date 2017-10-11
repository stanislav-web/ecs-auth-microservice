#!/usr/bin/env bash
docker build -f Dockerfile.redis -t redis .
docker build -f Dockerfile.node -t application .
docker build -f Dockerfile.nginx -t nginx .

docker run --name redis -p 6379:6379 -ti redis:latest
docker run --name application -p 8080:8080 -ti application:latest
docker run --name nginx -p 80:80 -ti nginx:latest