const InputEl = document.querySelector("#password");


// biome-ignore lint/style/useConst: <explanation>
let passwordLength = 16;

function generatePassword() {
	// Definindo os caracteres possíveis para a senha
	const chars =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789?!@&*()[]";

	// "let" é utilizado aqui porque a senha será construída ao longo do loop
	let password = "";

	// Laço de repetição para gerar uma senha de 8 caracteres
	for (let i = 0; i < passwordLength; i++) {
		// Gera um número aleatório entre 0 e o tamanho da string 'chars'
		const randomNumber = Math.floor(Math.random() * chars.length);

		// Cria um recorte da string 'chars' para pegar um caractere aleatório
		// O 'randomNumber' determina o ponto inicial e o 'randomNumber + 1' pega um único caractere
		password += chars.substring(randomNumber, randomNumber + 1);
	}

	// Atualiza o valor do input apenas uma vez, após a senha ser gerada
	
	InputEl.value = password;
}

function Copy(){
	navigator.clipboard.writeText(InputEl.value);
}

// Configura o event listener para o input de comprimento da senha
const passwordLengthEl = document.querySelector("#password-length");

passwordLengthEl.addEventListener("input", () => {
    passwordLength = Number.parseInt(passwordLengthEl.value);
	
// Gera a senha novamente com o novo comprimento
generatePassword(); 
});
document.querySelector('#copy-one').addEventListener('click', Copy);
document.querySelector('#copy-two').addEventListener('click', Copy);

// Chama a função para gerar a senha inicial
generatePassword();