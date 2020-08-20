sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("SF.SMT_FINANCE.controller.App", {
		onInit: function () {

		},
		/////////////////////Getting Diffrent Screen onClick of side tab///////////
		onItemSelect: function(oEvent){
			var oItem = oEvent.getParameter("item");
			this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
		},
		
		/////////////////////Side Bar Expanding & Collapsing ////////////////
		onSideNavButtonPress: function(){
			var oToolPage = this.byId("tntToolPage");    
			var bSideExpanded = oToolPage.getSideExpanded();
			
			this._setToggleButtonTooltip(bSideExpanded);

			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
		},
		          /////// Callback for Expanding and Collapsing////////
		_setToggleButtonTooltip: function (bLarge) {
			var oToggleButton = this.byId('sideNavigationToggleButton');
			if (bLarge) {
				oToggleButton.setTooltip('Large Size Navigation');
			} else {
				oToggleButton.setTooltip('Small Size Navigation');
			}
		},
	
	/////////////////////Functionality for Combo Boxes in Salary management/////////////
	onSelectionChange:function(){
		debugger;
		var oModel1 = this.getView().getModel().getData().EmployeeDetails;
		var comboxDept = this.getView().byId("ComboBox1").getValue();
		for(var i=0; i<oModel1.length ; i++){
			if(comboxDept === oModel1[i].Department){
			var filterDeptName = new Filter ("comboxDept", FilterOperator.EQ, "SAP UI5");
			var oCombox2 = this.getView().byId("ComboBox2");
			oCombox2.getBinding("items").filter(filterDeptName);
			}
		}
	}
	// onPressItem:function(oEvent){
	// debugger;	
	// var oModel2 = this.getView().getModel().getData().EmployeeDetails;
	// var comboxEmpName = this.getView().byId("ComboBox2").getValue();
	// for(var j=0; j<oModel2.length; j++){
	// 	if 
	// }
	// }
	});
});