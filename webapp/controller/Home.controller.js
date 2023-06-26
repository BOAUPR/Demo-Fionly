sap.ui.define(
  ["./BaseController", "sap/ui/model/json/JSONModel", "sap/ui/core/ValueState"],
  function (BaseController, JSONModel, ValueState) {
    "use strict";

    return BaseController.extend("sap.nexus.zdemo.controller.Home", {
      onInit: function () {
        this.oRouter = this.getRouter();

        this.setModel(
          new JSONModel({
            busy: false,
            delay: 0,
          }),
          "home"
        );

        // this.byId("grDateInput").setDateValue(new Date());
      },

      onPressNext: async function () {
        console.log("onPressNext");
      },
    });
  }
);
