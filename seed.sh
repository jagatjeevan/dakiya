#!/bin/bash

echo "Seeding _SCHEMA"
mongoimport -h db:27017 -d dakiya -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD -c _SCHEMA --file seed-data/_SCHEMA.json

echo "Seeding Employees"
mongoimport -h db:27017 -d dakiya -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD -c Employee --file seed-data/Employee.json

echo "Seeding Vendors"
mongoimport -h db:27017 -d dakiya -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD -c Vendor --file seed-data/Vendor.json