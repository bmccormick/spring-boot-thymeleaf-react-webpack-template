package com.mccormi;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GenericController {
  
  private static Logger logger = LoggerFactory.getLogger(GenericController.class);
  
  public static void main(String[] args) throws Exception {
    logger.info("Starting GenericController");
    SpringApplication.run(GenericController.class, args);
  }
  
}
