FROM node

# Copy src in docker
COPY src /src/
WORKDIR /src/

# EXPOSE 3000

# Install expressjs, PM2 and dependencies
RUN npm install express
RUN npm install -g pm2@0.12.9
RUN npm install

# Run sh
CMD /src/run.sh
