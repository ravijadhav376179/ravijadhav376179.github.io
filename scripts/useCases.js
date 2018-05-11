function createUseCaseView(state) {
	console.log("createUseCaseView state: ", state);
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	if (state) {

		function createContents(step) {

			if (step.useCase) {

				if (step.useCase instanceof Array) {

					var useCaseArray = step.useCase;

					useCaseArray.forEach(function(useCase) {

						var tempStep = jQuery.extend({}, step);
						tempStep.useCase = useCase;
						var pos = {
								x : (tempStep.link.x1 + tempStep.useCase.link.x),
								y : (tempStep.link.y1 + tempStep.useCase.link.y)
							};
							var cCanvas = flowCanvas
									.append("g")
									.attr("class", "useCases")
									.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
							var useCaseImage = cCanvas.append("image").attr("width", "40px")
									.attr("height", "40px").attr("x", 0).attr("y", 0).attr(
											"xlink:href",
											getUseCaseAttributes(tempStep.useCase.name).image)
									.style("cursor", "pointer");

							useCaseImage.on("click", function() {
								createUseCaseOptionMenu(tempStep);
							});

					});
				}
				else {

					var pos = {
							x : (step.link.x1 + step.useCase.link.x),
							y : (step.link.y1 + step.useCase.link.y)
						};
						var cCanvas = flowCanvas
								.append("g")
								.attr("class", "useCases")
								.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
						var useCaseImage = cCanvas.append("image").attr("width", "40px")
								.attr("height", "40px").attr("x", 0).attr("y", 0).attr(
										"xlink:href",
										getUseCaseAttributes(step.useCase.name).image)
								.style("cursor", "pointer");

						useCaseImage.on("click", function() {
							createUseCaseOptionMenu(step);
						});
				}

				flowCanvas.selectAll("g.deploymentsCasesText").remove();
			}
		}

		var crumbs = bCrumbs();
		var model = crumbs[crumbs.length - 1].model;

		$.each(model.p2pObject, function(p, step) {

			if (step.useCase) {

				createContents(step);
			}

			if (step.linked) {
				$.each(step.linked, function(l, linkObj) {
					linkObj.p2pObject[0].startPos = {
						x : step.link.x1,
						y : step.link.y1
					};
					linkObj.p2pObject[0].linkStart = true;
					linkObj.p2pObject = generateProgressiveLinkPosition(
							linkObj.p2pObject, linkObj.stepName, {
								x : step.link.x1,
								y : step.link.y1
							}, linkObj.flowDir);

					$.each(linkObj.p2pObject, function(p, linkedStep) {
						if (linkedStep.useCase) {
							createContents(linkedStep);
						}

						if (linkedStep.levels) {
							linkedStep.levels.forEach(function(level) {
								if (level.p2pObject[1].useCase) {
									createContents(level.p2pObject[1]);
								}
							});
						}
					});
				})
			}
			if (step.levels) {
				step.levels.forEach(function(level) {
					level.p2pObject.forEach(function(p2pObject) {
						if (p2pObject.useCase) {
							createContents(p2pObject);
						}
					});
				});
			}
		});
	} else {
		flowCanvas.selectAll("defs#gradient").remove();
		flowCanvas.selectAll("g.useCases").remove();
		flowCanvas.selectAll("g.useCaseOptions").remove();
		flowCanvas.selectAll("g.useCaseExtended").remove();
		flowCanvas.selectAll("g.deploymentsCasesText").remove();
	}
}

// ------------------------------ Deployments View --------------------------//

function createDeploymentsView(state) {
	console.log("createDeploymentsView state: ", state);
		var mapContainer = d3.select("div#mapContainer");
		var svg = mapContainer.select("svg");
		var flowCanvas = svg.select("g#flowCanvas");

		if (state) {

			function createContents(step) {

				if (step.deploymentsCase) {

					if (step.deploymentsCase instanceof Array) {

						var useCaseArray = step.deploymentsCase;

						useCaseArray.forEach(function(useCase) {

							var tempStep = jQuery.extend({}, step);
							tempStep.deploymentsCase = useCase;
							var pos = {
								x : (step.link.x1 + step.deploymentsCase.link.x),
								y : (step.link.y1 + step.deploymentsCase.link.y)
							};
							var cCanvas = flowCanvas
									.append("g")
									.attr("class", "deploymentsCases")
									.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
							var deploymentsCaseImage = cCanvas.append("image").attr("width", "40px")
									.attr("height", "40px").attr("x", 0).attr("y", 0).attr(
											"xlink:href",
											getUseCaseAttributes(step.deploymentsCase.name).image)
									.style("cursor", "pointer");

							deploymentsCaseImage.on("click", function() {
								createDeploymentsCaseOptionMenu(step);
							});
						});
					}
					else {
						var pos = {
								x : (step.link.x1 + step.deploymentsCase.link.x),
								y : (step.link.y1 + step.deploymentsCase.link.y)
							};
							var cCanvas = flowCanvas
									.append("g")
									.attr("class", "deploymentsCases")
									.attr("transform", "translate(" + pos.x + "," + pos.y + ")");
							var deploymentsCaseImage = cCanvas.append("image").attr("width", "40px")
									.attr("height", "40px").attr("x", 0).attr("y", 0).attr(
											"xlink:href",
											getUseCaseAttributes(step.deploymentsCase.name).image)
									.style("cursor", "pointer");

							deploymentsCaseImage.on("click", function() {
								createDeploymentsCaseOptionMenu(step);
							});
					}
				}
			}

			var crumbs = bCrumbs();
			var model = crumbs[crumbs.length - 1].model;

			var TCanvas = flowCanvas
									.append("g")
									.attr("class", "deploymentsCasesText")
									.attr("transform", "translate(80,400)");

						var deploymentsCaseImage = TCanvas.append("text")
									         .attr("x", 0)
													 .attr("y", 10)
													 .attr("text-anchor","middle")
													 .style("font-size","14px")
													 .attr("fill","#229954")
													 .style("font-weight","bold")
													 .style("fill-opacity",1)
													 .text(model.labelView);

			$.each(model.p2pObject, function(p, step) {
				if (step.deploymentsCase) {
					createContents(step);
				}
				if (step.linked) {
					$.each(step.linked, function(l, linkObj) {
						linkObj.p2pObject[0].startPos = {
							x : step.link.x1,
							y : step.link.y1
						};
						linkObj.p2pObject[0].linkStart = true;
						linkObj.p2pObject = generateProgressiveLinkPosition(
								linkObj.p2pObject, linkObj.stepName, {
									x : step.link.x1,
									y : step.link.y1
								}, linkObj.flowDir);

						$.each(linkObj.p2pObject, function(p, linkedStep) {
							if (linkedStep.deploymentsCase) {
								createContents(linkedStep);
							}
							if (linkedStep.levels) {

								linkedStep.levels.forEach(function(level) {
									if (level.p2pObject[1].deploymentsCase) {
										createContents(level.p2pObject[1]);
									}
								});
							}
						});
					})
				}
				if (step.levels) {
					step.levels.forEach(function(level) {
						level.p2pObject.forEach(function(p2pObject) {
								if (p2pObject.deploymentsCase) {
									createContents(p2pObject);
								}
						});
					});
				}
			});
		} else {
			flowCanvas.selectAll("defs#gradient").remove();
			flowCanvas.selectAll("g.deploymentsCases").remove();
			flowCanvas.selectAll("g.useCaseOptions").remove();
			flowCanvas.selectAll("g.useCaseExtended").remove();
		}
	}

// --------------------- End of Deployments View -------------------------//


function createUseCaseOptionMenu(step) {
	switch (step.useCase.name) {
	case "Amelia":
		createAmeliaUseCaseOptions(step);
		break;
	case "ProcureToPayPO":
		ProcureToPayPO(step);
		break;
	case "QuoteToCashPO":
		QuoteToCashPO(step);
		break;
	case "ITDesignToBuildPO":
		ITDesignToBuildPO(step);
		break;
	case "TalentPlanningAcquisitionPO":
		TalentPlanningAcquisitionPO(step);
		break;
	case "HireToRetirePO":
		HireToRetirePO(step);
		break;
	case "PlanToForecastPO":
		PlanToForecastPO(step);
		break;
	case "RecordToReportPO":
		RecordToReportPO(step);
		break;
	case "ProcureToPay6":
		ProcureToPay6(step);
		break;
	case "ProcureToPay7":
		ProcureToPay7(step);
		break;
	case "ProcureToPay41":
		ProcureToPay41(step);
		break;
	case "ProcureToPay511U":
		ProcureToPay511U(step);
		break;
	case "ProcureToPay52U":
		ProcureToPay52U(step);
		break;
	case "PlanToForecast2":
		PlanToForecast2(step);
		break;
	case "PlanToForecast22U":
		PlanToForecast22U(step);
		break;
	case "PlanToForecast5":
		PlanToForecast5(step);
		break;
	case "PlanToDelivery12":
		PlanToDelivery12(step);
		break;
	case "PlanToDelivery21":
		PlanToDelivery21(step);
		break;
	case "PlanToDelivery32":
		PlanToDelivery32(step);
		break;
	case "PlanToDelivery72":
		PlanToDelivery72(step);
		break;
	case "ITStrategyToArchitecture2U":
		ITStrategyToArchitecture2U(step);
		break;
	case "QuoteToCash42U":
		QuoteToCash42U(step);
		break;
	case "QuoteToCash51U":
		QuoteToCash51U(step);
		break;
	case "QuoteToCash6U":
		QuoteToCash6U(step);
		break;
	case "QuoteToCash72U":
		QuoteToCash72U(step);
		break;
	case "QuoteToCash2U":
		QuoteToCash2U(step);
		break;
	case "QuoteToCash1":
		QuoteToCash1(step);
		break;
	case "ItTransitionToOperationCI31U":
		ItTransitionToOperationCI31U(step);
		break;
	case "ItTransitionToOperationCI2UAmelia":
		ItTransitionToOperationCI2UAmelia(step);
		break;
	case "ItTransitionToOperationCI2U":
		ItTransitionToOperationCI2U(step);
		break;
	case "ItTransitionToOperationCI4":
		ItTransitionToOperationCI4(step);
		break;
	case "NewProductDevelopment31":
		NewProductDevelopment31(step);
		break;
	case "ProductLineManagement2":
		ProductLineManagement2(step);
		break;
	case "ProductLineManagement4U":
		ProductLineManagement4U(step);
		break;
	case "ProductLineManagement6U":
		ProductLineManagement6U(step);
		break;
	case "ProductLineManagement42":
		ProductLineManagement42(step);
		break;
	case "RecordToReport6":
		RecordToReport6(step);
		break;
	case "RecordToReport21U":
		RecordToReport21U(step);
		break;
	case "RecordToReport3U":
		RecordToReport3U(step);
		break;
	case "RecordToReport5U":
		RecordToReport5U(step);
		break;
	case "RecordToReport7U":
		RecordToReport7U(step);
		break;
	case "RecordToReport8":
		RecordToReport8(step);
		break;
	case "RecordToReport31":
		RecordToReport31(step);
		break;
	case "ProcureToPay22B":
		ProcureToPay22B(step);
		break;
	case "ProcureToPay5B":
		ProcureToPay5B(step);
		break;
	case "ProcureToPay31B":
		ProcureToPay31B(step);
		break;
	case "ProcureToPay11B":
		ProcureToPay11B(step);
		break;
	case "QuoteToCash21B":
		QuoteToCash21B(step);
		break;
	case "QuoteToCash42B":
		QuoteToCash42B(step);
		break;
	case "QuoteToCash31B":
		QuoteToCash31B(step);
		break;
	case "QuoteToCash51U2":
		QuoteToCash51U2(step);
		break;
	case "ItTransitionToOperationCI3B":
		ItTransitionToOperationCI3B(step);
		break;
	case "ItTransitionToOperationCI42B":
		ItTransitionToOperationCI42B(step);
		break;
	case "ITStrategyToArchitecture21B":
		ITStrategyToArchitecture21B(step);
		break;
	case "ItTransitionToOperationCI21":
		ItTransitionToOperationCI21(step);
		break;
	case "AssetAcquireToRetire41B":
		AssetAcquireToRetire41B(step);
		break;
	case "AssetAcquireToRetire21B":
		AssetAcquireToRetire21B(step);
		break;
	case "HireToRetire41B":
		HireToRetire41B(step);
		break;
	case "HireToRetire71B":
		HireToRetire71B(step);
		break;
	case "NewProductDevelopment21B":
		NewProductDevelopment21B(step);
		break;
	case "InnovateToCommercialization21B":
		InnovateToCommercialization21B(step);
		break;
	case "InnovateToCommercialization31B":
		InnovateToCommercialization31B(step);
		break;
	case "InnovateToCommercialization32B":
		InnovateToCommercialization32B(step);
		break;
	case "ProductLineManagement31":
		ProductLineManagement31(step);
		break;
	case "PlanToForecast71B":
		PlanToForecast71B(step);
		break;
	case "RecordToReport52B":
		RecordToReport52B(step);
		break;
	case "RecordToReport62B":
		RecordToReport62B(step);
		break;
	case "PlanToDelivery21B":
		PlanToDelivery21B(step);
		break;
	case "PlanToDelivery61B":
		PlanToDelivery61B(step);
		break;
	case "PlanToDelivery11B":
		PlanToDelivery11B(step);
		break;
	case "PlanToDelivery7B":
		PlanToDelivery7B(step);
		break;
	case "PlanToDelivery6B":
		PlanToDelivery6B(step);
		break;
	case "PlanToDelivery13B":
		PlanToDelivery13B(step);
		break;
	case "PlanToDelivery14B":
		PlanToDelivery14B(step);
		break;
	case "ProductLineManagement31B":
		ProductLineManagement31B(step);
		break;
	case "ITDesignToBuildModel4":
		ITDesignToBuildModel4(step);
		break;

		}
}

function createDeploymentsCaseOptionMenu(step) {
	switch (step.deploymentsCase.name) {
	case "Amelia":
		createAmeliaDeploymentsCaseOptions(step);
		break;
	case "ProcureToPay22":
		ProcureToPay22(step);
		break;
	case "ProcureToPay511":
		ProcureToPay511(step);
		break;
	case "ProcureToPay52":
		ProcureToPay52(step);
		break;
	case "ProcureToPay61":
		ProcureToPay61(step);
		break;
	case "PlanToForecast22":
		PlanToForecast22(step);
		break;
	case "PlanToForecast53":
		PlanToForecast53(step);
		break;
	case "PlanToForecast62":
		PlanToForecast62(step);
		break;
	case "PlanToDelivery5":
		PlanToDelivery5(step);
		break;
	case "PlanToDelivery63":
		PlanToDelivery63(step);
		break;
	case "PlanToDelivery7":
		PlanToDelivery7(step);
		break;

	case "PlanToDelivery14B":
		PlanToDelivery14B(step);
		break;

	case "PlanToDelivery2":
		PlanToDelivery2(step);
		break;

	case "ITStrategyToArchitecture2":
		ITStrategyToArchitecture2(step);
		break;
	case "QuoteToCash2":
		QuoteToCash2(step);
		break;
	case "QuoteToCash42":
		QuoteToCash42(step);
		break;
	case "QuoteToCash61":
		QuoteToCash61(step);
		break;
	case "QuoteToCash51":
		QuoteToCash51(step);
		break;
	case "QuoteToCash72":
		QuoteToCash72(step);
		break;
	case "ItTransitionToOperationCI21":
		ItTransitionToOperationCI21(step);
		break;
	case "ItTransitionToOperationCI21U":
		ItTransitionToOperationCI21U(step);
		break;
	case "ItTransitionToOperationCI31":
		ItTransitionToOperationCI31(step);
		break;
	case "ItTransitionToOperationCI3":
		ItTransitionToOperationCI3(step);
		break;
	case "HireToRetire31":
		HireToRetire31(step);
		break;
	case "HireToRetire71":
		HireToRetire71(step);
		break;
	case "AquireToRetire3D":
		AquireToRetire3D(step);
		break;
	case "AquireToRetire4U":
		AquireToRetire4U(step);
		break;
	case "NewProductDevelopment43":
		NewProductDevelopment43(step);
		break;
	case "ProductLineManagement4":
		ProductLineManagement4(step);
		break;
	case "ProductLineManagement21":
		ProductLineManagement21(step);
		break;
	case "ProductLineManagement3":
		ProductLineManagement3(step);
		break;
	case "RecordToReport2":
		RecordToReport2(step);
		break;
	case "RecordToReport5":
		RecordToReport5(step);
		break;
	case "RecordToReport41":
		RecordToReport41(step);
		break;
	case "RecordToReport7":
		RecordToReport7(step);
		break;
	case "ITDesignToBuildModel3":
		ITDesignToBuildModel3(step);
		break;
	}
}

