const dataNascimento = new Date(1993,8,23)

function calcularIdade(dataDeNascimento: Date):number {
  const dataAtual = new Date();
  const diferencaEmMilissegundos = dataAtual.getTime() - dataDeNascimento.getTime();
  const idadeEmAnos = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24 * 365.25));
  return idadeEmAnos;
}