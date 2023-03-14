/* 
Assumes a database smsCB is already created and can be connected to

Author: Kimeu Dominic
v=1.0

*/

/* Creating tables*/

/* Categories table */
DROP TABLE IF EXISTS categories;

/* Clients Table*/
DROP TABLE IF EXISTS clients;

create table clients(
  tel VARCHAR(20)not null primary key,
  msg MEDIUMTEXT not null,
  cellID int not null,
  baseID int not null,
  lastConnectedZone int,
  lastConnectedBase int,
  connectionStatus binary default 0,
  category JSON
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
  longitude float(15,2) not null,
  latitude float(15,2) not null,
  maxConnected int not null
);

/* Cells Table*/
DROP TABLE IF EXISTS cells;

create table cells(
  id int primary key,
  baseID int not null,
  longitude float(15,2) not null,
  latitude float(15,2) not null,
  maxConnected int not null
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