function createAmeliaUseCaseOptions(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var gradient = svg.append("defs").append("linearGradient").attr("id",
	"gradient").attr("x1", "0%").attr("y1", "0%")
	.attr("x2", "100%").attr("y2", "100%").attr("spreadMethod",
			"pad");

gradient.append("stop").attr("offset", "0%").attr("stop-color", "#eee")
	.attr("stop-opacity", 1);

gradient.append("stop").attr("offset", "100%").attr("stop-color",
	"#ddd").attr("stop-opacity", 1);

	var pos = {
			x : (step.link.x1 + step.useCase.link.x -150),
			y : (step.link.y1 + step.useCase.link.y -50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "250px")
	.style("fill", "url(#gradient)").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("Click a Use Case to Learn More").style("fill", "#276134").style("font-weight", "600").style("font-style", "italic").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "12px");
	wrapG.append("image").attr("width", "20px").attr("height", "20px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
		flowCanvas.selectAll("g.useCaseExtended").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("image").attr("width", "60px").attr("height", "60px").attr("x", 20).attr("y", 0).attr("xlink:href", getUseCaseAttributes(step.useCase.name).image);
	var rectBox = wrapG.append("rect").attr("class", "buttons").attr("x", 90).attr("y", 15).attr("height", 30).style("fill", "#31a94b").attr("rx", 5).attr("ry", 5).style("cursor", "pointer").style("filter", "url(#drop-shadow)");
	var text = wrapG.append("text").text("Administration Rights").attr("x", 100).attr("y", 35).style("fill", "#FFF").style("font-size", "13px").style("cursor", "pointer");
	var dim = text.node().getBBox();
	rectBox.attr("width", dim.width + 20)
	wrapG.on("click", function(){
		cCanvas.selectAll("rect.buttons").style("fill", "#31a94b");
		d3.select(this).select("rect.buttons").transition().duration(300).style("fill", "#1e582b");
		var options = {
				name: "Admin Rights with Amelia",
				description: "Users can place requests with Cognitive chat bot to obtain Administrator Rights to their computer and recived access to install applications",
				successRate: "95%",
				noOfRequests: "2750"
		}
		createAmeliaUseCaseExtendedView(options, {clientX: d3.event.clientX, clientY: d3.event.clientY, pos: pos, offsetY: 30});
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,100)");
	wrapG.append("image").attr("width", "60px")	.attr("height", "60px").attr("x", 20).attr("y", 0).attr("xlink:href", getUseCaseAttributes(step.useCase.name).image);
	var rectBox = wrapG.append("rect").attr("class", "buttons").attr("x", 90).attr("y", 15).attr("height", 30).style("fill", "#31a94b").attr("rx", 5).attr("ry", 5).style("cursor", "pointer").style("filter", "url(#drop-shadow)");
	var text = wrapG.append("text").text("USB Privileges").attr("x", 100).attr("y", 35).style("fill", "#FFF").style("font-size", "13px").style("cursor", "pointer");
	var dim = text.node().getBBox();
	rectBox.attr("width", dim.width + 20)
	wrapG.on("click", function(){
		cCanvas.selectAll("rect.buttons").style("fill", "#31a94b");
		d3.select(this).select("rect.buttons").transition().duration(300).style("fill", "#1e582b");
		var options = {
				name: "USB Privileges with Amelia",
				description: "Users can place requests to obtain USB Privileges through Cognitive chat bot and recieve access to use a removeable drive for data transfer",
				successRate: "93%",
				noOfRequests: "1835"
		}
		createAmeliaUseCaseExtendedView(options, {clientX: d3.event.clientX, clientY: d3.event.clientY, pos: pos, offsetY: 100});
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,170)");
	wrapG.append("image").attr("width", "60px").attr("height", "60px").attr("x", 20).attr("y", 0).attr("xlink:href", getUseCaseAttributes(step.useCase.name).image);
	var rectBox = wrapG.append("rect").attr("class", "buttons").attr("x", 90).attr("y", 15).attr("height", 30).style("fill", "#31a94b").attr("rx", 5).attr("ry", 5).style("cursor", "pointer").style("filter", "url(#drop-shadow)");
	var text = wrapG.append("text").text("Guest WiFi").attr("x", 100).attr("y", 35).style("fill", "#FFF").style("font-size", "13px").style("cursor", "pointer");
	var dim = text.node().getBBox();
	rectBox.attr("width", dim.width + 20)
	wrapG.on("click", function(){
		cCanvas.selectAll("rect.buttons").style("fill", "#31a94b");
		d3.select(this).select("rect.buttons").transition().duration(300).style("fill", "#1e582b");
		var options = {
				name: "Guest WiFi with Amelia",
				description: "Users can place requests for guest wireless access using cognitive chat bot and recive credentials nearly instantly",
				successRate: "91%",
				noOfRequests: "4499"
		}
		createAmeliaUseCaseExtendedView(options, {clientX: d3.event.clientX, clientY: d3.event.clientY, pos: pos, offsetY: 170});
	});
}

function createAmeliaUseCaseExtendedView(options, ePos){
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	flowCanvas.selectAll("g.useCaseExtended").remove();
	var pos = {};
	var containerWidth = 250;
	var containerHeight = 350;
	var dom = getDom();
	var svgWidth = dom.width();
	var svgHeight = dom.height();
	var image = {
			w: 100,
			h: 100
	}
	var gap = 20;

	if(ePos.clientX > (containerWidth*2)){
		pos = {
				x: ePos.pos.x - 253,
				y: ePos.pos.y + 20 + ePos.offsetY
		}
	}else{
		pos = {
				x: ePos.pos.x + 253,
				y: ePos.pos.y + 20 + ePos.offsetY
		}
	}

	var uCanvas = flowCanvas.append("g").attr("class", "useCaseExtended").attr("transform", "translate("+pos.x+","+pos.y+")");

	uCanvas.append("rect").attr("width", containerWidth).attr("height", containerHeight)
	.style("fill", "#f1f1f1").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	uCanvas.append("image").attr("width", image.w)
	.attr("height", image.h).attr("x", ((containerWidth /2) - (image.w / 2))).attr("y", gap).attr("xlink:href", "img/assessments/ameliaSide.png");
	uCanvas.append("g").attr("transform", "translate(20, "+(image.h + gap + 20)+")")
	.append("text").text(options.name).style("font-size", "14px").style("font-style", "italic").style("font-weight", "500")
	.style("fill", "#57575c").style("font-weight", "bold");

	wrapG = uCanvas.append("g").attr("transform", "translate(20, "+(image.h + gap + 50)+")");
	wrapG.append("text").text("DESCRIPTION").style("fill", "#e6832a").style("font-size", "14px");
	wrapG = uCanvas.append("g").attr("transform", "translate(20, "+(image.h + gap + 70)+")");
	wrapG.append("text").text(options.description).attr("x",0).attr("y", 0).call(wrap, containerWidth - 5).style("font-size", "12px").style("fill", "#57575c");

	wrapG = uCanvas.append("g").attr("transform","translate(20, "+(image.h + gap + 160)+")");
	wrapG.append("text").attr("x",0).attr("y", 20).style("font-size","12px").text("SUCCESS RATE").style("fill","#247dbe");

	wrapG.append("image").attr("width",	"20px").attr("height","20px").attr("x",  120).attr("y", 5)
	.attr("xlink:href",	"img/assessments/right.png");

	wrapG.append("text").attr("x", containerWidth - 80).attr("y", 20).style("font-size","14px").text(options.successRate).style("fill","#575757");

	wrapG = uCanvas.append("g").attr("transform","translate(20, "+(image.h + gap + 185)+")");
	wrapG.append("text").attr("x",0).attr("y", 20).style("font-size","12px").text("# OF REQUESTS").style("fill","#247dbe");

	wrapG.append("image").attr("width",	"20px").attr("height","20px").attr("x",  120).attr("y", 5)
	.attr("xlink:href",	"img/assessments/right.png");

	wrapG.append("text").attr("x", containerWidth - 80).attr("y", 20).style("font-size","14px").text(options.noOfRequests).style("fill","#575757");

}

/* For Amelia Deployments View */

function createAmeliaDeploymentsCaseOptions(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var gradient = svg.append("defs").append("linearGradient").attr("id",
	"gradient").attr("x1", "0%").attr("y1", "0%")
	.attr("x2", "100%").attr("y2", "100%").attr("spreadMethod",
			"pad");

gradient.append("stop").attr("offset", "0%").attr("stop-color", "#eee")
	.attr("stop-opacity", 1);

gradient.append("stop").attr("offset", "100%").attr("stop-color",
	"#ddd").attr("stop-opacity", 1);

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x -150),
			y : (step.link.y1 + step.deploymentsCase.link.y -50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "250px")
	.style("fill", "url(#gradient)").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("Click a Use Case to Learn More").style("fill", "#276134").style("font-weight", "600").style("font-style", "italic").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "12px");
	wrapG.append("image").attr("width", "20px").attr("height", "20px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
		flowCanvas.selectAll("g.useCaseExtended").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("image").attr("width", "60px").attr("height", "60px").attr("x", 20).attr("y", 0).attr("xlink:href", getUseCaseAttributes(step.deploymentsCase.name).image);
	var rectBox = wrapG.append("rect").attr("class", "buttons").attr("x", 90).attr("y", 15).attr("height", 30).style("fill", "#31a94b").attr("rx", 5).attr("ry", 5).style("cursor", "pointer").style("filter", "url(#drop-shadow)");
	var text = wrapG.append("text").text("Administration Rights").attr("x", 100).attr("y", 35).style("fill", "#FFF").style("font-size", "13px").style("cursor", "pointer");
	var dim = text.node().getBBox();
	rectBox.attr("width", dim.width + 20)
	wrapG.on("click", function(){
		cCanvas.selectAll("rect.buttons").style("fill", "#31a94b");
		d3.select(this).select("rect.buttons").transition().duration(300).style("fill", "#1e582b");
		var options = {
				name: "Admin Rights with Amelia",
				description: "Users can place requests with Cognitive chat bot to obtain Administrator Rights to their computer and recived access to install applications",
				successRate: "95%",
				noOfRequests: "2750"
		}
		createAmeliaUseCaseExtendedView(options, {clientX: d3.event.clientX, clientY: d3.event.clientY, pos: pos, offsetY: 30});
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,100)");
	wrapG.append("image").attr("width", "60px")	.attr("height", "60px").attr("x", 20).attr("y", 0).attr("xlink:href", getUseCaseAttributes(step.deploymentsCase.name).image);
	var rectBox = wrapG.append("rect").attr("class", "buttons").attr("x", 90).attr("y", 15).attr("height", 30).style("fill", "#31a94b").attr("rx", 5).attr("ry", 5).style("cursor", "pointer").style("filter", "url(#drop-shadow)");
	var text = wrapG.append("text").text("USB Privileges").attr("x", 100).attr("y", 35).style("fill", "#FFF").style("font-size", "13px").style("cursor", "pointer");
	var dim = text.node().getBBox();
	rectBox.attr("width", dim.width + 20)
	wrapG.on("click", function(){
		cCanvas.selectAll("rect.buttons").style("fill", "#31a94b");
		d3.select(this).select("rect.buttons").transition().duration(300).style("fill", "#1e582b");
		var options = {
				name: "USB Privileges with Amelia",
				description: "Users can place requests to obtain USB Privileges through Cognitive chat bot and recieve access to use a removeable drive for data transfer",
				successRate: "93%",
				noOfRequests: "1835"
		}
		createAmeliaUseCaseExtendedView(options, {clientX: d3.event.clientX, clientY: d3.event.clientY, pos: pos, offsetY: 100});
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,170)");
	wrapG.append("image").attr("width", "60px").attr("height", "60px").attr("x", 20).attr("y", 0).attr("xlink:href", getUseCaseAttributes(step.deploymentsCase.name).image);
	var rectBox = wrapG.append("rect").attr("class", "buttons").attr("x", 90).attr("y", 15).attr("height", 30).style("fill", "#31a94b").attr("rx", 5).attr("ry", 5).style("cursor", "pointer").style("filter", "url(#drop-shadow)");
	var text = wrapG.append("text").text("Guest WiFi").attr("x", 100).attr("y", 35).style("fill", "#FFF").style("font-size", "13px").style("cursor", "pointer");
	var dim = text.node().getBBox();
	rectBox.attr("width", dim.width + 20)
	wrapG.on("click", function(){
		cCanvas.selectAll("rect.buttons").style("fill", "#31a94b");
		d3.select(this).select("rect.buttons").transition().duration(300).style("fill", "#1e582b");
		var options = {
				name: "Guest WiFi with Amelia",
				description: "Users can place requests for guest wireless access using cognitive chat bot and recive credentials nearly instantly",
				successRate: "91%",
				noOfRequests: "4499"
		}
		createAmeliaUseCaseExtendedView(options, {clientX: d3.event.clientX, clientY: d3.event.clientY, pos: pos, offsetY: 170});
	});
}

function createAmeliaUseCaseExtendedView(options, ePos){
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");
	flowCanvas.selectAll("g.useCaseExtended").remove();
	var pos = {};
	var containerWidth = 250;
	var containerHeight = 350;
	var dom = getDom();
	var svgWidth = dom.width();
	var svgHeight = dom.height();
	var image = {
			w: 100,
			h: 100
	}
	var gap = 20;

	if(ePos.clientX > (containerWidth*2)){
		pos = {
				x: ePos.pos.x - 253,
				y: ePos.pos.y + 20 + ePos.offsetY
		}
	}else{
		pos = {
				x: ePos.pos.x + 253,
				y: ePos.pos.y + 20 + ePos.offsetY
		}
	}

	var uCanvas = flowCanvas.append("g").attr("class", "useCaseExtended").attr("transform", "translate("+pos.x+","+pos.y+")");

	uCanvas.append("rect").attr("width", containerWidth).attr("height", containerHeight)
	.style("fill", "#f1f1f1").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	uCanvas.append("image").attr("width", image.w)
	.attr("height", image.h).attr("x", ((containerWidth /2) - (image.w / 2))).attr("y", gap).attr("xlink:href", "img/assessments/ameliaSide.png");
	uCanvas.append("g").attr("transform", "translate(20, "+(image.h + gap + 20)+")")
	.append("text").text(options.name).style("font-size", "14px").style("font-style", "italic").style("font-weight", "500")
	.style("fill", "#57575c").style("font-weight", "bold");

	wrapG = uCanvas.append("g").attr("transform", "translate(20, "+(image.h + gap + 50)+")");
	wrapG.append("text").text("DESCRIPTION").style("fill", "#e6832a").style("font-size", "14px");
	wrapG = uCanvas.append("g").attr("transform", "translate(20, "+(image.h + gap + 70)+")");
	wrapG.append("text").text(options.description).attr("x",0).attr("y", 0).call(wrap, containerWidth - 5).style("font-size", "12px").style("fill", "#57575c");

	wrapG = uCanvas.append("g").attr("transform","translate(20, "+(image.h + gap + 160)+")");
	wrapG.append("text").attr("x",0).attr("y", 20).style("font-size","12px").text("SUCCESS RATE").style("fill","#247dbe");

	wrapG.append("image").attr("width",	"20px").attr("height","20px").attr("x",  120).attr("y", 5)
	.attr("xlink:href",	"img/assessments/right.png");

	wrapG.append("text").attr("x", containerWidth - 80).attr("y", 20).style("font-size","14px").text(options.successRate).style("fill","#575757");

	wrapG = uCanvas.append("g").attr("transform","translate(20, "+(image.h + gap + 185)+")");
	wrapG.append("text").attr("x",0).attr("y", 20).style("font-size","12px").text("# OF REQUESTS").style("fill","#247dbe");

	wrapG.append("image").attr("width",	"20px").attr("height","20px").attr("x",  120).attr("y", 5)
	.attr("xlink:href",	"img/assessments/right.png");

	wrapG.append("text").attr("x", containerWidth - 80).attr("y", 20).style("font-size","14px").text(options.noOfRequests).style("fill","#575757");

}

// ---------- For Invoice Matching under Procure to Pay process ----------//

function ProcureToPay6(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 60),
			y : (step.link.y1 + step.useCase.link.y - 35)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "310px").attr("height", "350px")
	.style("fill", "#b6d8ff").attr("x", -120).attr("y", 140).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("6 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",-100).attr("y", 170).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 40).attr("y", 150).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").text("InvoiceVerificationSGANZ – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",-100).attr("y", 170).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x", -110).attr("y", 190).style("font-size", "10px");
	wrapG.append("text").html("Confirms certain form fields are filled out correctly for").style("fill", "#404041").style("font-weight", "500").attr("x",-90).attr("y", 190).style("font-size", "10px");
	wrapG.append("text").html("new invoices").style("fill", "#404041").style("font-weight", "500").attr("x",-90).attr("y", 200).style("font-size", "10px");

	wrapG.append("text").text("InvoicePulling – 1 FTE").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",-100).attr("y", 225).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",-110).attr("y", 240).style("font-size", "10px");
	wrapG.append("text").html("To pull AP and Sales invoices from SAP ECC, Tahiti, 4.0B").style("fill", "#404041").style("font-weight", "500").attr("x",-90).attr("y", 240).style("font-size", "10px");
	wrapG.append("text").html("and Coupa").style("fill", "#404041").style("font-weight", "500").attr("x",-90).attr("y", 250).style("font-size", "10px");

	wrapG.append("text").text("BuySmart Enforcer– 0.2 FTE").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",-100).attr("y", 270).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",-110).attr("y", 290).style("font-size", "10px");
	wrapG.append("text").html("To automate the process for rejecting physical invoices").style("fill", "#404041").style("font-weight", "500").attr("x",-90).attr("y", 290).style("font-size", "10px");
	wrapG.append("text").html("and requesting replacement electronic invoices in").style("fill", "#404041").style("font-weight", "500").attr("x",-90).attr("y", 300).style("font-size", "10px");
	wrapG.append("text").html("BuySmart").style("fill", "#404041").style("font-weight", "500").attr("x",-90).attr("y", 310).style("font-size", "10px");

	wrapG.append("text").text("BuySmartPreapprovedInvoices – EU – 0.1 FTE").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",-100).attr("y", 330).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",-110).attr("y", 350).style("font-size", "10px");
	wrapG.append("text").html("To preapprove invoices in BuySmart").style("fill", "#404041").style("font-weight", "500").attr("x",-90).attr("y", 350).style("font-size", "10px");

	wrapG.append("text").text("StatementofAccounts – 0.55 FTE").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",-100).attr("y", 380).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",-110).attr("y", 400).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",-90).attr("y", 400).style("font-size", "10px");

	wrapG.append("text").text("VendorMaster Create/Change – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",-100).attr("y", 420).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",-110).attr("y", 440).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",-90).attr("y", 440).style("font-size", "10px");
}

