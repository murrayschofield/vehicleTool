
var targetvelocityArray = [];
var actualvelocityArray = [];
var accelArray = [];
var timeArray = [];
var timeArray10Second = [];
var timeStep = [];

var targetVelocityResults = [];
var actualVelocityResults = [];
var wheelRPMResults = [];
var motorRPMResults = [];
var motorTorqueResults = [];
var maxMotorTorqueResults = [];
var torqueInToWheelsResults = [];
var motorEfficiencyResults = [];
var powerInToMotorResults = [];
var powerLossesInMotorResults = [];
var powerInToInverterResults = [];
var powerLossesInInverterResults = [];
var powerInToWheelsResults = [];
var powerInToGearboxResults = [];
var powerLossesInGearboxResults = [];
var dragForceResults = [];
var rollingResistanceForceResults = [];
var powerToOvercomeDragResults = [];
var powerToOvercomeGradientResults = [];
var powerToOvercomeRollingResistanceResults = [];
var SOCResults = [];
var auxLoadResults = [];
var battTempResults = [];
var powerOutOfBatteryResults = [];
var powerLossesInBatteryResults = [];
var totalEnergyUsedSoFarResults = [];
var distanceTravelledResults = [];
var accelerationResults = [];

var PLOTtargetVelocityResults = [];
var PLOTactualVelocityResults = [];
var PLOTwheelRPMResults = [];
var PLOTmotorRPMResults = [];
var PLOTmotorTorqueResults = [];
var PLOTmaxMotorTorqueResults = [];
var PLOTtorqueInToWheelsResults = [];
var PLOTmotorEfficiencyResults = [];
var PLOTpowerInToMotorResults = [];
var PLOTpowerLossesInMotorResults = [];
var PLOTpowerInToInverterResults = [];
var PLOTpowerLossesInInverterResults = [];
var PLOTpowerInToWheelsResults = [];
var PLOTpowerInToGearboxResults = [];
var PLOTpowerLossesInGearboxResults = [];
var PLOTdragForceResults = [];
var PLOTrollingResistanceForceResults = [];
var PLOTpowerToOvercomeDragResults = [];
var PLOTpowerToOvercomeGradientResults = [];
var PLOTpowerToOvercomeRollingResistanceResults = [];
var PLOTSOCResults = [];
var PLOTauxLoadResults = [];
var PLOTbattTempResults = [];
var PLOTpowerOutOfBatteryResults = [];
var PLOTpowerLossesInBatteryResults = [];
var PLOTtotalEnergyUsedSoFarResults = [];
var PLOTdistanceTravelledResults = [];
var PLOTaccelerationResults = [];

var totalTime = 0;
var totalAccelEnergy = 0;
var totalAeroEnergy = 0;
var totalRollingEnergy = 0;
var totalAncillaryEnergy = 0;
var totalgradientEnergy = 0;
var totalEnergyLossInBattery = 0;
var totalEnergyLossInInverter = 0;
var totalEnergyLossInMotor = 0;
var totalEnergyLossInGearbox = 0;
var timeStep = [];
var totalEnergyText = " ";
var motorTorquePlotValues = [];
var motorTorquePlotRPM = [];
var totalEnergyperKM = 0;
var totalEnergyTextperKM = "";
var vehicleType = "custom";
var summaryLineChart = 0;
var energyBreakdownChart = 0;
var master_plots_line_chart = 0;
var totalDistanceinKM = 0;
var totalDistanceinM = 0;
var totalEnergyUsed = 0;		  

function add(a, b) {
    return a + b;
}

function toAngSpeed(linearSpeed){
		var omega = 2*linearSpeed /(veh_inputs_tyre_diameter / 1000);
		return(omega);
	}
	
	function toTorque( linearForce ){
		var Torque = linearForce * veh_inputs_tyre_diameter / (2 * 1000);
		return(Torque / veh_inputs_gear_ratio);
	}

