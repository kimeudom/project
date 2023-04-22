#include<gtest/gtest.h>
#include<time.h>
#include"../msg.hpp"

TEST(Construction, Class){

  msg *m = new msg("Hello World!", "Public");
  msg *s = new msg("ID Tester!", "General");

  EXPECT_STREQ(m->getCat().c_str(), "Public");
  EXPECT_STREQ(s->getCat().c_str(), "General");
  ASSERT_EQ((m->getID() == s->getID()), false);
}

TEST(MessageOperations, GetMethods){
  std::string messages[] = {"Hello", "There"};
  std::string categories[] = {"Firefighter", "Police"};

  msg *m = new msg(messages[0], categories[0]);
  msg *s = new msg(messages[1], categories[1]);

  // Test the get methods
  EXPECT_STREQ(categories[0].c_str(), m->getCat().c_str());
  EXPECT_STREQ(categories[1].c_str(), s->getCat().c_str());
  EXPECT_STREQ(messages[0].c_str(), m->getMsg().c_str());
  EXPECT_STREQ(messages[1].c_str(), s->getMsg().c_str());
}

int main(int argc, char ** argv){
  ::testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}