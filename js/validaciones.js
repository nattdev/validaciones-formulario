const todayDate = new Date();
const inputBirth = document.querySelector("#birth");

inputBirth.addEventListener("blur", validarDate); 

function validarDate() {
	const userDate = new Date(inputBirth.value + "T00:00:00");
	let mensaje = "";
	if(!mayorDeEdad(userDate)){
		mensaje = "Debe tener al menos 18 años de edad";
	} 
	inputBirth.setCustomValidity(mensaje);
}

function mayorDeEdad(userDate) {
	const comparisonDate = new Date(
		todayDate.getUTCFullYear() - 18,
		todayDate.getUTCMonth(),
		todayDate.getUTCDate()
	);
	return userDate <= comparisonDate;
}
