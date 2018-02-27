
var velocityArray = [];
var accelArray = [];
var timeArray = [];
var timeArray10Second = [];

var totalAccelEnergy = 0;
var totalAeroEnergy = 0;
var totalRollingEnergy = 0;
var totalAncillaryEnergy = 0;

function runSimulationClicked(){
	
	$("#simProgressBarValues").removeClass("progress-bar-success");
	$("#simButton").addClass("btn-primary");
	$("#simButton").removeClass("btn-success");
	$('#simProgressBarValues').css('width', '0%');
	
	getVehicleInputValues();
	console.log("success, sim now running!");

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
	console.log("vehicle mass is");
	console.log(veh_inputs_total_mass);
	
	
	// Generate timestep array with 1 second being each array entry
	velocityArray = [];
	accelArray = [];
	timeArray = [];
	timeArray100Second = [];
	
	timeStep = NEDC_100_array;
	
	var totalTime = timeStep.length;
	
	//simProgressBarValues
	
	var d = new Date();
	var t_start = d.getTime();
	console.log(t_start);
	//for(k=1; k<10000; k++){
	
	velocityArray.push(06); 
	accelArray.push(0); 
	timeArray.push(0);
	
	
	totalAccelEnergy = 0;
	totalAeroEnergy = 0;
	totalRollingEnergy = 0;
	totalAncillaryEnergy = 0;
	//for( k = 0; k<10; k++ ){
	for (i = 1; i <= 1200; i++) { 
		currentTime = i;
		
		var previousTimeStep = timeStep[currentTime-1];
		var currentTimeStep = timeStep[currentTime];
		var nextTimeStep = timeStep[currentTime+1];
		var v = currentTimeStep.speed;
		var a = currentTimeStep.speed - previousTimeStep.speed ;
		
		currentTimeStep.accel = a;
		
		currentTimeStep.aerodynamicDragPower = 0.5 * veh_inputs_drag_coefficient * 1.19 * veh_inputs_frontal_area * v*v*v;
	 
		currentTimeStep.rollingResistancePower = veh_inputs_total_mass * veh_inputs_rolling_resistance * 9.81 * v;
		
		currentTimeStep.accelerationPower = veh_inputs_total_mass * Math.max(a,0) * v;
		
		currentTimeStep.deccelerationPower = veh_inputs_total_mass * Math.min(a,0) * v;
		
		currentTimeStep.powerAtWheels = currentTimeStep.aerodynamicDragPower + currentTimeStep.rollingResistancePower + currentTimeStep.accelerationPower ;
		
		currentTimeStep.batteryPower = currentTimeStep.powerAtWheels / 0.95 / 0.95 / 0.85 / 0.95;
		
		velocityArray.push(Math.round(timeStep[currentTime].speed*3.6*10)/10); 
		accelArray.push(timeStep[currentTime].accel); 
		timeArray.push(i);
		
		
		totalAccelEnergy += currentTimeStep.accelerationPower/3600000;
		totalAeroEnergy += currentTimeStep.aerodynamicDragPower/3600000;
		totalRollingEnergy += currentTimeStep.rollingResistancePower/3600000;
		totalAncillaryEnergy += veh_inputs_constant_aux_load*1000/3600000;
		
		if(currentTime/500 == Math.round(currentTime/500) ){
			//console.log(currentTime);
			timeArray100Second.push(i);

		}
		else{
			timeArray100Second.push("");
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
	
	totalAccelEnergy = Math.round( totalAccelEnergy*100 )/100;
	totalAeroEnergy = Math.round( totalAeroEnergy*100 )/100;
	totalRollingEnergy = Math.round( totalRollingEnergy*100 )/100;
	totalAncillaryEnergy = Math.round( totalAncillaryEnergy*100 )/100;
	
	
}


function completeSimulationStage1(){
energyBreakdownClicked();
			new Chart(document.getElementById("line-chart"), {
			  type: 'line',
			  data: {
				labels: [0],
				datasets: [{ 
					data: [0],
					label: "Velocity",
					borderColor: "#3e95cd",
					fill: false
				  }
				]
			  },
			  options: {
			  elements: { 
			  point: { radius: 0 } 
			  },
			  title: {
				  display: true,
				  text: 'Accel Data'
				},
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
                                labelString: 'Time',
                                //fontStyle: 'bold'
                            },
                            ticks: {
     
                                autoSkip: false,
                                //maxTicksLimit: 10,
								max: 1200,
								min: 0,
                            }
				}],
				
			  }
		      } 
	});
	
	new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
      labels: ["Acceleration", "Aero", "Rolling Energy", "Ancillaries"],
      datasets: [
        {
          label: "Energy Use Breakdown (kWh)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
          data: [totalAccelEnergy,totalAeroEnergy,totalRollingEnergy,totalAncillaryEnergy]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Energy Use (kWh)'
      }
    }
});
}


function completeSimulationStage2(){
	console.log("hi");
	
		new Chart(document.getElementById("line-chart"), {
			  type: 'line',
			  data: {
				labels: timeArray100Second,
				datasets: [{ 
					data: velocityArray,
					label: "Velocity (kmph)",
					borderColor: "#3e95cd",
					fill: false
				  },
				  { 
					data: accelArray,
					label: "Acceleration (m/s/s)",
					borderColor: "#3cba9f",
					fill: false
				  }
				]
			  },
			  options: {
			  elements: { 
			  point: { radius: 1 } 
			  },
			  title: {
				  display: true,
				  text: 'Accel Data'
				},
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
                                labelString: 'Time',
                                //fontStyle: 'bold'
                            },
                            ticks: {
     
                                autoSkip: false,
                                //maxTicksLimit: 10,
								max: 1200,
								min: 0,
                            }
				}],
				
			  }
		      } 
	});
};

function completeSimulationStage3(){
	
}


