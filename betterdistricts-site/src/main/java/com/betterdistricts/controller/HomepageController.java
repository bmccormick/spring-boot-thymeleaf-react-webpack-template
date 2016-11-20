package com.betterdistricts.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomepageController {
  
  @RequestMapping({"/", "/index.html"})
  public ModelAndView displayHomepage() {
    return new ModelAndView("homepage");
  }
}
