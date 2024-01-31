FROM registry.3tit.vn/base/base-docker-image/nginx:latest
COPY ./dist /usr/share/nginx/html/
