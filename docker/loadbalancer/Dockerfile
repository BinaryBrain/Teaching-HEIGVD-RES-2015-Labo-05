From httpd:2.4

RUN apt-get update
RUN apt-get install vim -y
RUN apt-get --purge remove node  -y
RUN apt-get install nodejs -y

RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN apt-get update --fix-missing
RUN apt-get install npm -y


# COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf
# COPY ./balancer.conf /usr/local/apache2/conf/extra/balancer.conf
# COPY ./app /app
# COPY ./apache.sh /app/apache.sh

# ENTRYPOINT /app/start.sh
