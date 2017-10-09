#!/usr/bin/env bash
docker-compose down
docker rm --force db
docker rm --force application
docker rm --force proxy
kill -9 `lsof -w -n -i tcp:80| awk '{print $2}'|awk 'END{print}'`
kill -9 `lsof -w -n -i tcp:27017| awk '{print $2}'|awk 'END{print}'`
kill -9 `lsof -w -n -i tcp:8080| awk '{print $2}'|awk 'END{print}'`
docker-compose up --build