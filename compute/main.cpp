#include<iostream>
#include<math.h>
#include"client.hpp"

int main(int argc, char ** argv){
  Point coords;
  coords.longitude = 0;
  coords.latitude = 0;

  client *c = new client("123456789", coords, 123, 456, "General Public");
  c->setLat(654835.654);
  c->setLon(-485848.54498);

  std::cout << "Latitude :" << c->getLat() << std::endl
       << "Longitude : " << c->getLon() << std::endl;
  return 0;
}
