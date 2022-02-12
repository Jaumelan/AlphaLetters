
# Scrabble 
## Regras para Português

###Quantidade de letras
O alfabeto português têm 120 letras, e a distribuição delas no jogo é a seguinte:

|      Pontuação   |     Letra       |    Quantidade     |
|------------------|-----------------|------------------ |
|          0       |   Em branco     |         3         |
|          1       |        A        |         14        |
|          1       |        E        |         11        |
|          1       |        I        |         10        |
|          1       |        0        |         10        |
|          1       |        S        |         8         |
|          1       |        U        |         7         |
|          1       |        M        |         6         |
|          1       |        R        |         6         |
|          1       |        T        |         5         |
|          2       |        D        |         5         |
|          2       |        L        |         5         |
|          2       |        C        |         4         |
|          2       |        P        |         4         |
|          3       |        N        |         4         |
|          3       |        B        |         3         |
|          3       |        Ç        |         2         |
|          4       |        F        |         2         |
|          4       |        G        |         2         |
|          4       |        H        |         2         |
|          4       |        V        |         2         |
|          5       |        J        |         2         |
|          6       |        Q        |         1         |
|          8       |        X        |         1         |
|          8       |        Z        |         1         | 

### Começo do jogo
Cada jogador recebe uma letra, começará quem tiver a letra mais perto de A. Quem tiver uma ficha em branco começará.
Depois devem devolver a ficha e pegar 7 e o jogo continuará em sentido horário.
O primer jogador deve colocar sua palavra no centro do tabuleiro

### Troca de fichas
Todos os jogadores podem trocar suas fichas durante seus turnos. Devem baixar todas as fichas que quiserem trocar, sem mostrá-las, pegar o mesmo número de fichas da bolsa e depois colocar as fichas separadas na bolsa.
Quando é feita a troca, o jogador não pode colocar uma palavra no tabuleiro.

### Pular a vez
Em vez de colocar uma palavra no tabuleiro, qualquer jogador pode pular sua vez, contudo se todos os jogadores pularem sua vez duas vezes seguidas o jogo acaba.

### Palavras permitidas
Podem ser usadas quaisquer palavras encontradas no dicionário de português, com exceção de:
 - nomes próprios (palavras que começam com letra maiúscula);
 - abreviações;
 - prefixos;
 - sufixos;
 - qualquer palavra com hífen
Estrangeirismos são permitidos se estiverem no dicionário.

### Regras

 - Quando uma letra é colocada no tabuleiro, ela não poderá ser trocada
   a não ser que alguém desafie o jogador, e caso a palavra não existir
   no dicionário, deverá retirar a palavra/letra;
 - Todos os jogadores devem ter 7 fichas;
 - Se uma ficha em branco (coringa) for usada;
 - A mesma palavra pode ser usada mais de uma vez;
 - São permitidas palavras no plural;
 - Qualquer jogador pode usar seu turno para aumentar uma palavra no tabuleiro (judicial=>extrajudicial);
 - Quando a palavra é colocada no tabuleiro, os jogadores podem "desafiar" o jogador, e será verificada a existência da palavra no dicionário. **Somente** neste momento será permitido o uso do dicionário. Caso a palavra não cumpra os requisitos das palavras permitidas, ela será removida e o jogador perderá sua vez.

### Pontuação
Cada letra tem sua pontuação, caso a letra estiver nas casas dos bônus, seu valor será a pontuação da letra vezes o número no tabuleiro.
Os bônus podem ser para a letra e para a palavra. A soma deverá ser feita da seguinte forma:

 1. Calcular todos os bônus das letras;
 2. Somar o valor total da palavra;
 3. Multiplicar o valor la palavra pelo bônus.

Cada jogador receberá a pontuação da palavra que criou no tabuleiro.
No fim do jogo, será subtraída a soma total dos valores das letras que ficaram com o jogador a sua pontuação.
Caso um jogador, ao finalizar o jogo, tenha usado todas suas fichas, será adicionada a sua pontuação a soma de todos os valores das letras que ficaram com os outros jogadores.

### Finalização da vez de cada jogador
A vez do jogador finalizará quando acontecer algumas das seguintes situações:

 - pegar uma ficha do banco de fichas;
 - realizar uma troca de fichas;
 - decidir pular;
 - no desafio, sua palavra não cumpre os requisitos.

### Fim do jogo
O jogo finaliza quando:

 1. Não houver mais fichas no banco de fichas e um jogador não tiver mais fichas consigo;
 2. Não for possível formar mais palavras;
 3. Todos os jogadores passaram sua vez duas vezes consecutivas.

### API dicionário de português
https://api.dicionario-aberto.net/index.html
https://api.dicionario-aberto.net/word/cavalo retorna a entrada cavalo do dicionário