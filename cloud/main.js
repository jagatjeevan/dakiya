
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
  var pkg = request.object;
  var packageId = pkg.get('packageId');
  var status = pkg.get('status');
  var arrivalNotified = pkg.get('arrivalNotified') || false;
  var collectionNotified = pkg.get('collectionNotified') || false;

  pkg.get('owner')
    .fetch(qp)
    .then(employee => {
      var mailOptions = {
        from: process.env.SMTP_FROM_EMAIL,
        to: employee.get('email')
      };

      // Send package arrival notification
      if (status == false && arrivalNotified == false) {
        mailOptions.subject = utils.format(`Your package (%s) has arrived.`, packageId);
        mailOptions.text = 'Please pickup your package from security desk.'

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Package arrival message %s sent: %s', info.messageId, info.response);

          pkg.set("arrivalNotified", true);
          pkg.save(null, qp);
        });
      }

      // Send package collection notification
      if (status && collectionNotified == false) {
        mailOptions.subject = utils.format(`Your package (%s) has been picked up.`, packageId);
        mailOptions.text = 'Your package has been collected from security desk';

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Package arrival message %s sent: %s', info.messageId, info.response);

          pkg.set("collectionNotified", true);
          pkg.save(null, qp);
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
