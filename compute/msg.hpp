// Defines a message object
#include<string>
#include<iostream>
#include<iomanip>
#include<ctime>

namespace message{

std::string getTime(){
  time_t rawtime;
  struct tm * timeinfo;
  char buffer[80];

  time (&rawtime);
  timeinfo = localtime(&rawtime);

  strftime(buffer,sizeof(buffer),"%d-%m-%Y %H:%M:%S",timeinfo);
  std::string str(buffer);
  return str;
}

// Generate a unique 10 digit number as the message ID
long long genID(){
  struct timespec ts;
  clock_gettime(CLOCK_MONOTONIC, &ts);

  // Seeding every nano-second
  srand((time_t)ts.tv_nsec);

  return rand() % 900000000LL + 1000000000LL;
}

class msg{
  public:
    std::string message;
    long long msgID;
    std::string time;
    std::string categories;

  public:
    msg(std::string msg, std::string cat);
    std::string getMsg() { return message; };
    std::string getTime() { return time; };
    std::string getCat() { return categories; };
    long long getID() { return msgID; };
};

msg::msg(std::string msg, std::string cat){
    message = msg;
    msgID = genID();
    categories = cat;
    time = getTime();
}

}
