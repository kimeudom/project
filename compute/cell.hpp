#include <iostream>
#include <list>
#include <algorithm>
#include"./client.hpp"


// Generate a unique 10 digit number as the message ID
long long genID(){
  struct timespec ts;
  clock_gettime(CLOCK_MONOTONIC, &ts);

  // Seeding every nano-second
  srand((time_t)ts.tv_nsec);

  return rand() % 900000000LL + 1000000000LL;
}

class Cell
{
private:
  long long id;
  Point coordinates;
  std::list<client*> clients;
public:

  bool isEmpty();

  // Getters
  long long getID() { return id; };
  int getLat() { return coordinates.latitude; };
  int getLon() { return coordinates.longitude; };
  // Setters
  Cell(Point x, long long idNo);
  bool setCoords(Point x);
  bool addClient(client * c);
  bool deleteClient(client *c);
  bool removeClient(client *C);
};

// Constructor
Cell::Cell(Point x, long long idNo = 0){
   if(idNo == 0){
     id = genID();
   }
   coordinates = x;
}


bool Cell::isEmpty(){
  if(clients.size() == 0){
     return true;
  }

  return false;
}


// Iterates over the clients in the list and finds a match if possible
bool Cell::deleteClient(client *c){
  if(isEmpty()){
     return false;
  }

  std::list<client *>::iterator i = std::find(clients.begin(), clients.end(), c);

  return false;
}

