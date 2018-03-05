
var targetvelocityArray = [];
var actualvelocityArray = [];
var accelArray = [];
var timeArray = [];
var timeArray10Second = [];

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

var totalEnergyperKM = 0;
var totalEnergyTextperKM = "";

var summaryLineChart = 0;
var energyBreakdownChart = 0;
var master_plots_line_chart = 0;
var totalDistanceinKM = 0;
		  

function toAngSpeed(linearSpeed){
		var omega = 2*linearSpeed /(veh_inputs_tyre_diameter / 1000);
		return(omega);
	}
	
	function toTorque( linearForce ){
		var Torque = linearForce * veh_inputs_tyre_diameter / (2 * 1000);
		return(Torque / veh_inputs_gear_ratio);
	}

function runSimulationClicked(){
	
	
	
	
	
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
	timeStep = [];
	
	if(DRIVE_CYCLE_TYPE ==1){
		var startingSpeed = 0;
		if(drive_inputs_driveCycleChoice ==  1){ timeStep = NEDC_70_array;}
		else if(drive_inputs_driveCycleChoice ==  2){ timeStep = NEDC_100_array;}
		else if(drive_inputs_driveCycleChoice ==  3){ timeStep = NEDC_120_array;}
		else if(drive_inputs_driveCycleChoice ==  4){ timeStep = WLTP3a_array;}
		else if(drive_inputs_driveCycleChoice ==  5){ timeStep = WLTP3b_array;}
		else if(drive_inputs_driveCycleChoice ==  6){ timeStep = RoyalMail_1_array;}
		else if(drive_inputs_driveCycleChoice ==  7){ timeStep = Farmdrop64_array;}
		else if(drive_inputs_driveCycleChoice ==  8){ timeStep = Farmdrop87_array;}
		}
	
	
	else if(DRIVE_CYCLE_TYPE ==2){
		timeStep = [];
		timeStepDuration = 0.01 // seconds
		for(n = 0; n < (drive_inputs_constSpeed_RunFor*100)+1; n++) {
			
			var thisTimestep = {t: n/100, speed: drive_inputs_constant_speed_val/3.6};
			console.log("ThisTimeStep t = " + thisTimestep.t);

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
	
	var totalTime = timeStep.length;
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
	
	
	//for( k = 0; k<10; k++ ){
	for (i = 0; i < totalTime*1+0*31; i++) { 
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
		
		var currentWheelAngSpeed = toAngSpeed(currentSpeed);
		
		var requiredAccelForce = veh_inputs_total_mass * targetAcceleration;
		var requiredAccelTorque = toTorque(requiredAccelForce);
	
		var aerodynamicDragForce = 0.5 * veh_inputs_drag_coefficient * 1.19 * veh_inputs_frontal_area * (v+drive_inputs_windSpeed/3.6)*(v+drive_inputs_windSpeed/3.6);
		var aerodynamicDragEnergy = aerodynamicDragForce * v * timeStepDuration;
		var requiredAeroTorque = toTorque(aerodynamicDragForce);
		//console.log("Aero Energy is: ");
		//console.log(aerodynamicDragEnergy);
		
		var rollingResistanceForce = veh_inputs_total_mass * veh_inputs_rolling_resistance * 9.81;
		var rollingResistanceEnergy  = rollingResistanceForce  * v * timeStepDuration;
		var requiredRollingResistanceTorque = toTorque(rollingResistanceForce);
		
		var gradientAngle = 0
		
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
		var gradientEnergy  = gradientForce  * v * timeStepDuration;
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
			//Motor must provide torque
			// *** need to add torque available calculation
			if(torqueToGenerate < 200){
				torqueGenerated = torqueToGenerate;
			}
			else{
				torqueGenerated = 200;
			}
		}
		//console.log("Torque Generated:");
		//console.log(torqueGenerated);
		//console.log("");
		var actualAccelTorque = torqueGenerated - requiredAeroTorque - requiredRollingResistanceTorque - requiredgradientTorque;
		var actualAccelForce = 2000*actualAccelTorque*veh_inputs_gear_ratio/veh_inputs_tyre_diameter;
		var actualAccelEnergy = actualAccelForce * v * timeStepDuration;
		var actualAcceleration = actualAccelForce / veh_inputs_total_mass;
			
		
		currentTimeStep.vehicleTrueAccel = actualAcceleration;
		
		var actualWheelInputTorque = Math.max(torqueGenerated,0);
		var actualForceIntoWheels = 2000*actualWheelInputTorque*veh_inputs_gear_ratio/veh_inputs_tyre_diameter;
		var actualEnergyIntoWheels = actualForceIntoWheels * v * timeStepDuration;
		
		//console.log("Accel Energy is: ");
		//console.log(actualAccelEnergy);	

		var actualEnergyIntoGearbox = actualEnergyIntoWheels/0.90; //*** need to add gearbox efficiency
		var EnergyLossInGearbox = actualEnergyIntoGearbox - actualEnergyIntoWheels;
		
		var motor_efficiency = 95;
		var actualEnergyIntoMotor =  actualEnergyIntoGearbox/(motor_efficiency/100);
		var EnergyLossInMotor = actualEnergyIntoMotor - actualEnergyIntoGearbox;
		
		var actualEnergyIntoInverter =  actualEnergyIntoMotor/(veh_inputs_inverter_efficiency/100);
		var EnergyLossInInverter = actualEnergyIntoInverter - actualEnergyIntoMotor;
		
		var actualEnergyOutOfBattery =  actualEnergyIntoInverter/0.9; //*** need to add battery efficiency
		var EnergyLossInBattery = actualEnergyOutOfBattery - actualEnergyIntoInverter;	
		
		var distanceTraveled = currentSpeed*timeStepDuration;
			
			//4.Calculate Battery Voltage and Current and C Rate
			
			
			//5. Adjust battery SOC
			
			
			//6. Calculate battery Heatup
			
			//7. Calculate battery cooling
			
			
			//If negative apply realistic braking torque
			
		totalDistanceinKM += distanceTraveled/1000;

		
		
		totalEnergyLossInBattery += EnergyLossInBattery/3600000;
		totalEnergyLossInInverter += EnergyLossInInverter/3600000;
		totalEnergyLossInMotor += EnergyLossInMotor/3600000;
		totalEnergyLossInGearbox += EnergyLossInGearbox/3600000;
		
		totalgradientEnergy += Math.max(gradientEnergy/3600000,0);
		totalAccelEnergy += Math.max(actualAccelEnergy/3600000,0);
		totalAeroEnergy += aerodynamicDragEnergy/3600000;
		totalRollingEnergy += rollingResistanceEnergy/3600000;
		totalAncillaryEnergy += veh_inputs_constant_aux_load*timeStepDuration*1000/3600000;
		
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
		
		
		
		if(currentTimeStepNum/summaryPlotTimeStep == Math.round(currentTimeStepNum/summaryPlotTimeStep) || currentTimeStepNum == totalTime-1){
			
			
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
		
		
		//console.log(timeStep[currentTime]);
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
	
	totalEnergyLossInBattery = Math.round( totalEnergyLossInBattery*100 )/100;
	totalEnergyLossInInverter = Math.round( totalEnergyLossInInverter*100 )/100;
	totalEnergyLossInMotor = Math.round( totalEnergyLossInMotor*100 )/100;
	totalEnergyLossInGearbox = Math.round( totalEnergyLossInGearbox*100 )/100;
	
	totalgradientEnergy = Math.round( totalgradientEnergy*100 )/100;
	totalAccelEnergy = Math.round( totalAccelEnergy*100 )/100;
	totalAeroEnergy = Math.round( totalAeroEnergy*100 )/100;
	totalRollingEnergy = Math.round( totalRollingEnergy*100 )/100;
	totalAncillaryEnergy = Math.round( totalAncillaryEnergy*100 )/100;
	
	totalEnergyLossInBatteryPerKM = Math.round( totalEnergyLossInBatteryPerKM*10 )/10;
	totalEnergyLossInInverterPerKM = Math.round( totalEnergyLossInInverterPerKM*10 )/10;
	totalEnergyLossInMotorPerKM = Math.round( totalEnergyLossInMotorPerKM*10 )/10; ;
	totalEnergyLossInGearboxPerKM = Math.round( totalEnergyLossInGearboxPerKM*10 )/10;
		
	totalgradientEnergyPerKM =  Math.round( totalgradientEnergyPerKM*10 )/10;
	totalAccelEnergyPerKM =  Math.round( totalAccelEnergyPerKM*10 )/10;
	totalAeroEnergyPerKM = Math.round( totalAeroEnergyPerKM*10 )/10;
	totalRollingEnergyPerKM = Math.round( totalRollingEnergyPerKM*10 )/10;
	totalAncillaryEnergyPerKM = Math.round( totalAncillaryEnergyPerKM*10 )/10;
	
	
	var totalLosses = totalEnergyLossInGearbox + totalEnergyLossInMotor + totalEnergyLossInInverter + totalEnergyLossInBattery;
	var totalEnergy = totalAncillaryEnergy + totalRollingEnergy + totalAeroEnergy + totalAccelEnergy + totalgradientEnergy + totalLosses;
	totalEnergy = Math.round( totalEnergy*100 )/100;
	totalEnergyText = "Total: " + totalEnergy.toString() + " kWh";
	
	totalEnergyperKM = 1000*totalEnergy/totalDistanceinKM;
	totalEnergyperKM = Math.round( totalEnergyperKM*10 )/10;
	totalEnergyTextperKM = "Total: " + totalEnergyperKM.toString() + " Wh/km";

	
	totalDistanceinKM = Math.round( totalDistanceinKM*1000 )/1000;
	velocityProfileTitle = "Velocity Profile Data - Total Distance Was " + totalDistanceinKM.toString() + "km.";
	
	// Populate range section
		totalCapacityWh
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
				  },
				  { 
					data: accelArray,
					label: "Acceleration (m/s/s)",
					borderColor: "#3cba9f",
					fill: false,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 1,
				  },
				  
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
				  },
				  { 
					data: accelArray,
					label: "Acceleration (m/s/s)",
					borderColor: "#3cba9f",
					fill: false,
					lineTension: 0,
					cubicInterpolationMode: "monotone",
					borderWidth: 1,
				  },
				  
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
}


