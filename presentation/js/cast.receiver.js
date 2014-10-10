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

      // Initializes the system manager so we can communicate with the platform.
      // This class is used to send/receive system messages/events.
      manager = cast.receiver.CastReceiverManager.getInstance();

      // Handles cast messages for a specific namespace.
      // Applications should never create a CastMessageBus
      // Provides a channel for a specific namespace (for any sender).
      messageBus = manager.getCastMessageBus(app.AppCast.NAMESPACE);

      addEventListeners();
      start();
    };

    // Utility Methods

    var start = function() {

      // Initializes the system manager.
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

      // Sends a message to a specific sender.
      messageBus.send(e.senderId, e.data);

      if(messageHandler) {

        var castMessage = app.CastMessage.deserialize(e.data);

        messageHandler(castMessage);
      }
    };

    var addEventListeners = function() {

      manager.onReady = _.bind(onReady, this);
      manager.onSenderConnected = _.bind(onSenderConnected, this);

      // Event handler for cast.receiver.CastMessageBus message event.
      messageBus.onMessage = _.bind(onMessage, this);

    };

    // Getter/Setters
    var setMessageHandler = function(value) {

      messageHandler = value;

    };

    // Trigger initialization
    init();

    return {

      setMessageHandler:setMessageHandler
    }

  })();

})(window.nt);