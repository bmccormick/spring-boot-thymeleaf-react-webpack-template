package com.mccormi;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@SpringBootApplication
public class GenericController {

  private static Logger logger = LoggerFactory.getLogger(GenericController.class);

  public static void main(String[] args) throws Exception {
    logger.info("Starting GenericController");
    SpringApplication.run(GenericController.class, args);
  }
  
  @RequestMapping("/ping")
  @ResponseBody
  public String ping() {
    return "pong";
  }

}