function ProcureToPay7(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 60),
			y : (step.link.y1 + step.useCase.link.y - 35)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "310px").attr("height", "270px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", -10).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("3 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 30).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 160).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").text("Virtual Card – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Create proposal for a payment method for a vendor. If").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("the proposal outbound amount is valid(to be checked").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("from SAP Report provided as input file) create payment").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("run for the proposal. If the proposal outbound amount is").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 75).style("font-size", "10px");
	wrapG.append("text").html("invalid delete the proposal and continue with next").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 85).style("font-size", "10px");
	wrapG.append("text").html("payment method for that vendor. Repeat the process for").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 95).style("font-size", "10px");
	wrapG.append("text").html("all the vendors.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 105).style("font-size", "10px");

	wrapG.append("text").text("VCA Reconciliation BD1 – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 130).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 145).style("font-size", "10px");
	wrapG.append("text").html("Reconcilie employee expenses against Citibank statement").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 145).style("font-size", "10px");
	wrapG.append("text").html("and schedule payments").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 155).style("font-size", "10px");

	wrapG.append("text").text("VCA Reconciliation BD2 –  FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 180).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 195).style("font-size", "10px");
	wrapG.append("text").html("Reconcilie employee expenses against Citibank statement").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 195).style("font-size", "10px");
	wrapG.append("text").html("and schedule payments").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 205).style("font-size", "10px");

}
/*
 * ---- For Supplier selection and contract negotiation under Procure to Pay
 * Process ----------
 */

function ProcureToPay22(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y - 120)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "260px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 30).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").text("BuySmartTaxCode – 1 FTE").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Autmoates population of tax code in associated").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("BuySmart contract field").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
}

/*
 * ---- For Creation of POs and spot buys under Procure to Pay Process
 * ----------
 */

function ProcureToPay511(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "290px").attr("height", "150px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("2 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 150).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").text("PR2POECCHungary – 0.25 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("To automate update of PR to PO process for Hungary").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("in SAP ECC").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").text("PR2PO6Ireland – 1 FTE").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 85).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("Converting PR into PO in SAP ECC (ME57, ME9F)").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
}

/*
 * ---- For Shopping, creation of requisitions and approval under Procure to Pay
 * Process ----------
 */

function ProcureToPay41(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "200px").attr("height", "150px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("image").attr("width", "200px").attr("height", "150px").attr("x",-120).attr("y", 0).style("cursor", "pointer").attr("xlink:href", "img/assessments/imageProcureToPay41.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

}

/*
 * ---- For Use Case View - Creation of POs and spot buys under Procure to Pay
 * Process ----------
 */

function ProcureToPay511U(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "285px").attr("height", "150px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 140).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Vendor CC Extension during Buysmart").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("PO Creation – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 40).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("ARAVO remediation process is kicked off").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("to correct and complete vendor master").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");
  wrapG.append("text").html("information and add the supplier to a").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 75).style("font-size", "10px");
  wrapG.append("text").html("new company code (add to new location)").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 85).style("font-size", "10px");
  wrapG.append("text").html("so that invoicing can occur.)").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 95).style("font-size", "10px");
}


/*
 * For Supplier master data management under Procure to Pay Process
 */

function ProcureToPay52(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "380px").attr("height", "340px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("6 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 30).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 230).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").text("VendorMaster – NA – 0.2 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("automates US vendor creation in SAP ECC (XK01)").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");

	wrapG.append("text").text("MaterialMaster2 – 0.75 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 85).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("To create material master record in SAP4.0B (MM01)").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");

	wrapG.append("text").text("MaterialMasterHungary (w/ enhancement) – 1.25 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 140).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").html("Additional 2 status column in input file. Robot to check status column to").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").html("determine if record need to be processed. Input files will be changed to").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 165).style("font-size", "10px");
	wrapG.append("text").html("pick up from shared point").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 175).style("font-size", "10px");

	wrapG.append("text").text("MaterialMasterECCFrance - EU – 0.30 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 205).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 220).style("font-size", "10px");
	wrapG.append("text").html("Info record (IR) ad Source list (SL) Creation / change / deletion process in").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 220	).style("font-size", "10px");
	wrapG.append("text").html("ECC production system").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 230).style("font-size", "10px");

	wrapG.append("text").text("MaterialMasterIRGA1A / MaterialMasterSLGA1A – 3 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 265).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 280).style("font-size", "10px");
	wrapG.append("text").html("To update the material master source list (creation, change and deletion)").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 280).style("font-size", "10px");
	wrapG.append("text").html("in SAP4.0B (ME11, ME12, ME15)").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 290).style("font-size", "10px");


	}

/*
 * ---- For Use Case View - Supplier master data management under Procure to Pay
 * Process ----------
 */

function ProcureToPay52U(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "100px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").text("Add Supplier in ARAVO").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Matches data in SAP and creates a new ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("supplier in ARAVO").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	}

/*
 * ---- For 3 way matching of PO, invoice and receipt and approval to pay under
 * Procure to Pay Process ----------
 */

function ProcureToPay61(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y - 120)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").text("StatementOfAccount – 0.55 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Updates the invoice status for a vendor").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");

}

/* ---- For Draft Budget under Plan To Forecast Process ---------- */

function PlanToForecast22(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 290),
			y : (step.link.y1 + step.deploymentsCase.link.y - 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "275px").attr("height", "290px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("8 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 130).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("All bots update the material master info record").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 20).style("font-size", "10px");
	wrapG.append("text").html("(creation, change and deletion) in SAP systems").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 30).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").text("MaterialMasterHungary - EU").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",40).attr("y", 50).style("font-size", "12px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 80).style("font-size", "10px");
	wrapG.append("text").text("MaterialMasterIRGA1A - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",40).attr("y", 80).style("font-size", "12px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 95).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1.5").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 95).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 110).style("font-size", "10px");
	wrapG.append("text").text("MaterialMasterSLGA1A - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",40).attr("y", 110).style("font-size", "12px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 125).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1.5").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 125).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 140).style("font-size", "10px");
	wrapG.append("text").text("MaterialMasterIRGA1B - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",40).attr("y", 140).style("font-size", "12px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").text("MaterialMasterHungaryECC - EU").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",40).attr("y", 155).style("font-size", "12px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 170).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 170).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 185).style("font-size", "10px");
	wrapG.append("text").text("MaterialMaster2 - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",40).attr("y", 185).style("font-size", "12px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 200).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.75").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 200).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 215).style("font-size", "10px");
	wrapG.append("text").text("MaterialMasterSLGA1B - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",40).attr("y", 215).style("font-size", "12px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 230).style("font-size", "10px");
	wrapG.append("text").text("MaterialMasterFrance - EU").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",40).attr("y", 230).style("font-size", "12px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 245).style("font-size", "10px");
	wrapG.append("text").html("FTE : 1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 245).style("font-size", "10px");

}

/*
 * For Use Case View - Draft Budget under Plan To Forecast Process
 */

function PlanToForecast22U(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 410),
			y : (step.link.y1 + step.useCase.link.y - 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "290px").attr("height", "120px")
	.style("fill", "#b6d8ff").attr("x", 100).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",100).attr("y", 30).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 240).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("BPC Allocation – 0.38 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",120).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",125).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("To load BPC Allocation Planning Module to reflect").style("fill", "#404041").style("font-weight", "500").attr("x",145).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("allocation changes to CC during").style("fill", "#404041").style("font-weight", "500").attr("x",145).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("Projection/ASR/Budget cycle").style("fill", "#404041").style("font-weight", "500").attr("x",145).attr("y", 65).style("font-size", "10px");

}

/*
 * For Financial Planning under Plan To Forecast Process
 */

function PlanToForecast2(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "300px").attr("height", "125px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 160).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Inventory Projections").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Automates report consolidation and basic excel").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("macros to delivery inventory projection quantities").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
}


/*
 * For Business Analytics under Plan To Forecast Process
 */

	function PlanToForecast5(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 140),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "300px").attr("height", "230px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("2 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 160).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Month End Closing Activities – 0.25 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("To Perform Month End Closing Activities. Spart").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Part Reporting (direct extraction from BW reports").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("and send to stakeholders via automated email").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("process). To enable Finish Goods reporting run on").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 75).style("font-size", "10px");
	wrapG.append("text").html("monthly and quarterly basis (3 projection cycles,").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 85).style("font-size", "10px");
	wrapG.append("text").html("budget and ASR)").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 95).style("font-size", "10px");


	wrapG.append("text").html("Trade Sales Closing Activities – 0.25 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 115).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 125).style("font-size", "10px");
	wrapG.append("text").html("Sales Parity report to run on a daily basis instead").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 125).style("font-size", "10px");
	wrapG.append("text").html("of weekly until Global MRA Revenue/COS/GP fully").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 135).style("font-size", "10px");
	wrapG.append("text").html("rollout. Daily Sales Report Checking  (reasonable").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 145).style("font-size", "10px");
	wrapG.append("text").html("and sanity check on a daily basis)").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 155).style("font-size", "10px");

}


/* ---- For Generate reports under Plan To Forecast Process ---------- */

function PlanToForecast53(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x + 60),
			y : (step.link.y1 + step.deploymentsCase.link.y - 35)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "260px").attr("height", "120px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 30).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("HFMHIER – 0.2 FTEs (w/ enhancement)").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("To automate process to add/edit/delete").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("rows/columns in multiple excel files (which are").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("coming from Hyperion Smart View)").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");

}

/*
 * ---- For Analyze drivers of performance under Plan To Forecast Process
 * ----------
 */

function PlanToForecast62(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 260),
			y : (step.link.y1 + step.deploymentsCase.link.y - 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "175px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("2 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("GAMCDashboard - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("To automate the process retrieving GAMC data ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("from Hyperion Smart View ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.35").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");

	wrapG.append("text").html("GAMCDashboard 2 - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 85).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("To automate the process retrieving GAMC data ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("from Hyperion Smart View ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 110).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 125).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.35").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 125).style("font-size", "10px");

}

/* ---- For Outbound Logistics under Plan To Deliver Process ---------- */

function PlanToDelivery7(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x + 60),
			y : (step.link.y1 + step.deploymentsCase.link.y - 35)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "280px").attr("height", "350px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("5 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 30).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 130).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("FreightAllocation – NA – 1.10 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Prepares the freight allocation report from SAP").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("ECC").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("Material Document Transfer Order – 1 FTE").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 75).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 95).style("font-size", "10px");
	wrapG.append("text").html("navigates to the tree structure in SAP Portal for").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 95).style("font-size", "10px");
	wrapG.append("text").html("clearing the Transfer Orders for the categories").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 105).style("font-size", "10px");
	wrapG.append("text").html("'Unconfirmed Transfer Orders' and 'Open transfer").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 115).style("font-size", "10px");
	wrapG.append("text").html("requirements").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 125).style("font-size", "10px");

	wrapG.append("text").html("SN Reconciliation 3PL – 0.35 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 145).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 165).style("font-size", "10px");
	wrapG.append("text").html("Automate BD third Party logistics serial number").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 165).style("font-size", "10px");
	wrapG.append("text").html("reconciliation").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 175).style("font-size", "10px");

	wrapG.append("text").html("Soft Biopsy Reporting – 0.53 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 195).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 205).style("font-size", "10px");
	wrapG.append("text").html("create s3 global daily reports that contain open").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 205).style("font-size", "10px");
	wrapG.append("text").html("orders, deliveries and invoices to the Soft Biopsy").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 215).style("font-size", "10px");
	wrapG.append("text").html("Buyer as part of TSA req’s").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 225).style("font-size", "10px");

	wrapG.append("text").html("TMS Prospects – 0.23 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 245).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 265).style("font-size", "10px");
	wrapG.append("text").html("eliminates interface errors between SAP and the").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 265).style("font-size", "10px");
	wrapG.append("text").html("TMS which will reduce manual intervention when").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 275).style("font-size", "10px");
	wrapG.append("text").html("planning deliveries").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 285).style("font-size", "10px");


}

