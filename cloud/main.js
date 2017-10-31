
const nodemailer = require('nodemailer');
const utils = require('util');
Parse.Cloud.define('hello', function (req, res) {
  res.success('Hi');
});

const qp = { useMasterKey: true };

Parse.Cloud.beforeSave("Package", function (request, response) {
  if (typeof request.object.id !== 'undefined') {
    response.success();
  }

  var query = new Parse.Query("Package");
  query.descending("packageId");
  query.first(qp)
    .then(pkg => {
      var serialNumber = 999;
      if (typeof pkg !== 'undefined' && pkg) {
        serialNumber = pkg.get("packageId");
      }
      request.object.set("packageId", serialNumber + 1);
      response.success();
    })
    .catch(err => {
      console.log("CloudCode::Package::beforeSave::Error -->", err)
      response.error("internal server error");
    });
});

var transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 2525,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

Parse.Cloud.afterSave("Package", function (request) {
  const mapper = o => o.toJSON();
  let query = new Parse.Query('Package');
  query.equalTo('objectId', request.object.id);
  query.include('owner');
  query.include('vendor');
  query.include('pickedBy');
  query.find(qp).then((result) => {
    const package = result.map(mapper)[0];
    var passcode = package.objectId;
    var arrivalNotified = package.arrivalNotified || false;
    var collectionNotified = package.collectionNotified || false;
    var mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: package.owner.email
    };

    // Send package arrival notification
    if (package.status == false && arrivalNotified == false) {
      mailOptions.subject = utils.format(`Your parcel has arrived.`);
      mailOptions.text = utils.format('Your parcel has arrived. Please pickup your parcel from security desk.\n\nParcel details:\nParcel Number : %s\nVendor : %s\nAWB Number : %s\nPasscode : %s\n\nUse either your access card or given passcode to collect your parcel from security desk.', package.packageId, package.vendor.name, package.awpNo, passcode);

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Parcel arrival message %s sent: %s', info.messageId, info.response);

        package.set("arrivalNotified", true);
        package.save(null, qp);
      });
    }

    // Send package collection notification
    if (package.status && collectionNotified == false) {
      mailOptions.subject = `Your parcel has been picked up.`;
      mailOptions.text = utils.format('Your parcel has been collected from security desk by %s\n\nParcel details:\nParcel Number : %s\nVendor : %s\nAWB Number : %s', package.pickedBy.name, package.packageId, package.vendor.name, package.awpNo);

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Parcel picked up message %s sent: %s', info.messageId, info.response);

        package.set("collectionNotified", true);
        package.save(null, qp);
      });
    }
  })
    .catch(err => {
      console.log("CloudCode::Package::afterSave::Error -->", err)
    });
});

Parse.Cloud.beforeSave("CardSwipeLog", function (request, response) {
  const CardSwipeLog = Parse.Object.extend('CardSwipeLog');
  let query = new Parse.Query(CardSwipeLog);
  query.find({
    success: function (result) {
      Parse.Object.destroyAll(result).then(
        function (success) {
          response.success();
        }, function (error) {
          response.error("internal server error");
        });;
    }
  });
});
