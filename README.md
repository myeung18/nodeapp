
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
CREATE TABLE IF NOT EXISTS Fruit(id varchar(100) PRIMARY KEY , name varchar(100), quantity varchar(11) null, description varchar(200) null);

INSERT INTO Fruit (id, name, quantity, description) VALUES ('d37f4fae-b572-47b3-93e0-17daf798f9d5', 'Banana', '0', 'Good for health') ON CONFLICT (ID) DO NOTHING;
INSERT INTO Fruit (id, name, quantity, description) VALUES ('51661376-0a07-449b-a3bd-9db79cd4ead4', 'Apple', '0', 'Keeps the doctor away') ON CONFLICT (ID) DO NOTHING;
INSERT INTO Fruit (id, name, quantity, description) VALUES ('69f6cd81-59fc-493b-8ebf-1b9f150ecead', 'Blueberry','0', 'Antioxidant Superfood') ON CONFLICT (ID) DO NOTHING;

CREATE TABLE names (
  id serial primary key,
  name varchar(256)
);

/* Create Application User */ 
CREATE USER \$APPLICATION_DB_USER PASSWORD '\$APPLICATION_DB_INITIAL_PASSWORD';  

/* Add Grants */
GRANT SELECT, INSERT ON names TO \$APPLICATION_DB_USER; 
GRANT SELECT, INSERT ON fruit TO \$APPLICATION_DB_USER; 
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

# Misc Commands
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
$ docker-compose -f dc-db-app.yml down --rmi all

$ docker exec -it web-postgres /bin/bash -c "PGPASSWORD=postgres psql -d express -U postgres"
# Postgresql command
\c <dbname>	    #connect to a db
\l		          #list all dbs
\q     		      #quit
\dn            	#all schemas
\df		          #all stored proc.
\dv		          #all views
\dt		          #all tables
\dt+		        #more info. on tables.
\du 		        #all users
\qdesc		      #col types of a query
\x on  		      #format output in narrow screen format

# run DB init

# 
localhost:8081/hi
localhost:8081/load

```