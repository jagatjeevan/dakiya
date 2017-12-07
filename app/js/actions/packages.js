import Parse from './parseConfig';
import * as actionTypes from '../util/actionsTypes';
import * as notificationActions from './notification';

export const filterParcelsBy = {
  all: 'All',
  delivered: 'Delivered',
  unDelivered: 'Un Delivered',
}

function requestPackages() {
  return {
    type: actionTypes.REQUEST_PACKAGES,
  };
}

function receivePackages(packages) {
  return {
    type: actionTypes.RECEIVE_PACKAGES,
    packages,
  };
}

function savePackageBegin() {
  return {
    type: actionTypes.SAVE_PACKAGE_BEGIN,
  };
}

function savePackageComplete(pkg) {
  return {
    type: actionTypes.SAVE_PACKAGE_COMPLETE,
    pkg,
  };
}

export function pickPackage(pkg) {
  return {
    type: actionTypes.PICK_PACKAGE,
    pkg,
  }
}

export function clearPickPackage() {
  return {
    type: actionTypes.CLEAR_PICK_PACKAGE,
  }
}

export function notificationUpdate(notificationContent, notificationClass) {
  return {
    type: actionTypes.OPEN_NOTIFICATION,
    notificationContent,
    notificationClass,
  }
}

function swippedCardStatus(status) {
  return {
    type: actionTypes.SWIPPED_CARD_STATUS,
    status,
  }
}

const mapper = o => o.toJSON();
const Package = Parse.Object.extend('Package');
const Employee = Parse.Object.extend('Employee');
const Vendor = Parse.Object.extend('Vendor');
const CardSwipeLog = Parse.Object.extend('CardSwipeLog');

export const fetchPackages = (searchToken = '', filterBy = filterParcelsBy.all) => (
  (dispatch) => {
    dispatch(requestPackages());
    let query = new Parse.Query(Package);
    if (searchToken.length > 0) {
      const ownerNameQuery = new Parse.Query(Employee);
      ownerNameQuery.contains('name', searchToken);

      const ownerEmailQuery = new Parse.Query(Employee);
      ownerEmailQuery.contains('email', searchToken);

      const compoundOwnerQuery = Parse.Query.or(ownerNameQuery, ownerEmailQuery);

      const packageIdQuery = new Parse.Query(Package);
      packageIdQuery.equalTo('packageId', Number(searchToken));

      const ownerQuery = new Parse.Query(Package);
      ownerQuery.matchesQuery('owner', compoundOwnerQuery);

      query = Parse.Query.or(ownerQuery, packageIdQuery);
    }

    if (filterBy == filterParcelsBy.unDelivered) {
      query.equalTo('status', false);
    }
    else if (filterBy == filterParcelsBy.delivered) {
      query.equalTo('status', true);
    }

    query.include('owner');
    query.include('vendor');
    query.descending("createdAt");
    query.find().then((result) => {
      const data = result.map(mapper);
      dispatch(receivePackages(data));
    });
  }
);

export const savePackageAsync = (employeeObjectId, vendorObjectId, awpNo) => (
  (dispatch) => {

    const pkg = new Package();
    pkg.set('owner', Employee.createWithoutData(employeeObjectId)); // Link owner
    pkg.set('vendor', Vendor.createWithoutData(vendorObjectId)); // Link vendor
    pkg.set('awpNo', awpNo);
    pkg.set('status', false);

    pkg.save(null, {
      success(result) {
        const notificationContent = `Your parcel has been saved. <br /> You can see your parcel <a href="/">here</a>`;
        const notificationClass = 'success';
        dispatch(notificationUpdate(notificationContent, notificationClass));
      },
      error(gameScore, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        /* eslint: no-alert:0 */
        const notificationContent = `Failed to save the parcel. Please try again.`;
        const notificationClass = 'failure';
        dispatch(notificationUpdate(notificationContent, notificationClass));
        alert(`Failed to create new object, with error code: ${error.message}`);
      }
    });
  }
);

export const updatePackageAsync = (packageObjectId, employeeObjectId) => (
  (dispatch) => {
    updatePackage(packageObjectId, employeeObjectId, dispatch);
  }
);

function updatePackage(packageObjectId, employeeObjectId, dispatch) {
  dispatch(savePackageBegin());
  const query = new Parse.Query(Package);
  query.get(packageObjectId)
    .then((p) => {
      p.set('status', true);
      p.set('pickupDate', new Date());
      p.set('pickedBy', Employee.createWithoutData(employeeObjectId));
      p.save(null)
        .then(() => {
          dispatch(swippedCardStatus('Success'));
          setTimeout(function() {
            dispatch(fetchPackages(''));
            dispatch(swippedCardStatus('Default'));
          }, 1000);
        })
        .catch((error) => {
          /* eslint: no-alert:0 */
          alert(`Failed to update package, with error code: ${error.message}`);
        });
    })
    .catch((error) => {
      /* eslint: no-alert:0 */
      alert(`Failed to get package, with error code: ${error.message}`);
    });
}

function findCardOwner(cardID) {
  return new Promise(function (resolve, reject) {
    let employee = new Parse.Query(Employee);
    employee.equalTo('cardID', cardID);
    employee.find({
      success: function (result) {
        if (result.length != 0) {
          let cardOwnerObjectId = result.map(mapper)[0].objectId;
          resolve(cardOwnerObjectId);
        } else {
          reject(result);
        }
      },
      error: function (error) {
        reject(error)
      }
    });
  })
}

export const verifyParcelForCardSwipe = (pickedPackage) => (
  (dispatch) => {
    let query = new Parse.Query(CardSwipeLog);
    query.find().then((result) => {
      if (result.length != 0) {
        let swippedCardId = result.map(mapper)[0].cardID;
        findCardOwner(swippedCardId).then(function (cardOwnerObjectId) {
          if(cardOwnerObjectId!=pickedPackage.owner.objectId){
            dispatch(swippedCardStatus('Unauthorized'));
            return;
          }
          updatePackage(pickedPackage.objectId, cardOwnerObjectId, dispatch);
        }).catch(function (error) {
          dispatch(swippedCardStatus('Invalid'));
        });
      }
      else {
        dispatch(swippedCardStatus('Default'));
      }
    });
  });

export function clearCardSwipeLogs() {
  return new Promise(function (resolve, reject) {
    const CardSwipeLog = Parse.Object.extend('CardSwipeLog');
    let query = new Parse.Query(CardSwipeLog);
    query.find({
      success: function (result) {
        Parse.Object.destroyAll(result).then(
          function (success) {
            resolve(success);
          }, function (error) {
            reject(error);
          }
        );
      }
    });
  })
}
