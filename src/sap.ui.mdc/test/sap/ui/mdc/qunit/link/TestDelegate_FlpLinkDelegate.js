/*!
 * ${copyright}
 */
sap.ui.define([
	"sap/ui/mdc/flp/FlpLinkDelegate",
	"sap/ui/mdc/link/LinkItem",
	"sap/ui/mdc/link/Log"
], function(FlpLinkDelegate, LinkItem, Log) {
	"use strict";

	const SampleLinkDelegate = Object.assign({}, FlpLinkDelegate);

	SampleLinkDelegate.fetchLinkItems = function(oLink, oBindingContext, oInfoLog) {
		const oPayload = oLink.getPayload();
		let aItemsToReturn = [
			new LinkItem({
				key: "item00",
				href: "#Action00",
				text: "item 00"
			})
		];
		const oContextObject = oBindingContext ? oBindingContext.getObject(oBindingContext.getPath()) : undefined;
		if (oInfoLog) {
			oInfoLog.initialize(FlpLinkDelegate._getSemanticObjects(oPayload));
			aItemsToReturn.forEach(function(oItem) {
				oInfoLog.addIntent(Log.IntentType.API, {
					text: oItem.getText(),
					intent: oItem.getHref()
				});
			});
		}
		const oSemanticAttributes = FlpLinkDelegate._calculateSemanticAttributes(oContextObject, oPayload, oInfoLog);
		return FlpLinkDelegate._retrieveNavigationTargets("", oSemanticAttributes, oPayload, oInfoLog).then(function(aLinks, oOwnNavigationLink) {
			aItemsToReturn = aItemsToReturn.concat(aLinks);
			return Promise.resolve(aItemsToReturn);
		});
	};

	return SampleLinkDelegate;
});
