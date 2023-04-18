// Defines a message object
#include<string>
#include<iostream>
#include<iomanip>
#include<ctime>

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

class msg{
  public:
    std::string message;
    int msgID;
    std::string time;
    std::string categories;

  public:
    msg(int id, std::string msg, std::string cat);
    std::string getMsg() { return message; };
    std::string getTime() { return time; };
    int getID() { return msgID; };
};

msg::msg(int id, std::string msg, std::string cat){
    message = msg;
    msgID = id;
    categories = cat;
    time = getTime();
}