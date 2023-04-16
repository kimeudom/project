/*
Defines all client method operations that might be needed to classify, move, find a client in a network
*/
#include <iostream>
#include <math.h>
#include "./msg.hpp"


struct Point{
  float longitude;
  float latitude;
};

class client{
  private:
    // Defining all data memebers required by a class object of member;
    Point point;
    std::string tel;
    int cellID;
    int base;
    int zone;
    int lastConnectedZone;
    int lastConnectedBase;
    bool connectionStatus;
    std::string category;
  
  public:
    client(std::string tel, Point point, int base, int zone, std::string cat);
    // Returns true if the client is in range of the supplied coordinates
    // Else returns false
    bool isInRange(Point centre, float radius);
    // Returns true if the client's state is active or dormant/passive
    // Else if otherwise
    bool isActive();
    // Moves the client to a new base and zone as supplied by the data
    void changeover(int newBase, int newZone);
    // Returns true if the message sent to a user has been repeated
    bool repeatMsg(Point centre, float radius, msg message);
    // Returns true if the message was sent successfully
    // Else otherwise
    bool sendMsg();
};

client::client(std::string telephone, Point coords, int bse, int zne, std::string cat){
    connectionStatus = 1;
    tel = telephone;
    point.longitude = coords.longitude;
    point.latitude = coords.latitude;
    base = bse;
    zne = zone;
    category = cat;
};

bool client::isActive(){
  if(connectionStatus == 0){
    return false;
  }
  return true;
}

void client::changeover(int newBase, int newZone){
  lastConnectedBase = base;
  lastConnectedZone = zone;
  base = newBase;
  zone = newZone;
}

bool client::isInRange( Point centre, float radius){
  // Getting the euchladian distance between the centre of the zone and the client position
  double euchDistance = sqrt(pow(point.latitude - centre.latitude, 2) + pow(point.longitude - centre.longitude, 2));
  return (euchDistance <= radius);
}

void client::sendMsg(){

}