function runSimulationClicked(){
	
	//ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);
	ga('send', 'event', 'RangeTool' ,'Run Simulation', vehicleType, veh_inputs_total_mass);
	
	
	getVehicleInputValues();
	getDriveCylceInputValues();
	console.log("success, sim now running!");
	invalidateSimulation();
	summaryLineChart.destroy();
	energyBreakdownChart.destroy();
	
	// reset recording arrays
	targetvelocityArray = [];
	actualvelocityArray = [];
	accelArray = [];
	timeArray = [];
	timeArray10Second = [];
	
	targetVelocityResults = [];
	actualVelocityResults = [];
	wheelRPMResults = [];
	motorRPMResults = [];
	motorTorqueResults = [];
	maxMotorTorqueResults = [];
	torqueInToWheelsResults = [];
	motorEfficiencyResults = [];
	powerInToMotorResults = [];
	powerLossesInMotorResults = [];
	powerInToInverterResults = [];
	powerLossesInInverterResults = [];
	powerInToWheelsResults = [];
	powerInToGearboxResults = [];
	powerLossesInGearboxResults = [];
	dragForceResults = [];
	rollingResistanceForceResults = [];
	powerToOvercomeDragResults = [];
	powerToOvercomeGradientResults = [];
	powerToOvercomeRollingResistanceResults = [];
	SOCResults = [];
	auxLoadResults = [];
	battTempResults = [];
	totalEnergyUsedSoFarResults = [];
	powerOutOfBatteryResults = [];
	powerLossesInBatteryResults = [];
	distanceTravelledResults = [];
	accelerationResults = [];

	
	PLOTtargetVelocityResults = [];
	PLOTactualVelocityResults = [];
	PLOTwheelRPMResults = [];
	PLOTmotorRPMResults = [];
	PLOTmotorTorqueResults = [];
	PLOTmaxMotorTorqueResults = [];
	PLOTtorqueInToWheelsResults = [];
	PLOTmotorEfficiencyResults = [];
	PLOTpowerInToMotorResults = [];
	PLOTpowerLossesInMotorResults = [];
	PLOTpowerInToInverterResults = [];
	PLOTpowerLossesInInverterResults = [];
	PLOTpowerInToWheelsResults = [];
	PLOTpowerInToGearboxResults = [];
	PLOTpowerLossesInGearboxResults = [];
	PLOTdragForceResults = [];
	PLOTrollingResistanceForceResults = [];
	PLOTpowerToOvercomeDragResults = [];
	PLOTpowerToOvercomeGradientResults = [];
	PLOTpowerToOvercomeRollingResistanceResults = [];
	PLOTSOCResults = [];
	PLOTauxLoadResults = [];
	PLOTbattTempResults = [];
	PLOTtotalEnergyUsedSoFarResults = [];
	PLOTpowerOutOfBatteryResults = [];
	PLOTpowerLossesInBatteryResults = [];
	PLOTdistanceTravelledResults = [];
	PLOTaccelerationResults = [];
	
	
	$("#simProgressBarValues").animate({
		width: "100%"
	}, 2000, "swing", 
		function(){
			$("#simProgressBarValues").addClass("progress-bar-success");
			$("#simButton").addClass("btn-success");
			$("#simButton").removeClass("btn-primary");
			//completeSimulation();
		}
	);
	
	simTimer = setTimeout(completeSimulationStage1, 1900);
	simTimer2 = setTimeout(completeSimulationStage2, 2000);
	simTimer3 = setTimeout(completeSimulationStage3, 2500);
	console.log("vehicle mass is");
	console.log(veh_inputs_total_mass);
	
	console.log("drive cycle choice is");
	console.log(drive_inputs_driveCycleChoice);
	
	// Generate timestep array with 1 second being each array entry
	velocityArray = [];
	accelArray = [];
	timeArray = [];
	timeArray100Second = [];
	//timeStep = NEDC_100_array;
	var timeStepDuration = 1 // seconds (default)
	timeStep.length = 0;
	
	if(DRIVE_CYCLE_TYPE ==1){
		var startingSpeed = 0;
		if(drive_inputs_driveCycleChoice ==  1){ timeStep = Array.from(NEDC_70_array);}
		else if(drive_inputs_driveCycleChoice ==  2){ timeStep = Array.from(NEDC_100_array);}
		else if(drive_inputs_driveCycleChoice ==  3){ timeStep = Array.from(NEDC_120_array);}
		else if(drive_inputs_driveCycleChoice ==  4){ timeStep = Array.from(WLTP3a_array);}
		else if(drive_inputs_driveCycleChoice ==  5){ timeStep = Array.from(WLTP3b_array);}
		else if(drive_inputs_driveCycleChoice ==  6){ timeStep = Array.from(RoyalMail_1_array);}
		else if(drive_inputs_driveCycleChoice ==  7){ timeStep = Array.from(Farmdrop64_array);}
		else if(drive_inputs_driveCycleChoice ==  8){ timeStep = Array.from(Farmdrop87_array);}
		}
	
	
	else if(DRIVE_CYCLE_TYPE ==2){
		timeStepDuration = 0.01 // seconds
		for(n = 0; n < (drive_inputs_constSpeed_RunFor*100)+1; n++) {
			
			var thisTimestep = {t: n/100, speed: drive_inputs_constant_speed_val/3.6};
			//console.log("ThisTimeStep t = " + thisTimestep.t);

			timeStep.push(thisTimestep);
		}
		
		if(drive_inputs_constSpeed_StartType == 1){
			var startingSpeed = drive_inputs_constant_speed_val/3.6;
		}
		else{
			var startingSpeed = 0;
		}
		
		
	}
	
	
	
	
	//timeStep = Thirty_ms_60seconddrive_array;
	
	totalTime = timeStep.length;
	console.log("total time is");
	console.log(totalTime);
	var axisLabelTimeStep = 1;
	var summaryPlotTimeStep = 1;
	// time marker step
	if(totalTime>20000){  // if total time longer than 20,000 (long drive cycles)
		axisLabelTimeStep = 1000;
		summaryPlotTimeStep = 20;
	}
	if(totalTime<20000){  // if total time between 10,000 and 20,000 (medium drive cycles)
		axisLabelTimeStep = 1000;
		summaryPlotTimeStep = 20;
	}
	if(totalTime<10000){ // if total time between 5000 and 10,000
		axisLabelTimeStep = 500;
		summaryPlotTimeStep = 10;
	}
	if(totalTime<5000){ // if total time between 1000 and 5000
		axisLabelTimeStep = 100;
		summaryPlotTimeStep = 5;
	}
	if(totalTime<1000){ // if total time between 100 and 1000
		axisLabelTimeStep = 50;
		summaryPlotTimeStep = 1;
	}
	if(totalTime<100){ // if total time between 0 and 100
		axisLabelTimeStep = 1;
		summaryPlotTimeStep = 1;
	}
	
	if( veh_inputs_module_type == 1 ){	var cellsPerModule = 12*20; }
	if( veh_inputs_module_type == 2 ){	var cellsPerModule = 12*18; }
	if( veh_inputs_module_type == 3 ){	var cellsPerModule = 108*2; }

	totalCells = cellsPerModule * veh_inputs_number_of_modules;
	totalCapacityWh = totalCells * 18.2;

	
	
	
	
	
	//simProgressBarValues
	timeStep.push(timeStep[totalTime]);
	//timeStep.push(timeStep[totalTime]);
	var d = new Date();
	var t_start = d.getTime();
	console.log(t_start);
	//for(k=1; k<10000; k++){
	
	//velocityArray.push(0); 
	//accelArray.push(0); 
	//timeArray.push(0);
	
	totalAccelEnergy = 0;
	totalAeroEnergy = 0;
	totalRollingEnergy = 0;
	totalAncillaryEnergy = 0;
	totalgradientEnergy = 0;
	totalEnergyLossInBattery = 0;
	totalEnergyLossInInverter = 0;
	totalEnergyLossInMotor = 0;
	totalEnergyLossInGearbox = 0;
	totalDistanceinKM = 0;
	totalDistanceinM = 0;
	totalEnergyUsed = 0;
	
	//for( k = 0; k<10; k++ ){
	for (i = 0; i < totalTime*1+0*50; i++) { 
		currentTimeStepNum = i;
		currentTime = i * timeStepDuration;
		//console.log("Time:");
		//console.log(currentTime);
		//console.log("Windspeed:");
		//console.log(drive_inputs_windSpeed);
		
		
		// In one timestep speed is calculated from the previous speed + the previous acceleration.
		// Energy usage is calculated at the speed of the given timestep
		
		var currentTimeStep = timeStep[currentTimeStepNum];
		
		var previousTargetSpeed = currentTimeStep.speed;
		if(i==0){
			var currentSpeed = startingSpeed;
			var nextTimeStep = timeStep[currentTimeStepNum+1];	
			var targetSpeed = nextTimeStep.speed;	
			//targetvelocityArray.push(Math.round(targetSpeed*3.6*10)/10);
		}
		else{
			var previousTimeStep = timeStep[currentTimeStepNum-1];
			var currentSpeed = previousTimeStep.vehicleTrueSpeed + previousTimeStep.vehicleTrueAccel * timeStepDuration  ;
			if(i==totalTime-1){
				var targetSpeed = currentSpeed;
			}
			else{
				var nextTimeStep = timeStep[currentTimeStepNum+1];	
				var targetSpeed = nextTimeStep.speed;	
			}
			
			
		}
		
		//console.log("currentTimeStep is: " + currentTimeStepNum);
		//console.log("currentSpeed is: " + currentSpeed);
		//console.log("targetSpeed is: " + targetSpeed);
		
		//console.log("Aero Energy is: " + aerodynamicDragEnergy);
		//console.log(aerodynamicDragEnergy);
		
		
		currentTimeStep.vehicleTrueSpeed = currentSpeed;
		var v = currentSpeed;
		var targetAcceleration = (targetSpeed - currentSpeed) / timeStepDuration;
		
		var currentWheelAngSpeedRadians = toAngSpeed(currentSpeed);
		var currentWheelAngSpeedRPM = 60*currentWheelAngSpeedRadians/(2*3.142);
		var currentMotorSpeedRPM = currentWheelAngSpeedRPM * veh_inputs_gear_ratio;
		
		var requiredAccelForce = veh_inputs_total_mass * targetAcceleration;
		var requiredAccelTorque = toTorque(requiredAccelForce);
	
		var aerodynamicDragForce = 0.5 * veh_inputs_drag_coefficient * 1.19 * veh_inputs_frontal_area * (v+drive_inputs_windSpeed/3.6)*(v+drive_inputs_windSpeed/3.6);
		
		var requiredAeroTorque = toTorque(aerodynamicDragForce);
		//console.log("Aero Energy is: ");
		//console.log(aerodynamicDragEnergy);
		
		var rollingResistanceForce = veh_inputs_total_mass * veh_inputs_rolling_resistance * 9.81;
		
		var requiredRollingResistanceTorque = toTorque(rollingResistanceForce);
		
		var gradientAngle = 0;
		
		//setup elevation for this timestep
		if(DRIVE_CYCLE_TYPE ==1){
			gradientAngle = Math.atan(drive_inputs_standardDrive_Elevation_Profile/100);
		}
		else if(DRIVE_CYCLE_TYPE ==2){
			gradientAngle = Math.atan(drive_inputs_constSpeed_Elevation_Profile/100);
		}
		//console.log("Gradient angle is: ");
		//console.log(gradientAngle);
		
		var gradientForce = veh_inputs_total_mass * 9.81 * Math.sin(gradientAngle);
		
		var requiredgradientTorque = toTorque(gradientForce);
		
		//console.log("Gradient force is: ");
		//console.log(gradientForce);
		
		//To add: Gradient, air temp to air density calculation
		
		var torqueToGenerate = requiredAccelTorque + requiredAeroTorque + requiredRollingResistanceTorque + requiredgradientTorque;
		var torqueGenerated = 0; // initialise this variable
		
		if (torqueToGenerate < 0){
			//Braking event
			torqueGenerated = torqueToGenerate;
			// *** need to add maximum braking torque
		}
		else{
			torqueGenerated = generateTorque(torqueToGenerate,currentMotorSpeedRPM);
		}
		//console.log("Torque Generated:");
		//console.log(torqueGenerated);
		//console.log("");
		var actualAccelTorque = torqueGenerated - requiredAeroTorque - requiredRollingResistanceTorque - requiredgradientTorque;
		var actualAccelForce = 2000*actualAccelTorque*veh_inputs_gear_ratio/veh_inputs_tyre_diameter;
		var actualAcceleration = actualAccelForce / veh_inputs_total_mass;
		
		var actualAccelEnergy = Math.max(actualAccelForce * (v + actualAcceleration* timeStepDuration/2) * timeStepDuration,0);
		
		currentTimeStep.vehicleTrueAccel = actualAcceleration;
		
		
		if (torqueGenerated > 0){
			var aerodynamicDragEnergy = aerodynamicDragForce * (v ) * timeStepDuration;
		}
		else{
			var aerodynamicDragEnergy = 0;
		}
		//var aerodynamicDragEnergy = aerodynamicDragForce * (v ) * timeStepDuration;
		var rollingResistanceEnergy  = rollingResistanceForce  * (v + actualAcceleration* timeStepDuration/2) * timeStepDuration;
		var gradientEnergy  = gradientForce  * (v + actualAcceleration* timeStepDuration/2) * timeStepDuration;
		var actualWheelInputTorque = Math.max(torqueGenerated,0);
		var actualForceIntoWheels = 2000*actualWheelInputTorque*veh_inputs_gear_ratio/veh_inputs_tyre_diameter;
		var actualEnergyIntoWheels = actualForceIntoWheels * (v + actualAcceleration* timeStepDuration/2) * timeStepDuration;
		
		
		//console.log("Sum of resistances: " + (aerodynamicDragEnergy + rollingResistanceEnergy + actualAccelEnergy + gradientEnergy));	

		var actualEnergyIntoGearbox = actualEnergyIntoWheels/0.90; //*** need to add gearbox efficiency
		var EnergyLossInGearbox = actualEnergyIntoGearbox - actualEnergyIntoWheels;
		
		var motor_efficiency = 95;////
		var actualEnergyIntoMotor =  actualEnergyIntoGearbox/(motor_efficiency/100);
		var EnergyLossInMotor = actualEnergyIntoMotor - actualEnergyIntoGearbox;
		
		var actualEnergyIntoInverter =  actualEnergyIntoMotor/(veh_inputs_inverter_efficiency/100);
		var EnergyLossInInverter = actualEnergyIntoInverter - actualEnergyIntoMotor;
		
		var energytoAuxilliaries = veh_inputs_constant_aux_load * 1000 * timeStepDuration ;
		
		var battery_efficiency = 100;
		var actualEnergyOutOfBattery =  (actualEnergyIntoInverter + energytoAuxilliaries)/(battery_efficiency/100); //*** need to add battery efficiency
		var EnergyLossInBattery = actualEnergyOutOfBattery - actualEnergyIntoInverter - energytoAuxilliaries;	
		
		var actualEnergyOutOfBatteryMod = energytoAuxilliaries + actualEnergyIntoWheels/1;
		
		var distanceTraveled = currentSpeed*timeStepDuration;
		
		/*
		console.log("");
		console.log("currentTimeStep is: " + currentTimeStepNum);
		console.log("velocity (kmph): " + (v * 3.6));
		console.log("accel (kmph/s): " + (actualAcceleration * 3.6));
		console.log("actualAccelEnergy: " + actualAccelEnergy);
		console.log("Actual Energy into wheels: " + actualEnergyIntoWheels);
		console.log("Torque Generated: " + torqueGenerated);
		console.log("Accel Force: " + actualAccelForce);
		console.log("Energy to Aux: " + energytoAuxilliaries);
		console.log("Energy to Aero: " + aerodynamicDragEnergy);
		console.log("Energy to Rolling: " + rollingResistanceEnergy);
		console.log("Energy to Accel: " + actualAccelEnergy);
		console.log("Energy to Gearbox Losses: " + EnergyLossInGearbox);
		console.log("Energy to Motor Losses: " + EnergyLossInMotor);
		console.log("Energy to Inverter Losses: " + EnergyLossInInverter);
		
		var energySum = energytoAuxilliaries + EnergyLossInGearbox + aerodynamicDragEnergy + rollingResistanceEnergy + actualAccelEnergy + EnergyLossInMotor + EnergyLossInInverter ;
		
		console.log("Sum of Above: " + energySum);
		console.log("Total Energy Use: " + actualEnergyOutOfBattery);
		console.log("Total Energy UseMod: " + actualEnergyOutOfBatteryMod);
		*/
		
			//4.Calculate Battery Voltage and Current and C Rate
			
			
			//5. Adjust battery SOC
			
			
			//6. Calculate battery Heatup
			
			//7. Calculate battery cooling
			
		totalDistanceinM += distanceTraveled;
		totalDistanceinKM += distanceTraveled/1000;
		totalEnergyUsed += 1000*actualEnergyOutOfBattery/3600000; // in Wh

		//console.log("Total Energy So Far: " + totalEnergyUsed);
		//console.log("  ");
		
		var motorTorqueGenerated = torqueGenerated;
		if(motorTorqueGenerated < 0){motorTorqueGenerated = 0;}
		var maxMotorTorque = generateTorque(9999,currentMotorSpeedRPM);
				


		
		totalEnergyLossInBattery += EnergyLossInBattery/3600000;
		totalEnergyLossInInverter += EnergyLossInInverter/3600000;
		totalEnergyLossInMotor += EnergyLossInMotor/3600000;
		totalEnergyLossInGearbox += EnergyLossInGearbox/3600000;
		
		totalgradientEnergy += Math.max(gradientEnergy/3600000,0);
		totalAccelEnergy += Math.max(actualAccelEnergy/3600000,0);
		totalAeroEnergy += aerodynamicDragEnergy/3600000;
		totalRollingEnergy += rollingResistanceEnergy/3600000;
		totalAncillaryEnergy += energytoAuxilliaries/3600000;
		
		totalEnergyLossInBatteryPerKM = 1000 * totalEnergyLossInBattery / totalDistanceinKM ;
		totalEnergyLossInInverterPerKM = 1000 * totalEnergyLossInInverter / totalDistanceinKM ;
		totalEnergyLossInMotorPerKM = 1000 * totalEnergyLossInMotor / totalDistanceinKM ;
		totalEnergyLossInGearboxPerKM = 1000 * totalEnergyLossInGearbox / totalDistanceinKM ;
		
		totalgradientEnergyPerKM =  1000 * totalgradientEnergy / totalDistanceinKM ;
		totalAccelEnergyPerKM =  1000 * totalAccelEnergy / totalDistanceinKM ;
		totalAeroEnergyPerKM = 1000 * totalAeroEnergy / totalDistanceinKM ;
		totalRollingEnergyPerKM = 1000 * totalRollingEnergy / totalDistanceinKM ;
		totalAncillaryEnergyPerKM = 1000 * totalAncillaryEnergy / totalDistanceinKM  ;
		
		//axisLabelTimeStep = 250;
		//summaryPlotTimeStep = 10;
		
		targetVelocityResults.push(targetSpeed*3.6); 
		actualVelocityResults.push(currentSpeed*3.6);
		wheelRPMResults.push(currentWheelAngSpeedRPM);
		motorRPMResults.push(currentMotorSpeedRPM);
		motorTorqueResults.push(motorTorqueGenerated);
		maxMotorTorqueResults.push(maxMotorTorque);
		torqueInToWheelsResults.push(torqueGenerated);
		motorEfficiencyResults.push(motor_efficiency);
		powerInToMotorResults.push(actualEnergyIntoMotor/timeStepDuration);
		powerLossesInMotorResults.push(EnergyLossInMotor/timeStepDuration);
		powerInToInverterResults.push(actualEnergyIntoInverter/timeStepDuration);
		powerLossesInInverterResults.push(EnergyLossInInverter/timeStepDuration);
		powerInToWheelsResults.push(actualEnergyIntoWheels/timeStepDuration);
		powerInToGearboxResults.push(actualEnergyIntoGearbox/timeStepDuration);
		powerLossesInGearboxResults.push(EnergyLossInGearbox/timeStepDuration);
		dragForceResults.push(aerodynamicDragForce);
		rollingResistanceForceResults.push(rollingResistanceForce);
		powerToOvercomeDragResults.push(aerodynamicDragEnergy/timeStepDuration);
		powerToOvercomeGradientResults.push(gradientEnergy/timeStepDuration);
		powerToOvercomeRollingResistanceResults.push(rollingResistanceEnergy/timeStepDuration);
		SOCResults.push(drive_inputs_starting_SOC);
		auxLoadResults.push(veh_inputs_constant_aux_load*1000/timeStepDuration);
		battTempResults.push(drive_inputs_starting_batt_Temp);
		totalEnergyUsedSoFarResults.push(totalEnergyUsed);
		powerOutOfBatteryResults.push(actualEnergyOutOfBattery/timeStepDuration);
		powerLossesInBatteryResults.push(EnergyLossInBattery/timeStepDuration);
		distanceTravelledResults.push(totalDistanceinM);
		accelerationResults.push(actualAcceleration);
		
		if(currentTimeStepNum/summaryPlotTimeStep == Math.round(currentTimeStepNum/summaryPlotTimeStep) || currentTimeStepNum == totalTime-1){
			
		PLOTtargetVelocityResults.push(targetSpeed*3.6); 
		PLOTactualVelocityResults.push(currentSpeed*3.6);
		PLOTwheelRPMResults.push(currentWheelAngSpeedRPM);
		PLOTmotorRPMResults.push(currentMotorSpeedRPM);
		PLOTmotorTorqueResults.push(motorTorqueGenerated);
		PLOTmaxMotorTorqueResults.push(maxMotorTorque);
		PLOTtorqueInToWheelsResults.push(torqueGenerated);
		PLOTmotorEfficiencyResults.push(motor_efficiency);
		PLOTpowerInToMotorResults.push(actualEnergyIntoMotor/timeStepDuration);
		PLOTpowerLossesInMotorResults.push(EnergyLossInMotor/timeStepDuration);
		PLOTpowerInToInverterResults.push(actualEnergyIntoInverter/timeStepDuration);
		PLOTpowerLossesInInverterResults.push(EnergyLossInInverter/timeStepDuration);
		PLOTpowerInToWheelsResults.push(actualEnergyIntoWheels/timeStepDuration);
		PLOTpowerInToGearboxResults.push(actualEnergyIntoGearbox/timeStepDuration);
		PLOTpowerLossesInGearboxResults.push(EnergyLossInGearbox/timeStepDuration);
		PLOTdragForceResults.push(aerodynamicDragForce);
		PLOTrollingResistanceForceResults.push(rollingResistanceForce);
		PLOTpowerToOvercomeDragResults.push(aerodynamicDragEnergy/timeStepDuration);
		PLOTpowerToOvercomeGradientResults.push(gradientEnergy/timeStepDuration);
		PLOTpowerToOvercomeRollingResistanceResults.push(rollingResistanceEnergy/timeStepDuration);
		PLOTSOCResults.push(drive_inputs_starting_SOC);
		PLOTauxLoadResults.push(veh_inputs_constant_aux_load*1000);
		PLOTbattTempResults.push(drive_inputs_starting_batt_Temp);
		PLOTtotalEnergyUsedSoFarResults.push(totalEnergyUsed);
		PLOTpowerOutOfBatteryResults.push(actualEnergyOutOfBattery/timeStepDuration);
		PLOTpowerLossesInBatteryResults.push(EnergyLossInBattery/timeStepDuration);
		PLOTdistanceTravelledResults.push(totalDistanceinM);
		PLOTaccelerationResults.push(actualAcceleration);
		
			
			targetvelocityArray.push(Math.round(previousTargetSpeed*3.6*10)/10); 
			
			actualvelocityArray.push(Math.round(currentSpeed*3.6*10)/10); 
			accelArray.push(Math.round(actualAcceleration*100)/100); 
			timeArray.push(currentTime);
			if(currentTimeStepNum/axisLabelTimeStep == Math.round(currentTimeStepNum/axisLabelTimeStep)  || currentTimeStepNum == totalTime-1 ){
				//console.log(currentTime);
				timeArray100Second.push((Math.round(currentTime*100)/100).toString());
			}
			else{
				timeArray100Second.push("");
			}
		}
		
		//EnergyLossInGearbox/timeStepDuration*timeStepDuration
		//console.log("Input to Array is " + EnergyLossInGearbox/timeStepDuration*timeStepDuration);
		//console.log("Add to total is: " + EnergyLossInGearbox);
				
		
		//console.log("Total sum is: " + totalEnergyLossInGearbox);
		//console.log("Array sum is: " + powerLossesInGearboxResults.reduce(add, 0)*timeStepDuration/3600000 );
	}
	//}
	//}
	//document.getElementById('simProgressBar').className = "collapse";
	console.log("Accel Energy:");
	console.log(totalAccelEnergy);
	
		
	//document.getElementById('simProgressBar').style.visibility = 'hidden';
	var d = new Date();
	var t_end = d.getTime();
	console.log(t_end - t_start );
	
	var dpVal = 100;
	if(totalEnergyLossInGearbox < 0.1){
		dpVal = 10000;
	}
	
	totalEnergyLossInBattery = Math.round( totalEnergyLossInBattery* dpVal ) / dpVal;
	totalEnergyLossInInverter = Math.round( totalEnergyLossInInverter* dpVal ) / dpVal;
	totalEnergyLossInMotor = Math.round( totalEnergyLossInMotor* dpVal ) / dpVal;
	totalEnergyLossInGearbox = Math.round( totalEnergyLossInGearbox* dpVal ) / dpVal;
	
	totalgradientEnergy = Math.round( totalgradientEnergy* dpVal )/ dpVal;
	totalAccelEnergy = Math.round( totalAccelEnergy* dpVal )/ dpVal;
	totalAeroEnergy = Math.round( totalAeroEnergy* dpVal )/ dpVal;
	totalRollingEnergy = Math.round( totalRollingEnergy* dpVal )/ dpVal;
	totalAncillaryEnergy = Math.round( totalAncillaryEnergy* dpVal )/ dpVal;
	
	totalEnergyLossInBatteryPerKM = Math.round( totalEnergyLossInBatteryPerKM*10 )/10;
	totalEnergyLossInInverterPerKM = Math.round( totalEnergyLossInInverterPerKM*10 )/10;
	totalEnergyLossInMotorPerKM = Math.round( totalEnergyLossInMotorPerKM*10 )/10; ;
	totalEnergyLossInGearboxPerKM = Math.round( totalEnergyLossInGearboxPerKM*10 )/10;
		
	totalgradientEnergyPerKM =  Math.round( totalgradientEnergyPerKM*10 )/10;
	totalAccelEnergyPerKM =  Math.round( totalAccelEnergyPerKM*10 )/10;
	totalAeroEnergyPerKM = Math.round( totalAeroEnergyPerKM*10 )/10;
	totalRollingEnergyPerKM = Math.round( totalRollingEnergyPerKM*10 )/10;
	totalAncillaryEnergyPerKM = Math.round( totalAncillaryEnergyPerKM*10 )/10;
	
	
	
	console.log("Total gearbox loss sum is: " + totalEnergyLossInGearbox + "kWh");
	console.log("Sum of gearbox losses array is: " + powerLossesInGearboxResults.reduce(add, 0)*timeStepDuration/3600000 + "kWh" );
	
	
	
	console.log("Total gearbox loss sum is: " + totalEnergyLossInGearbox + "kWh");
	console.log("Sum of gearbox losses array is: " + powerLossesInGearboxResults.reduce(add, 0)*timeStepDuration/3600000 + "kWh" );
	
	
	//var totalLosses = totalEnergyLossInGearbox + totalEnergyLossInMotor + totalEnergyLossInInverter + totalEnergyLossInBattery;
	//var totalLosses = totalEnergyLossInGearbox + totalEnergyLossInMotor + totalEnergyLossInInverter + totalEnergyLossInBattery;
	//var totalEnergyUsedMod = totalgradientEnergy + totalAccelEnergy + totalAeroEnergy + totalRollingEnergy + totalAncillaryEnergy + totalLosses;
	
	
	totalEnergyUsed = totalEnergyUsed/1000;
	console.log("Total Energy Used is: " + totalEnergyUsed + "kWh");
	//var totalEnergyUsed = powerOutOfBatteryResults.reduce(add, 0)*timeStepDuration/3600000;	
	
	
	
	console.log("Total ancillary loss sum is: " + totalAncillaryEnergy + "kWh")
	console.log("Sum of ancillary loss is: " +  auxLoadResults.reduce(add, 0)*timeStepDuration/3600000  + "kWh")
	
	console.log("Total aero loss sum is: " + totalAeroEnergy + "kWh")
	console.log("Sum of aero loss is: " +  powerToOvercomeDragResults.reduce(add, 0)*timeStepDuration/3600000  + "kWh")
	
	//console.log("Total Energy sum is: " + totalEnergyUsedMod + "kWh");
	//console.log("Sum of Energy use is: " + powerOutOfBatteryResults.reduce(add, 0)*timeStepDuration/3600000 + "kWh" );
	
	totalEnergyUsed = Math.round( totalEnergyUsed*100 )/100;
	totalEnergyText = "Total: " + totalEnergyUsed.toString() + " kWh";
	
	totalEnergyperKM = 1000*totalEnergyUsed/totalDistanceinKM;
	totalEnergyperKM = Math.round( totalEnergyperKM*10 )/10;
	totalEnergyTextperKM = "Total: " + totalEnergyperKM.toString() + " Wh/km";

	
	totalDistanceinKM = Math.round( totalDistanceinKM*1000 )/1000;
	velocityProfileTitle = "Velocity Profile Data - Total Distance Was " + totalDistanceinKM.toString() + "km.";
	
	// Populate range section
		//totalCapacityWh
		var rangeContent = "";
		
		var upperSOC_kWh = drive_inputs_starting_SOC/100 * totalCapacityWh/1000;
		var lowerSOC_kWh = drive_inputs_lower_limit_SOC/100 * totalCapacityWh/1000;
		var available_kWh = upperSOC_kWh - lowerSOC_kWh;
		var estimatedRange = 1000*available_kWh/totalEnergyperKM;
		
		rangeContent += "<h4> Battery Pack Total Energy Capacity is " + Math.round( totalCapacityWh/1000*10 )/10  + " kWh.</h4>";
		rangeContent += "<h4> Battery Pack Starting SOC is " + drive_inputs_starting_SOC + "% = " +  Math.round( upperSOC_kWh*10 )/10    + " kWh.</h4>";
		rangeContent += "<h4> Battery Pack Finishing SOC is " + drive_inputs_lower_limit_SOC + "% = " + Math.round( lowerSOC_kWh*10 )/10  + " kWh. </h4>";
		rangeContent += "<h4> Therefore Energy available is " + (drive_inputs_starting_SOC - drive_inputs_lower_limit_SOC) + "% = " + (Math.round( upperSOC_kWh*10 )/10 - Math.round( lowerSOC_kWh*10 )/10) + " kWh.</h4>";
		rangeContent += "<h4> Energy use per km in simulation is " + totalEnergyperKM.toString() + " Wh/km.</h4>";
		rangeContent += "<h1> Therefore Estimated Range is: " +  Math.round( estimatedRange*10 )/10 + "km.";
		
		
		document.getElementById("rangePanelContent").innerHTML = rangeContent;
	
	// Populate vehicle input section
	
	vehicleVariableContent = $("#vehicleVariableSummaryProto").html();
	
	vehicleVariableContent = vehicleVariableContent.replace("veh_inputs_total_mass",veh_inputs_total_mass);
	vehicleVariableContent = vehicleVariableContent.replace("veh_inputs_frontal_area",veh_inputs_frontal_area);
	vehicleVariableContent = vehicleVariableContent.replace("veh_inputs_drag_coefficient",veh_inputs_drag_coefficient);
	vehicleVariableContent = vehicleVariableContent.replace("veh_inputs_rolling_resistance",veh_inputs_rolling_resistance);
	vehicleVariableContent = vehicleVariableContent.replace("veh_inputs_tyre_diameter",veh_inputs_tyre_diameter);
	vehicleVariableContent = vehicleVariableContent.replace("veh_inputs_regen_percentage",veh_inputs_regen_percentage);
	vehicleVariableContent = vehicleVariableContent.replace("veh_inputs_constant_aux_load",veh_inputs_constant_aux_load);
	vehicleVariableContent = vehicleVariableContent.replace("veh_inputs_number_of_modules",veh_inputs_number_of_modules);
	vehicleVariableContent = vehicleVariableContent.replace("veh_inputs_system_voltage",veh_inputs_system_voltage);
	vehicleVariableContent = vehicleVariableContent.replace("veh_inputs_gear_ratio",veh_inputs_gear_ratio);
	vehicleVariableContent = vehicleVariableContent.replace("veh_inputs_frontDriveUnits",veh_inputs_frontDriveUnits);
	vehicleVariableContent = vehicleVariableContent.replace("veh_inputs_rearDriveUnits",veh_inputs_rearDriveUnits);
	vehicleVariableContent = vehicleVariableContent.replace("veh_inputs_inverter_efficiency",veh_inputs_inverter_efficiency);

	var moduleTypeString = "";
	if(veh_inputs_module_type == 1){ moduleTypeString = "12s 20p 50v"; }
	else if(veh_inputs_module_type == 2){ moduleTypeString = "12s 18p 50v"; }
	else if(veh_inputs_module_type == 3){ moduleTypeString = "108s 2p 450v"; }
	vehicleVariableContent = vehicleVariableContent.replace("veh_inputs_module_type",moduleTypeString);
	
	var motorTypeString = "";
	if(veh_inputs_motor_type == 1){ motorTypeString = "CRA"; }
	else if(veh_inputs_motor_type == 2){ motorTypeString = "Dual CRA"; }
	else if(veh_inputs_motor_type == 3){ motorTypeString = "CRB"; }
	else if(veh_inputs_motor_type == 4){ motorTypeString = "T4 Motor"; }
	else if(veh_inputs_motor_type == 5){ motorTypeString = "ATX Motor"; }
	vehicleVariableContent = vehicleVariableContent.replace("veh_inputs_motor_type",motorTypeString);
	
	document.getElementById("vehicleVariableSummary").innerHTML = vehicleVariableContent;
	
	
	
	
	// Populate drive cycle input section
	driveCycleVariableContent = $("#driveCycleVariableSummaryProto").html();
	
	var driveCycleTypeString = "";
	if(veh_inputs_module_type == 1){ driveCycleTypeString = "NEDC 70"; }
	else if(veh_inputs_module_type == 2){ driveCycleTypeString = "NEDC 100"; }
	else if(veh_inputs_module_type == 3){ driveCycleTypeString = "NEDC 120"; }
	else if(veh_inputs_module_type == 4){ driveCycleTypeString = "WLTP 3a"; }
	else if(veh_inputs_module_type == 5){ driveCycleTypeString = "WLTP 3b"; }
	else if(veh_inputs_module_type == 6){ driveCycleTypeString = "Royal Mail 1"; }
	else if(veh_inputs_module_type == 7){ driveCycleTypeString = "Farmdrop 64km"; }
	else if(veh_inputs_module_type == 8){ driveCycleTypeString = "Farmdrop 87km"; }
	driveCycleVariableContent = driveCycleVariableContent.replace("drive_inputs_driveCycleChoice",driveCycleTypeString);
	
	driveCycleVariableContent = driveCycleVariableContent.replace("drive_inputs_cyclesToRun",drive_inputs_cyclesToRun);
	driveCycleVariableContent = driveCycleVariableContent.replace("drive_inputs_standardDrive_Elevation_Profile",drive_inputs_standardDrive_Elevation_Profile + "%");
	
	driveCycleVariableContent = driveCycleVariableContent.replace("drive_inputs_constant_speed_val",drive_inputs_constant_speed_val.toString() + " kmph");
	
	driveCycleVariableContent = driveCycleVariableContent.replace("drive_inputs_constSpeed_RunFor",drive_inputs_constSpeed_RunFor + " seconds");
	
	if(drive_inputs_SOC_State == 1){
		driveCycleVariableContent = driveCycleVariableContent.replace("drive_inputs_SOC_State","Variable");
	}
	else{
		driveCycleVariableContent = driveCycleVariableContent.replace("drive_inputs_SOC_State","Fixed at Starting Value");
	}
	
	if(drive_inputs_constSpeed_StartType == 1){
		driveCycleVariableContent = driveCycleVariableContent.replace("drive_inputs_constSpeed_StartType",drive_inputs_constant_speed_val.toString() + " kmph");
	}
	else{
		driveCycleVariableContent = driveCycleVariableContent.replace("drive_inputs_constSpeed_StartType","Stationary");
	}
	
	driveCycleVariableContent = driveCycleVariableContent.replace("drive_inputs_starting_SOC",drive_inputs_starting_SOC);
	driveCycleVariableContent = driveCycleVariableContent.replace("drive_inputs_lower_limit_SOC",drive_inputs_lower_limit_SOC);
	driveCycleVariableContent = driveCycleVariableContent.replace("drive_inputs_ambientTemp",drive_inputs_ambientTemp);
	driveCycleVariableContent = driveCycleVariableContent.replace("drive_inputs_starting_batt_Temp",drive_inputs_starting_batt_Temp);
	driveCycleVariableContent = driveCycleVariableContent.replace("Headwind","Headwind");
	driveCycleVariableContent = driveCycleVariableContent.replace("drive_inputs_windSpeed",drive_inputs_windSpeed);

	
	document.getElementById("driveCycleVariableSummary").innerHTML = driveCycleVariableContent;
	
	document.getElementById("standardDriveInputsTable").className = "collapse";
	document.getElementById("constantSpeedDriveInputsTable").className = "collapse";
	if(DRIVE_CYCLE_TYPE==1){
		document.getElementById("standardDriveInputsTable").className = "collapse.show";
	}
	else if(DRIVE_CYCLE_TYPE==2){
		document.getElementById("constantSpeedDriveInputsTable").className = "collapse.show";
	}
	
	
	
	//generate Motor Max Torque Plot
	motorTorquePlotValues = [];
	motorTorquePlotRPM = [];
	for(plotRPM =0; plotRPM < 15001; plotRPM=plotRPM+500){
		motorTorquePlotRPM.push(plotRPM);
		motorTorquePlotValues.push(generateTorque(9999,plotRPM))
	}
	//generate drive train efficiency panel content
	
	//motorEfficenciesContent = $("#motorEfficenciesContent").html();
	
	
	//document.getElementById("motorEfficenciesContent").innerHTML = motorEfficenciesContent;
	//motorEfficenciesContent
	
	drivetrainEfficenciesContent = $("#drivetrainEfficenciesContent").html();
	
	drivetrainEfficenciesContent = drivetrainEfficenciesContent.replace("battery_efficiency","100");
	drivetrainEfficenciesContent = drivetrainEfficenciesContent.replace("veh_inputs_inverter_efficiency",veh_inputs_inverter_efficiency);
	drivetrainEfficenciesContent = drivetrainEfficenciesContent.replace("motor_efficiency",motor_efficiency);
	drivetrainEfficenciesContent = drivetrainEfficenciesContent.replace("gearbox_efficiency","90");
	drivetrainEfficenciesContent = drivetrainEfficenciesContent.replace("veh_inputs_regen_percentage",veh_inputs_regen_percentage);
	
	
	
	
	document.getElementById("drivetrainEfficenciesContent").innerHTML = drivetrainEfficenciesContent;
	//drivetrainEfficenciesContent
	

 }

 

