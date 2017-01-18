package com.mccormi.config;

import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import java.util.List;
import java.util.Properties;

@Configuration
public class AppConfigTest {
  
  private static Logger logger = LoggerFactory.getLogger(AppConfigTest.class);
  
  @Autowired
  @Bean
  public BuildVersion getBuildVersion(Environment environment) {
    
    logger.error("Using the test Configuration");
    
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
    
    String[] profileArray = environment.getActiveProfiles();
    
    List<String> profiles = Lists.newArrayList();
    for (String profile : profileArray) {
      profiles.add(profile);
    }
    
    result.setProfiles(profiles);
    return result;
  }
}
