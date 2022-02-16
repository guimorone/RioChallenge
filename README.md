# RioChallenge

## Primeiramente: Deve-se criar um arquivo .env na pasta raiz e adicionar sua chave API do google, nesse formato -> `API_KEY="chave"`
#### Se tiver algum problema com a chave, pode falar comigo.

## Após isso, seguir os passos abaixo:
### `npm i` Instalar os pacotes utilizados
### `npm run build`
### `npm start`
#### Pronto, server rodando na porta 3000.


## Resalvas

#### Não sei exatamente como foi feito o design da página, mas o que está sendo apresentado ai é apenas para teste.
#### O botão QRCode deixei aparecendo como foi mostrado na especificação do projeto, mas não botei nenhuma funcionalidade nele
#### A parte de buscar intinerários também só está como template (é para ver tanto o caminho de ida como de volta do intinerário), não conseguia filtrar os intinerários da API
#### Não consegui fazer a API do google mostrar as rotas quando a gente pesquisa a viagem pelo id dela, mas elas são disponibilizadas direitinho pelos nomes das paradas, só não apontam no mapa. Porém, da pra ver as linhas de tráfego e transito (metrô e trem) no mapa.
#### O linter do EJS as vezes buga e fica apontando erro onde não tem, mas isso não é problema, é só para se perceber a sinalização, ela não impede de rodar o projeto.