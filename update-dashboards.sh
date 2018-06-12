#!/bin/bash

# Atualiza as configurações do painel local recuperando
# a nova versão de uma instância do Grafana.
#
# O script pressupõe que a autenticação básica está configurada
# (mude as credenciais de login com `LOGIN`).
#
# PASTA_DASHBOARDS representa o caminho para o diretório
# onde existem os arquivos JSON correspondentes aos painéis.
# O local padrão é relativo à execução do
# roteiro.
#
# URL especifica o URL da instância do Grafana.
#
apt-get update # Para atualizar os links
apt-get install jq -y #Para instalar o jq - processador de JSons

set -o errexit

readonly URL=${URL:-"http://localhost:4000"}
readonly LOGIN=${LOGIN:-"admin:admin"}
readonly PASTA_DASHBOARDS=${PASTA_DASHBOARDS:-"./grafana/dashboards"}


main() {
  local dashboards=$(list_dashboards)
  local dashboard_json

  show_config

  for dashboard in $dashboards; do
    dashboard_json=$(get_dashboard "$dashboard")

    if [[ -z "$dashboard_json" ]]; then
      echo "ERRO:
  Não foi possível recuperar o painel: $dashboard.
      "
      exit 1
    fi

    echo "$dashboard_json" >$PASTA_DASHBOARDS/$dashboard.json
  done
}


# Mostra as variáveis de ambiente global que foram configuradas
# para esta execução.
show_config() {
  echo "INFO:
  Iniciar extração dos paineis
  
  URL:                  $URL
  LOGIN:                $LOGIN
  PASTA_DASHBOARDS: $PASTA_DASHBOARDS
  "
}

# Recupera um painel ($ 1) do banco de dados de painéis.
#
# Como estamos acertando no banco de dados, ele conterá um `id`.
#
# Dado que o ID é potencialmente diferente quando o importamos
# mais tarde, para tornar este painel importável, criamos o `id`
# field NULL.
get_dashboard() {
  local dashboard=$1

  if [[ -z "$dashboard" ]]; then
    echo "ERRO:
  Um painel deve ser especificado.
  "
    exit 1
  fi

  curl \
    --silent \
    --user "$LOGIN" \
    $URL/api/dashboards/db/$dashboard |
    jq '.dashboard | .id = null'
}

# lista todos os painéis disponíveis.
# em /api/search lista todos os painéis e pastas
#
# Aqui filtramos a resposta (que também contém pastas)
# para reunir apenas o nome dos painéis.
list_dashboards() {
  curl \
    --silent \
    --user "$LOGIN" \
    $URL/api/search |
    jq -r '.[] | select(.type == "dash-db") | .uri' |
    cut -d '/' -f2
}

main "$@"
