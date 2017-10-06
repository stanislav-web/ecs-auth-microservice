### NGINX as Forward proxy for NodeJs 

#### Run

```bash
docker-compose up --build
```


#### OR BUILD IMAGES
```bash
docker build -f Dockerfile.mongo -t db .
docker build -f Dockerfile.node -t application .
docker build -f Dockerfile.nginx -t proxy .
```

#### AND RUN
```bash
docker run --name db -p 27017:27017 -ti db:latest
docker run --name application -p 8080:8080 -ti application:latest
docker run --name proxy -p 80:80 -ti proxy:latest
```