define({ "api": [
  {
    "type": "post",
    "url": "/api/auth/login",
    "title": "Login endpoint.",
    "name": "PostLogin",
    "group": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>Payload content type.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Content-type header example",
          "content": "{ \"Content-type\": \"application/json\" }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Payload example:",
          "content": "{ \"username\": \"Kyrylo\", \"password\": \"test1234\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JWT token.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User's id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "              { \"status\": \"User authenticated successfully\"\n\"token\": \"fnawilfmnaiwngainegnwegneiwngoiwe\",\n\"id\": \"12345\" }",
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
            "field": "UserDoesntExist",
            "description": "<p>This user doesn't exist.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserWrongPassword",
            "description": "<p>Wrong password.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserWasntLogined",
            "description": "<p>User wasn't logined.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/login.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/auth/register",
    "title": "Register new user.",
    "name": "PostRegister",
    "group": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>Payload content type.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Content-type header example",
          "content": "{ \"Content-type\": \"application/json\" }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's Username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User's User type(driver or shipper), shoudnt be case sensitive.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's first name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "surname",
            "description": "<p>User's last name.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Payload example:",
          "content": "          {\n\"username\": \"Kyrylo\",\n\"password\": \"test1234\",\n\"role\": \"shipper\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \"status\": \"User registered successfully\"}",
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
            "field": "UserIsInvalid",
            "description": "<p>User's data didn't pass the validation.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserWasntRegistered",
            "description": "<p>User was not registered.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/register.js",
    "groupTitle": "Auth"
  },
  {
    "type": "delete",
    "url": "/api/loads/:id",
    "title": "Delete load(only if the load is NEW)",
    "name": "DeleteLoad",
    "group": "Load",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>Payload content type.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Content-type header example",
          "content": "{ \"Content-type\": \"application/json\" }",
          "type": "json"
        },
        {
          "title": "Authorization header example",
          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Load was deleted with success.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\": 'Load was deleted with success'}",
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
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadWasnotNew",
            "description": "<p>Load wasn't deleted.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongId",
            "description": "<p>TokenId and url's id do not match</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadNotFound",
            "description": "<p>Server can not find a load</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/loads.js",
    "groupTitle": "Load"
  },
  {
    "type": "patch",
    "url": "/api/loads/:id/post",
    "title": "Post load(only shippers has access).",
    "name": "PatchLoad",
    "group": "Load",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>Payload content type.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Content-type header example",
          "content": "{ \"Content-type\": \"application/json\" }",
          "type": "json"
        },
        {
          "title": "Authorization header example",
          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "assigned_to",
            "description": "<p>Truck which ship a load.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n  \"status\": \"Load posted successfully\",\n  \"assigned_to\": \"fiwanfoianw\"\n}",
          "type": "json"
        },
        {
          "title": "Success-Response no drivers found:",
          "content": " {\n  \"status\": \"No drivers found\",\n}",
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
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadIdIsRequired",
            "description": "<p>LoadId is required</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadDoesntExist",
            "description": "<p>Server can not find a load</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadNotFound",
            "description": "<p>No trucks to ship founded.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoTrucksToShip",
            "description": "<p>No trucks to ship founded</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadNotAssigned",
            "description": "<p>Server can not assign truck or/and load</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/loads.js",
    "groupTitle": "Load"
  },
  {
    "type": "patch",
    "url": "/api/loads/:id/state",
    "title": "Change load state(only driver has access, for only active load).",
    "name": "PatchLoad",
    "group": "Load",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>Payload content type.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Content-type header example",
          "content": "{ \"Content-type\": \"application/json\" }",
          "type": "json"
        },
        {
          "title": "Authorization header example",
          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Load successfuly shipped.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": \"Load status changed successfully\",\n}",
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
            "field": "UserIsUnAuthorized",
            "description": "<p>User is not authorized.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadWasntAssigned",
            "description": "<p>Load wasn't shipped.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadDoesntExist",
            "description": "<p>Load doesn't exist.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TruckDoesntExist",
            "description": "<p>Truck was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotShipped",
            "description": "<p>Load was not shipped or/and truck still has status OL</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/loads.js",
    "groupTitle": "Load"
  },
  {
    "type": "patch",
    "url": "/api/loads/:id",
    "title": "Update load info(only if the load is NEW)",
    "name": "PatchLoad",
    "group": "Load",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>Payload content type.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Content-type header example",
          "content": "{ \"Content-type\": \"application/json\" }",
          "type": "json"
        },
        {
          "title": "Authorization header example",
          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "dimensions",
            "description": "<p>Load dimensions.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "payload",
            "description": "<p>Load weight.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Payload example:",
          "content": "{ \"payload\": 100, \"dimensions\": {length: 100, width: 100, height: 100} }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Load",
            "description": "<p>was updated.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "load",
            "description": "<p>Load.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": \"Load created successfully\",\n  \"load\": {\n    \"assigned_to\": null,\n    \"status\": \"NEW\",\n    \"name\": \"Load\",\n    \"state\": null,\n    \"_id\": \"5e8dd07ca51abaac2b0583f4\",\n    \"dimensions\": {\n        \"width\": 100,\n        \"height\": 100,\n        \"length\": 100\n    },\n    \"payload\": 100,\n    \"...\" : ...\n}\n}",
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
            "field": "AccessDenied",
            "description": "<p>Access denied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IncorrectData",
            "description": "<p>Server can not find a load</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadNotUpdated",
            "description": "<p>Load was not updated</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/loads.js",
    "groupTitle": "Load"
  },
  {
    "type": "post",
    "url": "/api/loads",
    "title": "Create load(only shipper has access).",
    "name": "PostLoad",
    "group": "Load",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>Payload content type.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Content-type header example",
          "content": "{ \"Content-type\": \"application/json\" }",
          "type": "json"
        },
        {
          "title": "Authorization header example",
          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "dimensions",
            "description": "<p>Load dimensions.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "payload",
            "description": "<p>Load weight.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Payload example:",
          "content": "{ \"payload\": 100, \"dimensions\": {length: 100, width: 100, height: 100} }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "load",
            "description": "<p>Load.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": \"Load created successfully\",\n  \"load\": {\n    \"assigned_to\": null,\n    \"status\": \"NEW\",\n    \"name\": \"Load\",\n    \"state\": null,\n    \"_id\": \"5e8dd07ca51abaac2b0583f4\",\n    \"dimensions\": {\n        \"width\": 100,\n        \"height\": 100,\n        \"length\": 100\n    },\n    \"payload\": 100,\n    \"...\" : ...\n}\n}",
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
            "field": "AccessDenied",
            "description": "<p>Access denied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IncorrectData",
            "description": "<p>Incorrect data</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongId",
            "description": "<p>TokenId and url's id do not match</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadWasNotCreated",
            "description": "<p>Load was not created</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/loads.js",
    "groupTitle": "Load"
  },
  {
    "type": "get",
    "url": "/api/loads",
    "title": "Retreive active for this driver loads.",
    "name": "getLoad",
    "group": "Load",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>Payload content type.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Content-type header example",
          "content": "{ \"Content-type\": \"application/json\" }",
          "type": "json"
        },
        {
          "title": "Authorization header example",
          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Load successfuly shipped.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "loads",
            "description": "<p>Array of loads.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": \"Success\"\n  \"loads\": [\n     {\n         \"_id\": \"fbawfibaw\",\n         \"assigned_to\": \"noifawnfoian\",\n         \"created_by\": \"jfnaikfna\",\n         \"status\": \"ASSIGNED\",\n         \"state\": \"En route to Pick Up\",\n         \"logs\": [{\"message\": \"Load created\", time: 12312}],\n         \"payload\": 100,\n         \"dimensions\": {length: 100, width: 100, height: 100}\n         \"...\": \"...\"\n     }\n  ]\n}",
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
            "field": "LoadNotFound",
            "description": "<p>Server can not find any load</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidRole",
            "description": "<p>Invalid role</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/loads.js",
    "groupTitle": "Load"
  },
  {
    "type": "post",
    "url": "/api/trucks",
    "title": "Create truck(only driver has access).",
    "name": "PostTruck",
    "group": "Truck",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>Payload content type.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Content-type header example",
          "content": "{ \"Content-type\": \"application/json\" }",
          "type": "json"
        },
        {
          "title": "authorization header example",
          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Truck type(SPRINTER, SMALL STRAIGHT, LARGE STRAIGHT).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Payload example:",
          "content": "{ \"type\": \"SPRINTER\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "truck",
            "description": "<p>Truck</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \"status\": \"Truck created successfully\"}",
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
            "field": "IncorrectData",
            "description": "<p>Input data is incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongId",
            "description": "<p>TokenId and url's id do not match</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/trucks.js",
    "groupTitle": "Truck"
  },
  {
    "type": "delete",
    "url": "/api/trucks/:id",
    "title": "Delete a truck",
    "name": "deleteTruck",
    "group": "Truck",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>Payload content type.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Content-type header example",
          "content": "{ \"Content-type\": \"application/json\" }",
          "type": "json"
        },
        {
          "title": "Authorization header example",
          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": \"Truck was deleted with success\"}",
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
            "field": "AccessDenied",
            "description": "<p>Access denied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TruckIsOnLoad",
            "description": "<p>Truck in on load</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TruckIdIsRequired",
            "description": "<p>TruckId is required</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TruckWasNotDeleted",
            "description": "<p>Truck was not deleted</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/trucks.js",
    "groupTitle": "Truck"
  },
  {
    "type": "get",
    "url": "/api/trucks",
    "title": "Retreive list of trucks(for this driver)",
    "name": "getTruck",
    "group": "Truck",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>Payload content type.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Content-type header example",
          "content": "{ \"Content-type\": \"application/json\" }",
          "type": "json"
        },
        {
          "title": "Authorization header example",
          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          },
          {
            "group": "Success 200",
            "type": "[Object]",
            "optional": false,
            "field": "trucks",
            "description": "<p>array of trucks</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": \"Truck created successfully\"\n  \"trucks\": [\n     {\n         \"_id\": \"fbawfibaw\",\n         \"assigned_to\": \"\",\n         \"status\": \"OS\",\n         \"created_by\": \"fbawfibaw\",\n         \"type\": \"SPRINTER\",\n         \"...\": \"...\"\n     }\n  ]\n}",
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
            "field": "AccessDenied",
            "description": "<p>Access denied</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/trucks.js",
    "groupTitle": "Truck"
  },
  {
    "type": "patch",
    "url": "/api/trucks/:id/assign",
    "title": "Assign driver to truck with specified id.",
    "name": "patchTruck",
    "group": "Truck",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>Payload content type.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Content-type header example",
          "content": "{ \"Content-type\": \"application/json\" }",
          "type": "json"
        },
        {
          "title": "Authorization header example",
          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": \"Truck assigned successfully\"\n  }",
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
            "field": "AccessDenied",
            "description": "<p>Access denied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DriverIsBusy",
            "description": "<p>Driver can not assign trucks</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IncorrectId",
            "description": "<p>Incorrect truckId</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TruckWasNotAssigned",
            "description": "<p>Truck was not assigned</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/trucks.js",
    "groupTitle": "Truck"
  },
  {
    "type": "patch",
    "url": "/api/trucks/:id/update",
    "title": "Update truck information",
    "name": "putTruck",
    "group": "Truck",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>Payload content type.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Content-type header example",
          "content": "{ \"Content-type\": \"application/json\" }",
          "type": "json"
        },
        {
          "title": "Authorization header example",
          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Truck type(SPRINTER, SMALL STRAIGHT, LARGE STRAIGHT).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": \"Truck has been updated\"}",
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
            "field": "AccessDenied",
            "description": "<p>Access denied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidType",
            "description": "<p>Invalid type</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TruckRequired",
            "description": "<p>TruckId is required</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TruckIsAssigned",
            "description": "<p>Truck is asigned</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TruckWasNotUpdated",
            "description": "<p>Truck was not updated</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/trucks.js",
    "groupTitle": "Truck"
  },
  {
    "type": "get",
    "url": "/api/profile",
    "title": "Getting user parameters.",
    "name": "GetUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>Payload content type.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Content-type header example",
          "content": "{ \"Content-type\": \"application/json\" }",
          "type": "json"
        },
        {
          "title": "Authorization header example",
          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "payload",
            "description": "<p>Profile data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"role\": \"shipper\",\n    \"_id\": \"5e8dcfbda51abaac2b0583f3\",\n    \"username\": \"Kyrylo\",\n    \"password\": \"$2b$10$IUr7xz3rhEIQjmZJfe0YZ.H3KbkZrDvVtIk.TvK9GTccWBmZIbJcK\",\n    \"__v\": 0,\n    \"loads\": [...],\n }",
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
            "field": "UserIsUnAuthorized",
            "description": "<p>User is not authorized.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserWasNotFound",
            "description": "<p>Server can not find a user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/profile.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/api/profile/",
    "title": "Delete an account.",
    "name": "deleteUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>Payload content type.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Content-type header example",
          "content": "{ \"Content-type\": \"application/json\" }",
          "type": "json"
        },
        {
          "title": "Authorization header example",
          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Successful delete</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:{",
          "content": " \"status\": \"Successful deleted\"\n}",
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
            "field": "UserWasNotFound",
            "description": "<p>Server can not find a user</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongId",
            "description": "<p>TokenId and url's id do not match</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/profile.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/api/profile/password",
    "title": "Change User's password",
    "name": "putUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "content-type",
            "description": "<p>Payload content type.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Content-type header example",
          "content": "{ \"Content-type\": \"application/json\" }",
          "type": "json"
        },
        {
          "title": "Authorization header example",
          "content": "{ \"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\" }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>current User's password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>new User's password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Payload example:",
          "content": "{\n\"oldPassword\": 123,\n\"newPassword\": 1234\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Successful update</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:{",
          "content": " \"status\": \"Successful update\"\n}",
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
            "field": "PasswordIsRequired",
            "description": "<p>Your password or/and new password required</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserWasNotFound",
            "description": "<p>Server can not find a user</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongId",
            "description": "<p>TokenId and url's id do not match</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/profile.js",
    "groupTitle": "User"
  }
] });
