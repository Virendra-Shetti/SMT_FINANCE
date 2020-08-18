sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("SF.SMT_FINANCE.controller.App", {
		onInit: function () {

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
		}
		//////////////////////////////////////////////////////////////////////////////////
	});
});