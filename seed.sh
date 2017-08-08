#!/bin/bash

echo "Seeding _SCHEMA"
mongoimport -d dakiya1 -c _SCHEMA --file db/_SCHEMA.json

echo "Seeding Employees"
mongoimport -d dakiya1 -c Employee --file db/Employee.json

echo "Seeding Vendors"
mongoimport -d dakiya1 -c Vendor --file db/Vendor.json