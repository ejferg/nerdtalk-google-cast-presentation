(function(app) {
  'use strict';

  app.CastReceiver = (function() {

    var manager = null;
    var messageBus = null;
    var messageHandler = null;
    var logger = app.logger;

    // Initialize

    var init = function() {

      cast.receiver.logger.setLevelValue(0);

      manager = cast.receiver.CastReceiverManager.getInstance();
      messageBus = manager.getCastMessageBus(app.AppCast.NAMESPACE);

      addEventListeners();
      start();
    };

    // Utility Methods

    var start = function() {
      manager.start({statusText: "Application is starting"});
    }

    // Event handlers

    var onReady = function(e) {

      logger.info(e);
    };

    var onSenderConnected = function(e) {
      logger.info(e);
    };

    var onMessage = function(e) {

      logger.info(e);

      messageBus.send(e.senderId, e.data);

      if(messageHandler) {

        var castMessage = app.CastMessage.deserialize(e.data);

        messageHandler(castMessage);
      }
    };

    var addEventListeners = function() {

      manager.onReady = _.bind(onReady, this);
      manager.onSenderConnected = _.bind(onSenderConnected, this);

      messageBus.onMessage = _.bind(onMessage, this);

    };

    // Getter/Setters
    var setMessageHandler = function(value) {

      messageHandler = value;

    }

    // Trigger initialization
    init();

    return {

      setMessageHandler:
    }

  })();

})(window.nt);