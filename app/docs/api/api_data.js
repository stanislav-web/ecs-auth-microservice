define({ "api": [
  {
    "type": "post",
    "url": "/access/signup",
    "title": "Register new user",
    "name": "Access",
    "group": "API_Boundle",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>HTTP 200 OK</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "message",
            "description": "<p>Authentication message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": 200,\n     \"message\": {\n         \"auth\": true,\n         \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTA3Mjk5MTI5LCJleHAiOjE1MDczODU1Mjl9.4Wom95yMQoSLSX_lzfC0oz__TDW6Rrj8pQS0Zwk7Bvs\"\n     }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidRequestError",
            "description": "<p>Bad credentials</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n     \"status\": 400,\n     \"message\": \"Error: child \"email\" fails because [\"email\" must be a valid email]\"\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "boundles/api/_spec/access.js",
    "groupTitle": "API_Boundle"
  }
] });
