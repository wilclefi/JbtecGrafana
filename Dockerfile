FROM grafana/grafana:latest

MAINTAINER Wilclefison Lima <wil.lima@jbtec.com.br>

EXPOSE 3000

COPY img/fav32.png /usr/share/grafana/public/img/fav32.png

COPY img/grafana_icon.svg /usr/share/grafana/public/img/grafana_icon.svg

COPY files/grafana.db /var/lib/grafana/grafana.db