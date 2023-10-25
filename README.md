# machine-project-02



## Project overview

####This Project contains two .js files to be executed

1. app.js - an express application that handles the REST APIs for weather data
2. sensor.js - an application meant to simulate the readings of a local weather station

## Project structure

- `/machine-project-02`
  - `/node_modules`
  - `/models`
    - `weather.js`
  - `/routes`
    - `weatherRoutes.js`
  - `/middleware`
    - `loggerMiddleware.js`
    - `errorMiddleware.js`
    - `validatorMiddleware.js`
    - `mailerMiddleware.js`
  - `/config`
    - `winston-config.js`
    - `db.js`
  - `app.js`
  - `sensor.js`
  - `package.json`

## Setup Instructions

1. Run `npm install` to download the package dependencies
2. Create an `.env` file from the `sample.env` file provided
3. Configure the `.env` file with the mongodb URI and [setup the nodemailer service](https://nodemailer.com/about/) and auth credentials for the email account that will be sending the notifications
4. Once configured run `npm run start`


### API Documentation

#### GET Weather Data

Get the last 10 entries of weather data inserted in the database

**URL** : `/api/weather`

**Method** : `GET`

**Auth required** : NO

**Data**: `{}`

#### Success Response

**Condition** : If Weather data exists

**Code** : `200 OK`

**Content example**

```json
[
    {
        "_id": "6533d69077e6afd93224c4b3",
        "timestamp": "Sat Oct 21 2023 21:48:00 GMT+0800 (Singapore Standard Time)",
        "location": "Location1",
        "temperature_celsius": 22.28353176295293,
        "humidity_percent": 16,
        "pressure_hpa": 1017,
        "__v": 0
    },
    {
        "_id": "6533d6cc77e6afd93224c4b5",
        "timestamp": "Sat Oct 21 2023 21:49:00 GMT+0800 (Singapore Standard Time)",
        "location": "Location2",
        "temperature_celsius": 31.954026852294305,
        "humidity_percent": 18,
        "pressure_hpa": 1018,
        "__v": 0
    },
    {
        "_id": "6533d61877e6afd93224c4af",
        "timestamp": "Sat Oct 21 2023 21:46:00 GMT+0800 (Singapore Standard Time)",
        "location": "Location1",
        "temperature_celsius": 28.198953382250828,
        "humidity_percent": 93,
        "pressure_hpa": 1009,
        "__v": 0
    }
]
```

#### GET Weather Data for given location

Get the last 10 entries of weather data in a given location inserted in the database

**URL** : `/api/weather:location`

**URL Parameters** : `location=[string]` where `location` is the ID of the Account on the
server.

**Method** : `GET`

**Auth required** : NO

**Data**: `{}`

#### Success Response

**Condition** : If Weather data exists for given location

**Code** : `200 OK`

**Content example**

```json
[
    {
        "_id": "6533d7bc0a7ebabcf68c4d14",
        "timestamp": "Sat Oct 21 2023 21:53:00 GMT+0800 (Singapore Standard Time)",
        "location": "Location1",
        "temperature_celsius": 26.20564049226032,
        "humidity_percent": 84,
        "pressure_hpa": 994,
        "createdAt": "2023-10-21T13:53:00.624Z",
        "updatedAt": "2023-10-21T13:53:00.624Z",
        "__v": 0
    },
    {
        "_id": "6533d8700a7ebabcf68c4d1a",
        "timestamp": "Sat Oct 21 2023 21:56:00 GMT+0800 (Singapore Standard Time)",
        "location": "Location1",
        "temperature_celsius": 21.58902424318998,
        "humidity_percent": 5,
        "pressure_hpa": 990,
        "createdAt": "2023-10-21T13:56:00.235Z",
        "updatedAt": "2023-10-21T13:56:00.235Z",
        "__v": 0
    },
    {
        "_id": "6533d9240a7ebabcf68c4d20",
        "timestamp": "Sat Oct 21 2023 21:59:00 GMT+0800 (Singapore Standard Time)",
        "location": "Location1",
        "temperature_celsius": 26.938540643577234,
        "humidity_percent": 98,
        "pressure_hpa": 1017,
        "createdAt": "2023-10-21T13:59:00.905Z",
        "updatedAt": "2023-10-21T13:59:00.905Z",
        "__v": 0
    }
]
```


#### POST Weather Data

Create new weather data

**URL** : `/api/weather/`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

**Data constraints**

Provide Weather data to be created.

```json
{
    "timestamp": "[Datetime formatted as string/not required]",
    "location": "[String]",
    "temperature_celsius": "[Number]",,
    "humidity_percent": "[Number]",
    "pressure_hpa": "[Number]"
}
```

**Data example** All fields must be sent.

```json
{
    "location": "Sample location",
    "temperature_celsius": "25",
    "humidity_percent": "50",
    "pressure_hpa": "1000"
}
```

#### Success Response

**Condition** : If all required fields are provided

**Code** : `201 CREATED`

**Content example**

```json
{
    "location": "Sample location",
    "temperature_celsius": 25,
    "humidity_percent": 50,
    "pressure_hpa": 1000,
    "_id": "6536844cc794e5987acd0805",
    "timestamp": "Mon Oct 23 2023 22:33:48 GMT+0800 (Singapore Standard Time)",
    "createdAt": "2023-10-23T14:33:48.097Z",
    "updatedAt": "2023-10-23T14:33:48.097Z",
    "__v": 0
}
```

#### Error Response

**Condition** : If fields are incomplete.

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
    "errors": [
        {
            "type": "field",
            "msg": "Invalid value",
            "path": "pressure_hpa",
            "location": "body"
        }
    ]
}
```

#### PUT Weather Data

Update existing weather data


**URL** : `/api/weather/`

**Method** : `PUT`

**Auth required** : NO

**Permissions required** : None

**Data constraints**

Provide Weather data to be edited.

```json
{
    "id": "[ObjectID]",
    "timestamp": "[Datetime formatted as string/not required]",
    "location": "[String]",
    "temperature_celsius": "[Number]",,
    "humidity_percent": "[Number]",
    "pressure_hpa": "[Number]"
}
```

**Data example** All fields must be sent.

```json
{
    "id": "6533d6029de0ce7b607e39bd",
    "location": "Test location",
    "temperature_celsius": "2",
    "humidity_percent": "2",
    "pressure_hpa": "2"
}
```

#### Success Response

**Condition** : If all required fields are provided, returns empty if no ObjectIDs match 

**Code** : `200 OK`

**Content example**

```json
{
    "_id": "6533d6029de0ce7b607e39bd",
    "location": "location",
    "temperature_celsius": 2,
    "humidity_percent": 2,
    "pressure_hpa": 2,
    "timestamp": "Sat Oct 21 2023 21:45:38 GMT+0800 (Singapore Standard Time)",
    "__v": 0
}
```

#### Error Response

**Condition** : If fields are incomplete.

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
    "errors": [
        {
            "type": "field",
            "msg": "Invalid value",
            "path": "humidity_percent",
            "location": "body"
        }
    ]
}
```

#### DELETE Weather Data

Delete existing weather data

**URL** : `/api/weather:id`

**URL Parameters** : `id=[string]` where `id` is the ObjectID


**URL** : `/api/weather:id`

**Method** : `DELETE`

**Auth required** : NO

**Permissions required** : None


#### Success Response

**Condition** : If all required fields are provided it returns the weather data deleted, returns empty if no ObjectIDs match 

**Code** : `200 OK`

**Content example**

```json
{
    "_id": "6533d6029de0ce7b607e39bd",
    "location": "location",
    "temperature_celsius": 2,
    "humidity_percent": 2,
    "pressure_hpa": 2,
    "timestamp": "1698076485183",
    "__v": 0,
    "updatedAt": "2023-10-23T15:54:45.183Z"
}
```

#### Error Response

**Condition** : If no ObjectID matches the database.

**Code** : `404 NOT FOUND`
