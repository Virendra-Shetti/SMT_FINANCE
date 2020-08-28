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
		
	onAfterRendering:function(){
		debugger;
		 var managData = this.getOwnerComponent().getComponentData().startupParameters;
       //var obj=this.getOwnerComponent().getComponentData().startupParameters;
       var reviedData = JSON.parse(managData.semanticData);
       

// this.getView().byId("idEmpid").setText(reviedData.empId);
// this.getView().byId("idStandDays").setValue(reviedData.Standarddays);
// this.getView().byId("idWorkeddays").setValue(reviedData.workeddays);
// this.getView().byId("idLopSal").setValue(reviedData.OvertimeHrs);
// this.getView().byId("idNightshift").setValue(reviedData.LOP);

var oModel= new sap.ui.model.json.JSONModel();
this.getView().setModel(oModel,"daysModel");
this.getView().getModel("daysModel").setProperty("/Employee",reviedData );
// // sap.m.MessageToast.show(employeeObj.workedDays);
       
// 	var salManagEmpId = this.getView().byId("idEmpid").getText();
	
// var oModel5= this.getView().getModel("daysModel").getProperty("/Employee");
//     for(var k=0; k<oModel5.lenght; k++){
// 	if(salManagEmpId == oModel5[k].empId){
// 			var formObj=this.getView().byId("myForm");
//           formObj.bindElement("daysModel>/Employee");
// 	}

// }

	},
		
		// olistArr:[],
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
		
			var objectPEmpId = this.getView().byId("idEmpid").getText();
			 var oModelData = this.getView().getModel("daysModel").getProperty("/Employee");
              //for(var k=0; k<oModelData.length; k++){
              	if(objectPEmpId == oModelData.empId){
//               	this.getView().byId("idStandDays").setValue(oModelData.Standarddays);
// this.getView().byId("idWorkeddays").setValue(oModelData.workeddays);
// this.getView().byId("idLopSal").setValue(oModelData.OvertimeHrs);
// this.getView().byId("idNightshift").setValue(oModelData.LOP);	
              	var formObj=this.getView().byId("myForm");
          formObj.bindElement("daysModel>/Employee");
              	}else{
              		MessageToast.show("Error,get the attendence detail of selected Employee from Management");
              	}
              
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
			// for(var j=0; j<oModel1.length; j++){
			// 	if(EmpployeeId == oModel1[j].EmpId){
			// 			if(oModel1.includes(months) && oModel1.includes(year)){
			// 	MessageToast.show("Already Paid");
			// }else{
			// 		oModel1.push(oEnrty);
			// 		this.getView().getModel("EmpSalary").setProperty("/EmployeeDetail", oModel1);
			// 		MessageToast.show("Salary has been Updated To the Database");
			// }
			// 	}
			
			// }
			
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
		olistArr:[],
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
					this.olistArr.push(oList);
					
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
			// for(var i =0; i <this.olistArr.length; i++){
			// if (dropMonthValue == this.olistArr[i].Month) {
			// var oFilterTeamName = new sap.ui.model.Filter("Month", sap.ui.model.FilterOperator.Contains, dropMonthValue);
			// var oList = this.getView().byId("myEmpTbl");
			// oList.getBinding("items").filter(oFilterTeamName);
			// // 	}	
			// }
			// }
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
		},
		_empSalDownDetail: function (sPath) {
			if (!this.oDialog) {
				var oId = this.createId("myEmpSalId");
				this.oDialog = new sap.ui.xmlfragment(oId, "SF.SMT_FINANCE.Fragment.paySlipDetailFrag", this);
				this.getView().addDependent(this.oDialog);
					var inputform = sap.ui.core.Fragment.byId(oId, "idPayForm1");
				inputform.bindElement({
					path: sPath,
					model: "EmpSalary"
				});
			// 	// 	var inputform2 = sap.ui.core.Fragment.byId(oId, "idPayForm2");
			// 	// inputform2.bindElement({
			// 	// 	path: oTableEmpSal,
			// 	// 	model: "EmpSalary"
			// 	// });
			}else{
					var oId1 = this.createId("myEmpSalId");
				var inputform3 = sap.ui.core.Fragment.byId(oId1, "idPayForm1");
				inputform3.bindElement({
					path: sPath,
					model: "EmpSalary"
				});
				// 	var inputform4 = sap.ui.core.Fragment.byId(oId, "idPayForm2");
				// inputform4.bindElement({
				// 	path: oTableEmpSal,
				// 	model: "EmpSalary"
				// });
			}
		this.oDialog.open();
		},
		onPressEmpSal:function(oEvent){
			debugger;
		this.sPath = oEvent.getParameter("listItem").getBindingContextPath("EmpSalary");
		this._empSalDownDetail(this.sPath).open();
		var oTable = this.getView().byId("idEmpTable");
		oTable.setEnable(false);
		// this.onGetPdf(oTableEmpSal);
		},
		onPressClose:function(){
		this.oDialog.close();	
		},
		
		onPressDownload:function(){
			debugger;	
		var payId = this.createId("myEmpSalId");
	var payEmpId = sap.ui.core.Fragment.byId(payId,"idPay1").getText();
	var payEmpName =sap.ui.core.Fragment.byId(payId,"idPay2").getText();
	var payStandDays =sap.ui.core.Fragment.byId(payId,"idPay3").getText();
	var payWorkedDays =sap.ui.core.Fragment.byId(payId,"idPay4").getText();
	var payEmpDesign = sap.ui.core.Fragment.byId(payId,"idPay5").getText();
	var payEmpBnkName = sap.ui.core.Fragment.byId(payId,"idPay6").getText();
	var payEmpBankAC =sap.ui.core.Fragment.byId(payId,"idPay7").getText();
	var payPanCard = sap.ui.core.Fragment.byId(payId,"idPay8").getText();
	var payCurMonth = sap.ui.core.Fragment.byId(payId,"idPay9").getText();
	var payCurYaer = sap.ui.core.Fragment.byId(payId,"idPay10").getText();
	var EmpLOPDays = sap.ui.core.Fragment.byId(payId,"idPay11").getText();
	var EmpOThrs  = sap.ui.core.Fragment.byId(payId,"idPay12").getText();
	
	var payBasicSal = sap.ui.core.Fragment.byId(payId,"idPay13").getText();
	var payAllow = sap.ui.core.Fragment.byId(payId,"idPay14").getText();
	var payAmtDeduc = sap.ui.core.Fragment.byId(payId,"idPay15").getText();
				
	var payOTPay = sap.ui.core.Fragment.byId(payId,"idPay16").getText();
	var payTSal = sap.ui.core.Fragment.byId(payId,"idPay17").getText();
	// var payTSal = sap.ui.core.Fragment.byId(payId,"idPay11").getText();
	var EmpTotalSal = Number([payBasicSal]) + Number([payOTPay]) + Number([payAllow]);
	var tSalstring = EmpTotalSal.toString();
		
var doc = new jsPDF()

var imgData="data:image/jpeg;base64,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";
// doc.addImage('https://www.allindiajobs.in/wp-content/uploads/2018/11/signiwis.jpg')
doc.addImage(imgData, 'JPEG', 6, 6, 38, 22);

doc.setFontSize(18);
doc.setFont('times');
doc.setFontType('bold');
doc.text(65,16, 'Signiwis Technologies Private Limited');
doc.setFontSize(10);
doc.text(50,23,'579, 3rd Floor, MG Complex, Above PMC Bank, Rajajinagar Bengaluru, Karnataka 560010');
doc.text(65,36,'PAY SLIP FOR THE MONTH OF AUGUST, 2020');
doc.setFontSize(10);
doc.text(6,48,'Employee Id');
doc.text(46,48,payEmpId);
doc.text(6,58,'Employee Name');
doc.text(46,58, payEmpName);
doc.text(6,68,'Standard Days');
doc.text(46,68,payStandDays);
doc.text(6,78,'Worked Days');
doc.text(46,78,payWorkedDays);
doc.text(96,48,'Designation');
doc.text(136,48,payEmpDesign);
doc.text(96,58,'Bank Name');
doc.text(136,58,payEmpBnkName);
doc.text(96,68,'Account Number');
doc.text(136,68,payEmpBankAC);
doc.text(96,78,'LOP in days');
doc.text(136,78,EmpLOPDays);
doc.text(6,88,'Location');
doc.text(46,88,'Bangaluru');
doc.text(96,88,'PAN Number');
doc.text(136,88,payPanCard);
doc.text(10,108,'Earnings');
doc.text(6,118,'Basic Salary');
doc.text(46,118,payBasicSal);
doc.text(6,128,'Allowance');
doc.text(46,128,payAllow);
doc.text(6,138,'Night Shift/OT');
doc.text(46,138,payOTPay);
doc.text(60,108,'Amount');
doc.text(104,108,'Deductions');
doc.text(96,118,'LOP Deduction');
doc.text(136,118,payAmtDeduc);
doc.text(96,128,'Service Tax');
doc.text(148,108,'Amount');
doc.text(6,148,'Total Earnings');
doc.text(46,148,tSalstring);
doc.text(96,148,'Total Deduction');
doc.text(6,168,'Payment Method');
doc.text(150,168,'Bank Transfer-HDFC Bank');
doc.text(6,180,'Net Pay(Total Earnings-Total Deductions)');
doc.text(76,180, payTSal);
doc.text(6,190,'In Words');
doc.setFontSize(8);
doc.setFontType('bolditalic');
doc.text(28,196,'"This is system generated payslip does not require signature and the salary will be credited to respective account within 48 hours"');




// horizontal line
doc.line(5, 30, 205, 30);//Below Pic Line
doc.line(5, 40, 205, 40);
doc.line(5, 52, 205, 52);
doc.line(5, 62, 205, 62);
doc.line(5, 72, 205, 72);
doc.line(5, 82, 205, 82);
doc.line(5, 92, 205, 92);
doc.line(5, 102, 205, 102);
doc.line(5, 112, 205, 112);
doc.line(5, 122, 205, 122);
doc.line(5, 132, 205, 132);
doc.line(5, 142, 205, 142);
doc.line(5, 152, 205, 152);
doc.line(5, 162, 205, 162);
doc.line(5, 172, 205, 172);
doc.line(5, 182, 205, 182);
doc.line(5, 192, 205, 192);
doc.line(5, 198, 205, 198);

////Outline Border Line
doc.setLineWidth(0.8);
doc.line(5, 5, 205, 5);
doc.line(5, 290, 5, 5);
doc.line(5, 290, 205, 290);
doc.line(205, 5, 205, 290);


// vertical line
doc.setLineWidth(0.1);
doc.line(45, 5, 45, 30);//Pic Line
doc.line(45, 40, 45, 92);//First Table Column Lines
doc.line(95, 40, 95, 92);
doc.line(135, 40, 135, 92);
doc.line(45, 102, 45, 152);//Second Table Column Lines
doc.line(95, 102, 95, 152);
doc.line(135, 102, 135, 132);
doc.line(135, 142, 135, 152);
doc.line(45, 162, 45, 172);
doc.line(75, 172, 75, 192);



doc.save("pay slip");
},

onSearchEmp:function(oEvent){
	debugger;
	var searchStr = oEvent.getParameter("query");
			if (!searchStr) {
				searchStr = oEvent.getParameter("newValue");
			}
			var oFilterName = new Filter("EmpId", FilterOperator.Contains, searchStr);
			var oFilterId = new Filter("EmpName", FilterOperator.Contains, searchStr);
			var oFilterDes = new Filter("Designation", FilterOperator.Contains, searchStr);
			var oFilter = new sap.ui.model.Filter({
				filters: [oFilterName, oFilterId, oFilterDes],
				and: false
			});
			var aFilter = oFilter;
			var oList = this.getView().byId("idEmpTable");
			oList.getBinding("items").filter(aFilter);
	
}
	});
});