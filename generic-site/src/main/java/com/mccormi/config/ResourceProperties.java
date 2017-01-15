package com.mccormi.config;

import com.google.common.io.Closeables;
import com.google.common.io.Resources;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;

public class ResourceProperties {

  private static final Logger logger = LoggerFactory.getLogger(ResourceProperties.class);

  private ResourceProperties() {
  }

  public static Properties propertiesFromResource(String resourceName) {
    Properties properties = new Properties();

    try {
      URL resource = Resources.getResource(resourceName);
      InputStream inputStream = null;
      try {
        inputStream = resource.openStream();
        properties.load(inputStream);
      } finally {
        Closeables.close(inputStream, true);
      }
    } catch (Exception e) {
      logger.error("Unable to load configuration resource -{}", resourceName);
    }

    return properties;
  }
}
