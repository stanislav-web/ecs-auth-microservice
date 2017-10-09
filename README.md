### NGINX NodeJS MongoDb

[![Build Status](https://travis-ci.org/stanislav-web/exchanger.svg?branch=master)](https://travis-ci.org/stanislav-web/exchanger) [![Coverage Status](https://coveralls.io/repos/github/stanislav-web/exchanger/badge.svg?branch=master)](https://coveralls.io/github/stanislav-web/exchanger?branch=master) [![GitHub license](https://img.shields.io/badge/license-AGPL-blue.svg)](https://raw.githubusercontent.com/stanislav-web/exchanger/master/LICENSE)

This assemblage implements REST application proxied by Nginx as Forward Proxy Server.
Represents high scalable architecture for "NodeJS" applications in the form of boundles.

**Each _boundle_ can be used independently of its application**

![Nginx](https://images.sftcdn.net/images/t_optimized,f_auto/p/6dd52663-2bbf-48e0-a7cc-cdb043b326ef/1544311950/nginx-logo.png) &rightarrow;
![NodeJS](http://bogdanov-blog.ru/wp-content/themes/blogus/img/types/nodejs.png) &rightarrow;
![MongoDb](https://download.asperasoft.com/download/docs/orchestrator/2.6.1/user_win/webhelp/images/plugin_MongodbOperation.png)

#### IMPLEMENTS
 - Scalable boundles
 - Koa2
 - MongoDb native
 - Password encryption
 - JWT authentication
 
#### INSTALLATION

```bash
sh build/docker.sh
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
docker run --name proxy -p 8081:80 -ti proxy:latest
```

### RUN
```bash
http://localhost:8081 # (Nginx => NodeJs)
```

![Token](https://uploads.toptal.io/blog/image/958/toptal-blog-image-1426676428399.jpeg)