/*
 * For Monitor activity against forecast under Plan To Deliver Process
 */

function PlanToDelivery12(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "260px").attr("height", "130px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 30).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("BD Canada Cardinal Reports – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("takes output of the 2BI reports and").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("develop a new report for Cardinal. This").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("Cardinal specific report then should be").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 60).style("font-size", "10px");
	wrapG.append("text").html("emailed to the distributor's email address").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("on weekly basis").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 80).style("font-size", "10px");
}

/*
 * For Order Material and Services under Plan To Deliver Process
 */

function PlanToDelivery32(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 60),
			y : (step.link.y1 + step.useCase.link.y - 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "270px").attr("height", "200px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("2 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 30).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 120).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Material Document Transfer Order – FTE").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 45).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 60).style("font-size", "10px");
	wrapG.append("text").html("This bot navigates to the tree structure in").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 60).style("font-size", "10px");
	wrapG.append("text").html("SAP Portal for clearing the Transfer Orders").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("for the categories 'Unconfirmed Transfer").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 80).style("font-size", "10px");
	wrapG.append("text").html("Orders' and 'Open transfer requirements'.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 90).style("font-size", "10px");

	wrapG.append("text").html("CSOENodumCountries  - LASSC – 5.2").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 110).style("font-size", "12px");
	wrapG.append("text").html("FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 125).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 140).style("font-size", "10px");
	wrapG.append("text").html("To automate the process for entering").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 140).style("font-size", "10px");
	wrapG.append("text").html("orders into Nodum.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 150).style("font-size", "10px");
}


/*
 * ---- For IT Portfolio Management under ITStrategy To Architecture Process
 * ----------
 */

function ITStrategyToArchitecture2(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "300px").attr("height", "150px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("11 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 30).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 150).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("3pm/SNOW Update Bots (10 bots) – 0.6 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Automatically run various portfolio reports ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("and matches data between 3pm, SQL tables,").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("and eventually updates SNOW reports").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");

	wrapG.append("text").html("CRs_DataRefresh – 0.06 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 85).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("Bot refreshes CR link to SP site for QV").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("Dashboard pull").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 110).style("font-size", "10px");

}

/*
 * ---- For Use Case View - IT Portfolio Management under ITStrategy To
 * Architecture Process ----------
 */

function ITStrategyToArchitecture2U(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "100px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Auxiliary Cost Component Report").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
}

/* ---- For Credit, Pricing, Quote under Quote To Cash Process ---------- */

function QuoteToCash2(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "215px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("3 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("SEAandHKBelowMarginPricing - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Updating below margin pricing for ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("SEA and HK in SAP 4.0b for Asia region").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.05").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");

	wrapG.append("text").html("SEAPricingMaster - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 85).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("Updating pricing for SEA in SAP 4.0b").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("from Flowtrix system for Asia region").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 110).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 125).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.05").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 125).style("font-size", "10px");

	wrapG.append("text").html("HKPricingMaster - GA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 140).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").html("Updating pricing for HK in SAP 4.0b from").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").html("ePrice system for Asia region").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 165).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 180).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.05").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 180).style("font-size", "10px");
}

/*
 * ---- For Use Case View - Credit, Pricing, Quote under Quote To Cash Process
 * ----------
 */

function QuoteToCash2U(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "310px").attr("height", "290px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("9 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 160).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Customer Experience Dashboard – 0.12 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Automate file transfers and updates between").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Power BI, SharePoint and Local Drive").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("ServiceComplaint Bot (enhancement) – 0.5 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 75).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("Add in additional function that the bot need to").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("access to and retrieve the data from.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");

	wrapG.append("text").html("SAP IDoc Verification – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 120).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 135).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 135).style("font-size", "10px");

	wrapG.append("text").html("SEA_CCM/SEA_PharmaAce (4 bots) – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 155).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 170).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 170).style("font-size", "10px");

	wrapG.append("text").html("Subscription Automation – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 190).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 205).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 205).style("font-size", "10px");

	wrapG.append("text").html("Vendavo Master Data Updates – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 225).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 240).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 240).style("font-size", "10px");

}

/* ---- For Customer Setup under Quote To Cash Process ---------- */

function QuoteToCash1(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 70),
			y : (step.link.y1 + step.useCase.link.y - 280)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "320px").attr("height", "260px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("4 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 30).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 170).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("OpsArmadillo – 5.2 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Validation of customer addresses from").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("distributors and update in ECC for North").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("America").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");

	wrapG.append("text").html("ProcessTraceRequestsBD2 – NA – 2 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 85).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("Validation of customer addresses from").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("distributors and updating in SAP ECC for North").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 110).style("font-size", "10px");
	wrapG.append("text").html("America").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 120).style("font-size", "10px");

	wrapG.append("text").html("CMDOCRM – 1.3 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 140).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").html("To update customer information in SAP ECC and").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").html("LOTS for Europe").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 165).style("font-size", "10px");

	wrapG.append("text").html("RTPIPMXShoppingCarts2POConversion – 0.5 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 185).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 200).style("font-size", "10px");
	wrapG.append("text").html("To enter the vendor items from shopping cart").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 200).style("font-size", "10px");
	wrapG.append("text").html("and convert into PO in SAP ECC").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 210).style("font-size", "10px");

	}



/* ---- For Process order under Quote To Cash Process ---------- */

function QuoteToCash42(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 400),
			y : (step.link.y1 + step.deploymentsCase.link.y - 200)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "370px").attr("height", "330px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("22 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 30).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 210).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("OrderEntryMexico (20 bots) - 4.1 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Entering sales orders in SAP for various regions").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");

	wrapG.append("text").html("Manual Order Entry QC – 1 FTE").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 65).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 80).style("font-size", "10px");
	wrapG.append("text").html("To automate the order (BDM, BDDS, BDB / Mailed, Faxed, E-mailed)").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 80).style("font-size", "10px");
	wrapG.append("text").html("entry reviewing process.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 90).style("font-size", "10px");

	wrapG.append("text").html("Mexico Government Orders – 1 FTE").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 110).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 125).style("font-size", "10px");
	wrapG.append("text").html("goes to Government Portal, fills standard data, copies order details to").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 125).style("font-size", "10px");
	wrapG.append("text").html("predefined spreadsheet and finally enters into SAP").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 135).style("font-size", "10px");

	wrapG.append("text").html("SCRTrackTrace – 1 FTE").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 155).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 170).style("font-size", "10px");
	wrapG.append("text").html("To retrieve order shipment status from carrier company website").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 170).style("font-size", "10px");

	wrapG.append("text").html("SEA_Schmidt / SEA_Zuellig (6 bots) – 0.25 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 190).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 205).style("font-size", "10px");
	wrapG.append("text").html("Takes excel input files and runs macros to do excel transformations").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 205).style("font-size", "10px");

	wrapG.append("text").html("ServiceComplaintsLotsExtract – 0.5 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 225).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 240).style("font-size", "10px");
	wrapG.append("text").html("Retrieving order information from BDBEN4 system for Europe").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 240).style("font-size", "10px");

	wrapG.append("text").html("ServiceComplaintsLotsExtract – 2.9 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 260).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 275).style("font-size", "10px");
	wrapG.append("text").html("Over 15,000 asset records to be updated for data cleanup.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 275).style("font-size", "10px");

}

/* ---- For Use Case View - Process order under Quote To Cash Process ---------- */

function QuoteToCash42U(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 280)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "280px").attr("height", "310px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("5 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 30).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 130).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("IntercompanyClearing – 0.39 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Clearing of open items for intercompany").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("transactions in ECC for North America").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("Automation Order Creation – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 75).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 90).style("font-size", "10px");

	wrapG.append("text").html("DS Service Quote Automation – 0.28 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 120).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 135).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 135).style("font-size", "10px");

	wrapG.append("text").html("HCP Order Entry – 0.62 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 165).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 180).style("font-size", "10px");
	wrapG.append("text").html("help Customer Service with effective order").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 180).style("font-size", "10px");
	wrapG.append("text").html("entry for Accounts that are already").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 190).style("font-size", "10px");
	wrapG.append("text").html("registered in Custom Point").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 200).style("font-size", "10px");

	wrapG.append("text").html("Japan FOC Orders – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 220).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 235).style("font-size", "10px");
	wrapG.append("text").html("To provide the accurate product sample").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 235).style("font-size", "10px");
	wrapG.append("text").html("delivery in timely manner as per requests").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 245).style("font-size", "10px");
	wrapG.append("text").html("raised by business team with meeting the").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 255).style("font-size", "10px");
	wrapG.append("text").html("Japan legal requirement.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 265).style("font-size", "10px");
}


/* ---- For Receive Cash under Quote To Cash Process ---------- */
function QuoteToCash6U(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 30)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "260px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("6 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 30).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("ARCashApplication (6 bots) – 5.1 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("posting of incoming payments").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("which failed to be Auto Posted in").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("SAP ECC").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");

}

function QuoteToCash61(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x + 50),
			y : (step.link.y1 + step.deploymentsCase.link.y - 230)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "350px").attr("height", "300px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("8 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 200).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("ARCashApplication (4 bots) – 2 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("daily manual posting of incoming payments").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("which failed to be Auto Posted in SAP ECC.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("Preferred Payment Incentive – 1 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 75).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("To automate the Preferred Payment Incentive").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("process issuing credit memoand a summary of").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("unearned discounts.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 110).style("font-size", "10px");

	wrapG.append("text").html("SGP Consolidator – 0.6 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 130).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 145).style("font-size", "10px");
	wrapG.append("text").html("To consolidate all the Sales Gross Profit data from").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 145).style("font-size", "10px");
	wrapG.append("text").html("Hyperion Smart View into one excel file with 17").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").html("GA entities").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 165).style("font-size", "10px");

	wrapG.append("text").html("TEExpenseDataEntryForNodumCountries– 0.7 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 185).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 200).style("font-size", "10px");
	wrapG.append("text").html("To automate the process for entering").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 200).style("font-size", "10px");
	wrapG.append("text").html("information from Concur into Nodum").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 210).style("font-size", "10px");

	wrapG.append("text").html("TRCurrencyExchange – LA – 0.25 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 230).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 245).style("font-size", "10px");
	wrapG.append("text").html("TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 245).style("font-size", "10px");

}

/* ---- For Create Invoice under Quote To Cash Process ---------- */

function QuoteToCash51(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 30).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("ARMXInvoiceManagement – 0.5 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Downloading new sales invoices").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("from Carvajal and sending to").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("customer for Latin America").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");

	}

/*
 * ---- For Use Case View - Create Invoice under Quote To Cash Process
 * ----------
 */

function QuoteToCash51U(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "290px").attr("height", "170px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("2 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 140).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("2InvoiceServiceFees – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("automate the process of getting").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("inputs of product list,").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("calculating the final service fees").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("and sending mails with service").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 75).style("font-size", "10px");
	wrapG.append("text").html("fees to user.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 85).style("font-size", "10px");

	wrapG.append("text").html("RTPAPIPCLInvoicePostingSNOW – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 105).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 120).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 120).style("font-size", "10px");

}
function QuoteToCash51U2(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 60),
			y : (step.link.y1 + step.useCase.link.y - 60)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "290px").attr("height", "130px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 150).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("AR Reconciliation Bot – 0.2 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("maintain an accurate up-to-date A/R by").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("applying offsetting credits and will have the").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("resources to run back transactions against").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("current activity for longer windows").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 75).style("font-size", "10px");
	wrapG.append("text").html("reducing unmatched/orphan transactions.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 85).style("font-size", "10px");
}

/* ---- For Collection under Quote To Cash Process ---------- */

function QuoteToCash72(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("ClaimsResearch - LA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Searching for claims information in").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("SAP ECC for North America").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("FTE : 2").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
}

/* ---- For Yse Case View - Collection under Quote To Cash Process ---------- */

function QuoteToCash72U(step) {
	//console.log("RRRRRR");
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "290px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 150).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("ARInvoicePulling – 0.5 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Pull invoices, order screens and").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("validate if the invoices have").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("been paid in SAP ECC.for North").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("America").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 75).style("font-size", "10px");

}

/*
 * ---- For Monitor issues under IT Transition to Operation CI Process
 * ----------
 */

function ItTransitionToOperationCI21(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "280px").attr("height", "160px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("5 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 130).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("5 iAuomate scripts in production – 2.8 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("Server Availability").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 40).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("Disk Utilization/Cleanup").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("File System Clean up").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 85).style("font-size", "10px");
	wrapG.append("text").html("Windows Service Management").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 85).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("CPU/Memory Utilization Threshold").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("Incidents").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 110).style("font-size", "10px");

}

function ItTransitionToOperationCI21U(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 280),
			y : (step.link.y1 + step.deploymentsCase.link.y - 190)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "270px").attr("height", "250px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("5 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 120).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("BDBEN4 – 0.46 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("Automate a process to create a new").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("account with requested roles, update").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("an existing account with requested").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 60).style("font-size", "10px");
	wrapG.append("text").html("roles, or process the removal of").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("access within the BDBEN/LOTS").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 80).style("font-size", "10px");
	wrapG.append("text").html("system, depending on what was").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("submitted via the UAM Request.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");

	wrapG.append("text").html("LOTS_Create_User (2 bots) – 0.45 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 120).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 135).style("font-size", "10px");
	wrapG.append("text").html("Activates and provisions users in").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 135).style("font-size", "10px");
	wrapG.append("text").html("LOTS systems").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 145).style("font-size", "10px");

	wrapG.append("text").html("SAP 4.0b Enrollment (2 bots) – 0.77 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 165).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 180).style("font-size", "10px");
	wrapG.append("text").html("Creates and terminates accounts").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 180).style("font-size", "10px");
	wrapG.append("text").html("depending on S&E request").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 190).style("font-size", "10px");
	wrapG.append("text").html("requirements in SAP 4.0b").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 200).style("font-size", "10px");
}



