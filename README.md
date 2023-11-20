# Bet

### 🌎 Descrição do problema

Apostar com os amigos e amigas no resultado de um jogo de futebol nunca foi novidade, afinal, a rivalidade faz parte do jogo. Entretanto, essa realidade ganhou uma nova dimensão nos últimos anos. Inúmeros aplicativos diferentes surgiram com essa proposta, onde o fluxo (simplificado) basicamente é:

- Uma série de eventos esportivos que vão acontecer aparecem para o usuário;
- O usuário faz uma aposta dentro de um evento esportivo (por exemplo, em quem será o vencedor entre uma partida de futebol do Flamengo contra o Botafogo).
- O evento esportivo acontece e, caso o usuário tenha acertado, recebe um valor.

E é claro que não poderíamos ficar de fora desta onda!

Neste desafio, usaremos este contexto e você deverá implementar o back-end de um sistema de apostas de uma casa de apostas que deseja automatizar os seus processos para competir com esses aplicativos.

#

### Rotas do projeto:

<!--
<details>
</details>

<summary>
</summary>
-->
<details>   
    <summary>POST <code>/participants</code></summary>

- Cria um participante com determinado saldo inicial.

- Entrada:
  ```ts
  {
    name: string;
    balance: number; // representado em centavos, ou seja, R$ 10,00 -> 1000
  }
  ```
- Saída:

  ```ts
  {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    balance: number; // representado em centavos, ou seja, R$ 10,00 -> 1000
  }
  ```

  </details>

<details>
    <summary>POST <code>/games</code></summary>

- Cria um novo jogo, com placar inicial 0x0 e marcado como não finalizado.

- Entrada:
  ```ts
  {
    homeTeamName: string;
    awayTeamName: string;
  }
  ```
- Saída:

  ```ts
  {
    id: number;
    createdAt: string;
    updatedAt: string;
    homeTeamName: string;
    awayTeamName: string;
    homeTeamScore: number; // inicialmente 0
    awayTeamScore: number; // inicialmente 0
    isFinished: boolean; // inicialmente false
  }
  ```

  </details>

<details>
<summary>POST <code>/bets</code></summary>

- Cadastra uma aposta de um participante em um determinado jogo. O valor da aposta deve ser descontado imediatamente do saldo do participante.
- Entrada:
  ```ts
  {
    homeTeamName: string;
    awayTeamName: string;
  }
  ```
- Saída: o objeto do jogo criado.
  ```ts
  {
    id: number;
    createdAt: string;
    updatedAt: string;
    homeTeamName: string;
    awayTeamName: string;
    homeTeamScore: number; // inicialmente 0
    awayTeamScore: number; // inicialmente 0
    isFinished: boolean; // inicialmente false
  }
  ```
  </details>

<details>

<summary>POST <code>/games/:id/finish</code></summary>

- Finaliza um jogo e consequentemente atualiza todas as apostas atreladas a ele, calculando o valor ganho em cada uma e atualizando o saldo dos participantes ganhadores.

- Entrada:

  ```ts
  {
    homeTeamScore: number;
    awayTeamScore: number;
  }
  ```

- Saída: o objeto do jogo criado.
  ```ts
  {
    id: number;
    createdAt: string;
    updatedAt: string;
    homeTeamName: string;
    awayTeamName: string;
    homeTeamScore: number;
    awayTeamScore: number;
    isFinished: boolean;
  }
  ```
  </details>

<details>
<summary>GET <code>/participants</code></summary>

- Retorna todos os participantes e seus respectivos saldos.

- Saída: o objeto do jogo criado.

  ```ts
      [
          {
              id: number;
              createdAt: string;
              updatedAt: string;
              name: string;
              balance: number; // representado em centavos, ou seja, R$ 10,00 -> 1000
          },
          {...}
      ]
  ```

</details>

<details>
<summary>GET <code>/games</code></summary>

- Retorna todos os jogos cadastrados.

- Saída: array de todos os jogos

  ```ts
      [
          {
              id: number;
              createdAt: string;
              updatedAt: string;
              homeTeamName: string;
              awayTeamName: string;
              homeTeamScore: number;
              awayTeamScore: number;
              isFinished: boolean;
          },
          {...}
      ]
  ```

</details>

<details>
<summary>GET <code>/games/:id</code></summary>

- Retorna os dados de um jogo junto com as apostas atreladas a ele.

- Saída: o objeto do jogo contendo a array de apostas realizadas nele.
  ```ts
  {
    id: number;
    createdAt: string;
    updatedAt: string;
    homeTeamName: string;
    awayTeamName: string;
    homeTeamScore: number;
    awayTeamScore: number;
    isFinished: boolean;
    bets: {
      id: number;
      createdAt: string;
      updatedAt: string;
      homeTeamScore: number;
      awayTeamScore: number;
      amountBet: number; // representado em centavos, ou seja, R$ 10,00 -> 1000
      gameId: number;
      participantId: number;
      status: string; // podendo ser PENDING, WON ou LOST
      amountWon: number || null; // nulo quando a aposta ainda está PENDING; number caso a aposta já esteja WON ou LOST, com o valor ganho representado em centavos
    }
    [];
  }
  ```

</details>

#

### Tecnologias

- TypeScript
- Node(versão 18.16.1)
- Prisma + Express
- Postgres
- Joi, Jest e Supertest

#

### Como rodar o projeto

- Clone o `.env.example`
- Renomeie a cópia como `.env`
- Para poder executar os testes, será necessário criar um outro arquivo `.env.test` com base no `.env.example`
- Configure `.env` e `.env.test`
  <details>
    <summary> Insira os dados do seu Postgre </summary>
    
    - Seguindo os padrões do documento original, preencha de acordo com o exemplo abaixo:
    
      ```js
      POSTGRES_USERNAME=driven //Nome do seu usuário Postgre
      POSTGRES_PASSWORD=senhaSecreta123 //Senha do seu usuário Postgre
      POSTGRES_HOST=localhost //Nome do Host
      POSTGRES_PORT=5432 //Número da Porta do Postgre
      POSTGRES_DATABASE=betDB //Nome do seu banco de dados
        
      DATABASE_URL=postgresql://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}?schema=public
      ```
  </details>
- Executar os comandos na pasta do projeto:

    ```js
    - npm i
    - npm run prisma:dev
    - npm run dev
    ```

#

### Deploy do projeto

`https://bet-b61y.onrender.com`
