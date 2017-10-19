### ECS-AUTH-MICROSERVISE
_(Nginx as foreground, NodeJs as a primary server, MongoDb or Radis for the accounts store)_


|  Assembly | Status |
|:-:|:-:|
|Node & Mongo|[![Build Status](https://travis-ci.org/stanislav-web/ecs-auth-microservice.svg?branch=master)](https://travis-ci.org/stanislav-web/ecs-auth-microservice/builds/286316998) | 
|Node & Redis|[![Build Status](https://travis-ci.org/stanislav-web/ecs-auth-microservice.svg?branch=master)](https://travis-ci.org/stanislav-web/ecs-auth-microservice/builds/286316998) |

 [![Coverage Status](https://coveralls.io/repos/github/stanislav-web/ecs-auth-microservice/badge.svg?branch=master)](https://coveralls.io/github/stanislav-web/ecs-auth-microservice?branch=master) [![GitHub license](https://img.shields.io/badge/license-AGPL-blue.svg)](https://raw.githubusercontent.com/stanislav-web/ecs-auth-microservice/master/LICENSE)

This assemblage implements REST auth micoservice proxied by Nginx as Reverse Proxy Server.
Represents high scalable architecture for "NodeJS" applications in the form of boundles inside.

![Nginx](https://images.sftcdn.net/images/t_optimized,f_auto/p/6dd52663-2bbf-48e0-a7cc-cdb043b326ef/1544311950/nginx-logo.png) &rightarrow;
![NodeJS](http://bogdanov-blog.ru/wp-content/themes/blogus/img/types/nodejs.png) &rightarrow;
![MongoDb](https://download.asperasoft.com/download/docs/orchestrator/2.6.1/user_win/webhelp/images/plugin_MongodbOperation.png) &rightarrow;
![Redis](https://www.onlinedeliverysoftware.com/wp-content/themes/onlinedeliverysoftware/img/tools-tech/redis.png)

##### IMPLEMENTS
 - Boundles API
 - Koa2
 - MongoDb native
 - Redis native
 - Password encryption
 - JWT authentication
 
##### DEFAULT INSTALL (USE MongoDB)
```bash
docker-compose up --build
```

```bash
sh build/mongo.sh # install with MongoDb (default)
sh build/redis.sh # install with Redis
```

##### CONFIGURATION
```bash
.env
```

##### RUN
```bash
http://localhost:88 # (Nginx 88 => NodeJs 8777)
```

##### RUN AS NODE SERVER
```bash
# STORAGE=redis
npm start 

```

##### CHECK MICROSERVICE STATUS
`http://localhost:88/status/:key` (see .env)

```python
HTTP/1.1 200 OK
{
     "status": 200,
     "message": {
         "now":"01:52:51 GMT+0300 (EEST)",
         "revision":"62b1b88ef48bb3fe859b2bd374e64576f79e6cca",
         "version":"v1.1.2",
         "residentSet":"49.8 MB",
         "totalHeap":"30.4 MB",
         "usedHeap":"16.8 MB",
         "uptime":22.969
     }
 }
```
![Token](https://uploads.toptal.io/blog/image/958/toptal-blog-image-1426676428399.jpeg)