sap.ui.define(
    ["./BaseController", 
    "sap/ui/model/json/JSONModel", 
    "sap/ui/core/ValueState"],
   function (BaseController, JSONModel, ValueState) {
     "use strict";
 
     return BaseController.extend("sap.nexus.zdemo.controller.Detail", {
       onInit: function () {
         this.oRouter = this.getRouter();
         this.oRouter.getRoute("Detail").attachPatternMatched(this.routePatternMatchedDetail, this);
 
         this.setModel(
           new JSONModel({
             busy: false,
             delay: 0,
           }),
           "detail"
         );

         console.log("Detail Page : onInit");
        //  this.items = [
        //     {
        //       VBELN: "2100000001",
        //       POSNR: "000010",
        //       MATNR: "A",
        //       KWMENG: "10.0",
        //       VRKME: "PAC",
        //     },
        //     {
        //       VBELN: "2100000001",
        //       POSNR: "000020",
        //       MATNR: "A",
        //       KWMENG: "20.0",
        //        VRKME: "EA",
        //    },
        //    ];

       },



       routePatternMatchedDetail: async function (oEvent) {
         console.log("Detail Page : routePatternMatchedDetail");
         

         const oArguments = oEvent.getParameter("arguments");
         console.log(oArguments.vbeln);
         const items = this.getModel("item").getProperty("/list_so_item");
         
        
         const oSelected = items.find((elem) => {
           return( elem.VBELN == oArguments.vbeln && elem.POSNR == oArguments.posnr )
         });

         this.getModel("detail").setProperty("/VBELN", oSelected.VBELN);
         this.getModel("detail").setProperty("/POSNR", oSelected.POSNR);
         this.getModel("detail").setProperty("/MATNR", oSelected.MATNR);
         this.getModel("detail").setProperty("/KWMENG", oSelected.KWMENG);
         this.getModel("detail").setProperty("/VRKME", oSelected.VRKME);
       },

       onPressBack: async function () {
         console.log("Detail Event : onPressBack");

         const aItems = this.getModel("item").getProperty("/list_so_item");

         const oUpdate = aItems.find((i) => {
           return( 
             i.VBELN == this.getModel("detail").getProperty("/VBELN") && 
             i.POSNR == this.getModel("detail").getProperty("/POSNR") 
             );
         });

         oUpdate.KWMENG = this.getModel("detail").getProperty("/KWMENG"); 

         console.log(aItems);

         this.getModel("item").setProperty("/list_so_item", aItems);

         window.history.go(-1);
       },
     });
   }
 );
 