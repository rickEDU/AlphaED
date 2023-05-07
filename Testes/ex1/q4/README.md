# Motivos para escolha dos testes:

### Blocos de teste:

* No primeiro describe(), fiz teste para verificar se a função está sendo realmente chamada no arquivo de teste, e se ela está recebendo os parâmetros corretamente.
* No segundo describe, testei como a função **"availableMovies"** se comportaria se for passado parâmetros como um vetor vazio, o age com valor negativo ou com valor 0.
* No terceiro describe testei o retorno da função com valores válidos, ou seja, com um vetor de movies contendo objetos e com um valor age maior que 0, assim posso verificar se ela está funcionando corretamente.
<br/>
### Justificativa da suficiencia dos teste:
Acredito que com esses teste acima, a função está completamnte verificada e com seu retorno bem definido.

### Melhoria na implementação:
 Acredito que a implementação de availableMovies poderia ser melhorada se o operador da comparação de **"minAge"** e **"age"** fosse **"<="**, pois se fosse passado o valor **"age =18"** retornaria também os filmes com a faixa etária da idade passada, ou seja, os filmes de 18 anos também seriam incluídos no retorno juntamente com os filmes que possuem uma faixa etária menor que esse valor.