function completeSimulationStage1(){
	validateSimulation();
	energyBreakdownClicked();
	
	if ( $('#displayAsEnergyPerKilometerbox').prop('checked') == true){ 
		displayAsEnergyPerKilometer();
	}
	else{  
		displayAsTotalEnergy();
	}
	
	
}

 function displayAsEnergyPerKilometer(){
	 energyBreakdownChart.destroy();
	energyBreakdownChart = new Chart(document.getElementById("doughnut-chart"), {
		type: 'doughnut',
		data: {
		  labels: ["Acceleration", "Aero (inc. Wind)", "Rolling Energy", "Ancillaries","Elevation","Battery Losses","Inverter Losses","Motor Losses","Gearbox Losses"],
		  datasets: [
			{
			  label: "Energy Use per km (Wh/km)",
			  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#1aff3f","#aaaaaa", "#bbbbbb","#cccccc","#dddddd"],
			  data: [totalAccelEnergyPerKM,totalAeroEnergyPerKM,totalRollingEnergyPerKM,totalAncillaryEnergyPerKM,totalgradientEnergyPerKM, totalEnergyLossInBatteryPerKM,totalEnergyLossInInverterPerKM,totalEnergyLossInMotorPerKM,totalEnergyLossInGearboxPerKM],
			  //datalabels: {
							//anchor: 'start'
						//},
			  //count: 4
			}
		  ]
		},
		options: {
		  title: {
			display: true,
			text: 'Energy Use Per km (Wh/km)'
		  },	
			responsive: true,		  
		   pieceLabel: {
			render: function (args) {
				return args.value + ' Wh/km' ;
			},
			/*fontColor: function (data) {
			  var rgb = hexToRgb(data.dataset.backgroundColor[data.index]);
			  var threshold = 140;
			  var luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
			  return luminance > threshold ? 'black' : 'white';
			},*/
			fontColor: '#000',
			position: 'outside',
			precision: 1,
			overlap: true
		  },
			elements: {
			  center: {
			  text: totalEnergyTextperKM,
			  color: '#36A2EB', //Default black
			  fontStyle: 'Helvetica', //Default Arial
			  sidePadding: 15 //Default 20 (as a percentage)
			  }
			}
		}
	});

 }
 
 function displayAsTotalEnergy(){
	 energyBreakdownChart.destroy();
		energyBreakdownChart = new Chart(document.getElementById("doughnut-chart"), {
		type: 'doughnut',
		data: {
		  labels: ["Acceleration", "Aero (inc. Wind)", "Rolling Energy", "Ancillaries","Elevation","Battery Losses","Inverter Losses","Motor Losses","Gearbox Losses"],
		  datasets: [
			{
			  label: "Energy Use Breakdown (% of Total)",
			  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#1aff3f","#aaaaaa", "#bbbbbb","#cccccc","#dddddd"],
			  data: [totalAccelEnergy,totalAeroEnergy,totalRollingEnergy,totalAncillaryEnergy,totalgradientEnergy,totalEnergyLossInBattery,totalEnergyLossInInverter,totalEnergyLossInMotor,totalEnergyLossInGearbox],
			  //datalabels: {
							//anchor: 'start'
						//},
			  //count: 4
			}
		  ]
		},
		options: {
		  title: {
			display: true,
			text: 'Energy Use (kWh)'
		  },
			responsive: true,		  
		   pieceLabel: {
			render: 'percentage',
			//precision: 2,
			
			/*fontColor: function (data) {
			  var rgb = hexToRgb(data.dataset.backgroundColor[data.index]);
			  var threshold = 140;
			  var luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
			  return luminance > threshold ? 'black' : 'white';
			},*/
			fontColor: '#000',
			position: 'outside',
			precision: 2,
			overlap: true
		  },
			elements: {
			  center: {
			  text: totalEnergyText,
			  color: '#36A2EB', //Default black
			  fontStyle: 'Helvetica', //Default Arial
			  sidePadding: 15 //Default 20 (as a percentage)
			  }
			}
		}
	});

 }