/*
 * ---- For Define performance metrics under IT Transition to Operation CI
 * Process ----------
 */

 function AquireToRetire3D(step) {

   	var mapContainer = d3.select("div#mapContainer");
   	var svg = mapContainer.select("svg");
   	var flowCanvas = svg.select("g#flowCanvas");

   	var pos = {
   			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
   			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
   		};

   	var cCanvas = flowCanvas
   	.append("g")
   	.attr("class", "useCaseOptions")
   	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

   	cCanvas.append("rect").attr("width", "320px").attr("height", "170px")
   	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
   			"filter", "url(#drop-shadow)");

   	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
   	wrapG.append("text").text("11 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
   	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 180).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
   	.on("click", function(){
   		flowCanvas.selectAll("g.useCaseOptions").remove();
   	});

   	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
   	wrapG.append("text").html("BDBInstrumentOps (10 bots) – 0.40 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
   	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
   	wrapG.append("text").html("Accesses various reports in SAP and uploads them into").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
   	wrapG.append("text").html("a database every week").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

		wrapG.append("text").html("SAP SharePoint Content Management – 0.04 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 70).style("font-size", "12px");
		wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 85).style("font-size", "10px");
		wrapG.append("text").html("Bot downloads file from SharePoint and compares this").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 85).style("font-size", "10px");
		wrapG.append("text").html("to SAP document versions and then updates").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 95).style("font-size", "10px");
		wrapG.append("text").html("SharePoint as needed.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 105).style("font-size", "10px");




 }

 function AquireToRetire4U(step) {
 	var mapContainer = d3.select("div#mapContainer");
 	var svg = mapContainer.select("svg");
 	var flowCanvas = svg.select("g#flowCanvas");

 	var pos = {
 			x : (step.link.x1 + step.deploymentsCase.link.x + 50),
 			y : (step.link.y1 + step.deploymentsCase.link.y - 50)
 		};

 	var cCanvas = flowCanvas
 	.append("g")
 	.attr("class", "useCaseOptions")
 	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

 	cCanvas.append("rect").attr("width", "290px").attr("height", "120px")
 	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
 			"filter", "url(#drop-shadow)");

 	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
 	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
 	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 150).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
 	.on("click", function(){
 		flowCanvas.selectAll("g.useCaseOptions").remove();
 	});

 	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
 	wrapG.append("text").html("SAPPlantMaintenanceReport - 0.04 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
 	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
 	wrapG.append("text").html("This bot goes into SAP and downloads a plant").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
 	wrapG.append("text").html("maintenance report, performs manipulations in Excel").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
 	wrapG.append("text").html("and sends it over SFTP to JLL.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");
 }

function ItTransitionToOperationCI31(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x + 50),
			y : (step.link.y1 + step.deploymentsCase.link.y - 90)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "100px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 30).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("ECS QV Dashboard – 0.17 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Prepares QlikView dashboard for ECS data").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("updates").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

}

/*
 * ---- For Use Case View - Define performance metrics under IT Transition to
 * Operation CI Process ----------
 */

function ItTransitionToOperationCI31U(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 270),
			y : (step.link.y1 + step.useCase.link.y - 70)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "170px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("3 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("SAP Firefighter Dashboard").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Compiles excel report monitoring ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("firefighters requests and approval SLAs").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("File Sharing DLP Report").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 70).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 85).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 85).style("font-size", "10px");

	wrapG.append("text").html("CIF Error Reporting").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 100).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 115).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 115).style("font-size", "10px");

}


/*
 * ---- For Develop production and materials plan under Plan To Delivery Process
 * ----------
 */

function PlanToDelivery2(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 30),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "275px").attr("height", "310px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("5 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 125).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("CIF Error Reporting – 0.03 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Creates a report of CIF errors, which show evidence").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("of a mismatch between the Planning and Execution ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("systems").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");


	wrapG.append("text").html("MMS Sales Order Updates – 2.03 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 85).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("Logs into CRM portal and SAP to update part").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("numbers and manage backlog data").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 110).style("font-size", "10px");

	wrapG.append("text").html("PAS DOR – 0.13 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 130).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 145).style("font-size", "10px");
	wrapG.append("text").html("Runs multiple reports to support DOR and manualy").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 145).style("font-size", "10px");
	wrapG.append("text").html("save them into daily support file, then manually cory").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").html("the data into DOR.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 165).style("font-size", "10px");

	wrapG.append("text").html("PAS MonthToDate – 0.15 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 185).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 200).style("font-size", "10px");
	wrapG.append("text").html("Daily month to date report that shows how much of").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 200).style("font-size", "10px");
	wrapG.append("text").html("the forecast is consumed.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 210).style("font-size", "10px");

	wrapG.append("text").html("DC MTD – 0.12 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 230).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 245).style("font-size", "10px");
	wrapG.append("text").html("Daily month to date report that shows how much of").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 245).style("font-size", "10px");
	wrapG.append("text").html("the forecast is consumed").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 255).style("font-size", "10px");

}


function PlanToDelivery21(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 100),
			y : (step.link.y1 + step.useCase.link.y - 260)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "275px").attr("height", "200px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("3 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 35).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 125).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Demand Planning Process – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("This bot extracts two reports from SAP Portal, does").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("some manipulation in the extracted reports,").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("consolidates the reports and drops the output file in").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("shared drive and email to clients.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 75).style("font-size", "10px");

	wrapG.append("text").html("Foreign Trade Zone – 1 FTE").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 95).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 110).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 110).style("font-size", "10px");

	wrapG.append("text").html("EMEA7 Plant Code Transfer – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 130).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 145).style("font-size", "10px");
	wrapG.append("text").html("Matches plant code information from source system").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 145).style("font-size", "10px");
	wrapG.append("text").html("into EMEA7").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 155).style("font-size", "10px");

}


/*
 * ---- For Track center delivery performance under Plan To Delivery Process
 * ----------
 */

function PlanToDelivery72(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "275px").attr("height", "220px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("3 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 125).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("DC Month to Date").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Description : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 60).style("font-size", "10px");
	wrapG.append("text").html("FTE : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 60).style("font-size", "10px");

	wrapG.append("text").html("IMS and Distributor Inventory for SEA").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 85).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("Description : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 115).style("font-size", "10px");
	wrapG.append("text").html("FTE : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 115).style("font-size", "10px");

	wrapG.append("text").html("Consignment Vendor Inventory").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 135).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 150).style("font-size", "10px");
	wrapG.append("text").html("Description : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 150).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 165).style("font-size", "10px");
	wrapG.append("text").html("FTE : TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 165).style("font-size", "10px");
}

/*
 * For Application Performance Management under IT Transition to Operation CI
 * Process
 */

function ItTransitionToOperationCI3(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 145),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "355px").attr("height", "210px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("8 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 30).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 205).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("AS2 Certificates Master – 0.02 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Automatically monitors expiring EDI").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("certificates and initiates renewal process to").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("re-establish communications records").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");

	wrapG.append("text").html("5 Automic scripts in production – 3.8 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 85).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("SAP Bssis Health Check").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 115).style("font-size", "10px");
	wrapG.append("text").html("SAP IDOC Monitoring & Alerting").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 115).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 130).style("font-size", "10px");
	wrapG.append("text").html("SAP SCM CTM Planning Run Monitoring").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 130).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 145).style("font-size", "10px");
	wrapG.append("text").html("SAP SCM Planner Code Upload").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 145).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 160).style("font-size", "10px");
	wrapG.append("text").html("SAP ABCD Indicator Upload").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 160).style("font-size", "10px");

}


/*
 * ---- For Incident Management and Continuous Improvement under IT Transition
 * to Operation CI ----------
 */

function ItTransitionToOperationCI2U(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 10),
			y : (step.link.y1 + step.useCase.link.y + 70)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "290px").attr("height", "140px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("2 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 140).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("EDI Monitoring & Ticket Creation – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 40).style("font-size", "10px");

	wrapG.append("text").html("IPCenter Monitoring – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 55).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("The bot creates the incident tickets").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("based on IPCenter alerts received in").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 80).style("font-size", "10px");
	wrapG.append("text").html("RPAitIPML mailbox.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 90).style("font-size", "10px");
	}


/*
 * ---- For Release and Deployment under IT Transition to Operation CI
 * ----------
 */

function ItTransitionToOperationCI4(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "150px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("2 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("SAP Promote to Prod").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("Produces verification report comparing").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("SAP modules approved for production").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("and actual data downloaded from SAP").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 60).style("font-size", "10px");

	wrapG.append("text").html("EMEA7 Plant Code Transfer").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 75).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("Matches plant code information from ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("source system into EMEA7").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
}

/*
 * ---- For Time tracking and absence tracking under Hire To Retire Process
 * ----------
 */

function HireToRetire31(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("GCSTimeSheetMalaysia – 0.25 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Generating timesheet report").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("from Genysys for Asia region").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	}

function HireToRetire71(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("AccessReportMalaysia – 0.10 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("To automate the process of").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("KLSSC").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	}

/*
 * ---- For Eliminate quality and reliability problems under New Product
 * Development Process ----------
 */

 function ITDesignToBuildModel3(step) {
 	var mapContainer = d3.select("div#mapContainer");
 	var svg = mapContainer.select("svg");
 	var flowCanvas = svg.select("g#flowCanvas");

 	var pos = {
 			x : (step.link.x1 + step.deploymentsCase.link.x - 100),
 			y : (step.link.y1 + step.deploymentsCase.link.y - 140)
 		};

 	var cCanvas = flowCanvas
 	.append("g")
 	.attr("class", "useCaseOptions")
 	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

 	cCanvas.append("rect").attr("width", "270px").attr("height", "100px")
 	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
 			"filter", "url(#drop-shadow)");

 	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
 	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
 	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 120).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
 	.on("click", function(){
 		flowCanvas.selectAll("g.useCaseOptions").remove();
 	});

 	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
 	wrapG.append("text").html("C2C Add Domain Restriction - 0.58 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
 	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
 	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");

 }

 function ITDesignToBuildModel4(step) {
 	var mapContainer = d3.select("div#mapContainer");
 	var svg = mapContainer.select("svg");
 	var flowCanvas = svg.select("g#flowCanvas");

 	var pos = {
 			x : (step.link.x1 + step.useCase.link.x - 90),
 			y : (step.link.y1 + step.useCase.link.y + 50)
 		};

 	var cCanvas = flowCanvas
 	.append("g")
 	.attr("class", "useCaseOptions")
 	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

 	cCanvas.append("rect").attr("width", "330px").attr("height", "200px")
 	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
 			"filter", "url(#drop-shadow)");

 	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
 	wrapG.append("text").text("3 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 20).style("text-anchor", "middle").style("font-size", "16px");
 	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 180).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
 	.on("click", function(){
 		flowCanvas.selectAll("g.useCaseOptions").remove();
 	});

 	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
 	wrapG.append("text").html("Auto Provision Testers – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 30).style("font-size", "12px");
 	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
 	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");

 	wrapG.append("text").html("Bot Access Monitor Bot – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 65).style("font-size", "12px");
 	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 80).style("font-size", "10px");
 	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 80).style("font-size", "10px");

 	wrapG.append("text").html("C2C Job Code Migration – 1.7 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 100).style("font-size", "12px");
 	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 115).style("font-size", "10px");
 	wrapG.append("text").html("In Current C2C training or Curricula is associated to a job").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 115).style("font-size", "10px");
 	wrapG.append("text").html("code. Job codes can be defined at a site or cost center lever.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 125).style("font-size", "10px");
 	wrapG.append("text").html("This allows training admins to associate training to jobs").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 135).style("font-size", "10px");
 	wrapG.append("text").html("within their site/cost center that any user who has that job").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 145).style("font-size", "10px");
 	wrapG.append("text").html("should automatically be assigned.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 155).style("font-size", "10px");

 }


function NewProductDevelopment43(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "120px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("MaterealityMaster").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("Downloading data from Matereality partner").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("and validating internal database").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("Merics: 0.116 FTE's reduced").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");

}


/*
 * ---- For Develop and document product design specifications under New Product
 * Development Process ----------
 */

function NewProductDevelopment31(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "135px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("2 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("R&DASE").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("Graphics update engine for").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("product labels").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 50).style("font-size", "10px");

	wrapG.append("text").html("MPSHypo").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 70).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 85).style("font-size", "10px");
	wrapG.append("text").html("Integrated soliton with Cognitive agent for ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 85).style("font-size", "10px");
	wrapG.append("text").html("updating product labels for MPS business unit ").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 95).style("font-size", "10px");

}

/*
 * ---- For Material Characterization under Product Line Management Process
 * ----------
 */

function ProductLineManagement2(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "95px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Safety Stock Modelling").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 40).style("font-size", "10px");
}

function ProductLineManagement4U(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "340px").attr("height", "320px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("6 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 190).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Quality Dashboard (enhancement) – 1.9 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("Adds in more reporting from TrackWise").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 40).style("font-size", "10px");

	wrapG.append("text").html("Matereality DL (enhancement)  - FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 60).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 75).style("font-size", "10px");
	wrapG.append("text").html("Adds in To-Be Process Highlights, New file naming standard, a a").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 75).style("font-size", "10px");
	wrapG.append("text").html("trigger by order numbers rather than hyperlinks").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 85).style("font-size", "10px");

	wrapG.append("text").html("Materality Batch Download – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 105).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 120).style("font-size", "10px");
	wrapG.append("text").html("Creating a new additional bot that would enable user to trigger").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 120).style("font-size", "10px");
	wrapG.append("text").html("batch downloads by specifying a date range to trigger bot").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 130).style("font-size", "10px");

	wrapG.append("text").html("IMPRESS Analytics – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 150).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 165).style("font-size", "10px");
	wrapG.append("text").html("Bot to pull reports from IMPRESS Instrument management").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 165).style("font-size", "10px");
	wrapG.append("text").html("systems for use by BD Insights platform").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 175).style("font-size", "10px");

	wrapG.append("text").html("Weekly QM12/QM15 Data Merge – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 195).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 210).style("font-size", "10px");
	wrapG.append("text").html("Runs two t-codes, downloads data, and merges in excel along").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 210).style("font-size", "10px");
	wrapG.append("text").html("with some macros activation and cell manipulagtions").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 220).style("font-size", "10px");

	wrapG.append("text").html("SDS Report – 0.5 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 240).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 255).style("font-size", "10px");
	wrapG.append("text").html("BOT mimics human actions to build a report for business users to").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 255).style("font-size", "10px");
	wrapG.append("text").html("track the status of Safety Data Sheets by country + business +").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 265).style("font-size", "10px");
	wrapG.append("text").html("material number").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 275).style("font-size", "10px");

}

function ProductLineManagement6U(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "140px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Claim POE Entry – 18.8 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("To create a claim evaluation").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("To create a claim evaluation").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("document, customer support will open").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 60).style("font-size", "10px");
	wrapG.append("text").html("an email from ERMS. Support will").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("check if the is duplicate complaint doc").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 80).style("font-size", "10px");
	wrapG.append("text").html("in the system based on PO and ship-to.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 90).style("font-size", "10px");

}

/*
 * ---- For Identify and refine performance indicators under Product Line
 * Management Process ----------
 */

function ProductLineManagement42(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "140px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("2 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("GCSreporting – NA – 5 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("To pull patch and AV information").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("status of the devices from RSS").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("(Imacros).").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 60).style("font-size", "10px");

	wrapG.append("text").html("GCS Metrics Submission – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 80).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 95).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 95).style("font-size", "10px");

}

/*
 * ---- For Product Life Cycle Management under Product Line Management Process
 * ----------
 */

function ProductLineManagement4(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 20),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "285px").attr("height", "210px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("5 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 145).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Kinetic Vision DL (2 bots) – 0.06 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 40).style("font-size", "10px");

	wrapG.append("text").html("Matereality DL – 0.12 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 60).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 75).style("font-size", "10px");
	wrapG.append("text").html("Download Material Testing raw").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 75).style("font-size", "10px");
	wrapG.append("text").html("data and associated reports").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 85).style("font-size", "10px");

	wrapG.append("text").html("Quality Dashboard (2 bots) – 3.8 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 105).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 120).style("font-size", "10px");
	wrapG.append("text").html("To prepare the BD product").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 120).style("font-size", "10px");
	wrapG.append("text").html("quality dashboard for").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 130).style("font-size", "10px");
	wrapG.append("text").html("complaints and defects data").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 140).style("font-size", "10px");
	wrapG.append("text").html("from SAP ECC, CRS system,").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 150).style("font-size", "10px");
	wrapG.append("text").html("Pilgrim").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 160).style("font-size", "10px");
}

