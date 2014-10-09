(function(app) {
'use strict';

  app.CastSender = (function() {

    // Cast Session
    var session = null;

    // Logger
    var logger = app.logger;

    // Initialization
    var init = function() {

      if (!chrome.cast || !chrome.cast.isAvailable) {

        setTimeout(_.bind(onInitilizeTimeoutComplete, this), 1000);
      }

    };

      // Event handlers
    var onInitilizeTimeoutComplete = function() {

      var sessionRequest = new chrome.cast.SessionRequest(app.AppCast.APPLICATION_ID);

      var sessionListener = _.bind(onSessionReady, this);
      var receiverListener = _.bind(onReceiverReady, this);

      var config = new chrome.cast.ApiConfig(sessionRequest,sessionListener,receiverListener);

      chrome.cast.initialize(config,
                             onSenderInitializationComplate,
                             onError, chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED);

    };


    var onSenderInitializationComplate = function() {

      logger.info('Initialization Complete');

    };

    var onSuccess = function() {

      logger.info('Initialization Complete')

    };

    var onError = function(error) {

      logger.error(error);

    };

    var onSessionReady = function(e) {

      session = e;

      if(session) {

        // var media = this.session.media[0];

        session.addUpdateListener(_.bind(onSessionChange, this));
      }

    };

    var onSessionChange = function(e) {

      logger.info(e);
    };

    var onReceiverReady = function(e) {

      logger.info(e);
    };

    var requestSession = function() {

      var successListener = _.bind(onSessionReady, this);
      var errorListener = _.bind(onError, this);

      chrome.cast.requestSession(successListener, errorListener);

    };

    var sendMessage = function(message) {

      var successListener = _.bind(onSuccess, this);
      var errorListener = _.bind(onError, this);

      if(session) {

        session.sendMessage(app.AppCast.NAMESPACE, message, successListener, errorListener);

      } else {

        requestSession();

      }
    };

    init();

    return {

      sendMessage: sendMessage,
      requestSession: requestSession
    }

  })();

})(window.nt);