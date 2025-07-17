import React from "react";

import {
  Badge,
  BlockStack,
  Box,
  Divider,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";

const MessagePositionDisplay = ({
  handleInputChange,
  conditionFieldsOptions,
  ruleIndex,
  currData,
}) => {
  return (
    <Box padding="300">
      <BlockStack gap="200">
        <Select
          label="Then block checkout and show a error message"
          options={conditionFieldsOptions.error_message_position}
          onChange={(val) =>
            handleInputChange("show_error_message", val, ruleIndex, "tiers")
          }
          helpText="Where to show the error message on the checkout page"
          value={currData.show_error_message}
        />

        <Box paddingBlock="100">
          <Divider />
        </Box>

        <Text variant="headingMd">Message to display</Text>
        <Text>
          This message will be displayed to customers who fail validation.
        </Text>

        <TextField
          label={
            <InlineStack gap="100">
              <Text>English </Text>
              <Badge tone="success">Primary</Badge>
            </InlineStack>
          }
          value={currData.error_message}
          onChange={(val) =>
            handleInputChange("error_message", val, ruleIndex, "tiers")
          }
        />
      </BlockStack>
    </Box>
  );
};

export default MessagePositionDisplay;
