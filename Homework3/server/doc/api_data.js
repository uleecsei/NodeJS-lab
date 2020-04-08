define({ "api": [
  {
    "type": "delete",
    "url": "/api/load/:id",
    "title": "deleting load by id and status NEW",
    "name": "DeleteLoad",
    "group": "Load",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "payload",
            "description": "<p>User's jwt from local storage.</p>"
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
            "field": "message",
            "description": "<p>Load was deleted with success.</p>"
          }
        ]
      }
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
            "field": "LoadWasnotNew",
            "description": "<p>Load wasn't deleted.</p>"
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
    "filename": "routes/loads.js",
    "groupTitle": "Load"
  },
  {
    "type": "post",
    "url": "/api/load/:id",
    "title": "create load.",
    "name": "PostLoad",
    "group": "Load",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "payload",
            "description": "<p>User's jwt from local storage.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "dimensions",
            "description": "<p>load's dimensions.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.weight",
            "description": "<p>load's payload.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.width",
            "description": "<p>load's width.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.height",
            "description": "<p>load's height.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.length",
            "description": "<p>load's length.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>load's name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "load",
            "description": "<p>Load was successfully created.</p>"
          }
        ]
      }
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
            "field": "LoadWasNotCreated",
            "description": "<p>Load wasn't created.</p>"
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
    "filename": "routes/loads.js",
    "groupTitle": "Load"
  },
  {
    "type": "put",
    "url": "/api/load/:id/post",
    "title": "finding truck with fitting demensions",
    "name": "PutLoad",
    "group": "Load",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "payload",
            "description": "<p>User's jwt from local storage.</p>"
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
            "field": "truckAssigned",
            "description": "<p>Returning truck data.</p>"
          }
        ]
      }
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
            "description": "<p>Server can not assign truck or/and load.</p>"
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
            "field": "TruckDoesntExist",
            "description": "<p>No trucks to ship founded.</p>"
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
    "filename": "routes/loads.js",
    "groupTitle": "Load"
  },
  {
    "type": "put",
    "url": "/api/load/:id/shipped",
    "title": "driver set load status to shipped",
    "name": "PutLoad",
    "group": "Load",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "payload",
            "description": "<p>User's jwt from local storage.</p>"
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
            "field": "message",
            "description": "<p>Load successfuly shipped.</p>"
          }
        ]
      }
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
            "field": "WrongId",
            "description": "<p>TokenId and url's id do not match</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/loads.js",
    "groupTitle": "Load"
  },
  {
    "type": "put",
    "url": "/api/load/:id",
    "title": "update load info",
    "name": "PutLoad",
    "group": "Load",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "payload",
            "description": "<p>User's jwt from local storage.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "dimensions",
            "description": "<p>load's dimensions.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.weight",
            "description": "<p>load's payload.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.width",
            "description": "<p>load's width.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.height",
            "description": "<p>load's height.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.length",
            "description": "<p>load's length.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>load's name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Load was updated.</p>"
          }
        ]
      }
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
            "field": "LoadWasNotUpdated",
            "description": "<p>Load wasn't updated.</p>"
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
    "filename": "routes/loads.js",
    "groupTitle": "Load"
  },
  {
    "type": "post",
    "url": "/api/truck/:id",
    "title": "create a truck",
    "name": "PostTruck",
    "group": "Truck",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type of truck</p>"
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
            "field": "message",
            "description": "<p>truck was added</p>"
          }
        ]
      }
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
    "url": "/api/truck/:id",
    "title": "delete a truck",
    "name": "deleteTruck",
    "group": "Truck",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "truck",
            "description": "<p>object with truck data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Truck has been deleted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongId",
            "description": "<p>TokenId and url's id do not match</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TruckIsOnLoad",
            "description": "<p>Truck in on load</p>"
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
    "url": "/api/truck/:id",
    "title": "get existing trucks",
    "name": "getTruck",
    "group": "Truck",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "truck",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
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
    "type": "put",
    "url": "/api/truck/:id/assign",
    "title": "assign truck to his owner",
    "name": "putTruck",
    "group": "Truck",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "truck",
            "description": "<p>object with truck data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Truck has been assigned</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongId",
            "description": "<p>TokenId and url's id do not match</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DriverIsBusy",
            "description": "<p>Driver can not assign trucks</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/trucks.js",
    "groupTitle": "Truck"
  },
  {
    "type": "put",
    "url": "/api/truck/:id/assign",
    "title": "assign truck to his owner",
    "name": "putTruck",
    "group": "Truck",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "truck",
            "description": "<p>object with truck data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Truck has been assigned</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongId",
            "description": "<p>TokenId and url's id do not match</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DriverIsBusy",
            "description": "<p>Driver can not assign trucks</p>"
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
    "url": "/api/profile/:id",
    "title": "getting user parameters",
    "name": "GetUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "payload",
            "description": "<p>User's jwt from local storage.</p>"
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
            "field": "userFound",
            "description": "<p>Returning User's data.</p>"
          }
        ]
      }
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
    "type": "post",
    "url": "/api/register",
    "title": "register user",
    "name": "PostUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "login",
            "description": "<p>User's login.</p>"
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
            "description": "<p>User's password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User's role.</p>"
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
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "200",
            "description": "<p>returns success code.</p>"
          }
        ]
      }
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
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/login",
    "title": "login user",
    "name": "PostUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
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
            "description": "<p>User's password.</p>"
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
            "field": "token",
            "description": "<p>User jwt.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User unique id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "expires",
            "description": "<p>Date of expiration</p>"
          }
        ]
      }
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
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/api/profile/:id",
    "title": "delete an account",
    "name": "deleteUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "payload",
            "description": "<p>User's jwt from local storage.</p>"
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
            "field": "message",
            "description": "<p>User was deleted</p>"
          }
        ]
      }
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
    "type": "put",
    "url": "/api/profile/:id/password",
    "title": "changing User's password",
    "name": "putUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "payload",
            "description": "<p>User's jwt from local storage.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>current User's password</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>new User's password</p>"
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
            "field": "message",
            "description": "<p>Successful update</p>"
          }
        ]
      }
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
