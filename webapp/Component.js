sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "sap/ui/model/type/Unit",
  ],
  function (UIComponent, JSONModel, Device, Unit) {
    "use strict";

    Unit.extend("sap.ui.model.type.MeterType", {
      constructor: function (oFormatOptions, oConstraints) {
        Unit.apply(this, [oFormatOptions, oConstraints, ["decimals"]]);
      },
    });

    return UIComponent.extend("sap.nexus.zdemo.Component", {
      metadata: {
        manifest: "json",
      },

      init: function () {
        UIComponent.prototype.init.apply(this, arguments);

        const oRouter = this.getRouter();
        oRouter.initialize();

        // Device
        const oModelDevice = new JSONModel(Device);
        this.setModel(oModelDevice, "device");

        // Route
        const oModelRoute = new JSONModel({
          current: null,
        });
        this.setModel(oModelRoute, "route");

        oRouter.attachRouteMatched(this.attachRouteMatched, this);
      },

      attachRouteMatched: function (oEvent) {
        const sCurrentRoute = oEvent.getParameter("name");
        this.getModel("route").setProperty("/current", sCurrentRoute);
      },
    });
  }
);
