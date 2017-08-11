# dakiya [![Build Status](https://travis-ci.org/jagatjeevan/dakiya.svg?branch=master)](https://travis-ci.org/jagatjeevan/dakiya)
This is an internal project to Thoughtworks for automating parcel delivery system.

# Tech stack
Please refer [here](https://github.com/jagatjeevan/react-setup/)

# Pre-requisites
1. [Yarn](https://yarnpkg.com/lang/en/docs/install/)
2. [Node.js](https://nodejs.org/) v7+

Follow the instruction to get started.
```
git clone git@git.mckinsey-solutions.com:price/pricefrontend.git
yarn install
yarn dev
```

This should open browser in a new tab.

# Word cloud web
- Package
  - Delivered
  - Pending
- Fetch : from the server
- Update : update the view on receiving from server.

# Devbox setup
1. `git clone git@github.com:jagatjeevan/dakiya.git`
2. `yarn install`
3. `yarn build`
4. `docker-compose build`
5. `docker-compose up -d`
6. `docker-compose exec dakiya ./seed.sh`
7. go to `http://localhost:9001/admin`
8. login using `admin` & `admin123`
9. create new `User` in admin panel.
10. go to `http://localhost:9001/` and login using user credentials. 

