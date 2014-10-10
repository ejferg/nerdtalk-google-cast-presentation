(function(root) {
'use strict';

  var nt = root.nt = {

    // Utility Methods
    isCastMessage: function(message) {

      return _.isObject(message) &&
             message.hasOwnProperty('type') &&
             message.hasOwnProperty('data')
    },

    // Application Objects
    CastMessageTypes: {
      EVENT: 0,
      ACTION: 2
    },

    ActionTypes: {
      NEXT: 0,
      PREVIOUS: 1
    },

    // Application Logger
    logger: {

      info: function(message) {

        console.info(nt.AppInfo.NAME + ": ", message);
      },

      error: function(error) {

        console.error(nt.AppInfo.NAME+ ": ", error);
      }

    },

    // Application Constants

    AppInfo: {
      NAME: 'Google Cast Presentation',
      VERSTION: '1.0'
    },

    AppCast: {
      APPLICATION_ID: 'EF51F052',
      NAMESPACE: 'urn:x-cast:com.nerdtalk.gcast'
    }

  };

  // Application Classes
  nt.CastMessage = function(type, data) {

    this.type = type || nt.CastMessageTypes.EVENT;
    this.data = data;

  };

  nt.CastMessage.deserialize = function(json) {

    var result = null;

    if(json) {

      var castMessageObject = JSON.parse(json);

      result = new nt.CastMessage(castMessageObject.type,
                                  castMessageObject.data);
    }

    return result;
  };

  nt.CastMessage.serialize = function(message) {

    return JSON.stringify({type: message.type, data: message.data});
  };

  nt.CastMessage.prototype = {

    // Message type
    type: null,

    // Application based message data.
    data: null

  };

})(window);