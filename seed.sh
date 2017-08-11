#!/bin/bash

echo "Seeding _SCHEMA"
mongoimport -h db:27017 -d dakiya -c _SCHEMA --file seed-data/_SCHEMA.json

echo "Seeding Employees"
mongoimport -h db:27017 -d dakiya -c Employee --file seed-data/Employee.json

echo "Seeding Vendors"
mongoimport -h db:27017 -d dakiya -c Vendor --file seed-data/Vendor.json