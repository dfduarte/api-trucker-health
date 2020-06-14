# Trucker Health API

Olá! Seja bem vindo ao API do Trucker Health! 

Essa API e funcional e mocka alguns dados usados pelo frontend.

Esses dados sao basicamente as informações basicas do front, informações sobre o botão SOS e informações sobre o batimento cardiaco.

## Requerimentos

É necessário atender a alguns requisitos antes de implementar a API. Essa API e baseada no framework Serverless e depende de alguns serviços da plataforma AWS.

Isso e interessante, pois em alguma futura expansão, o esse servico já é pensado para nuvem numa futura subida em produção, tornando-o facilmente implementavel e possibilitando até a portabilidade para plataformas CNCF (Cloud Native) no futuro.

Principais requisitos são:

* Acesso a uma conta AWS
* Criação de profile IAM ou alguma pipeline com acesso de escrita ao API Gateway, Lambda, CloudFormation, S3 e DynamoDB
* NPM e NodeJS 
* Serverless

## Deploy

1- Entre nos 3 diretórios em `src/repositories` e rode o `npm install` em cada um deles.
2- Crie um perfil com as permissoes acima no console IAM da AWS (ou scriptado, dependendo do que você precisar)
3- Na raiz, rode o seguinte comando:
```
AWS_PROFILE=<seu profile criado> AWS_REGION=<sua regiao> AWS_SDK_LOAD_CONFIG=true slss deploy
```

4- aguarde o deploy finalizar. Ele precisa retornar os endpoints. como por exemplo:

```
PPM-SPO-6421:hacka-ccr diego.duarte$ AWS_PROFILE=hackaton AWS_REGION=us-east-1 AWS_SDK_LOAD_CONFIG=true slss deploy
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service serverless-workstations.zip file to S3 (26.22 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..........................................................................
Serverless: Stack update finished...
Service Information
service: serverless-workstations
stage: v1
region: us-east-1
stack: serverless-workstations-v1
resources: 70
api keys:
  None
endpoints:
  GET - https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/v1/beat
  GET - https://xxxxxx.execute-api.us-east-1.amazonaws.com/v1/trucker
  GET - https://xxxxxx.execute-api.us-east-1.amazonaws.com/v1/trucker/{id}
  POST - https://xxxxxx.execute-api.us-east-1.amazonaws.com/v1/trucker
  PUT - https://xxxxxx.execute-api.us-east-1.amazonaws.com/v1/trucker/{id}
  DELETE - https://xxxxxx.execute-api.us-east-1.amazonaws.com/v1/trucker/{id}
  GET - https://xxxxx.execute-api.us-east-1.amazonaws.com/v1/emergency
  GET - https://xxxxxxx.execute-api.us-east-1.amazonaws.com/v1/emergency/{id}
  POST - https://xxxxxx.execute-api.us-east-1.amazonaws.com/v1/emergency
  PUT - https://xxxxxx.execute-api.us-east-1.amazonaws.com/v1/emergency/{id}
  DELETE - https://xxxxxxx.execute-api.us-east-1.amazonaws.com/v1/emergency/{id}
functions:
  getHeartBeat: serverless-workstations-v1-getHeartBeat
  listTrucker: serverless-workstations-v1-listTrucker
  queryTrucker: serverless-workstations-v1-queryTrucker
  insertTrucker: serverless-workstations-v1-insertTrucker
  updateTrucker: serverless-workstations-v1-updateTrucker
  deleteTrucker: serverless-workstations-v1-deleteTrucker
  listEmergency: serverless-workstations-v1-listEmergency
  queryEmergency: serverless-workstations-v1-queryEmergency
  insertEmergency: serverless-workstations-v1-insertEmergency
  updateEmergency: serverless-workstations-v1-updateEmergency
  deleteEmergency: serverless-workstations-v1-deleteEmergency
layers:
  None
Serverless: Removing old service artifacts from S3...
Serverless: Run the "serverless" command to setup monitoring, troubleshooting and testing.
```

## Consumindo endpoints

Existem 3 endpoints já online para consumo e testes no hackaton, caso necessário:

```
  GET - https://jjhd4l4hr8.execute-api.us-east-1.amazonaws.com/v1/beat
  
  GET - https://jjhd4l4hr8.execute-api.us-east-1.amazonaws.com/v1/trucker
  GET - https://jjhd4l4hr8.execute-api.us-east-1.amazonaws.com/v1/trucker/{id}
  POST - https://jjhd4l4hr8.execute-api.us-east-1.amazonaws.com/v1/trucker
  PUT - https://jjhd4l4hr8.execute-api.us-east-1.amazonaws.com/v1/trucker/{id}
  DELETE - https://jjhd4l4hr8.execute-api.us-east-1.amazonaws.com/v1/trucker/{id}
  
  GET - https://jjhd4l4hr8.execute-api.us-east-1.amazonaws.com/v1/emergency
  GET - https://jjhd4l4hr8.execute-api.us-east-1.amazonaws.com/v1/emergency/{id}
  POST - https://jjhd4l4hr8.execute-api.us-east-1.amazonaws.com/v1/emergency
  PUT - https://jjhd4l4hr8.execute-api.us-east-1.amazonaws.com/v1/emergency/{id}
  DELETE - https://jjhd4l4hr8.execute-api.us-east-1.amazonaws.com/v1/emergency/{id}
  ```

No caso do `/beat`, um simples GET retorna um valor aleatório entre 70-89bpm para ser usado na função de batimento cardiaco e funções de saude.

Na rota `trucker`, temos o seguinte contrato, com dados de exemplo:

```
{
  "id": <Gerado automaticamente pela aplicacao>,
  "trucker_cpf": "00000000196",
  "trucker_current_trip_time": "9",
  "trucker_end_trip_time": "18:00",
  "trucker_license_plate": "PVH-2A76",
  "trucker_name": "Fulano da Silva",
  "trucker_points": "8000",
  "trucker_ranking_pos": "1",
  "trucker_start_trip_time": "9:00"
}
```
* Para criar um dado, submeta um POST com esse objeto e os dados necessarios para a rota `/trucker`.
* Para atualizar, submeta um PUT para a rota, passando o {id} do usuário no URL Path, por exemplo: `https://jjhd4l4hr8.execute-api.us-east-1.amazonaws.com/v1/emergency/6cac70bb-e66b-4011-bac9-0aeffae5e39c` e passando o objeto acima (sem id) como payload.
* Para buscar, passe um GET com o id no URL Path
* Para listar todos, passe um GET sem nenhum parametro ou payload para `/trucker`

----------
Em `/emergency`, temos o seguinte contrato:

```
{
  "id": "6cac70bb-xxxxxx-4011-yyyy-0aeffae5e39c",
  "is_clicked": "false",
  "trucker_id": "6cac70bb-e66b-4011-bac9-0aeffae5e39c"
}
```
Onde, *trucker_id* e a id do caminhoneiro, como visto em `/trucker`, *is_clicked*, é se o botao foi acionado, e *id* e a id em UUIDv4 desse evento

As regras de manipulação do endpoint sao as mesmas do endpoint `/trucker`

----------

## Outras partes desse projeto:

* Frontend: [https://github.com/GabrieleSuzart/web-trucker-health](https://github.com/GabrieleSuzart/web-trucker-health)
* Mobile: [https://github.com/maclacerda/trucker-health](https://github.com/maclacerda/trucker-health)
* API: [https://github.com/dfduarte/api-trucker-health](https://github.com/dfduarte/api-trucker-health)
