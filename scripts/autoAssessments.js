var getAssessmentAttributes = function(assessment) {
	var attrs = {
		MachineLearning : {
			image : "img/assessments/ml.png"
		},
		SmartWorkFlows : {
			image : "img/assessments/smartWorkFlows.png"
		},
		NLP : {
			image : "img/assessments/nlp.png"
		},
		RPA : {
			image : "img/assessments/rpa.png"
		},
	}

	if (assessment) {
		return attrs[assessment];
	} else {
		return attrs;
	}
}

var getContentAttributes = function(content) {
	var attrs = {
		ProductionRPABusinessBots : {
			image : "img/assessments/rpa.png"
		},
		ProductiveCognitiveEndUserSupport : {
			image : "img/assessments/ameliaFront.png"
		},
		E2EProcessAssessmentOpportunityArea : {
			image : "img/assessments/processAssessments.png"
		},
		RecordToReportPO : {
			image : "img/assessments/iconProcess.png"
		}
	}

	if (content) {
		return attrs[content];
	} else {
		return attrs;
	}
}

var getUseCaseAttributes = function(useCase) {
	var attrs = {
		Amelia : {
			image : "img/assessments/ameliaFront.png"
		},
		ProcureToPay6 : {
			image : "img/assessments/iconRPA.png"
		},
		ProcureToPay7 : {
			image : "img/assessments/iconRPA.png"
		},
		ProcureToPay22 : {
			image : "img/assessments/iconRPA.png"
		},
		ProcureToPay41 : {
			image : "img/assessments/ameliaFront.png"
		},
		ProcureToPay511 : {
			image : "img/assessments/iconRPA.png"
		},
		ProcureToPay511U : {
			image : "img/assessments/iconRPA.png"
		},
		ProcureToPay52 : {
			image : "img/assessments/iconRPA.png"
		},
		ProcureToPay52U : {
			image : "img/assessments/iconRPA.png"
		},
		ProcureToPay61 : {
			image : "img/assessments/iconRPA.png"
		},
		PlanToForecast22 : {
			image : "img/assessments/iconRPA.png"
		},
		PlanToForecast22U : {
			image : "img/assessments/iconRPA.png"
		},
		PlanToForecast22U : {
			image : "img/assessments/iconRPA.png"
		},
		PlanToForecast53 : {
			image : "img/assessments/iconRPA.png"
		},
		PlanToForecast62 : {
			image : "img/assessments/iconRPA.png"
		},
		PlanToForecast2 : {
			image : "img/assessments/iconRPA.png"
		},
		PlanToForecast5 : {
			image : "img/assessments/iconRPA.png"
		},

		PlanToDelivery5 : {
			image : "img/assessments/iconRPA.png"
		},
		PlanToDelivery63 : {
			image : "img/assessments/iconRPA.png"
		},
		PlanToDelivery7 : {
			image : "img/assessments/iconRPA.png"
		},
		PlanToDelivery2 : {
			image : "img/assessments/iconRPA.png"
		},

		PlanToDelivery12 : {
			image : "img/assessments/iconRPA.png"
		},

		PlanToDelivery21 : {
			image : "img/assessments/iconRPA.png"
		},
		PlanToDelivery32 : {
			image : "img/assessments/iconRPA.png"
		},
		PlanToDelivery72 : {
			image : "img/assessments/iconRPA.png"
		},
		ITStrategyToArchitecture2 : {
			image : "img/assessments/iconRPA.png"
		},
		ITStrategyToArchitecture2U : {
			image : "img/assessments/iconRPA.png"
		},
		QuoteToCash2 : {
			image : "img/assessments/iconRPA.png"
		},
		QuoteToCash2U : {
			image : "img/assessments/iconRPA.png"
		},
		QuoteToCash42 : {
			image : "img/assessments/iconRPA.png"
		},
		QuoteToCash42U : {
			image : "img/assessments/iconRPA.png"
		},
		QuoteToCash6U : {
			image : "img/assessments/iconRPA.png"
		},
		QuoteToCash61 : {
			image : "img/assessments/iconRPA.png"
		},
		QuoteToCash51 : {
			image : "img/assessments/iconRPA.png"
		},
		QuoteToCash51U : {
			image : "img/assessments/iconRPA.png"
		},
		QuoteToCash51U2 : {
			image : "img/assessments/iconRPA.png"
		},
		QuoteToCash72 : {
			image : "img/assessments/iconRPA.png"
		},
		QuoteToCash72U : {
			image : "img/assessments/iconRPA.png"
		},
		QuoteToCash1 : {
			image : "img/assessments/iconRPA.png"
		},
		ItTransitionToOperationCI21 : {
			image : "img/assessments/iconRPA.png"
		},
		ItTransitionToOperationCI21U : {
			image : "img/assessments/iconRPA.png"
		},
		ItTransitionToOperationCI31 : {
			image : "img/assessments/iconRPA.png"
		},
		ItTransitionToOperationCI31U : {
			image : "img/assessments/iconRPA.png"
		},
		ItTransitionToOperationCI2UAmelia : {
			image : "img/assessments/ameliaFront.png"
		},
		ItTransitionToOperationCI3 : {
			image : "img/assessments/iconRPA.png"
		},
		ItTransitionToOperationCI2U : {
			image : "img/assessments/iconRPA.png"
		},
		ItTransitionToOperationCI4 : {
			image : "img/assessments/iconRPA.png"
		},
		AquireToRetire3D :{
			image : "img/assessments/iconRPA.png"
		},
		AquireToRetire4U :{
			image : "img/assessments/iconRPA.png"
		},
		HireToRetire31 : {
			image : "img/assessments/iconRPA.png"
		},
		HireToRetire71 : {
			image : "img/assessments/iconRPA.png"
		},
		NewProductDevelopment43 : {
			image : "img/assessments/iconRPA.png"
		},
		ITDesignToBuildModel3 : {
			image : "img/assessments/iconRPA.png"
		},
		ITDesignToBuildModel4 : {
			image : "img/assessments/iconRPA.png"
		},
		NewProductDevelopment31 : {
			image : "img/assessments/iconRPA.png"
		},
		ProductLineManagement2 : {
			image : "img/assessments/iconRPA.png"
		},
		ProductLineManagement4U : {
			image : "img/assessments/iconRPA.png"
		},
		ProductLineManagement6U : {
			image : "img/assessments/iconRPA.png"
		},
		ProductLineManagement42 : {
			image : "img/assessments/iconRPA.png"
		},
		ProductLineManagement4 : {
			image : "img/assessments/iconRPA.png"
		},
		ProductLineManagement21 : {
			image : "img/assessments/iconRPA.png"
		},
		ProductLineManagement3 : {
			image : "img/assessments/iconRPA.png"
		},
		RecordToReport2 : {
			image : "img/assessments/iconRPA.png"
		},
		RecordToReport41 : {
			image : "img/assessments/iconRPA.png"
		},
		RecordToReport5 : {
			image : "img/assessments/iconRPA.png"
		},
		RecordToReport7 : {
			image : "img/assessments/iconRPA.png"
		},
		RecordToReport6 : {
			image : "img/assessments/iconRPA.png"
		},
		RecordToReport21U : {
			image : "img/assessments/iconRPA.png"
		},
		RecordToReport3U : {
			image : "img/assessments/iconRPA.png"
		},
		RecordToReport5U : {
			image : "img/assessments/iconRPA.png"
		},
		RecordToReport7U : {
			image : "img/assessments/iconRPA.png"
		},
		RecordToReport8 : {
			image : "img/assessments/iconRPA.png"
		},
		RecordToReport31 : {
			image : "img/assessments/iconRPA.png"
		},
		ProcureToPay22B : {
			image : "img/assessments/iconBigData.png"
		},
		ProcureToPay5B : {
			image : "img/assessments/iconBigData.png"
		},
		ProcureToPay31B : {
			image : "img/assessments/iconRPA.png"
		},
		ProcureToPay11B : {
			image : "img/assessments/iconRPA.png"
		},
		QuoteToCash21B : {
			image : "img/assessments/iconBigData.png"
		},
		QuoteToCash42B : {
			image : "img/assessments/iconBigData.png"
		},
		QuoteToCash31B : {
			image : "img/assessments/iconBigData.png"
		},
		ITStrategyToArchitecture21B : {
			image : "img/assessments/iconBigData.png"
		},
		AssetAcquireToRetire41B : {
			image : "img/assessments/iconBigData.png"
		},
		AssetAcquireToRetire21B : {
			image : "img/assessments/iconBigData.png"
		},
		HireToRetire41B : {
			image : "img/assessments/iconBigData.png"
		},
		HireToRetire71B : {
			image : "img/assessments/iconBigData.png"
		},
		NewProductDevelopment21B : {
			image : "img/assessments/iconBigData.png"
		},
		InnovateToCommercialization21B : {
			image : "img/assessments/iconBigData.png"
		},
		InnovateToCommercialization31B : {
			image : "img/assessments/iconBigData.png"
		},
		InnovateToCommercialization32B : {
			image : "img/assessments/iconBigData.png"
		},
		ProductLineManagement31 : {
			image : "img/assessments/ameliaFront.png"
		},
		PlanToForecast71B : {
			image : "img/assessments/iconBigData.png"
		},
		RecordToReport52B : {
			image : "img/assessments/iconBigData.png"
		},
		RecordToReport62B : {
			image : "img/assessments/iconBigData.png"
		},
		PlanToDelivery21B : {
			image : "img/assessments/iconBigData.png"
		},
		PlanToDelivery61B : {
			image : "img/assessments/iconBigData.png"
		},
		PlanToDelivery11B : {
			image : "img/assessments/iconBigData.png"
		},
		PlanToDelivery7B : {
			image : "img/assessments/iconRPA.png"
		},
		PlanToDelivery6B : {
			image : "img/assessments/iconRPA.png"
		},
		PlanToDelivery13B : {
			image : "img/assessments/iconBigData.png"
		},
		PlanToDelivery14B : {
			image : "img/assessments/iconRPA.png"
		},
		ProductLineManagement31B : {
			image : "img/assessments/iconBigData.png"
		},
		ItTransitionToOperationCI3B : {
			image : "img/assessments/iconBigData.png"
		},
		ItTransitionToOperationCI42B : {
			image : "img/assessments/iconBigData.png"
		},
		ProcureToPayPO : {
			image : "img/assessments/iconProcess.png"
		},
		ProcureToPayPO : {
			image : "img/assessments/iconProcess.png"
		},
		QuoteToCashPO : {
			image : "img/assessments/iconProcess.png"
		},
		ITDesignToBuildPO : {
			image : "img/assessments/iconProcess.png"
		},
		TalentPlanningAcquisitionPO : {
			image : "img/assessments/iconProcess.png"
		},
		HireToRetirePO : {
			image : "img/assessments/iconProcess.png"
		},
		PlanToForecastPO : {
			image : "img/assessments/iconProcess.png"
		},
		RecordToReportPO : {
			image : "img/assessments/iconProcess.png"
		}
	}

	var getdeploymentsCaseAttributes = function(deploymentsCase) {
		var attrs = {
			Amelia : {
				image : "img/assessments/ameliaFront.png"
			},
			ProcureToPay6 : {
				image : "img/assessments/iconRPA.png"
			},
			ProcureToPay7 : {
				image : "img/assessments/iconRPA.png"
			},
			ProcureToPay22 : {
				image : "img/assessments/iconRPA.png"
			},
			ProcureToPay41 : {
				image : "img/assessments/ameliaFront.png"
			},
			ProcureToPay511 : {
				image : "img/assessments/iconRPA.png"
			},
			ProcureToPay511U : {
				image : "img/assessments/iconRPA.png"
			},
			ProcureToPay52 : {
				image : "img/assessments/iconRPA.png"
			},
			ProcureToPay52U : {
				image : "img/assessments/iconRPA.png"
			},
			ProcureToPay61 : {
				image : "img/assessments/iconRPA.png"
			},
			PlanToForecast22 : {
				image : "img/assessments/iconRPA.png"
			},
			PlanToForecast53 : {
				image : "img/assessments/iconRPA.png"
			},
			PlanToForecast62 : {
				image : "img/assessments/iconRPA.png"
			},
			PlanToForecast2 : {
				image : "img/assessments/iconRPA.png"
			},
			PlanToForecast5 : {
				image : "img/assessments/iconRPA.png"
			},
			PlanToDelivery7 : {
				image : "img/assessments/iconRPA.png"
			},
			PlanToDelivery5 : {
				image : "img/assessments/iconRPA.png"
			},
			PlanToDelivery63 : {
				image : "img/assessments/iconRPA.png"
			},
			PlanToDelivery12 : {
				image : "img/assessments/iconRPA.png"
			},
			PlanToDelivery2 : {
				image : "img/assessments/iconRPA.png"
			},
			PlanToDelivery21 : {
				image : "img/assessments/iconRPA.png"
			},
			PlanToDelivery32 : {
				image : "img/assessments/iconRPA.png"
			},
			PlanToDelivery72 : {
				image : "img/assessments/iconRPA.png"
			},
			ITStrategyToArchitecture2 : {
				image : "img/assessments/iconRPA.png"
			},
			ITStrategyToArchitecture2U : {
				image : "img/assessments/iconRPA.png"
			},
			QuoteToCash2 : {
				image : "img/assessments/iconRPA.png"
			},
			QuoteToCash2u : {
				image : "img/assessments/iconRPA.png"
			},
			QuoteToCash42 : {
				image : "img/assessments/iconRPA.png"
			},
			QuoteToCash42U : {
				image : "img/assessments/iconRPA.png"
			},
			QuoteToCash61 : {
				image : "img/assessments/iconRPA.png"
			},
			QuoteToCash6U : {
				image : "img/assessments/iconRPA.png"
			},
			QuoteToCash51 : {
				image : "img/assessments/iconRPA.png"
			},
			QuoteToCash51U : {
				image : "img/assessments/iconRPA.png"
			},
			QuoteToCash51U2 : {
				image : "img/assessments/iconRPA.png"
			},
			QuoteToCash72 : {
				image : "img/assessments/iconRPA.png"
			},
			QuoteToCash72U : {
				image : "img/assessments/iconRPA.png"
			},
			QuoteToCash1 : {
				image : "img/assessments/iconRPA.png"
			},
			ItTransitionToOperationCI3B : {
				image : "img/assessments/iconBigData.png"
			},
			ItTransitionToOperationCI42B : {
				image : "img/assessments/iconBigData.png"
			},
			ItTransitionToOperationCI21 : {
				image : "img/assessments/iconRPA.png"
			},
			ItTransitionToOperationCI21U : {
				image : "img/assessments/iconRPA.png"
			},
			ItTransitionToOperationCI31 : {
				image : "img/assessments/iconRPA.png"
			},
			ItTransitionToOperationCI31U : {
				image : "img/assessments/iconRPA.png"
			},
			ItTransitionToOperationCI2UAmelia : {
				image : "img/assessments/ameliaFront.png"
			},
			ItTransitionToOperationCI3 : {
				image : "img/assessments/iconRPA.png"
			},
			ItTransitionToOperationCI2U : {
				image : "img/assessments/iconRPA.png"
			},
			ItTransitionToOperationCI4 : {
				image : "img/assessments/iconRPA.png"
			},
			AquireToRetire3D :{
				image : "img/assessments/iconRPA.png"
			},
			AquireToRetire4U :{
				image : "img/assessments/iconRPA.png"
			},

			HireToRetire31 : {
				image : "img/assessments/iconRPA.png"
			},
			HireToRetire71 : {
				image : "img/assessments/iconRPA.png"
			},
			NewProductDevelopment43 : {
				image : "img/assessments/iconRPA.png"
			},
			ITDesignToBuildModel3 : {
				image : "img/assessments/iconRPA.png"
			},
			ITDesignToBuildModel4 : {
				image : "img/assessments/iconRPA.png"
			},
			NewProductDevelopment31 : {
				image : "img/assessments/iconRPA.png"
			},
			ProductLineManagement2 : {
				image : "img/assessments/iconRPA.png"
			},
			ProductLineManagement4U : {
				image : "img/assessments/iconRPA.png"
			},
			ProductLineManagement6U : {
				image : "img/assessments/iconRPA.png"
			},
			ProductLineManagement42 : {
				image : "img/assessments/iconRPA.png"
			},
			ProductLineManagement4 : {
				image : "img/assessments/iconRPA.png"
			},
			ProductLineManagement21 : {
				image : "img/assessments/iconRPA.png"
			},
			ProductLineManagement3 : {
				image : "img/assessments/iconRPA.png"
			},
			RecordToReport2 : {
				image : "img/assessments/iconRPA.png"
			},
			RecordToReport41 : {
				image : "img/assessments/iconRPA.png"
			},
			RecordToReport5 : {
				image : "img/assessments/iconRPA.png"
			},
			RecordToReport7 : {
				image : "img/assessments/iconRPA.png"
			},
			RecordToReport6 : {
				image : "img/assessments/iconRPA.png"
			},
			RecordToReport21U : {
				image : "img/assessments/iconRPA.png"
			},
			RecordToReport3U : {
				image : "img/assessments/iconRPA.png"
			},
			RecordToReport5U : {
				image : "img/assessments/iconRPA.png"
			},
			RecordToReport7U : {
				image : "img/assessments/iconRPA.png"
			},
			RecordToReport8 : {
				image : "img/assessments/iconRPA.png"
			},
			RecordToReport31 : {
				image : "img/assessments/iconRPA.png"
			},
			ProcureToPay22B : {
				image : "img/assessments/iconBigData.png"
			},
			ProcureToPay5B : {
				image : "img/assessments/iconBigData.png"
			},
			ProcureToPay31B : {
				image : "img/assessments/iconBigData.png"
			},
			ProcureToPay11B : {
				image : "img/assessments/iconBigData.png"
			},
			QuoteToCash21B : {
				image : "img/assessments/iconBigData.png"
			},
			QuoteToCash31B : {
				image : "img/assessments/iconBigData.png"
			},
			QuoteToCash42B : {
				image : "img/assessments/iconBigData.png"
			},
			ITStrategyToArchitecture21B : {
				image : "img/assessments/iconBigData.png"
			},
			AssetAcquireToRetire41B : {
				image : "img/assessments/iconBigData.png"
			},
			AssetAcquireToRetire21B : {
				image : "img/assessments/iconBigData.png"
			},
			HireToRetire41B : {
				image : "img/assessments/iconBigData.png"
			},
			HireToRetire71B : {
				image : "img/assessments/iconBigData.png"
			},
			NewProductDevelopment21B : {
				image : "img/assessments/iconBigData.png"
			},
			InnovateToCommercialization21B : {
				image : "img/assessments/iconBigData.png"
			},
			InnovateToCommercialization31B : {
				image : "img/assessments/iconBigData.png"
			},
			InnovateToCommercialization32B : {
				image : "img/assessments/iconBigData.png"
			},
			ProductLineManagement31 : {
				image : "img/assessments/ameliaFront.png"
			},
			PlanToForecast71B : {
				image : "img/assessments/iconBigData.png"
			},
			RecordToReport52B : {
				image : "img/assessments/iconBigData.png"
			},
			RecordToReport62B : {
				image : "img/assessments/iconBigData.png"
			},
			PlanToDelivery21B : {
				image : "img/assessments/iconBigData.png"
			},
			PlanToDelivery61B : {
				image : "img/assessments/iconBigData.png"
			},
			PlanToDelivery11B : {
				image : "img/assessments/iconBigData.png"
			},
			PlanToDelivery7B : {
				image : "img/assessments/iconRPA.png"
			},
			PlanToDelivery6B : {
				image : "img/assessments/iconRPA.png"
			},
			PlanToDelivery13B : {
				image : "img/assessments/iconBigData.png"
			},
			PlanToDelivery14B : {
				image : "img/assessments/iconRPA.png"
			},
			ProductLineManagement31B : {
				image : "img/assessments/iconBigData.png"
			},
			ProcureToPayPO : {
				image : "img/assessments/iconProcess.png"
			},
			QuoteToCashPO : {
				image : "img/assessments/iconProcess.png"
			},
			ITDesignToBuildPO : {
				image : "img/assessments/iconProcess.png"
			},
			TalentPlanningAcquisitionPO : {
				image : "img/assessments/iconProcess.png"
			},
			HireToRetirePO : {
				image : "img/assessments/iconProcess.png"
			},
			PlanToForecastPO : {
				image : "img/assessments/iconProcess.png"
			}
		}
	}
	if (useCase) {
		return attrs[useCase];
	} else if (deploymentsCase) {
		return attrs[deploymentsCase];
	} else {
		return attrs;
	}
}

