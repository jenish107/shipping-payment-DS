import {
  Box,
  Button,
  Card,
  ChoiceList,
  Combobox,
  Divider,
  InlineStack,
  RadioButton,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";

import { conditionFieldsOptions } from "../../data/RulesPageOptions.jsx";
import PaymentMethods from "./PaymentMethods.jsx";
import { conditionFields } from "../../data/ConditionField.jsx";
import CunditionPage from "../CunditionPage.jsx";
import ComboBox from "./ComboBox.jsx";

const Rulses = ({ handleInputChange, ruleData }) => {
  const [currConditionData, setCurrConditionData] = useState();

  useEffect(() => {
    const result = conditionFields?.find((currItem) => {
      return currItem.type == ruleData.tiers[0]?.conditions[0]?.type;
    });
    setCurrConditionData(result);

    handleInputChange("value_1", "", 0, "tiers", 0, "conditions");
    handleInputChange("value", null, 0, "tiers", 0, "conditions");
  }, [ruleData.tiers[0]?.conditions[0]?.type]);

  return (
    <Card padding="0">
      <Box padding="300" borderBlockEndWidth="025" borderColor="border">
        <Text variant="headingSm">Rule #1</Text>
      </Box>
      <Divider />
      <Box padding="300">
        <Card background="bg-fill-active">
          <InlineStack gap="300" wrap={false}>
            <Box width="100%">
              <Select
                label="Type"
                options={conditionFieldsOptions.Type.Options}
                onChange={(value) => {
                  handleInputChange("type", value, 0, "tiers", 0, "conditions");
                }}
                value={ruleData.tiers[0].conditions[0]?.type}
              />
            </Box>
            {currConditionData?.options && (
              <Box width="100%">
                <Select
                  label="Condition"
                  options={currConditionData?.options}
                  onChange={(value) =>
                    handleInputChange(
                      "condition",
                      value,
                      0,
                      "tiers",
                      0,
                      "conditions"
                    )
                  }
                  value={ruleData.tiers[0].conditions[0]?.condition}
                />
              </Box>
            )}
          </InlineStack>

          {(currConditionData?.field_type == "text" ||
            currConditionData?.field_type == "number") && (
            <Box paddingBlockStart="200">
              <TextField
                helpText={currConditionData?.helpText}
                type={currConditionData?.field_type}
                placeholder={currConditionData?.placeholder}
                onChange={(value) =>
                  handleInputChange("value", value, 0, "tiers", 0, "conditions")
                }
                value={ruleData.tiers[0].conditions[0]?.value}
              />
            </Box>
          )}

          {currConditionData?.field_type == "combo_box" && (
            <Box paddingBlockStart="200">
              <ComboBox
                handleInputChange={handleInputChange}
                ruleData={ruleData}
                options={currConditionData.combo_box_option}
                placeholder={currConditionData.placeholder}
              />
            </Box>
          )}
          {currConditionData?.field_type == "choice-list" && (
            <Box paddingBlockStart="200">
              <ChoiceList
                allowMultiple
                title="Delivery Method Type"
                choices={currConditionData?.field_option}
                selected={ruleData.tiers[0].conditions[0]?.value || ""}
                onChange={(value) =>
                  handleInputChange("value", value, 0, "tiers", 0, "conditions")
                }
              />
            </Box>
          )}
        </Card>

        <Box paddingBlock="300">
          <Divider />
        </Box>

        <Button variant="primary">Add Conditon</Button>
      </Box>

      <PaymentMethods
        ruleData={ruleData}
        handleInputChange={handleInputChange}
      />
    </Card>
  );
};

export default Rulses;
