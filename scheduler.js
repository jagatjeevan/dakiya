require('dotenv').config();

const nodemailer = require('nodemailer');
const utils = require('util');
const Parse = require('parse/node');
const schedule = require('node-schedule');

initializeParse();

var rule = new schedule.RecurrenceRule();
rule.hour = process.env.REMINDER_HOUR;
rule.minute=0;

var j = schedule.scheduleJob(rule, function () {
  sendReminderToParcelOwner();
});


let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 2525,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

let sendEmail = function (package) {
  var mailOptions = {
    from: process.env.SMTP_FROM_EMAIL,
    to: package.owner.email
  };

  var date = new Date(package.createdAt);
  var dateFormat = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  mailOptions.subject = utils.format(`[Reminder] Your parcel had arrived on %s`, dateFormat);
  mailOptions.text = utils.format('Your parcel had arrived on %s. Please pickup your parcel from security desk.\n\nParcel details:\nParcel Number : %s\nVendor : %s\nAWB Number : %s\nPasscode : %s\n\nUse either your access card or given passcode to collect your parcel from security desk.', dateFormat, package.packageId, package.vendor.name, package.awpNo, package.objectId);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Parcel arrival message %s sent: %s', info.messageId, info.response);
  });
}

function sendReminderToParcelOwner() {
  let query = createQuery();

  query.find().then((result) => {
    const data = result.map(o => o.toJSON());
    data.forEach(sendEmail);
  });
}

function createQuery(){
  var date1 = getTwoDaysBeforeCurrentDate();
  var date2 = getFiveDaysBeforeCurrentDate();

  let query=new Parse.Query('Package');
  query.equalTo('status', false);
  query.lessThan('createdAt', date1);
  query.greaterThanOrEqualTo('createdAt', date2);
  query.include('owner');
  query.include('vendor');
  query.descending("createdAt");
  return query;
}

function getTwoDaysBeforeCurrentDate() {
  var date = new Date();
  date.setDate(date.getDate() - 2);
  return date;
}

function getFiveDaysBeforeCurrentDate() {
  var date = new Date();
  date.setDate(date.getDate() - 5);
  return date;
}

function initializeParse() {
  Parse.initialize(process.env.APP_ID);
  Parse.serverURL = process.env.SERVER_URL;
}
