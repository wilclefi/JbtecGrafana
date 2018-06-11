# JbtecGrafana


## Comandos para utilizar:

Criar imagem com o docker file
```
 docker build -t jbtec/grafana .
```
Inicar uma docker com a imagem criada:
```
docker run -d --name grafanahouse -p 5000:3000 jbtec/grafana
```