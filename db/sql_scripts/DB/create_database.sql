/* 
Assumes a database smsCB is already created and can be connected to

Author: Kimeu Dominic
v=1.2

*/

/* Creating tables*/
/* Messages Table */
DROP TABLE IF EXISTS msg;
create table msg(
  id int primary key,
  clientID varchar(25) not null,
);

/* Clients Table*/
DROP TABLE IF EXISTS clients;

create table clients(
  tel VARCHAR(25)not null primary key,
  cellID int not null,
  baseID int not null,
  lastConnectedCell int,
  lastConnectedBase int,
  connectionStatus binary default 0,
  categories VARCHAR(100)
);

/*Carriers Table*/
DROP TABLE IF EXISTS carriers;
create table carriers(
  id int primary key,
  carrierName VARCHAR(50)
);

/* Base Station Table*/
DROP TABLE IF EXISTS bstations;

create table bstations(
  id int primary key,
  carrierID int not null,
  latitude decimal(25,19) not null,
  longitude decimal(25,19) not null,
  maxConnected int not null
);

/* Cells Table*/
DROP TABLE IF EXISTS cells;

create table cells(
  id int primary key,
  baseID int not null,
  latitude decimal(25,19) not null,
  longitude decimal(25,19) not null,
  maxConnected int not null
);

/*Zones Table*/
DROP TABLE IF EXISTS zones;

CREATE TABLE zones(
  zoneID INT PRIMARY KEY AUTO_INCREMENT,
  zoneName VARCHAR(255),
  latitude decimal(25,19) not null,
  longitude decimal(25,19) not null,
  radius decimal(25,19)
);

/*Filter Tables*/

DROP TABLE IF EXISTS filters;

CREATE TABLE filters(
  filterID INT PRIMARY KEY AUTO_INCREMENT ,
  filterName VARCHAR(255),
  clientCategory INT
);

/*Msg payload*/
CREATE TABLE msgPayload(
  id INT PRIMARY KEY,
  msg VARCHAR(255),
  lat decimal(25,19) not null,
  lng decimal(25,19) not null,
  radius decimal(25,19) not null
);


/*Relationships*/

/* Carriers and Base station Relationship */
ALTER TABLE bstations ADD CONSTRAINT fk_bstations_carriers FOREIGN KEY (carrierID) REFERENCES carriers(id);

/* Base Stations and Cells */
ALTER TABLE cells ADD CONSTRAINT fk_cells_bstations FOREIGN KEY (baseID) REFERENCES bstations(id);

/*Clients and Cells*/
ALTER TABLE clients ADD CONSTRAINT fk_clients_cells FOREIGN KEY (cellID) REFERENCES cells(id);

/*Clients and Base Stations*/
ALTER TABLE clients ADD CONSTRAINT fk_clients_bstations FOREIGN KEY (baseID) REFERENCES bstations(id);

/* Client and msg*/
ALTER TABLE msg ADD CONSTRAINT fk_msg_client FOREIGN KEY (clientID) REFERENCES clients(tel);


/*msg and msg Payload*/
ALTER TABLE msg ADD CONSTRAINT fk_msg_payload FOREIGN KEY(id) REFERENCES msgPayload(id);