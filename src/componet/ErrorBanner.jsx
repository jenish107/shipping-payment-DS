import { Banner, Text } from "@shopify/polaris";
import React from "react";

const ErrorBanner = () => {
  return (
    <Banner title="Validation Error!" tone="critical">
      <Text>
        There are some required fields are missing / Invalid field values added.
      </Text>
    </Banner>
  );
};

export default ErrorBanner;
