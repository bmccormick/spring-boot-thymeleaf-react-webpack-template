package com.mccormi.config;

import com.google.common.collect.Lists;
import java.util.List;

public class BuildVersion {

  private String mvnVersion = "unknown";
  private String gitVersion = "unknown";
  private String gitBranch = "unknown";
  private List<String> profiles = Lists.newArrayList();
  private String hostname = "unknown";
  
  public String getHostname() {
    return hostname;
  }
  
  public void setHostname(String hostname) {
    this.hostname = hostname;
  }
  
  public String getMvnVersion() {
    return mvnVersion;
  }

  public void setMvnVersion(String mvnVersion) {
    if (!mvnVersion.startsWith("$")) {
      this.mvnVersion = mvnVersion;
    }
  }

  public String getGitVersion() {
    return gitVersion;
  }

  public void setGitVersion(String gitVersion) {
    if (!gitVersion.startsWith("$")) {
      this.gitVersion = gitVersion;
    }
  }

  public String getGitBranch() {
    return gitBranch;
  }

  public void setGitBranch(String gitBranch) {
    if (!gitBranch.startsWith("$")) {
      this.gitBranch = gitBranch;
    }
  }

  public List<String> getProfiles() {
    return profiles;
  }

  public void setProfiles(List<String> profiles) {
    this.profiles = profiles;
  }

  public boolean checkProfile(String profile) {
    if (getProfiles().contains(profile)) {
      return true;
    }
    return false;
  }

  public boolean isDev() {
    if (getProfiles().contains("dev")) {
      return true;
    }
    return false;
  }
}
