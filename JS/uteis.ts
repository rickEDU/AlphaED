// exemplo de input na função para calcular a idade:
const dataNascimento = new Date(1993,8,23)
// função para calcular a iddade:
function calcularIdade(dataDeNascimento: Date):number {
  const dataAtual = new Date();
  const diferencaEmMilissegundos = dataAtual.getTime() - dataDeNascimento.getTime();
  const idadeEmAnos = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24 * 365.25));
  return idadeEmAnos;
}

//Regex seboso:
// usando a tabela de octal para excluir os caracteres especiais 
//link: https://docs.generic-mapping-tools.org/6.2/_images/GMT_App_F_stand+_iso+.png
const name ="teste"
name = name.replace(/[\031-\037]/g, "")