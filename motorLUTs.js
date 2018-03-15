

function craMaxTorque(rpm){
	if(rpm < 1900){
		var maxTorque = 300;
	}
	else if(rpm > 9235){
		if(rpm < 10500){
			var maxTorque = 60;
		}
		else{
			var maxTorque = 0;
		}
	}
	else{
		var adjRpm = rpm - 1900;
		var maxTorque = -0.00000000109237092 * Math.pow(adjRpm,3) + 0.000017567787 * Math.pow(adjRpm,2) - 0.10280541*adjRpm + 300;
	}
	return(maxTorque);
}

function ATXMaxTorque(rpm){
	if(rpm < 3000){
		var maxTorque = 240 * 70/240;
	}
	else if(rpm > 5000){
		var maxTorque = 0;
	}
	else{
		var adjRpm = rpm - 2200;
		var maxTorque =  70/240*(-1.09049*Math.pow(10,-10)*Math.pow(adjRpm,3) + 3.43884*Math.pow(10,-6)*Math.pow(adjRpm,2) -4.09752*Math.pow(10,-2)*adjRpm+ 240);
	}
	return(maxTorque);
}

function T4MaxTorque180mm(rpm){ //scaled down T4 motor results
	if(rpm < 3000){
		var maxTorque = 240;
	}
	else if(rpm > 14000){
		var maxTorque = 0;
	}
	else{
		var adjRpm = rpm - 3000;
		var maxTorque = -1.09049*Math.pow(10,-10)*Math.pow(adjRpm,3) + 3.43884*Math.pow(10,-6)*Math.pow(adjRpm,2) -4.09752*Math.pow(10,-2)*adjRpm+ 240;
	}
	return(maxTorque);
}

function generateTorque(torqueToGenerate,currentMotorSpeedRPM){
	var torqueGenerated = 0;
	if(veh_inputs_motor_type == 1){ // CRA Motor
				torqueGenerated = Math.min(torqueToGenerate,craMaxTorque(currentMotorSpeedRPM));
			}
			else if(veh_inputs_motor_type == 2){ // Dual CRA Motor
				torqueGenerated = Math.min(torqueToGenerate,2*craMaxTorque(currentMotorSpeedRPM));
			}

			else if(veh_inputs_motor_type == 4){ // T4 Motor 180mm
				torqueGenerated = Math.min(torqueToGenerate,T4MaxTorque180mm(currentMotorSpeedRPM));
			}
			else if(veh_inputs_motor_type == 5){ // ATX Motor Scaled from T4
				torqueGenerated = Math.min(torqueToGenerate,ATXMaxTorque(currentMotorSpeedRPM));
			}
	
	torqueGenerated = torqueGenerated * veh_inputs_frontDriveUnits + torqueGenerated * veh_inputs_rearDriveUnits;
	
	return(torqueGenerated);
	
}

