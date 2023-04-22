#include<iostream>
#include<math.h>
#include"client.hpp"

int main(int argc, char ** argv){
  msg *m = new msg("This is the message", "General Public");
  std::cout << "ID :" << m->getID() << std::endl;
  std::cout << "msg :" << m->getMsg() << std::endl;
  std::cout << "time :" << m->getTime() << std::endl;
  std::cout << "cat :" << m->getCat() << std::endl;

  return 0;
}
