sap.ui.define(
  ["./BaseController", "sap/ui/model/json/JSONModel", "sap/f/library"],
  function (BaseController, JSONModel, library) {
    "use strict";

    return BaseController.extend("sap.nexus.zdemo.App", {
      onInit: function () {
        this.oRouter = this.getRouter();
        this.oRouter.attachRouteMatched(this.attachRouteMatched, this);

        this.setModel(
          new JSONModel({
            busy: true,
            delay: 0,
            layout: library.LayoutType.OneColumn,
          }),
          "app"
        );

        this.getModel().metadataLoaded().then(this.metadataLoaded(this));
      },

      onBeforeRendering: function () {},

      attachRouteMatched: async function (oEvent) {
        const sRoute = oEvent.getParameter("name");

        switch (sRoute) {
          case "detail":
            this.getModel("app").setProperty(
              "/layout",
              library.LayoutType.TwoColumnsMidExpanded
            );
            break;

          default:
            this.getModel("app").setProperty(
              "/layout",
              library.LayoutType.OneColumn
            );
            break;
        }
      },

      metadataLoaded: function () {
        this.getModel("app").setProperty("/busy", false);
      },
    });
  }
);
