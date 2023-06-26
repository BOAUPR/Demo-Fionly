sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend(
    "sap.nexus.zdemo.controller.BaseController",
    {
      getRouter: function () {
        return this.getOwnerComponent().getRouter();
      },

      setModel: function (oModel, sName) {
        return this.getOwnerComponent().setModel(oModel, sName);
      },

      getModel: function (sName) {
        return this.getOwnerComponent().getModel(sName);
      },

      dateFormatToSAP: function (date) {
        if (date) {
          const oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
            pattern: "yyyyMMdd",
          });

          return oDateFormat.format(date);
        } else {
          return "";
        }
      },

      dateFormatToUI5: function (SAPDate) {
        if (SAPDate != "" && SAPDate != "00000000") {
          return new Date(
            SAPDate.substring(0, 4),
            parseInt(SAPDate.substring(4, 6) - 1),
            SAPDate.substring(6)
          );
        } else return null;
      },
    }
  );
});
