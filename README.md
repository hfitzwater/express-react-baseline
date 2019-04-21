## express-react-baseline
Boilerplate web application including Node, Express, MongoDB, Passport, React, Spectre.css, Sass.

### Prerequisites
* [MongoDB](https://www.mongodb.com/): local or remote
* [Google OAuth2 Credentials](https://developers.google.com/identity/protocols/OpenIDConnect#getcredentials)

### Environment variables
| Name                 | Default Value                                    |
|----------------------|--------------------------------------------------|
| GOOGLE_CLIENT_ID     | undefined                                        |
| GOOGLE_CLIENT_SECRET | undefined                                        |
| MONGODB_URI          | mongodb://localhost:27017/express-react-baseline |
| CLIENT_URI           | http://localhost:3000                            |
| APP_SECRET           | undefined                                        |
| NODE_ENV             | development                                      |

### Development
```
npm install;
npm run dev;
```

### Production
```
npm run prod
```
