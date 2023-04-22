/*
Defines all client method operations that might be needed to classify, move, find a client in a network
*/
#include <iostream>
#include <math.h>
#include "./msg.hpp"

struct Point{
  double longitude;
  double latitude;
};
class client
{
private:
  // Defining all data memebers required by a class object of member;
  Point point;
  std::string tel;
  int cell;
  int base;
  int lastConnectedCell;
  int lastConnectedBase;
  bool connectionStatus;
  std::string category;

public:
  client(std::string tel, Point point, int base, int cell, std::string cat);
  // Returns true if the client is in range of the supplied coordinates
  // Else returns false
  bool isInRange(Point centre, double radius);
  // Returns true if the client's state is active or dormant/passive
  // Else if otherwise
  bool isActive();
  // Moves the client to a new base and zone as supplied by the data
  void handOver(int newBase, int newCell);
  // Returns true if the message sent to a user has been repeated
  bool repeatMsg(Point centre, float radius, message::msg message);

  // Get methods
  std::string getTel() { return tel; };
  double getLat() { return point.latitude; };
  double getLon() { return point.longitude; };
  int getCell() { return cell; };
  int getBase() { return base; };
  int getLCell() { return lastConnectedCell; };
  int getLBase() { return lastConnectedBase; };
  bool getConnStatus() { return connectionStatus; };
  std::string getCat() { return category; };

  // Set methods
  void setLat(double lat) { point.latitude = lat; };
  void setLon(double lon) { point.longitude = lon; };
  void setConnStatus(bool val) { connectionStatus = val; };
  void setCat(std::string s) { category = s; };

  // Operator overloading
  bool operator==(client *c);
};

client::client(std::string telephone, Point coords, int bse, int cll, std::string cat){
    connectionStatus = 1;
    tel = telephone;
    point.longitude = coords.longitude;
    point.latitude = coords.latitude;
    base = bse;
    cell = cll;
    category = cat;
    lastConnectedBase = 0;
    lastConnectedCell = 0;
};

bool client::isActive(){
  if(connectionStatus == 0){
    return false;
  }
  return true;
}

void client::handOver(int newBase, int newCell){
  lastConnectedBase = base;
  lastConnectedCell = cell;
  base = newBase;
  cell = newCell;
}

bool client::isInRange( Point centre, double radius){
  // Getting the euchladian distance between the centre of the zone and the client position
  double euchDistance = sqrt(pow(point.latitude - centre.latitude, 2) + pow(point.longitude - centre.longitude, 2));
  return (euchDistance <= radius);
}

// Overloading the == operator

bool client::operator==(client *c){
  if(strcmp(tel.c_str(), c->getTel().c_str()) == 0){
    return true;
  }

  return false;
}