/*
 * ---- For Characterize materials under Product Line Management Process
 * ----------
 */

function ProductLineManagement21(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "260px").attr("height", "115px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 115).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("BDBInstrumentsEquipment – 0.35 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("automate creation of BDB").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("equipment in SAP with serial").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("number and shipment details").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 60).style("font-size", "10px");
}

/*
 * ---- For Product and Process Change Management under Product Line Management
 * Process ----------
 */

function ProductLineManagement3(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 130),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "280px").attr("height", "250px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("4 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 130).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("BCTEC BDDS Batch Inquiry – 0.5 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("The BACTEC bot provides customers with").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("critical batchand expiry date").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("informationto optimize laboratory").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("workflow.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");

	wrapG.append("text").html("BDDS Cristal Data Upload SQL – 0.2 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 85).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("Automates the collection, consolidation,").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("and upload of inoculation data to SQL").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 110).style("font-size", "10px");

	wrapG.append("text").html("BDDS Plastic Data Upload SQL – 0.02 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 130).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 145).style("font-size", "10px");
	wrapG.append("text").html("Automates the collection, consolidation,").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 145).style("font-size", "10px");
	wrapG.append("text").html("and upload of inoculation data to SQL").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 155).style("font-size", "10px");

	wrapG.append("text").html("MPS Hypo – 10 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 175).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 190).style("font-size", "10px");
	wrapG.append("text").html("Gathers graphic files for certain SKU’s").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 190).style("font-size", "10px");
	wrapG.append("text").html("based off ECR from Amelia").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 200).style("font-size", "10px");

}

/*
 * ---- For Reporting under Record to Report Process ----------
 */

function RecordToReport2(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "150px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("2 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("CostCenterSAPQV – 0.10 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Consolidating all the cost center reports from").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("SAP into QlikView flat file format for Asia").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("region").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("GAMCDashboard 2 – 0.35 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 75).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("To automate the process retrieving GAMC").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("data from Hyperion Smart View").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");

}

/*
 * ---- For GL and Subledger Maintenance under Record to Report Process
 * ----------
 */

function RecordToReport5(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 120),
			y : (step.link.y1 + step.deploymentsCase.link.y - 270)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "320px").attr("height", "260px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("4 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 170).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Accrual Object Deactivation – 0.06 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Deactivate the accrual object based on Company code,").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Contract number , Sub ID and Item number.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");

	wrapG.append("text").html("ActualCosting – 0.00 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 65).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 80).style("font-size", "10px");
	wrapG.append("text").html("This bot creates the missing depreciation between 0L and L1").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 80).style("font-size", "10px");
	wrapG.append("text").html("ledgers to complete the calculation of real costs for").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("absorption method in material ledger process.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");

	wrapG.append("text").html("Athena Open Items DL (3 bots) – TBD FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 120).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 135).style("font-size", "10px");
	wrapG.append("text").html("To download open item managed data migrated to everest").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 135).style("font-size", "10px");
	wrapG.append("text").html("and compare to data from the source system (Monaco and").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 145).style("font-size", "10px");
	wrapG.append("text").html("4.0b) for purposes of confirming successful, complete and").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 155).style("font-size", "10px");
	wrapG.append("text").html("accurate data load of open items for Athena go live.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 165).style("font-size", "10px");

	wrapG.append("text").html("FinanceExcelIToPpt – 0.08 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 185).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 200).style("font-size", "10px");
	wrapG.append("text").html("Takes an emailed excel attachment, posts data to PPT file").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 200).style("font-size", "10px");
	wrapG.append("text").html("and emails back").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 210).style("font-size", "10px");

}

function RecordToReport41(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 130),
			y : (step.link.y1 + step.deploymentsCase.link.y - 140)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "230px").attr("height", "130px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("2 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 90).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Made2Manage – 1 FTE").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Process popsting in M2M system").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 35).style("font-size", "10px");

	wrapG.append("text").html("PointMan – 1 FTE").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 55).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("Process posting in PointMan").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("system").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 80).style("font-size", "10px");
}

function RecordToReport7(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.deploymentsCase.link.x - 90),
			y : (step.link.y1 + step.deploymentsCase.link.y - 100)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "230px").attr("height", "95px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 90).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("GLReconciliation – 1 FTE").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Clearing of GL reconciliation in").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("SAP ECC for North America").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
}

/*
 * ---- For Closing Journey Entries under Record to Report Process ----------
 */

function RecordToReport6(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "200px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("2 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("TaxPackage – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Preparing tax package").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("documentation for annual").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("statements").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("Tax Workpapers (3 bots) - FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 75).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("D1, BD2 and Bard's tax teams").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 90).style("font-size", "10px");
	wrapG.append("text").html("extract trial balances from their").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("respective ERP systems - SAP and").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 110).style("font-size", "10px");
	wrapG.append("text").html("Hyperion for BD1, BPC for BD2,").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 120).style("font-size", "10px");
	wrapG.append("text").html("and JD Edwards, MFGPro, and").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 130).style("font-size", "10px");
	wrapG.append("text").html("Hyperion for Bard - for a more than").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 140).style("font-size", "10px");
	wrapG.append("text").html("400 entities.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 150).style("font-size", "10px");

}


/*
 * ---- For Use Case View - GL and Subledger Maintenance under Record to Report
 * Process ----------
 */

function RecordToReport21U(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 190),
			y : (step.link.y1 + step.useCase.link.y - 230)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "260px").attr("height", "210px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("3 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Brazil Bank Update – 0.25 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 35).style("font-size", "10px");

	wrapG.append("text").html("Fiscal Books Batch Job for Millenium").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 55).style("font-size", "12px");
	wrapG.append("text").html("Extraction – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 70).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 85).style("font-size", "10px");
	wrapG.append("text").html("Run batch jobs to load/stage various").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 85).style("font-size", "10px");
	wrapG.append("text").html("financial reporting tables in SAP so that").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 95).style("font-size", "10px");
	wrapG.append("text").html("e-link to Millenium reporting tool can").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 105).style("font-size", "10px");
	wrapG.append("text").html("extract the right information for").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 115).style("font-size", "10px");
	wrapG.append("text").html("reporting to Brazilian government.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 125).style("font-size", "10px");

	wrapG.append("text").html("GDSN – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 145).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 160).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 160).style("font-size", "10px");

}

function RecordToReport3U(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 110),
			y : (step.link.y1 + step.useCase.link.y - 260)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "260px").attr("height", "250px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("3 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Corporate Consolidation – 0.12 FTE").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("More detailed requirements will be").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("provided, but the plan is the automate").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("several parity loads from CFN BPC, and steps").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("required to consolidate CFN results in HFM.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("We already have documented procedures to").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 75).style("font-size", "10px");
	wrapG.append("text").html("provide.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 85).style("font-size", "10px");

	wrapG.append("text").html("GAM Attachments – 0.05 FTE").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 105).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 120).style("font-size", "10px");
	wrapG.append("text").html("automatically complete the manual steps of:").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 120).style("font-size", "10px");
	wrapG.append("text").html("(1) Clicking through every submission screen").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 130).style("font-size", "10px");
	wrapG.append("text").html("for every unit in OTP GAM; (2) Finding all").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 140).style("font-size", "10px");
	wrapG.append("text").html("attachments on the screens; and (3)").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 150).style("font-size", "10px");
	wrapG.append("text").html("Downloading and saving the attachments").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 160).style("font-size", "10px");
	wrapG.append("text").html("into SharePoint.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 170).style("font-size", "10px");

	wrapG.append("text").html("US International Validation – 0.05 FTE").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 190).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 205).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 205).style("font-size", "10px");

}

function RecordToReport5U(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 110),
			y : (step.link.y1 + step.useCase.link.y - 130)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "260px").attr("height", "120px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Concur Reconciliations – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Reconciling Concur T&E data by").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("employee with SAP & SAE").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("entries to approve expense").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("reimbursements.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");

}

function RecordToReport7U(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 110),
			y : (step.link.y1 + step.useCase.link.y - 130)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "260px").attr("height", "120px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bots in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 110).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Internal Audit GL Dashboard – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("4 step process for collecting").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("data from SAP via the ACL tool").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");
	wrapG.append("text").html("in order to create a dashboard").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("for internal audit purposes").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 65).style("font-size", "10px");

}

/*
 * ---- For Accounting Policy Maintenance under Record to Report Process
 * ----------
 */

function RecordToReport8(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "230px").attr("height", "100px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 90).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("AccrualObjectDeactivation").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Deactivating accrual objects for").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("closing statements").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");

}

/*
 * ---- For Coordinate and execute consolidation and closing of books under
 * Record to Report Process ----------
 */

function RecordToReport31(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "230px").attr("height", "120px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",0).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 90).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("ARCashApplicationFrance").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Clearing payments in SAP 4.0b").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("for France").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 45).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 60).style("font-size", "10px");
	wrapG.append("text").html("FTE : 0.5").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 60).style("font-size", "10px");

}

/*
 * ---- For Big Data View - Supplier selection and contract negotiation under
 * Procure to Pay Process ----------
 */

function ProcureToPay22B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "200px").attr("height", "60px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Supplier Cockpit").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 15).style("font-size", "12px");

}

/*
 * ---- For Big Data View - POs and Recieving under Procure to Pay Process
 * ----------
 */

function ProcureToPay5B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 10)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "200px").attr("height", "70px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Indirect Purchasing &").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 15).style("font-size", "12px");
	wrapG.append("text").html("Invoice Processing").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 27).style("font-size", "12px");
}

/*
 * ---- For Big Data View - Administration and management of contract and for
 * compliance and value delivery under Procure to Pay Process ----------
 */

function ProcureToPay31B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "120px")
	.style("fill", "#b6d8ff").attr("x", 140).attr("y", -60).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",100).attr("y", -30).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 290).attr("y", -45	).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").text("Should Cost – 1 FTE").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",150).attr("y", -35).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",155).attr("y", -20).style("font-size", "10px");
	wrapG.append("text").html("Obtain the data from ECC manually to").style("fill", "#404041").style("font-weight", "500").attr("x",170).attr("y", -15).style("font-size", "12px");
	wrapG.append("text").html("perform should cost analysis and").style("fill", "#404041").style("font-weight", "500").attr("x",170).attr("y", -5).style("font-size", "12px");
	wrapG.append("text").html("fecilitate bids").style("fill", "#404041").style("font-weight", "500").attr("x",170).attr("y", 10).style("font-size", "12px");

}

/*
 * ---- For Big Data View - Strategy for sourcing within each category to
 * maximize value and reduce Total Cost of Ownership under Procure to Pay
 * Process ----------
 */

function ProcureToPay11B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
				x : (step.link.x1 + step.useCase.link.x - 10),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "260px").attr("height", "120px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("1 Bot in Development").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 160).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").text("Amazon Inventory Upload – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 15).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("Updating available inventory to Amazon").style("fill", "#404041").style("font-weight", "500").attr("x",35).attr("y", 30).style("font-size", "12px");
	wrapG.append("text").html("Web portal daily to reduce errors,").style("fill", "#404041").style("font-weight", "500").attr("x",35).attr("y", 45).style("font-size", "12px");
	wrapG.append("text").html("improve accuracy of inventory records,").style("fill", "#404041").style("font-weight", "500").attr("x",35).attr("y", 60).style("font-size", "12px");
	wrapG.append("text").html("and promote V. Mueller sales.").style("fill", "#404041").style("font-weight", "500").attr("x",35).attr("y", 75).style("font-size", "12px");
}

/*
 * ---- For Big Data View - Contract creation, processing and management under
 * Quote To Cash Process ----------
 */

function QuoteToCash31B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "200px").attr("height", "60px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Legal - Contract Insights").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 15).style("font-size", "12px");
	}


/*
 * ---- For Big Data View - Apply Price under Quote To Cash Process ----------
 */

function QuoteToCash21B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 10)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "200px").attr("height", "70px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("BDB - Pricing (Web Crawling)").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 15).style("font-size", "12px");
}

/*
 * ---- For Big Data View - Process Order under Quote To Cash Process ----------
 */

function QuoteToCash42B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 120),
			y : (step.link.y1 + step.useCase.link.y + 55)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "240px").attr("height", "70px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 140).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Optical Character Recognition (OCR) -").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 15).style("font-size", "12px");
	wrapG.append("text").html("Invoices (Greater Asia)").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 25).style("font-size", "12px");
}


/*
 * ---- For Big Data View - Application Performance Management under IT Trantion to Operation CI Process ----------
 */

function ItTransitionToOperationCI3B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 40),
			y : (step.link.y1 + step.useCase.link.y + 10)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "240px").attr("height", "70px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 140).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Information Security - DNS").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 15).style("font-size", "12px");
	wrapG.append("text").html("Monitoring Analytics").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 25).style("font-size", "12px");
}


/*
 * ---- For Big Data View - Develop Deployment Strategy under IT Trantion to Operation CI Process ----------
 */

function ItTransitionToOperationCI42B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 20)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "240px").attr("height", "70px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 140).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Information Security - Security").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 15).style("font-size", "12px");
	wrapG.append("text").html("Stack Analysis").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 25).style("font-size", "12px");
}




/*
 * ---- For Big Data View - Manage Portfolio under IT Strategy To Architecture
 * Process ----------
 */

function ITStrategyToArchitecture21B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 85),
			y : (step.link.y1 + step.useCase.link.y - 100)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "240px").attr("height", "90px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case (POC Complete)").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 140).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("IT Survey Analytics").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 15).style("font-size", "12px");
	wrapG.append("text").html("Provide Survey analytics to identify key").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("areas of improvement based on end user").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("feedback").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
}

/*
 * ---- For Big Data View - Monitor Productivity under Asset Acquire to Retire
 * Process ----------
 */

function AssetAcquireToRetire41B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 15)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "240px").attr("height", "90px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case (POC Complete)").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 140).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("BDB - Predictive Asset Maintenance").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 15).style("font-size", "12px");
	wrapG.append("text").html("Improving customer experience and").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("satisfaction by providing visibility into").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("when an instrument is going to fail.").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
}

/*
 * ---- For Big Data View - Manage Portfolio under Asset Acquire to Retire
 * Process ----------
 */

function AssetAcquireToRetire21B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 100),
			y : (step.link.y1 + step.useCase.link.y - 100)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "265px").attr("height", "90px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case (POC)").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 165).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("BDB - Technical Services Resource Forecasting").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 15).style("font-size", "10px");
	wrapG.append("text").html("Using Technician Stats and Details, build a model").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 30).style("font-size", "9px");
	wrapG.append("text").html("to forecast most effective resource allocation").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "9px");
}


/*
 * ---- For Big Data View - Define Performance Objectives under Hire to Retire
 * Process ----------
 */

function HireToRetire41B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 80),
			y : (step.link.y1 + step.useCase.link.y - 80)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "230px").attr("height", "70px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case (POC Complete)").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 130).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Sales Competency Analytics").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 15).style("font-size", "12px");}

