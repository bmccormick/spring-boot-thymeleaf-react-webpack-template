package com.mccormi.config;

import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.List;
import java.util.Properties;

@Configuration
public class BuildConfig {
  
  private static Logger logger = LoggerFactory.getLogger(BuildConfig.class);
  
  @Autowired
  @Bean
  public BuildVersion getBuildVersion(Environment environment) {
    BuildVersion result = new BuildVersion();
    Properties versionProperties = ResourceProperties.propertiesFromResource("version.properties");
    if (versionProperties != null) {
      String mvnVersion = versionProperties.getProperty("mvn-version", "unknown");
      String gitVersion = versionProperties.getProperty("git-version", "unknown");
      String gitBranch = versionProperties.getProperty("git-branch", "unknown");
      
      result.setMvnVersion(mvnVersion);
      result.setGitVersion(gitVersion);
      result.setGitBranch(gitBranch);
    }
    
    try {
      String hostname = InetAddress.getLocalHost().getHostName();
      result.setHostname(hostname);
    } catch (UnknownHostException e) {
      logger.error("Unable to determine hostname {}", e.getMessage());
    }
    
    String[] profileArray = environment.getActiveProfiles();
    
    List<String> profiles = Lists.newArrayList();
    for (String profile : profileArray) {
      profiles.add(profile);
    }
    
    result.setProfiles(profiles);
    return result;
  }
}
