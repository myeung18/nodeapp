
### https://www.conjur.org/blog/smart-secrets-management-using-conjur-and-secretless-broker/

```
docker exec postgres bash -c "psql -U \$POSTGRES_USER <<-EOSQL
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
```