function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function completeSimulationStage2(){
	console.log("hi");
	
	summaryLineChart = new Chart(document.getElementById("line-chart"), {
			  type: 'line',
			  data: {
				labels: timeArray100Second,  // timeArray  timeArray100Second
				datasets: [
				{ 
					data: timeArray,
					yAxisID: "B",
					label: "Time(s)",
					borderColor: "#3e95cd",
					showLine: false,
					pointRadius: 0,
					fill: false,
					lineTension: 0,
				  },
				{ 
					data: targetvelocityArray,
					label: "Target Velocity (kmph)",
					borderColor: "#3e95cd",
					fill: false,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 1,
				  },
				  { 
					data: actualvelocityArray,
					label: "Actual Velocity (kmph)",
					borderColor: "#3a12a2",
					fill: false,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 1,
				  }
				  
				]
			  },
			  options: {
				  legend: {
					display: true,
					labels: {
						//fontColor: 'rgb(255, 99, 132)',
						filter: function (tooltipItem) {
							return tooltipItem.datasetIndex != 0;
						},
					}
				},
				  responsive: true,
				  tooltips: {
					  mode: 'index',
					  intersect: false,
				  },
				   hover: {
					  mode: 'nearest',
					  intersect: true
				  },
			  elements: { 
			  point: { radius: 0 } 
			  },
			  title: {
				  display: true,
				  text: velocityProfileTitle
				},
				// Container for pan options

			  scales: { 
				xAxes: [{
							gridLines: {
                    display:false
                },
                            display: true,
                            //type: 'linear',
                            position: 'bottom',
                            scaleLabel: {
                                display: true,
                                labelString: 'Time (s)',
                                //fontStyle: 'bold'
                            },
                            ticks: {
     
                                autoSkip: false,
                                //maxTicksLimit: 10,
								//max: 1800,
								min: 0,
                            }
				}],
				yAxes: [{
					id: 'A',
					type: 'linear',
					position: 'left',
				  }, {
					id: 'B',
					type: 'linear',
					position: 'right',
					display: false,
					//ticks: {
					  //max: 1,
					 // min: 0
					//}
				  }
				 ]
				
			  },
					// Container for zoom options

		      } 
	});
};

