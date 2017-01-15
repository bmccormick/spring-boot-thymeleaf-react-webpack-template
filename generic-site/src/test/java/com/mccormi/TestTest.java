package com.mccormi;

import org.junit.Assert;
import org.junit.Test;

public class TestTest {
  
  @Test
  public void test() {
    //Initial test to just make sure the junit results are created.
    String a = "abc";
    Assert.assertEquals("They're not equal", "abc", a);
  }
}
