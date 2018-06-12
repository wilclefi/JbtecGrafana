FROM grafana/grafana:latest
ADD ./provisioning /etc/grafana/provisioning
ADD ./config.ini /etc/grafana/config.ini
ADD ./dashboards /var/lib/grafana/dashboards
COPY img/fav32.png /usr/share/grafana/public/img/fav32.png
COPY img/grafana_icon.svg /usr/share/grafana/public/img/grafana_icon.svg