var QuoteToCashAssessments = function(step) {
	var assessments = {
		customerSetup : {
			link : {
				angle : -90,
				stepLength : 180,
			},
			assessObj : [ {
				name : "RPA",
				percentage : "37%"
			}, {
				name : "SmartWorkFlows",
				percentage : "27%"
			}, {
				name : "MachineLearning",
				percentage : "20%"
			} ],
		},
		creditPricingQuote : {
			link : {
				angle : -50,
				stepLength : 235,
			},
			assessObj : [ {
				name : "RPA",
				percentage : "30%"
			}, {
				name : "MachineLearning",
				percentage : "22%"
			}, {
				name : "NLP",
				percentage : "16%"
			} ]
		},
		contractAdministration : {
			link : {
				angle : -230,
				stepLength : 200,
			},
			assessObj : [ {
				name : "RPA",
				percentage : "48%"
			}, {
				name : "SmartWorkFlows",
				percentage : "21%"
			}, {
				name : "NLP",
				percentage : "16%"
			} ]
		},
		orderManagement : {
			link : {
				angle : -270,
				stepLength : 150,
			},
			assessObj : [ {
				name : "RPA",
				percentage : "53%"
			}, {
				name : "SmartWorkFlows",
				percentage : "20%"
			}, {
				name : "MachineLearning",
				percentage : "19%"
			} ]
		},
		billing : {
			link : {
				angle : -60,
				stepLength : 200,
			},
			assessObj : [ {
				name : "RPA",
				percentage : "79%"
			}, {
				name : "NLP",
				percentage : "13%"
			}, {
				name : "MachineLearning",
				percentage : "8%"
			} ],
		},
		cashApplication : {
			link : {
				angle : -280,
				stepLength : 150,
			},
			assessObj : [ {
				name : "RPA",
				percentage : "68%"
			}, {
				name : "MachineLearning",
				percentage : "27%"
			}, {
				name : "NLP",
				percentage : "5%"
			} ]
		},
		collectionsDisputeManagement : {
			link : {
				angle : -50,
				stepLength : 220,
			},
			assessObj : [ {
				name : "RPA",
				percentage : "31%"
			}, {
				name : "MachineLearning",
				percentage : "20%"
			}, {
				name : "NLP",
				percentage : "18%"
			} ]
		},
	}

	if (step) {
		return assessments[step];
	} else {
		return assessments;
	}
}

