package com.mccormi.interceptor;

import com.mccormi.config.BuildVersion;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class VersionInterceptor extends HandlerInterceptorAdapter {

  @Autowired
  private BuildVersion buildVersion;

  private static Logger logger = LoggerFactory.getLogger(VersionInterceptor.class);

  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    logger.trace("Calling VersionInterceptor preHandle");
    request.setAttribute("buildVersion", buildVersion);
    return true;
  }

}
