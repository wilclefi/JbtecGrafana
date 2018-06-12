### Informações gerais

As dockers tem cada uma um nome, são eles:
- Prometheus-Jbtec
- Grafana-Jbtec
- Coletor-Jbtec

Portas padroẽs:
- Prometheus-Jbtec 5050:9090
- Grafana-Jbtec 7000:3000
- Coletor-Jbtec 3000:3000


### Comandos para utilizar


```sh
make  run                  # Build o grafana e prometheus
                           # imagens e inicializa todos containers
                           # que forma o infra (grafana e prometheus).
                           # Embreve o coletor tbm aushaushausha

make  update-dashboards    # atualiza a lista de arquivos json que representam
                           # os dashboards configurados no Grafana.

```
### Arquivos de configurações

/grafana/config.ini  # Configurações basicas do grafana 
                     # provisioning, enable_gzip, default_theme

/grafana/provisioning/datasources/all.yml # Configurações de onde o grafa ira pegar os dados em Time series 
                                          # **Rota Padrao: http://172.16.0.55:5050**


/grafana/dashboards/ # Configuração das deashboard que irão aparecer no granfana toda que estiverem aqui
                     # serão importadas quando o comando update-dashboards for executado


/grafana/img/ # Imagens que são importadas para o grafa e subistituirão as imagens do grafana
              # Lembrando que os arquivos precisam estar citados no dockerfile para serem exportados para a docker.

/prometheus/config.yml # Configurações de onde o prometheus ira extrair as metricas. 
                       # **Rota Padrao: localhost:3000**

/update-dashboards.sh # arquivo que atualiza as deashboards do grafana. 
                      # lembrese de alterar as url's caso você tenha alterado as portas padrão do container.
                      # **Rota Padrao: http://localhost:7000**