var procureToPayAssessments = function(step) {
	var assessments = {
		sourcingContracts : {
			link : {
				angle : -110,
				stepLength : 180,
			},
			assessObj : [ {
				name : "NLP",
				percentage : "28%"
			}, {
				name : "MachineLearning",
				percentage : "25%"
			}, {
				name : "RPA",
				percentage : "19%"
			} ],
		},
		invoiceMatching : {
			link : {
				angle : -100,
				stepLength : 200,
			},
			assessObj : [ {
				name : "RPA",
				percentage : "52%"
			}, {
				name : "NLP",
				percentage : "17%"
			}, {
				name : "SmartWorkFlows",
				percentage : "16%"
			} ]
		},
		pOsAndRecieving : {
			link : {
				angle : -250,
				stepLength : 300,
			},
			assessObj : [ {
				name : "RPA",
				percentage : "35%"
			}, {
				name : "NLP",
				percentage : "18%"
			}, {
				name : "SmartWorkFlows",
				percentage : "17%"
			} ]
		},
		paymentDisburments : {
			link : {
				angle : -30,
				stepLength : 200,
			},
			assessObj : [ {
				name : "RPA",
				percentage : "77%"
			}, {
				name : "NLP",
				percentage : "11%"
			}, {
				name : "SmartWorkFlows",
				percentage : "10%"
			} ]
		},
		tbd : {
			link : {
				angle : -30,
				stepLength : 200,
			},
			assessObj : [ {
				name : "RPA",
				percentage : "TBD"
			}, {
				name : "NLP",
				percentage : "TBD"
			}, {
				name : "SmartWorkFlows",
				percentage : "TBD"
			} ]
		}
	}

	if (step) {
		return assessments[step];
	} else {
		return assessments;
	}
}

