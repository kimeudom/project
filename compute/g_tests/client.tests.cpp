// Unit testing for the clients methods

#include "gtest/gtest.h"
#include <iostream>
#include "../client.hpp"

using namespace std;

// Create Client
TEST(Constructor, Create){
  Point coords;
  coords.longitude = 100;
  coords.latitude = 100;
  client *c = new client("123456789", coords, 123, 456, "General Public");

  EXPECT_STREQ(c->getTel().c_str(), "123456789");
  EXPECT_EQ(100, c->getLon());
  EXPECT_EQ(100, c->getLat());
  EXPECT_EQ(123, c->getBase());
  EXPECT_EQ(456, c->getCell());
  EXPECT_STREQ(c->getCat().c_str(), "General Public");
  delete c;
}

// Base Handovers
TEST(ClientOperations, Handover){
  Point coords;
  coords.longitude = 100;
  coords.latitude = 100;
  client *c = new client("123456789", coords, 123, 456, "General Public");

  EXPECT_EQ(c->getLBase(), 0);
  EXPECT_EQ(c->getLCell(), 0);

  c->handOver(789,101112);
  
  EXPECT_EQ(c->getLBase(), 123);
  EXPECT_EQ(c->getLCell(), 456);
  EXPECT_EQ(c->getBase(), 789);
  EXPECT_EQ(c->getCell(), 101112);
  delete c;
}

TEST(ClientOperations, setMethods){
  Point coords;
  coords.longitude = 100;
  coords.latitude = 100;
  client *c = new client("123456789", coords, 123, 456, "General Public");

  // Latitude and Longitude setting
  double var1 = 654835.654;
  double var2 = -485848.54498;
  c->setLat(var1);
  c->setLon(var2);
  EXPECT_EQ(c->getLat(), 654835.654);
  EXPECT_EQ(c->getLon(), -485848.54498);

  c->setConnStatus(false);
  EXPECT_EQ(c->getConnStatus(), false);
  c->setConnStatus(true);
  EXPECT_EQ(c->getConnStatus(), true);

  c->setCat("Law Enforcement");
  EXPECT_STREQ(c->getCat().c_str(), "Law Enforcement");

  delete c;
}

// Checking range function`
TEST(ZoneRange, InRange){
  Point coords;
  coords.longitude = 100;
  coords.latitude = 100;
  client *c = new client("123456789", coords, 123, 456, "General Public");

  /// Defining the zone Z
  // General range test
  Point z;
  z.longitude = 5;
  z.latitude = 5;
  c->setLon(7);
  c->setLat(14);
  float radius = 11;

  EXPECT_EQ(c->isInRange(z, radius), true);

  /// Defining the zone Z
  // Close range test
  z.longitude = -1178.58;
  z.latitude = 65465.5;
  double var1 = -1177.32;
  double var2 = 65462.32;
  c->setLon(var1);
  c->setLat(var2);
  radius = 4.01;

  EXPECT_EQ(c->isInRange(z, radius), true);
  /// Defining the zone Z
  // Large range test
  z.longitude = 100000;
  z.latitude = 5000000;
  c->setLon(99990);
  c->setLat(4995320);
  radius = 30000;

  EXPECT_EQ(c->isInRange(z, radius), true);

  delete c;
}

TEST(ZoneRange, onBorder){

}

TEST(ZoneRange, outOfRange){

}

int main(int argc, char ** argv){
  ::testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}