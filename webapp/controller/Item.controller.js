sap.ui.define(
    ["./BaseController", "sap/ui/model/json/JSONModel"],
    function (BaseController, JSONModel) {
      "use strict";
  
      return BaseController.extend("sap.nexus.zdemo.controller.Item", {
        onInit: function () {
          this.oRouter = this.getRouter();
          this.oRouter.attachRouteMatched(this.attachRouteMatched, this);
  
          this.setModel(
            new JSONModel({
              busy: false,
              delay: 0,
            }),
            "item"
          );       
          // console.log(this.getModel("home").getProperty("/so"));
          //this.getOwnerComponent().setModel();
  
          // this.byId("grDateInput").setDateValue(new Date());
        },

        attachRouteMatched: async function (oEvent){
          // console.log("attachRounteMatched");
          if (oEvent.getParameter("name") == "item"){

            this.getModel("item").setProperty("/so_list_item", null);

            const sSO = this.getModel("home").getProperty("/so");
            // console.log(sSO);
            if(sSO){
              
              console.log(this.getModel("item").getProperty("/list_so_item"));

              if (!this.getModel("item").getProperty("/list_so_item")) {

              const oFilters = new Array();
              console.log(sSO);
              const oFilter = new sap.ui.model.Filter({
                path: "VBELN",
                operator: sap.ui.model.FilterOperator.EQ,
                value1: sSO,
              });
  
              oFilters.push(oFilter);
              console.log(oFilter);
              const response = await new Promise((resolve, reject) => {
                this.getModel().read("/ES_SO_ITEM", {
                  filters: [oFilters],
                  success: (data) => resolve(data.results),
                  error: (err) => reject(err),
                });
              });
              
              this.getModel("item").setProperty("/list_so_item", response);
              console.log(response);
              // console.log(this.getModel("item").setProperty("/list_so_item", response));
              }
            }
          }
        },

        onListItemPress: function(oEvent){
          const oCustomData = {};
          const aCustomData = oEvent.getSource().getAggregation("customData"); 
          // const aCustomData = oEvent
          //   .getParameter("listItem")
          //   .getAggregation("customData");
          
          for (const fCustomData of aCustomData){
            oCustomData[fCustomData.getProperty("key")] =
              fCustomData.getProperty("value");
          }
          console.log(oCustomData);
          console.log(oCustomData.vbeln);
          console.log(oCustomData.posnr);
          // this.oRouter.navTo("Detail");
          this.oRouter.navTo("Detail", { vbeln: oCustomData.vbeln, posnr: oCustomData.posnr, });
        },


        onPressUpdate: async function (oEvent) {
          console.log("onPressUpdate");
          // this.oRouter.navTo("Detail");
          // this.oRouter.navTo("Detail", { vbeln: oCustomData.vbeln, posnr: oCustomData.posnr });
          
          const aItems = this.getModel("item")
            .getProperty("/list_so_item")
            .map((i) => {
              return {
                VBELN: i.VBELN,
                POSNR: i.POSNR,
                MATNR: i.MATNR,
                CHARG: i.CHARG,
                ARKTX: i.ARKTX,
                KWMENG: i.KWMENG,
                VRKME: i.VRKME,
              };
            }
          );

          console.log(aItems);
  
          const oBody = {
            VBELN: this.getModel("home").getProperty("/so"),
            Items: aItems,
          }

          console.log(oBody);
  
          // OData : Call method *_CREATE_DEEP_ENTITY 
          const response = await new Promise((resolve, reject) => {
            this.getModel().create("/ES_SO_HEAD", oBody, {
              success: (data) => resolve(data),
              error: (err) => reject(err),
            });
          });
  
          console.log(response);
          
        },

        // onPressSave: async function (oEvent) {  //: sap.ui.base.Event
        //   console.log("Item Event : onPressSave");
  
        //   const aItem = this.getModel("item").getProperty("/list_so_item").map((i) => {
        //     return {
        //       VBELN: i.VBELN,
        //       POSNR: i.POSNR,
        //       MATNR: i.MATNR,
        //       CHARG: i.CHARG,
        //       ARKTX: i.ARKTX,
        //       KWMENG: i.KWMENG,
        //       VRKME: i.VRKME,
        //     };
        //   }
        //   );
  
        //   const oBody = {
        //     VBELN: this.getModel("home").getProperty("/vbeln"),
        //     AUART: "",
        //     ERNAM: "",
        //     MESSAGE: "",
        //     //items: this.getModel("item").getProperty("/so_item"),
        //     Items: aItem,
        //   }
        //   console.log(oBody);
  
        //   // OData : Call method *_CREATE_DEEP_ENTITY 
        //   const response = await new Promise((resolve, reject) => {
        //     this.getModel().create("/ES_SO_HEAD", oBody, {
        //       success: (data) => resolve(data),
        //       error: (err) => reject(err),
        //     });
        //   });
  
        //   MessageToast.show( response.MESSAGE );
  
        // },

      });
    }
  );
  