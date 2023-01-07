export function valida(input) {
	const tipoDeInput = input.dataset.tipo;
	console.log(tipoDeInput);
	console.log("typeof", typeof(tipoDeInput));
	// Valida si existe la clave, si no existe es False
	if(validadores[tipoDeInput]) {
		console.log("IS TRUE");
		validadores[tipoDeInput](input);
	}
	if(input.validity.valid) {
		input.parentElement.classList.remove("input-container--invalid");
		input.parentElement.querySelector(".input-message-error").innerHTML = "";
	} else {
		input.parentElement.classList.add("input-container--invalid");
		input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoDeInput, input); 
	}
	console.log(validadores[tipoDeInput]);
	console.log(input);
}

const tipoDeErrores = [
	"valueMissing",
	"typeMismatch",
	"patternMismatch",
	"customError",
];

const validadores = {
	nacimiento: (input) => validarDate(input),
};

const mensajesDeError = {
	name: {
		valueMissing: "El campo nombre no puede estar vacío",
	},
	email: {
		valueMissing: "El campo email no puede estar vacío",
		typeMismatch: "El campo email no es válido"
	},
	password: {
		valueMissing: "El campo contraseña no puede estar vacío",
		patternMismatch: "Tiene que contener mínimo 6, máximo 12 caracteres, al menos una letra mayúscula, un número y no debe contener caracteres especiales"
	},
	nacimiento: {
		valueMissing: "El campo fecha no puede estar vacío",
		customError: "Debe tener al menos 18 años de edad", 
	},
	telephone: {
		valueMissing: "El campo teléfono no puede estar vacío",
		patternMismatch: "Tiene que contener 10 digitos del 1 al 9"
	},
	address: {
		valueMissing: "El campo dirección no puede estar vacío",
		patternMismatch: "Tiene que contener al menos 4 caracteres"
	},
	city: {
		valueMissing: "El campo ciudad no puede estar vacío",
		patternMismatch: "Tiene que contener al menos 4 caracteres"
	},
	state: {
		valueMissing: "El campo state no puede estar vacío",
		patternMismatch: "Tiene que contener al menos 4 caracteres"
	},
};

function mostrarMensajeError(tipoDeInput, input){
	let mensaje= "";
	tipoDeErrores.forEach((error) => {
		if(input.validity[error]) {
			console.log(tipoDeInput, error);
			console.log(input.validity[error]);
			console.log(mensajesDeError[tipoDeInput][error]);
			mensaje = mensajesDeError[tipoDeInput][error];
		}
	});
	return mensaje;
};

//const todayDate = new Date();
//const inputBirth = document.querySelector("#birth");

//inputBirth.addEventListener("blur", validarDate); 

function validarDate(input) {
	const userDate = new Date(input.value + "T00:00:00");
	let mensaje = "";
	if (!mayorDeEdad(userDate)) {
		mensaje = "Debe tener al menos 18 años de edad";
	} 
	input.setCustomValidity(mensaje);
}

function mayorDeEdad(userDate) {
	const todayDate = new Date();
	const comparisonDate = new Date(
		todayDate.getUTCFullYear() - 18,
		todayDate.getUTCMonth(),
		todayDate.getUTCDate()
	);
	return userDate <= comparisonDate;
}
