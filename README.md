BUILD IMAGES
--------------
docker build -f Dockerfile.node -t application .
docker build -f Dockerfile.mongo -t db .

RUN
--------------
docker run -p 8080:8080 -ti application:latest
docker run -p 27017:27017 -ti db:latest
