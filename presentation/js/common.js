(function(root) {
'use strict';

  var nt = root.nt = {

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

})(window);