/*
 * ---- For Big Data View - Manage Employee Information under Hire to Retire
 * Process ----------
 */

function HireToRetire71B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 120),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "300px").attr("height", "90px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case (On Track for Deployment)").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 200).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Workplace Environment - HR/Ethics Correlations").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 15).style("font-size", "12px");
	wrapG.append("text").html("Leveraging data from Ethics, Compliance, AccessHR,").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("Perceptyx, Termination etc. to identify signals").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("to be investigated further").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
}

/*
 * ---- For Big Data View - Define Requirements under New Product Development
 * Process ----------
 */

function NewProductDevelopment21B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 15)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "200px").attr("height", "70px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("BDT / BDG - Genomics").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 15).style("font-size", "10px");
	wrapG.append("text").html("Sequencing Analytics ").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 25).style("font-size", "10px");
}

/*
 * ---- For Big Data View - Evaluate ideas for feasibilty under Innovate To
 * Commercialization Process ----------
 */

function InnovateToCommercialization21B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 110),
			y : (step.link.y1 + step.useCase.link.y - 190)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "300px").attr("height", "180px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case (On Track)").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 200).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("MPS V.Mueller - IMPRESS Analytics").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 15).style("font-size", "10px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("create trending and predictive customer reports").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("generated using data from IMPRESS systems").style("fill", "#404041").style("font-weight", "500").attr("x",35).attr("y", 40).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("On-demand/Automated report generation").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 55).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("Customer segmentation across multiple identifiers").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("(Size, Region, GPO, Procedure type, Tray type, IDN)").style("fill", "#404041").style("font-weight", "500").attr("x",35).attr("y", 80).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 95).style("font-size", "10px");
	wrapG.append("text").html("Allow customers to define  - What does good look like").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 95).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 110).style("font-size", "10px");
	wrapG.append("text").html("Customized dashboards based on customer's desired fields").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 110).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 125).style("font-size", "10px");
	wrapG.append("text").html("Future State: Allow customers to pull their own dashboards").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 125).style("font-size", "10px");

}


/*
 * ---- For Big Data View - Develop Timeline under Innovate To Commercialization
 * Process ----------
 */

function InnovateToCommercialization31B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 200),
			y : (step.link.y1 + step.useCase.link.y - 15)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "200px").attr("height", "70px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("MMS Marketing Intelligence Tool").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 15).style("font-size", "10px");
	}


/*
 * ---- For Big Data View - Establish standards for launch and marketing plans
 * under Innovate To Commercialization Process ----------
 */

function InnovateToCommercialization32B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 15)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "200px").attr("height", "60px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Campaign Analytics - Marketo").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 15).style("font-size", "10px");
}

function ProductLineManagement31(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var gradient = svg.append("defs").append("linearGradient").attr("id",
	"gradient").attr("x1", "0%").attr("y1", "0%")
	.attr("x2", "100%").attr("y2", "100%").attr("spreadMethod",
			"pad");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x -250),
			y : (step.link.y1 + step.useCase.link.y -50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "250px").attr("height", "180px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");

	wrapG.append("image").attr("width", "20px").attr("height", "20px").attr("x", 100).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
		.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,20)");
	wrapG.append("image").attr("width", "60px").attr("height", "60px").attr("x", 20).attr("y", 0).attr("xlink:href", "img/assessments/imageProductLineManagement31.png");

	var text = wrapG.append("text").text("R&D Sustaining").attr("x", 100).attr("y", 20).style("fill", "#404041").style("font-size", "14px").style("font-weight", "bold").style("cursor", "pointer");
	var text = wrapG.append("text").text("Engineering").attr("x", 100).attr("y", 35).style("fill", "#404041").style("font-size", "14px").style("font-weight", "bold").style("cursor", "pointer");

	var text = wrapG.append("text").text("Keith Knapp").attr("x", 100).attr("y", 60).style("fill", "#404041").style("font-size", "11px").style("font-weight", "bold").style("cursor", "pointer");
	var text = wrapG.append("text").text("Sudarsan Srinivasan").attr("x", 100).attr("y", 75).style("fill", "#404041").style("font-size", "11px").style("font-weight", "bold").style("cursor", "pointer");

	wrapG.append("text").html("Automated software portal that automates").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 100).style("font-size", "10px");
	wrapG.append("text").html("the manual effort to analyze design inputs,").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 113).style("font-size", "10px");
	wrapG.append("text").html("gather relevant data from SAP, and update BD").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 126).style("font-size", "10px");
	wrapG.append("text").html("product labels. Reducing the process from 5").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 139).style("font-size", "10px");
	wrapG.append("text").html("Months to 4 Weeks for 8 Major Work Streams.").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 152).style("font-size", "10px");
}

function ItTransitionToOperationCI2UAmelia(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var gradient = svg.append("defs").append("linearGradient").attr("id",
	"gradient").attr("x1", "0%").attr("y1", "0%")
	.attr("x2", "100%").attr("y2", "100%").attr("spreadMethod",
			"pad");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 240),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "310px").attr("height", "310px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");

	wrapG.append("image").attr("width", "15px").attr("height", "15px").attr("x", 160).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
		.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,20)");
	wrapG.append("image").attr("width", "60px").attr("height", "60px").attr("x", 20).attr("y", 0).attr("xlink:href", "img/assessments/imageItTransitionToOperationCI2ItServiceDesk.png");

	var text = wrapG.append("text").text("IT Service Desk").attr("x", 100).attr("y", 20).style("fill", "#404041").style("font-size", "14px").style("font-weight", "bold").style("cursor", "pointer");

	var text = wrapG.append("text").text("Matt Avigliano").attr("x", 100).attr("y", 42).style("fill", "#404041").style("font-size", "11px").style("font-weight", "bold").style("cursor", "pointer");
	var text = wrapG.append("text").text("Mike LoRusso").attr("x", 100).attr("y", 54).style("fill", "#404041").style("font-size", "11px").style("font-weight", "bold").style("cursor", "pointer");
	var text = wrapG.append("text").text("Bob Shannon").attr("x", 100).attr("y", 66).style("fill", "#404041").style("font-size", "11px").style("font-weight", "bold").style("cursor", "pointer");

	wrapG.append("text").html("Deploying Amelia on Service Desk will absorb the high").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 85).style("font-size", "10px");
	wrapG.append("text").html("volume L1 queries, thus allowing BD to reduce the time and ").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 97).style("font-size", "10px");
	wrapG.append("text").html("overhead associated with Service Desk requests while").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 109).style("font-size", "10px");
	wrapG.append("text").html("improving end users experience.").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 121).style("font-size", "10px");

	wrapG.append("image").attr("width", "280px").attr("height", "60px").attr("x", 20).attr("y", 110).attr("xlink:href", "img/assessments/imageLineInsideFrame.png");

	wrapG = cCanvas.append("g").attr("transform", "translate(0,20)");
	wrapG.append("image").attr("width", "60px").attr("height", "60px").attr("x", 20).attr("y", 160).attr("xlink:href", "img/assessments/imageItTransitionToOperationCI2BDBardBack.png");
	wrapG.append("image").attr("width", "60px").attr("height", "60px").attr("x", 20).attr("y", 155).attr("xlink:href", "img/assessments/imageItTransitionToOperationCI2BDBardFore.png");

	var text = wrapG.append("text").text("BD-Bard Cross").attr("x", 100).attr("y", 175).style("fill", "#404041").style("font-size", "14px").style("font-weight", "bold").style("cursor", "pointer");
	var text = wrapG.append("text").text("Company Access").attr("x", 100).attr("y", 187).style("fill", "#404041").style("font-size", "14px").style("font-weight", "bold").style("cursor", "pointer");

	var text = wrapG.append("text").text("BD: Ryan Yardis").attr("x", 100).attr("y", 205).style("fill", "#404041").style("font-size", "11px").style("font-weight", "bold").style("cursor", "pointer");
	var text = wrapG.append("text").text("Bard: Michael Acque").attr("x", 100).attr("y", 218).style("fill", "#404041").style("font-size", "11px").style("font-weight", "bold").style("cursor", "pointer");

	wrapG.append("text").html("Deploying Amelia on Service Desk will absorb the high").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 235).style("font-size", "10px");
	wrapG.append("text").html("volume L1 queries, thus allowing BD to reduce the time and ").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 247).style("font-size", "10px");
	wrapG.append("text").html("overhead associated with Service Desk requests while").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 259).style("font-size", "10px");
	wrapG.append("text").html("improving end users experience.").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 271).style("font-size", "10px");
}

/*
 * ---- For Big Data View - Update forcast based on performance under Plan To
 * Forecast Process ----------
 */

function PlanToForecast71B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 90),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "220px").attr("height", "90px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 120).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Eight Quarter Forecast -").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",30).attr("y", 15).style("font-size", "11px");
	wrapG.append("text").html("Predict shift in raw material spend").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 27).style("font-size", "11px");
	wrapG.append("text").html("due to movement in spot and").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 37).style("font-size", "11px");
	wrapG.append("text").html("future prices for commodities").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 47).style("font-size", "11px");
	}

/*
 * ---- For Big Data View - Prepare and review GL account reconcillations under
 * Record To Report Process ----------
 */

function RecordToReport52B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 225),
			y : (step.link.y1 + step.useCase.link.y - 20)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "220px").attr("height", "75px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 120).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Accounts Receivables -").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",30).attr("y", 15).style("font-size", "11px");
	wrapG.append("text").html("Creating a global view incorporating").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 27).style("font-size", "11px");
	wrapG.append("text").html("various rules and processes").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 37).style("font-size", "11px");
	}

/*
 * ---- For Big Data View - Prepare and review GL account reconcillations under
 * Record To Report Process ----------
 */

function RecordToReport62B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 20)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "220px").attr("height", "90px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "14px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 120).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Internal Audit - Topic Discovery").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",30).attr("y", 15).style("font-size", "11px");
	wrapG.append("text").html("on Manual G/L entries, using").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 27).style("font-size", "11px");
	wrapG.append("text").html("machine learning to identify").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 37).style("font-size", "11px");
	wrapG.append("text").html("potential risks").style("fill", "#404041").style("font-weight", "500").attr("x",30).attr("y", 47).style("font-size", "11px");
	}

/*
 * ---- For Big Data View - Manage Portfolio under Plan To Delivery Process
 * ----------
 */

function PlanToDelivery21B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 80),
			y : (step.link.y1 + step.useCase.link.y - 85)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "205px").attr("height", "65px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Oppurtunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "15px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 105).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Inventory Management").style("fill", "#404041").style("font-weight", "550").style("font-style", "Bold").attr("x",25).attr("y", 15).style("font-size", "12px");
}


/*
 * ---- For Big Data View - Plan and manage inbound material flow under Plan To Delivery Process
 * ----------
 */

function PlanToDelivery61B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 80),
			y : (step.link.y1 + step.useCase.link.y - 85)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "205px").attr("height", "65px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Oppurtunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "15px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 105).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Back Order Management").style("fill", "#404041").style("font-weight", "550").style("font-style", "Bold").attr("x",25).attr("y", 15).style("font-size", "12px");
}


/*
 * ---- For Big Data View - Develop Forecast under Plan To Delivery Process
 * ----------
 */

function PlanToDelivery11B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 210),
			y : (step.link.y1 + step.useCase.link.y - 10)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "205px").attr("height", "65px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Oppurtunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "15px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 105).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("MPS - Injection Systems").style("fill", "#404041").style("font-weight", "500").style("font-style", "Bold").attr("x",25).attr("y", 15).style("font-size", "11px");
	wrapG.append("text").html("Forecast Accuracy").style("fill", "#404041").style("font-weight", "500").style("font-style", "Bold").attr("x",25).attr("y", 25).style("font-size", "11px");

	wrapG.append("image").attr("width", "112px").attr("height", "85px").attr("x",25).attr("y", -120).attr("xlink:href", "img/assessments/imagePlanToDelivery11B.png");
}


/*
 * ---- For Big Data View - Outbound Logistics under Plan To Delivery Process
 * ----------
 */
 function PlanToDelivery5(step) {
 	var mapContainer = d3.select("div#mapContainer");
 	var svg = mapContainer.select("svg");
 	var flowCanvas = svg.select("g#flowCanvas");

 	var pos = {
 			x : (step.link.x1 + step.deploymentsCase.link.x - 110),
 			y : (step.link.y1 + step.deploymentsCase.link.y - 130)
 		};

 	var cCanvas = flowCanvas
 	.append("g")
 	.attr("class", "useCaseOptions")
 	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

 	cCanvas.append("rect").attr("width", "225px").attr("height", "120px")
 	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
 			"filter", "url(#drop-shadow)");

 	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
 	wrapG.append("text").text("2 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",-10).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
 	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 80).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
 	.on("click", function(){
 		flowCanvas.selectAll("g.useCaseOptions").remove();
 	});

 	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
 	wrapG.append("text").html("KoreaChemicalsManagement (2").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
 	wrapG.append("text").html("bots) – 0.14 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 35).style("font-size", "12px");
 	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
 	wrapG.append("text").html("accesses the Korea Chemicals").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 50).style("font-size", "10px");
 	wrapG.append("text").html("Management Act site and create").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 60).style("font-size", "10px");
 	wrapG.append("text").html("documents with data received").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
 }

 function PlanToDelivery63(step) {
 	var mapContainer = d3.select("div#mapContainer");
 	var svg = mapContainer.select("svg");
 	var flowCanvas = svg.select("g#flowCanvas");

 	var pos = {
 			x : (step.link.x1 + step.deploymentsCase.link.x - 280),
 			y : (step.link.y1 + step.deploymentsCase.link.y - 50)
 		};

 	var cCanvas = flowCanvas
 	.append("g")
 	.attr("class", "useCaseOptions")
 	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

 	cCanvas.append("rect").attr("width", "270px").attr("height", "180px")
 	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
 			"filter", "url(#drop-shadow)");

 	var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
 	wrapG.append("text").text("2 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",-10).attr("y", 25).style("text-anchor", "middle").style("font-size", "16px");
 	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 80).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
 	.on("click", function(){
 		flowCanvas.selectAll("g.useCaseOptions").remove();
 	});

 	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
 	wrapG.append("text").html("Consignment_VendorInventoryMaster –").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
 	wrapG.append("text").html("0.06 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 35).style("font-size", "12px");
 	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
 	wrapG.append("text").html("runs t-codes LX03, MB51, ME1M, generates a").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 50).style("font-size", "10px");
 	wrapG.append("text").html("file with consolidated date, segregates data in").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 60).style("font-size", "10px");
 	wrapG.append("text").html("different files per vendor and emails each").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 70).style("font-size", "10px");
 	wrapG.append("text").html("vendor’s contact.").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 80).style("font-size", "10px");

	wrapG.append("text").html("Inventory Projections – 0.03 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 100).style("font-size", "12px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 115).style("font-size", "10px");
	wrapG.append("text").html("Extracts ATD Receipts, In Transit and Plant Total").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 115).style("font-size", "10px");
	wrapG.append("text").html("Receipts. Out of SAP").style("fill", "#404041").style("font-weight", "500").attr("x",40).attr("y", 125).style("font-size", "10px");
 }

