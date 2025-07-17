import { Box, Button, ButtonGroup } from "@shopify/polaris";
import React from "react";

const RuleTypeSelect = ({ ruleData, handleInputChange }) => {
  return (
    <Box paddingBlockStart="300">
      <ButtonGroup variant="segmented">
        <Button
          pressed={ruleData.rule_type === "basic"}
          onClick={() => handleInputChange("rule_type", "basic")}
        >
          Basic
        </Button>
        <Button
          pressed={ruleData.rule_type === "advance"}
          onClick={() => handleInputChange("rule_type", "advance")}
        >
          Advance
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default RuleTypeSelect;