function randomColor(input,input2,input3){
	input = input/10;
	input2 = input2/10;
	input3 = input3/10;
	var brightness = 100;
  function randomChannel(brightness){
    var r = 255-brightness;
    var n = 0|((input * r) + brightness);
    var s = n.toString(16);
    return (s.length==1) ? '0'+s : s;
  }
  function randomChannel2(brightness){
    var r = 255-brightness;
    var n = 0|((input2 * r) + brightness);
    var s = n.toString(16);
    return (s.length==1) ? '0'+s : s;
  }
  function randomChannel3(brightness){
    var r = 255-brightness;
    var n = 0|((input3 * r) + brightness);
    var s = n.toString(16);
    return (s.length==1) ? '0'+s : s;
  }
  return '#' + randomChannel(brightness) + randomChannel2(brightness) + randomChannel3(brightness);
}

function completeSimulationStage3(){
	master_plots_line_chart.destroy();
	master_plots_line_chart =  new Chart(document.getElementById("master-line-chart"), {
			  type: 'line',
			  data: {
				labels: timeArray100Second,  // timeArray  timeArray100Second
				datasets: [
				{ 
					data: timeArray,
					yAxisID: "B",
					label: "Time(s)",
					borderColor: "#3e95cd",
					showLine: false,
					pointRadius: 0,
					fill: false,
					lineTension: 0,
				  },
				  
				{ 
					data: PLOTtargetVelocityResults,
					label: "Target Velocity (kmph)",
					borderColor: randomColor(0,1,2),
					backgroundColor: randomColor(0,1,2),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTactualVelocityResults,
					label: "Vehicle Velocity (kmph)",
					borderColor: randomColor(1,3,6),
					backgroundColor: randomColor(1,3,6),
					fill: false,
					hidden: false,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTwheelRPMResults,
					label: "Wheel Speed (RPM)",
					borderColor: randomColor(2,6,2),
					backgroundColor: randomColor(2,6,2),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTmotorRPMResults,
					label: "Motor Speed (RPM)",
					borderColor: randomColor(3,1,9),
					backgroundColor: randomColor(3,1,9),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTmotorTorqueResults,
					label: "Motor Torque Output (Nm)",
					borderColor: randomColor(4,9,9),
					backgroundColor: randomColor(4,9,9),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTmaxMotorTorqueResults,
					label: "Max Motor Torque Possible(Nm)",
					borderColor: randomColor(5,6,1),
					backgroundColor: randomColor(5,6,1),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTtorqueInToWheelsResults,
					label: "Torque In To Wheels (Nm)",
					borderColor: randomColor(6,6,4),
					backgroundColor: randomColor(6,6,4),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTmotorEfficiencyResults,
					label: "Motor Efficiency (%)",
					borderColor: randomColor(7,2,4),
					backgroundColor: randomColor(7,2,4),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTpowerInToMotorResults,
					label: "Power In To Motor (W)",
					borderColor: randomColor(8,9,3),
					backgroundColor: randomColor(8,9,3),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTpowerLossesInMotorResults,
					label: "Power Losses in Motor (W)",
					borderColor: randomColor(9,2,7),
					backgroundColor: randomColor(9,2,7),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTpowerInToInverterResults,
					label: "Power In To Inverter (W)",
					borderColor: randomColor(0,7,3),
					backgroundColor: randomColor(0,7,3),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTpowerLossesInInverterResults,
					label: "Power Losses in Inverter (W)",
					borderColor: randomColor(1,2,6),
					backgroundColor: randomColor(1,2,6),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTpowerInToWheelsResults,
					label: "Power In To Wheels (W)",
					borderColor: randomColor(2,8,3),
					backgroundColor: randomColor(2,8,3),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTpowerInToGearboxResults,
					label: "Power In To Gearbox (W)",
					borderColor: randomColor(3,9,3),
					backgroundColor: randomColor(3,9,3),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTpowerLossesInGearboxResults,
					label: "Power Losses in Gearbox (W)",
					borderColor: randomColor(4,2,7),
					backgroundColor: randomColor(4,2,7),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTdragForceResults,
					label: "Drag Force (N)",
					borderColor: randomColor(5,7,5),
					backgroundColor: randomColor(5,7,5),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTrollingResistanceForceResults,
					label: "Rolling Resistance Force (N)",
					borderColor: randomColor(6,9,2),
					backgroundColor: randomColor(6,9,2),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTpowerToOvercomeDragResults,
					label: "Power To Overcome Drag (W)",
					borderColor: randomColor(7,6,4),
					backgroundColor: randomColor(7,6,4),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTpowerToOvercomeGradientResults,
					label: "Power to Overcome Gradient (W)",
					borderColor: randomColor(8,4,3),
					backgroundColor: randomColor(8,4,3),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTpowerToOvercomeRollingResistanceResults,
					label: "Rolling Resistance Power (W)",
					borderColor: randomColor(9,1,9),
					backgroundColor: randomColor(9,1,9),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTSOCResults,
					label: "Battery SOC (%)",
					borderColor: randomColor(0,8,3),
					backgroundColor: randomColor(0,8,3),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTauxLoadResults,
					label: "Auxilliary Loads (W)",
					borderColor: randomColor(1,0,3),
					backgroundColor: randomColor(1,0,3),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTbattTempResults,
					label: "Battery Temperature (degC)",
					borderColor: randomColor(2,7,2),
					backgroundColor: randomColor(2,7,2),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTtotalEnergyUsedSoFarResults,
					label: "Total Energy Used (Wh)",
					borderColor: randomColor(3,2,4),
					backgroundColor: randomColor(3,2,4),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTpowerOutOfBatteryResults,
					label: "Power out of Battery Pack (W)",
					borderColor: randomColor(4,0,1),
					backgroundColor: randomColor(4,0,1),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTpowerLossesInBatteryResults,
					label: "Power Losses in Battery (W)",
					borderColor: randomColor(5,0,7),
					backgroundColor: randomColor(5,0,7),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTdistanceTravelledResults,
					label: "Distance Travelled (m)",
					borderColor: randomColor(6,4,9),
					backgroundColor: randomColor(6,4,9),
					fill: false,
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				{ 
					data: PLOTaccelerationResults,
					label: "Acceleration (m/s/s)",
					borderColor: randomColor(7,2,5),
					fill: false,
					//fillStyle: this.borderColor,
					backgroundColor: randomColor(7,2,5),
					hidden: true,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 3,
				},
				
				  
				]
			  },
			  options: {
				  legend: {
					  position: 'right',
					display: true,
					labels: {
						//fontColor: 'rgb(255, 99, 132)',
						filter: function (tooltipItem) {
							return tooltipItem.datasetIndex != 0;
						},
					}
				},
				  responsive: true,
				  tooltips: {
					  mode: 'index',
					  intersect: false,
				  },
				   hover: {
					  mode: 'nearest',
					  intersect: true
				  },
			  elements: { 
			  point: { radius: 0 } 
			  },
			  title: {
				  display: true,
				  text: velocityProfileTitle
				},
				// Container for pan options

			  scales: { 
				xAxes: [{
							gridLines: {
                    display:false
                },
                            display: true,
                            //type: 'linear',
                            position: 'bottom',
                            scaleLabel: {
                                display: true,
                                labelString: 'Time (s)',
                                //fontStyle: 'bold'
                            },
                            ticks: {
     
                                autoSkip: false,
                                //maxTicksLimit: 10,
								//max: 1800,
								min: 0,
                            }
				}],
				yAxes: [{
					id: 'A',
					type: 'linear',
					position: 'left',
				  }, {
					id: 'B',
					type: 'linear',
					position: 'right',
					display: false,
					//ticks: {
					  //max: 1,
					 // min: 0
					//}
				  }
				 ]
				
			  },
					// Container for zoom options

		      } 
	});
	
	max_motor_torque_chart.destroy();
	max_motor_torque_chart =  new Chart(document.getElementById("max_motor_torque_chart"), {
			  type: 'line',
			  data: {
				labels: motorTorquePlotRPM,  // timeArray  timeArray100Second
				datasets: [
				{ 
					data: motorTorquePlotValues,
					label: "Maximum Motor Torque (Nm) for Varying Motor Speed (RPM)",
					borderColor: "#3e95cd",
					fill: false,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 1,
				  },				  
				]
			  },
			  options: {
				  legend: {
					display: false,
					labels: {
					}
				},
				  responsive: true,
				  tooltips: {
					  mode: 'index',
					  intersect: false,
				  },
				   hover: {
					  mode: 'nearest',
					  intersect: true
				  },
			  elements: { 
			  point: { radius: 0 } 
			  },
			  title: {
				  display: true,
				  text: "Maximum Motor Torque (Nm)"
				},
				// Container for pan options

			  scales: { 
				xAxes: [{
							gridLines: {
                    display:false
                },
                            display: true,
                            //type: 'linear',
                            position: 'bottom',
                            scaleLabel: {
                                display: true,
                                labelString: 'Motor Speed (RPM)',
                                //fontStyle: 'bold'
                            },
                            ticks: {
     
                                autoSkip: false,
                                //maxTicksLimit: 10,
								//max: 1800,
								min: 0,
                            }
				}],
				yAxes: [{
					id: 'A',
					type: 'linear',
					position: 'left',
				  }, {
					id: 'B',
					type: 'linear',
					position: 'right',
					display: false,
					//ticks: {
					  //max: 1,
					 // min: 0
					//}
				  }
				 ]
				
			  },
					// Container for zoom options

		      } 
	});
	
}


// Motor LUTs
// Know speed, so look up max torque, then decide torque, then look up efficiency




