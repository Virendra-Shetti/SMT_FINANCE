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
		onItemSelect: function (oEvent) {
			var oItem = oEvent.getParameter("item");
			this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
		},

		/////////////////////Side Bar Expanding & Collapsing ////////////////
		onSideNavButtonPress: function () {
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

		_empname: function () {
			if (!this.empname) {
				var fragId = this.createId("myFragId");
				this.empname = new sap.ui.xmlfragment(fragId, "SF.SMT_FINANCE.Fragment.EmployeeNameFrag", this);
				this.getView().addDependent(this.empname);
			}
			return this.empname;
		},
		onSelectDept: function () {

			// var oModel1 = this.getOwnerComponent().getModel("EmpSalary");
			// oModel1.read("/EmployeeDetail",{
			// // success:function()
			// });
			this._empname().open();
		},
		onDialogClose: function () {
			this._empname().close();
		},
		//////////////////////////////get the binding path from the fragment///////////////////
		onConfirmEmp: function (oEvent) {
			debugger;

			var oPath = oEvent.getParameter("selectedItem").getBindingContextPath();
			this.getView().byId("idObjectPLay").bindElement("EmpSalary>" + oPath);

			var EmpBasicSal = this.getView().byId("IdBasicSal").getValue();
			var EmpAllowance = this.getView().byId("idEmpAllow").getValue();
			var TotalSalary = Number([EmpBasicSal]) + Number([EmpAllowance]);
			this.getView().byId("idTotalSal").setValue(TotalSalary);
		},

		onChangeLop: function () {
			debugger;
			var lopDeduct = this.getView().byId("idLopDed").getValue();
			var tSalaryVal = this.getView().byId("idTotalSal").getValue();
			var tSalary = Number([tSalaryVal]) - Number([lopDeduct]);
			this.getView().byId("idTotalSal").setValue(tSalary);
			// this.getView().byId("idLopDed").setValue(" ");

			//if(lopDeduct === " "){
			//	var minusLop = Number([tSalary])-Number([lopDeduct]);
			//	this.getView().byId("idTotalSal").setValue(minusLop);
			//}

		},
		onChangeOt: function () {
			debugger;
			var empOt = this.getView().byId("idOt").getValue();
			var tSalaryVal = this.getView().byId("idTotalSal").getValue();
			var tSalary = Number([tSalaryVal]) + Number([empOt]);
			this.getView().byId("idTotalSal").setValue(tSalary);

			// this.getView().byId("idOt").setValue(" ");
		},

		onPressClear: function () {
			this.getView().byId("idLopDed").setValue(" ");
			this.getView().byId("idOt").setValue(" ");
		},
		EmpSal: [],
		onPressSubmit: function () {
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

			// this.getView().byId("idLopDed").setValue(" ");
			// 	this.getView().byId("idOt").setValue(" ");

			var oEnrty = {};
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
			oEnrty.Year = year;
			// var ODataModel = new sap.ui.model.odata.ODataModel( "../localService/mockdata");

			var oModel1 = this.getView().getModel("EmpSalary").getProperty("/EmployeeDetail");
			for (var i = 0; i < oModel1.length; i++) {
				if (EmpployeeId === oModel1[i].EmpId && months === oModel1[i].Month && year === oModel1[i].Year) {
					MessageToast.show("Already Paid");
				}
				if(Standdays==="" || WorkedDays===""){
					this.getView().byId("idStandDays").setValueState("Error");
					this.getView().byId("idWorkeddays").setValueState("Error");
				}
				else {
					oModel1.push(oEnrty);
					this.getView().getModel("EmpSalary").setProperty("/EmployeeDetail", oModel1);
					MessageToast.show("Salary has been Updated To the Database");
					// this.getView().byId("idLopDed").setValue("");
					// this.getView().byId("idOt").setValue("");
					// this.getView().byId("idStandDays").setValue("");
					// this.getView().byId("idWorkeddays").setValue("");
					// this.getView().byId("idLopSal").setValue("");
					// this.getView().byId("idNightshift").setValue("");
					this.getView().byId("idStandDays").setValueState("Error");
					this.getView().byId("idWorkeddays").setValueState("Error");
					break;
				}

			}
		},
		onSubmitLive: function () {
			debugger;
			this.getView().byId("idStandDays").setValueState("None");
			// this.getView().byId("idWorkeddays").setValueState("None");

		},
		onSubmitLive1: function () {
			debugger;
			// this.getView().byId("idStandDays").setValueState("None");
			this.getView().byId("idWorkeddays").setValueState("None");

		},
		// removeDuplicates: function(array) {
		// var oModel1 = this.getView().getModel("EmpSalary").getProperty("/EmployeeDetail");
		// 	oModel1.splice(0, oModel1.length, ...(new Set(oModel1)))
		// },
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

		onSearchName: function (oEvent) {

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
		},

		onSelectionChange: function () {
			debugger;
			// var oModel1 = this.getView().getModel().getData().EmployeeDetails;
			var oModel1 = this.getOwnerComponent().getModel("EmpSalary");
			oModel1.read("/EmployeeDetail", {});

			// var oModel1 = this.getModel("EmpSalary");
			var comboxDept = this.getView().byId("ComboBox1").getValue();
			for (var i = 0; i < oModel1.length; i++) {
				if (comboxDept === oModel1[i].Department) {
					var filterDeptName = new Filter("comboxDept", FilterOperator.EQ, "SAP UI5");
					var oCombox2 = this.getView().byId("ComboBox2");
					oCombox2.getBinding("items").filter(filterDeptName);
				}
			}
		},

		////////////////////////////Employee DB Functionality////////////////////////////////
		onSearch: function (oEv) {
			debugger;
			var searchStr = oEv.getParameter("query");
			if (!searchStr) {
				searchStr = oEv.getParameter("newValue");
			}
			var oFilterName = new Filter("EmpId", FilterOperator.Contains, searchStr);
			var oFilterId = new Filter("EmpName", FilterOperator.Contains, searchStr);
			var oFilterDes = new Filter("Designation", FilterOperator.Contains, searchStr);
			var oFilter = new sap.ui.model.Filter({
				filters: [oFilterName, oFilterId, oFilterDes],
				and: false
			});
			var aFilter = oFilter;
			var oList = this.getView().byId("myEmpTbl");
			oList.getBinding("items").filter(aFilter);
		},

		//////////////////////Year Wise Sorting///////////////////////////////////
		onGetValue: function () {
			debugger;
			var dropYearValue = this.getView().byId("idComboYear").getValue();
			// var oModel1 = this.getOwnerComponent().getModel("EmpSalary");
			var oModel1 = this.getView().getModel("EmpSalary").getProperty("/EmployeeDetail");
			for (var i = 0; i < oModel1.length; i++) {
				if (dropYearValue === oModel1[i].Year) {
					var oFilterTeamName = new sap.ui.model.Filter("Year", sap.ui.model.FilterOperator.Contains, dropYearValue);
					var oList = this.getView().byId("myEmpTbl");
					oList.getBinding("items").filter(oFilterTeamName);
				}
			}
			// var that = this;
			// oModel1.read("/EmployeeDetail", {
			// 	success: function (odata) {
			// 		debugger;
			// 		var reqLeng = odata.results;
			// 		// var jModel = new JSONModel(odata.results);
			// 		for (var i = 0; i < reqLeng.length; i++) {
			// 			if (dropYearValue === reqLeng[i].Year) {
			// 				var oFilterTeamName = new sap.ui.model.Filter("Year", sap.ui.model.FilterOperator.Contains, dropYearValue);
			// 				var oList = that.getView().byId("myEmpTbl");
			// 				oList.getBinding("items").filter(oFilterTeamName);
			// 			}
			// 		}
			// 	}
			// });
		},
		onGetValue1: function () {
			debugger;
			var dropMonthValue = this.getView().byId("idComboMonth").getValue();
			var oModel2 = this.getView().getModel("EmpSalary").getProperty("/EmployeeDetail");
			for (var i = 0; i < oModel2.length; i++) {
				if (dropMonthValue == oModel2[i].Month) {
					var oFilterTeamName = new sap.ui.model.Filter("Month", sap.ui.model.FilterOperator.Contains, dropMonthValue);
					var oList = this.getView().byId("myEmpTbl");
					oList.getBinding("items").filter(oFilterTeamName);
				}
			}
			// var oModel1 = this.getOwnerComponent().getModel("EmpSalary");
			// var that = this;
			// oModel1.read("/EmployeeDetail", {
			// 	success: function (odata) {
			// 		debugger;
			// 		var reqLeng = odata.results;
			// 		// var jModel = new JSONModel(odata.results);
			// 		for (var i = 0; i < reqLeng.length; i++) {
			// 			if (dropMonthValue === reqLeng[i].Month) {
			// 				var oFilterTeamName = new sap.ui.model.Filter("Month", sap.ui.model.FilterOperator.Contains, dropMonthValue);
			// 				var oList = that.getView().byId("myEmpTbl");
			// 				oList.getBinding("items").filter(oFilterTeamName);
			// 			}
			// 		}
			// 	}
			// });
		},

		_onSalListPress1: function (sPath) {
			debugger;
			// var oButton = oEv.getSource();
			if (!this.oPop) {
				var oId = this.createId("myFragId1");
				this.oPop = new sap.ui.xmlfragment(oId, "SF.SMT_FINANCE.Fragment.DetailSal", this);
				this.getView().addDependent(this.oPop);

				var inputform = sap.ui.core.Fragment.byId(oId, "mySimpleForm1");
				inputform.bindElement({
					path: sPath,
					model: "EmpSalary"
				});
			} else {
				var oId1 = this.createId("myFragId1");
				var inputform2 = sap.ui.core.Fragment.byId(oId1, "mySimpleForm1");
				inputform2.bindElement({
					path: sPath,
					model: "EmpSalary"
				});
			}
			this.oPop.open();
		},

		onSalListPress: function (OEv) {
			debugger;
			this.sPath = OEv.getParameter("listItem").getBindingContextPath("EmpSalary");
			this._onSalListPress1(this.sPath).open();
		},
		onCloseDetSalFrag: function () {
			debugger;
			this.oPop.close();
		}

	});
});