var assetAcquireToRetireAssessments = function(step) {
	var assessments = {
		strategicPlanningAllocation : {
			link : {
				angle : -110,
				stepLength : 180,
			},
			assessObj : [ {
				name : "MachineLearning",
				percentage : "40%"
			}, {
				name : "SmartWorkFlows",
				percentage : "21%"
			}, {
				name : "NLP",
				percentage : "21%"
			} ],
		},
		portfolioOptimization : {
			link : {
				angle : -60,
				stepLength : 200,
			},
			assessObj : [ {
				name : "MachineLearning",
				percentage : "37%"
			}, {
				name : "NLP",
				percentage : "21%"
			}, {
				name : "SmartWorkFlows",
				percentage : "19%"
			} ]
		},
		assetUseMaintenanceRetirement : {
			link : {
				angle : -60,
				stepLength : 200,
			},
			assessObj : [ {
				name : "MachineLearning",
				percentage : "39%"
			}, {
				name : "SmartWorkFlows",
				percentage : "24%"
			}, {
				name : "RPA",
				percentage : "23%"
			} ]
		}
	}

	if (step) {
		return assessments[step];
	} else {
		return assessments;
	}
}

var planToForecastAssessments = function(step) {
	var assessments = {
		strategicPlanning : {
			link : {
				angle : -110,
				stepLength : 180,
			},
			assessObj : [ {
				name : "MachineLearning",
				percentage : "31%"
			}, {
				name : "SmartWorkFlows",
				percentage : "18%"
			}, {
				name : "RPA",
				percentage : "9%"
			} ],
		},
		financialPlanning : {
			link : {
				angle : -70,
				stepLength : 180,
			},
			assessObj : [ {
				name : "RPA",
				percentage : "38%"
			}, {
				name : "MachineLearning",
				percentage : "27%"
			}, {
				name : "SmartWorkFlows",
				percentage : "18%"
			} ]
		},
		capitalPlanning : {
			link : {
				angle : -250,
				stepLength : 180,
			},
			assessObj : [ {
				name : "RPA",
				percentage : "56%"
			}, {
				name : "MachineLearning",
				percentage : "26%"
			}, {
				name : "NLP",
				percentage : "9%"
			} ]
		},
		performanceManagement : {
			link : {
				angle : -300,
				stepLength : 180,
			},
			assessObj : [ {
				name : "MachineLearning",
				percentage : "34%"
			}, {
				name : "RPA",
				percentage : "29%"
			}, {
				name : "NLP",
				percentage : "21%"
			} ]
		},
		managementReporting : {
			link : {
				angle : -110,
				stepLength : 180,
			},
			assessObj : [ {
				name : "RPA",
				percentage : "36%"
			}, {
				name : "NLP",
				percentage : "27%"
			}, {
				name : "MachineLearning",
				percentage : "17%"
			} ],
		},
		businessAnalytics : {
			link : {
				angle : -70,
				stepLength : 180,
			},
			assessObj : [ {
				name : "RPA",
				percentage : "34%"
			}, {
				name : "MachineLearning",
				percentage : "34%"
			}, {
				name : "NLP",
				percentage : "26%"
			} ]
		},
	}

	if (step) {
		return assessments[step];
	} else {
		return assessments;
	}
}

