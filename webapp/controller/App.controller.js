sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast"
], function (Controller, Filter, FilterOperator, MessageToast) {
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
	
	/////////////////////Fragment for employee Names and thier details/////////////

	_empname:function(){
	if(!this.empname){
		var fragId = this.createId("myFragId");
		this.empname = new sap.ui.xmlfragment(fragId, "SF.SMT_FINANCE.Fragment.EmployeeNameFrag", this);
		this.getView().addDependent(this.empname);
	}
	return this.empname;
	},
	onSelectDept:function(){
			
		// var oModel1 = this.getOwnerComponent().getModel("EmpSalary");
		// oModel1.read("/EmployeeDetail",{
		// // success:function()
		// });
		this._empname().open();
	},
	onDialogClose:function(){
		this._empname().close();
	},
	 //////////////////////////////get the binding path from the fragment///////////////////
	onConfirmEmp:function(oEvent){
		debugger;

	var oPath = oEvent.getParameter("selectedItem").getBindingContextPath();
     this.getView().byId("idObjectPLay").bindElement("EmpSalary>"+oPath);
     
     var EmpBasicSal = this.getView().byId("IdBasicSal").getValue();
     var EmpAllowance = this.getView().byId("idEmpAllow").getValue();
     var TotalSalary = Number([EmpBasicSal])+ Number([EmpAllowance]);
     this.getView().byId("idTotalSal").setValue(TotalSalary);
	},
	
	onChangeLop:function(){
		debugger;
	 var lopDeduct = this.getView().byId("idLopDed").getValue();
	 var tSalaryVal =  this.getView().byId("idTotalSal").getValue();
	 var tSalary = Number([tSalaryVal]) - Number([lopDeduct]);
	 this.getView().byId("idTotalSal").setValue(tSalary);
	 	// this.getView().byId("idLopDed").setValue(" ");
	 
	 //if(lopDeduct === " "){
	 //	var minusLop = Number([tSalary])-Number([lopDeduct]);
	 //	this.getView().byId("idTotalSal").setValue(minusLop);
	 //}
	
	},
	onChangeOt:function(){
		debugger;
     var empOt = this.getView().byId("idOt").getValue();
     var tSalaryVal =  this.getView().byId("idTotalSal").getValue();
	 var tSalary = Number([tSalaryVal]) + Number([empOt]);
	 this.getView().byId("idTotalSal").setValue(tSalary);
	 
	// this.getView().byId("idOt").setValue(" ");
	},
	
	onPressClear:function(){
	  this.getView().byId("idLopDed").setValue(" ");
	 this.getView().byId("idOt").setValue(" ");
	},
	onPressSubmit:function(){
		debugger;
	    
	    var EmpployeeId = this.getView().byId("idEmpid").getText();
	   	var EmpName = this.getView().byId("idEmpName").getText();
	   	var EmpDesign = this.getView().byId("idEmpDesign").getText();
		var EmppanNum = this.getView().byId("idEmpPhone").getText();
		var EmpBankName = this.getView().byId("idBankName").getValue();
		var EmpBankAc = this.getView().byId("idBankAc").getValue();
		var EmpBankIFSC = this.getView().byId("idIFSC").getValue();
		var Standdays = this.getView().byId("idStandDays").getValue();
		var WorkedDays = this.getView().byId("idWorkeddays").getValue();
	    var empLopDays = this.getView().byId("idLopSal").getValue();
		var empOTHrs = this.getView().byId("idNightshift").getValue();
		
		var empBasicSalary = this.getView().byId("IdBasicSal").getValue();
		var empAllow = this.getView().byId("idEmpAllow").getValue();
		var empLopDeduct = this.getView().byId("idLopDed").getValue();
		var empOTsal = this.getView().byId("idOt").getValue();
		var empTSalary = this.getView().byId("idTotalSal").getValue();
		var months = this.getView().byId("monthCombo").getValue();
		var year = this.getView().byId("yearCombo").getValue();
		
			this.getView().byId("idLopDed").setValue(" ");
				this.getView().byId("idOt").setValue(" ");
		
		var oEnrty ={};
		oEnrty.EmpId = EmpployeeId;
		oEnrty.EmpName = EmpName;
		oEnrty.phoneNumber = EmppanNum;
		oEnrty.BasicSalary = empBasicSalary;
		oEnrty.Allowance = empAllow;
	    oEnrty.StandardDays = Standdays;
		oEnrty.WorkedDays = WorkedDays;
	    oEnrty.LOP = empLopDays;
		oEnrty.nightShift = empOTHrs;
		oEnrty.Designation = EmpDesign;
	    // oEnrty.Department = EmpName;
	     oEnrty.BankName = EmpBankName;
	      oEnrty.BankACNO = EmpBankAc;
	       oEnrty.PANNo = EmpName;
	        oEnrty.LOPDeduction = empLopDeduct;
	         oEnrty.NightShiftPay = empOTsal;
	          oEnrty.IFSCCode = EmpBankIFSC;
	           oEnrty.totalSalary = empTSalary;
	            oEnrty.Month = months;
	             oEnrty.year = year;
	    // var ODataModel = new sap.ui.model.odata.ODataModel( "../localService/mockdata");
        
	   var oModel1 = this.getOwnerComponent().getModel("EmpSalary");
			oModel1.update("/EmployeeDetail('" + EmpployeeId + "')", oEnrty, {
					method: "PUT",
					success: function (odata) {
						debugger;
						MessageToast.show("Updated Successfully");
					},
					Error: function () {
						debugger;
						MessageToast.show("Updated Failed");
					}
				});
	},
	// onSearchName:function(oEvent){
	// 	debugger;
	// 	var selectId = this.createId("myFragId");
	// 	var FinEmpName = oEvent.getParameter("query");
	// 	var oFilterEmpName = new Filter("EmpName", FilterOperator.Contains, FinEmpName);
	// 	var oFilter = new Filter({
	// 		filters: [oFilterEmpName]
	// 	});
	// 	var aFilter = oFilter;
	// 	var oListEmpName = sap.ui.core.Fragment.byId(selectId, "idSelectDialog");
	// 	oListEmpName.getBinding("items").filter(aFilter);
	// },
	
	onSearchName : function (oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("EmpName", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var selectId = this.createId("myFragId");
			var oList = sap.ui.core.Fragment.byId(selectId, "idSelectDialog");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}

	});
});