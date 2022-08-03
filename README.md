
### https://www.conjur.org/blog/smart-secrets-management-using-conjur-and-secretless-broker/

```
# build
$ docker build -t mypg:01 .

# run 
$ docker run \
  --env-file .env \
  --name web-postgres \
  -d \
  -p 5432:5432 \
  mypg:01 \
  -c ssl=on \
  -c ssl_cert_file=/var/lib/postgresql/server.crt \
  -c ssl_key_file=/var/lib/postgresql/server.key 

$ docker exec web-postgres bash -c "psql -U \$POSTGRES_USER <<-EOSQL
/* Create Data Structures */
CREATE DATABASE \$POSTGRES_DB; 

\c \$POSTGRES_DB; 

CREATE TABLE names (
  id serial primary key,
  name varchar(256)
);

/* Create Application User */ 
CREATE USER \$APPLICATION_DB_USER PASSWORD '\$APPLICATION_DB_INITIAL_PASSWORD';  

/* Add Grants */
GRANT SELECT, INSERT ON names TO \$APPLICATION_DB_USER; 
GRANT USAGE, SELECT ON SEQUENCE names_id_seq TO \$APPLICATION_DB_USER;

/* Populate Values */
INSERT into names(name) values ('Alex'), ('Mike'), ('Roger'); 

EOSQL
"

# run node app
node index.js

```

```shell
#
npm insteall pg dotenv --save

#
npm install
node index2.js

docker build -t quay.io/myeung/fruit-app-nodejs:v0.0.1 . 
docker run --rm -p quay.io/myeung/fruit-app-nodejs:v0.0.1

docker push quay.io/myeung/fruit-app-nodejs:v0.0.1

docker-compose up
docker-compose up --build
docker-compose down --rmi all

# DB app with postgresql
$ docker-compose -f dc-db-app.yml up --build

$ docker exec -it web-postgres /bin/bash -c "PGPASSWORD=postgres psql -d express -U postgres"
# run DB init

# 
localhost:8081/hi
localhost:8081/load

```