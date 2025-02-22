function generatePassword () {
    // Definindo os caracteres possíveis para a senha
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789?!@&*()[]"

    // "let" é utilizado aqui porque a senha será construída ao longo do loop
    let password = ""

    // Laço de repetição para gerar uma senha de 8 caracteres
    for(let i = 0; i < 8; i++) {
        // Gera um número aleatório entre 0 e o tamanho da string 'chars'
        const randomNumber = Math.floor(Math.random() * chars.length);

        // Cria um recorte da string 'chars' para pegar um caractere aleatório
        // O 'randomNumber' determina o ponto inicial e o 'randomNumber + 1' pega um único caractere
        password += chars.substring(randomNumber, randomNumber + 1);

        // Floor tira a parte decimal do número gerado aleatoriamente, 
        // já que Math.random() retorna um número flutuante entre 0 e 1
        // Math.random() gera o número aleatório, e *chars.length faz com que o número 
        // esteja dentro do índice válido da string de caracteres 'chars'
        // substring() é utilizado para pegar uma parte da string a partir do índice 'randomNumber'
    }

}

// Chama a função para gerar a senha
 generatePassword();

console.log(password);
