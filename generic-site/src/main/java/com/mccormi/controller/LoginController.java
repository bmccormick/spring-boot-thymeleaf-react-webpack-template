package com.mccormi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

@Controller
public class LoginController {
  
  
  @RequestMapping("/login")
  public ModelAndView handleLogin() {
    return new ModelAndView("security/login");
  }
  
  @RequestMapping("/logout")
  public ModelAndView handleLogout(HttpServletRequest request) throws ServletException {
    request.logout();
    return new ModelAndView("security/logout");
  }
  
  @RequestMapping("/accessDenied")
  public ModelAndView handleAccessDenied() throws ServletException {
    return new ModelAndView("security/accessDenied");
  }
  
}
