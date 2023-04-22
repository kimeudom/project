#include <gtest/gtest.h>
#include<iostream>
#include "../cell.hpp"



TEST(ListCheck, CheckNull){
  Point x;
  x.longitude = 5;
  x.latitude = 5;
  Cell *c = new Cell(x);
  EXPECT_EQ(true, c->isEmpty());
}

int main(int argc, char **argv){
  ::testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}