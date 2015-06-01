From httpd:2.4

RUN apt-get update
RUN apt-get install vim -y
RUN apt-get --purge remove node -y
RUN apt-get install nodejs -y

RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN apt-get update --fix-missing
RUN apt-get install npm -y

# Erase default Apache conf
COPY ./conf/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./conf/httpd-vhosts-lb.conf /usr/local/apache2/conf/extra/httpd-vhosts-lb.conf


COPY src /src/

WORKDIR /src/

# CMD /src/launch.sh