var branchContentView = function(stepName) {
	var contents = {
		ProcureToPay : {
			link : {
				x : 20,
				y : -50,
			},
			contentObj : [ {
				name : "ProductiveCognitiveEndUserSupport"
			}, {
				name : "ProductionRPABusinessBots"
			}, {
				name : "E2EProcessAssessmentOpportunityArea"
			} ]
		},
		QuoteToCash : {
			link : {
				x : 20,
				y : -50,
			},
			contentObj : [ {
				name : "ProductionRPABusinessBots"
			}, {
				name : "E2EProcessAssessmentOpportunityArea"
			} ]
		},
		PlanToDelivery : {
			link : {
				x : -50,
				y : -50,
			},
			contentObj : [ {
				name : "E2EProcessAssessmentOpportunityArea"
			} ]
		},
		PlanToForecast : {
			link : {
				x : 10,
				y : -10,
			},
			contentObj : [ {
				name : "E2EProcessAssessmentOpportunityArea"
			} ]
		},
		RecordToReport : {
			link : {
				x : -80,
				y : 0,
			},
			contentObj : [ {
				name : "E2EProcessAssessmentOpportunityArea"
			} ]
		},
		NewProductDevelopment : {
			link : {
				x : 20,
				y : -50,
			},
			contentObj : [ {
				name : "ProductiveCognitiveEndUserSupport"
			}, {
				name : "E2EProcessAssessmentOpportunityArea"
			} ]
		},
		HireToRetire : {
			link : {
				x : 0,
				y : -50,
			},
			contentObj : [ {
				name : "E2EProcessAssessmentOpportunityArea"
			} ]
		},
		AssetAcquireToRetire : {
			link : {
				x : -60,
				y : 10,
			},
			contentObj : [ {
				name : "E2EProcessAssessmentOpportunityArea"
			} ]
		},
		ITTransitionToOperationCI : {
			link : {
				x : 0,
				y : -60,
			},
			contentObj : [ {
				name : "ProductiveCognitiveEndUserSupport"
			}, {
				name : "ProductionRPABusinessBots"
			}, {
				name : "E2EProcessAssessmentOpportunityArea"
			} ]
		}
	}

	if (stepName) {
		return contents[stepName];
	} else {
		return contents;
	}
}
