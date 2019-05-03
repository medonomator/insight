FROM amazonlinux

RUN apt-get update
RUN apt-get install https

RUN echo 'Hello world from Docker!' > /var/www/html/index.html
CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"] 

EXPOSE 8080:8080