# dakiya [![Build Status](https://travis-ci.org/jagatjeevan/dakiya.svg?branch=master)](https://travis-ci.org/jagatjeevan/dakiya)
This is an internal project to Thoughtworks for automating parcel delivery system.

# Tech stack
Please refer [here](https://github.com/jagatjeevan/react-setup/)

# Pre-requisites
1. [Yarn](https://yarnpkg.com/lang/en/docs/install/)
2. [Node.js](https://nodejs.org/) v7+

Follow the instruction to get started.
```
git clone git@github.com:jagatjeevan/dakiya.git
yarn install
yarn dev
```
This should open browser in a new tab.

# Devbox setup
1. `git clone git@github.com:jagatjeevan/dakiya.git`
2. `add jigsawConfig.js file in /app/js/  & export constants 'url' and 'authorizationToken' in that file with appropriate values`
3. `yarn install`
4. `yarn build`
5. `docker-compose build`
6. `docker-compose up -d`
7. `docker-compose exec dakiya ./seed.sh`
8. go to `http://localhost:9001/admin`
9. login using `admin` & `admin123`
10. create new `User` in admin panel.
11. go to `http://localhost:9001/` and login using user credentials.

