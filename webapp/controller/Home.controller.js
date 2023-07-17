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

        //this.getOwnerComponent().setModel();

        // this.byId("grDateInput").setDateValue(new Date());
      },

      onPressNext: async function () {
        console.log("onPressNext");
        console.log(this.byId("soInput").getValue());
        this.getModel("home").setProperty("/so", this.byId("soInput").getValue().trim());

        this.oRouter.navTo("item");
      },
      
      onChange: async function(){
          console.log("onChange");
      },

      

      onLiveChange: async function(oEvent){
        console.log("onLiveChange");
        // console.log(oEvent.getSource().getValue().trim());

        
        this.getModel("home").setProperty("/f4_so_list", null);
        // console.log(this.getModel("home").setProperty("/busy"));
        // console.log(this.getModel("home").setProperty("/f4_so_list"));
        const sValue = oEvent.getSource().getValue().trim();

        console.log(sValue);

        if(sValue){
          const oFilters = new Array();
          console.log(oFilters);
          
          const oFilter = new sap.ui.model.Filter({
            path: "VBELN",
            operator: sap.ui.model.FilterOperator.StartsWith,
            value1: sValue,
          });
          
          oFilters.push(oFilter);
          console.log(oFilter);
          
          const response = await new Promise((resolve, reject) => {
            this.getModel().read("/ES_F4_SO", {
              filters: [oFilters],
              success: (data) => resolve(data.results),
              // success: (data) => {console.log(data);},
              error: (err) => reject(err),
            });
          });


          this.getModel("home").setProperty("/f4_so_list", response);
          console.log(response);
          
        
        }


    },

    // onPressSave: async function (oEvent) {  //: sap.ui.base.Event
    //   console.log("Item Event : onPressSave");

    //   const aItem = this.getModel("item").getProperty("/so_item").map((i) => {
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
