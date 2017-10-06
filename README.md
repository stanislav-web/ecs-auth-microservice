### NGINX NodeJ MongoDb

The assembly implements REST application proxied by "Nginx" as Forward-Proxy Server

![Nginx](https://images.sftcdn.net/images/t_optimized,f_auto/p/6dd52663-2bbf-48e0-a7cc-cdb043b326ef/1544311950/nginx-logo.png) &rightarrow;
![NodeJS](http://bogdanov-blog.ru/wp-content/themes/blogus/img/types/nodejs.png) &rightarrow;
![NodeJS](https://download.asperasoft.com/download/docs/orchestrator/2.6.1/user_win/webhelp/images/plugin_MongodbOperation.png)

#### INSTALLATION

```bash
docker-compose up --build
```
*or build images and run containers*
```bash
docker build -f Dockerfile.mongo -t db .
docker build -f Dockerfile.node -t application .
docker build -f Dockerfile.nginx -t proxy .
```

```bash
docker run --name db -p 27017:27017 -ti db:latest
docker run --name application -p 8080:8080 -ti application:latest
docker run --name proxy -p 80:80 -ti proxy:latest
```