function PlanToDelivery7B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 70)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "275px").attr("height", "190px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("2 Bots in Development").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "15px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 175).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Correct EEDI after ITN – Correct ITN – 2 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",25).attr("y", 15).style("font-size", "11px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("A report is required to compare any EEI").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("data discrepancies between ITN receipt").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("and ITN after confirmed on board. GTS").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("needs to be able to automatically").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 60).style("font-size", "10px");
	wrapG.append("text").html("correct required EEI data after ITN").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 70).style("font-size", "10px");
	wrapG.append("text").html("receipt.").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 80).style("font-size", "10px");

	wrapG.append("text").html("Correct EEI after ITN - ITN Verification – 2").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",25).attr("y", 100).style("font-size", "11px");
	wrapG.append("text").html("FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",25).attr("y", 120).style("font-size", "11px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 135).style("font-size", "10px");
	wrapG.append("text").html("This bot goes into GTS and verifies all of").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 135).style("font-size", "10px");
	wrapG.append("text").html("the ITN corrections that were made.").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 145).style("font-size", "10px");
//	wrapG.append("image").attr("width", "162px").attr("height", "109px").attr("x",60).attr("y", 170).attr("xlink:href", "img/assessments/imagePlanToDelivery7B.png");
}

/*
 * ---- For Big Data View - Plan for and implement modifications under Product Line Management
 * ----------
 */

function ProductLineManagement31B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x + 50),
			y : (step.link.y1 + step.useCase.link.y - 70)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "225px").attr("height", "110px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case (On Track)").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "15px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 125).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("MES - Control Charts").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",25).attr("y", 15).style("font-size", "11px");

	wrapG.append("text").html("Identifying machines or lines not").style("fill", "#404041").style("font-weight", "500").attr("x", 25).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("operating within normal control limits").style("fill", "#404041").style("font-weight", "500").attr("x", 25).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("for good quantity, scrap, downtime and").style("fill", "#404041").style("font-weight", "500").attr("x", 25).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("process parameters and predicting").style("fill", "#404041").style("font-weight", "500").attr("x", 25).attr("y", 60).style("font-size", "10px");
	wrapG.append("text").html("which machines are at risk of failing.").style("fill", "#404041").style("font-weight", "500").attr("x", 25).attr("y", 70).style("font-size", "10px");

	wrapG.append("image").attr("width", "160").attr("height", "80").attr("x",50).attr("y", 82).attr("xlink:href", "img/assessments/imageProductLineManagement31B.png");
}

/*
 * ---- For Big Data View - Inbound Logistics and Warehousing under Plan To Delivery Process
 * ----------
 */

function PlanToDelivery6B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 100),
			y : (step.link.y1 + step.useCase.link.y - 280)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "360px").attr("height", "270px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("4 Bots in Development").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "15px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 250).attr("y", 10).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("MPS Sharps In-Bond Shipping – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",25).attr("y", 15).style("font-size", "11px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("Flextronics manufactures products for BD in Mexico which are").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("imported to the US via bonded shipping and distributed world-wide to").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 40).style("font-size", "10px");
	wrapG.append("text").html("BD regional DCs.  This project will automate the management of that").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("manual import and distribution process.").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 60).style("font-size", "10px");

	wrapG.append("text").html("Safety Stock Modelling – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",25).attr("y", 80).style("font-size", "11px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 95).style("font-size", "10px");
	wrapG.append("text").html("Login to SAP Portal and generate two reports i.e 'DP Waterfall Chart'").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 95).style("font-size", "10px");
	wrapG.append("text").html("and 'MB51' for the current  month for different businesses mentioned").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 105).style("font-size", "10px");
	wrapG.append("text").html("in the excel input file placed at shared network folder and Save these").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 115).style("font-size", "10px");
	wrapG.append("text").html("reports in their respective folders on the same shared network folder.").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 125).style("font-size", "10px");

	wrapG.append("text").html("Update SAP Back Order Table – FTE TBD").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",25).attr("y", 155).style("font-size", "11px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 160).style("font-size", "10px");
	wrapG.append("text").html("Description TBD").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 170).style("font-size", "10px");

	wrapG.append("text").html("USDA Export Packet – 0.75 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",25).attr("y", 190).style("font-size", "11px");
	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 205).style("font-size", "10px");
	wrapG.append("text").html("create 'packets' for each FERT/batch that we ship that show all of the").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 205).style("font-size", "10px");
	wrapG.append("text").html("batches of AO raw materials used in every batch of FERT, matched up").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 215).style("font-size", "10px");
	wrapG.append("text").html("with the incoming raw material batch #'s and incoming veterinary").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 225).style("font-size", "10px");
	wrapG.append("text").html("certificates for that batch").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 135).style("font-size", "10px");
}

/*
 * ---- For Big Data View - Inbound Logistics and Warehousing under Plan To Delivery Process
 * ----------
 */

function PlanToDelivery13B(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 150),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "225px").attr("height", "130px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(80,0)");
	wrapG.append("text").text("Use Case Opportunity").style("fill", "#f27707").style("font-weight", "700").style("font-style", "Bold").attr("x",-50).attr("y", 25).style("font-size", "15px");
	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 125).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("DC Workload Forecasting & Metrics").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",25).attr("y", 15).style("font-size", "11px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("Inbound receiving forecasts").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 30).style("font-size", "10px");
	wrapG.append("text").html("by truckload").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 40).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("Outbound shipping forecasts").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 55).style("font-size", "10px");
	wrapG.append("text").html("by case").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 65).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 80).style("font-size", "10px");
	wrapG.append("text").html("Inbound receiving").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 80).style("font-size", "10px");

	wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",20).attr("y", 95).style("font-size", "10px");
	wrapG.append("text").html("Outbound shipping").style("fill", "#404041").style("font-weight", "500").attr("x", 35).attr("y", 95).style("font-size", "10px");

}

function PlanToDelivery14B(step) {
		var mapContainer = d3.select("div#mapContainer");
		var svg = mapContainer.select("svg");
		var flowCanvas = svg.select("g#flowCanvas");

		var pos = {
				x : (step.link.x1 + step.deploymentsCase.link.x + 60),
				y : (step.link.y1 + step.deploymentsCase.link.y - 35)
			};

		var cCanvas = flowCanvas
		.append("g")
		.attr("class", "useCaseOptions")
		.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

		cCanvas.append("rect").attr("width", "280px").attr("height", "300px")
		.style("fill", "#b6d8ff").attr("x", -150).attr("y", 90).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
				"filter", "url(#drop-shadow)");

		var wrapG = cCanvas.append("g").attr("transform", "translate(125,0)");
		wrapG.append("text").text("5 Bots in Production").style("fill", "#f27707").style("font-weight", "800").style("font-style", "Bold").attr("x",-150).attr("y", 120).style("text-anchor", "middle").style("font-size", "16px");
		wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", -20).attr("y", 100).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
		.on("click", function(){
			flowCanvas.selectAll("g.useCaseOptions").remove();
		});

		wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
		wrapG.append("text").html("HK Pricing Master Data - 0.05 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",-130).attr("y", 120).style("font-size", "12px");
		wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",-125).attr("y", 140).style("font-size", "10px");
		wrapG.append("text").html("To update pricing for HK in SAP 4.0B (VK11) from").style("fill", "#404041").style("font-weight", "500").attr("x",-110).attr("y", 140).style("font-size", "10px");
		wrapG.append("text").html("ePrice system").style("fill", "#404041").style("font-weight", "500").attr("x",-110).attr("y", 150).style("font-size", "10px");

		wrapG.append("text").html("Forecast Horizon Deletion – 0.06 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",-130).attr("y", 170).style("font-size", "12px");
		wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",-125).attr("y", 190).style("font-size", "10px");
		wrapG.append("text").html("TBD").style("fill", "#404041").style("font-weight", "500").attr("x",-110).attr("y", 190).style("font-size", "10px");

		wrapG.append("text").html("SC Metrics Dashboard (6 bots) – 1.62 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",-130).attr("y", 210).style("font-size", "12px");
		wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",-125).attr("y", 230).style("font-size", "10px");
		wrapG.append("text").html("Downloads various metrcis from SAP and uploads").style("fill", "#404041").style("font-weight", "500").attr("x",-110).attr("y", 230).style("font-size", "10px");
		wrapG.append("text").html("them to a shared drivr").style("fill", "#404041").style("font-weight", "500").attr("x",-110).attr("y", 240).style("font-size", "10px");

		wrapG.append("text").html("SEAandHKBelowMarginPricing – 0.05 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",-130).attr("y", 260).style("font-size", "12px");
		wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",-125).attr("y", 280).style("font-size", "10px");
		wrapG.append("text").html("To update below margin pricing for SEA and HK in SAP").style("fill", "#404041").style("font-weight", "500").attr("x",-110).attr("y", 280).style("font-size", "10px");
		wrapG.append("text").html("4.0B (VK11)").style("fill", "#404041").style("font-weight", "500").attr("x",-110).attr("y", 290).style("font-size", "10px");

		wrapG.append("text").html("SEAPricingMaster – 0.05 FTEs").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",-130).attr("y", 310).style("font-size", "12px");
		wrapG.append("text").html("&#8226").style("fill", "#404041").style("font-weight", "500").attr("x",-125).attr("y", 330).style("font-size", "10px");
		wrapG.append("text").html("To update pricing for SEA in SAP 4.0B (VK11) from").style("fill", "#404041").style("font-weight", "500").attr("x",-110).attr("y", 330).style("font-size", "10px");
		wrapG.append("text").html("flowtrix system").style("fill", "#404041").style("font-weight", "500").attr("x",-110).attr("y", 340).style("font-size", "10px");

}

/*
 * ---- For Process Orchestration View - Procure To Pay Process
 * ----------
 */

function ProcureToPayPO(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 80),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "180px").attr("height", "130px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(0,0)");
	wrapG.append("text").html("Global Process Owner:").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("Roger Ambrose").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",35).attr("y", 35).style("font-size", "12px");

	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 165).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG.append("image").attr("width", "180px").attr("height", "60px").attr("x", 0).attr("y", 20).attr("xlink:href", "img/assessments/imageLineInsideFramePO.png");

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Stage 1: Complete").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Stage 2: Start Date TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("Stage 3: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("Stage 4: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 80).style("font-size", "10px");

}


/*
 * ---- For Process Orchestration View - Quote To Cash Process
 * ----------
 */

function QuoteToCashPO(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 80),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "180px").attr("height", "130px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(0,0)");
	wrapG.append("text").html("Global Process Owner:").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	//wrapG.append("text").html(" ").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",35).attr("y", 35).style("font-size", "12px");

	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 165).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG.append("image").attr("width", "180px").attr("height", "60px").attr("x", 0).attr("y", 20).attr("xlink:href", "img/assessments/imageLineInsideFramePO.png");

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Stage 1: EU Only").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Stage 2: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("Stage 3: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("Stage 4: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 80).style("font-size", "10px");
}


/*
 * ---- For Process Orchestration View - IT Design To Build Process
 * ----------
 */

function ITDesignToBuildPO(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 80),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "180px").attr("height", "130px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(0,0)");
	wrapG.append("text").html("Global Process Owner:").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("Michele Cevoli").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",35).attr("y", 35).style("font-size", "12px");

	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 165).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG.append("image").attr("width", "180px").attr("height", "60px").attr("x", 0).attr("y", 20).attr("xlink:href", "img/assessments/imageLineInsideFramePO.png");

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Stage 1: In Process").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Stage 2: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("Stage 3: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("Stage 4: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 80).style("font-size", "10px");
}

/*
 * ---- For Process Orchestration View - Talent Planning Acquisition Process
 * ----------
 */

function TalentPlanningAcquisitionPO(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 80),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "180px").attr("height", "130px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(0,0)");
	wrapG.append("text").html("Global Process Owner:").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("Lisa King").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",35).attr("y", 35).style("font-size", "12px");

	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 165).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG.append("image").attr("width", "180px").attr("height", "60px").attr("x", 0).attr("y", 20).attr("xlink:href", "img/assessments/imageLineInsideFramePO.png");

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Stage 1: Complete").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Stage 2: Start Date TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("Stage 3: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("Stage 4: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 80).style("font-size", "10px");
}

/*
 * ---- For Process Orchestration View - Hire To Retire Process
 * ----------
 */

function HireToRetirePO(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 80),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "180px").attr("height", "130px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(0,0)");
	wrapG.append("text").html("Global Process Owner:").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	wrapG.append("text").html("Lisa King").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",35).attr("y", 35).style("font-size", "12px");

	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 165).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG.append("image").attr("width", "180px").attr("height", "60px").attr("x", 0).attr("y", 20).attr("xlink:href", "img/assessments/imageLineInsideFramePO.png");

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Stage 1: Complete").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Stage 2: Start Date TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("Stage 3: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("Stage 4: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 80).style("font-size", "10px");
}

/*
 * ---- For Process Orchestration View - Plan To Forecast Process
 * ----------
 */

function PlanToForecastPO(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 80),
			y : (step.link.y1 + step.useCase.link.y + 50)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "180px").attr("height", "130px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(0,0)");
	wrapG.append("text").html("Global Process Owner:").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	//wrapG.append("text").html("Lisa King").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",35).attr("y", 35).style("font-size", "12px");

	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 165).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG.append("image").attr("width", "180px").attr("height", "60px").attr("x", 0).attr("y", 20).attr("xlink:href", "img/assessments/imageLineInsideFramePO.png");

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Stage 1: Complete").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html("Stage 2: In Process").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("Stage 3: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("Stage 4: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 80).style("font-size", "10px");
}

/*
 * ---- For Process Orchestration View - Record To Report(Consolidations) Process
 * ----------
 */

function RecordToReportPO(step) {
	var mapContainer = d3.select("div#mapContainer");
	var svg = mapContainer.select("svg");
	var flowCanvas = svg.select("g#flowCanvas");

	var pos = {
			x : (step.link.x1 + step.useCase.link.x - 70),
			y : (step.link.y1 + step.useCase.link.y - 150)
		};

	var cCanvas = flowCanvas
	.append("g")
	.attr("class", "useCaseOptions")
	.attr("transform", "translate(" + pos.x + "," + pos.y + ")");

	cCanvas.append("rect").attr("width", "180px").attr("height", "140px")
	.style("fill", "#b6d8ff").attr("x", 0).attr("y", 0).style("fill-opacity", 1).attr("rx", 20).attr("ry", 20).style(
			"filter", "url(#drop-shadow)");

	var wrapG = cCanvas.append("g").attr("transform", "translate(0,0)");
	wrapG.append("text").html("Global Process Owner:").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",20).attr("y", 20).style("font-size", "12px");
	//wrapG.append("text").html("Lisa King").style("fill", "#404041").style("font-weight", "600").style("font-style", "Bold").attr("x",35).attr("y", 35).style("font-size", "12px");

	wrapG.append("image").attr("width", "10px").attr("height", "10px").attr("x", 165).attr("y", 5).style("cursor", "pointer").attr("xlink:href", "img/assessments/close.png")
	.on("click", function(){
		flowCanvas.selectAll("g.useCaseOptions").remove();
	});

	wrapG.append("image").attr("width", "180px").attr("height", "60px").attr("x", 0).attr("y", 20).attr("xlink:href", "img/assessments/imageLineInsideFramePO.png");

	wrapG = cCanvas.append("g").attr("transform", "translate(0,30)");
	wrapG.append("text").html("Stage 1: Consolidations").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 35).style("font-size", "10px");
	wrapG.append("text").html(" - In Process").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 50).style("font-size", "10px");
	wrapG.append("text").html("Stage 2: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 65).style("font-size", "10px");
	wrapG.append("text").html("Stage 3: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 80).style("font-size", "10px");
	wrapG.append("text").html("Stage 4: TBD").style("fill", "#404041").style("font-weight", "500").attr("x",25).attr("y", 95).style("font-size", "10px");
}
