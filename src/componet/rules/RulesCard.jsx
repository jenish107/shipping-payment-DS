import {
  Badge,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
  ChoiceList,
  Combobox,
  Divider,
  Icon,
  InlineStack,
  RadioButton,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
} from "@shopify/polaris-icons";

import React, { useEffect, useState } from "react";

import ConditionFileds from "./ConditionFileds.jsx";
import PaymentAndShippingMethods from "../paymentAndShippingMethod/PaymentAndShippingMethods.jsx";
import { conditionFieldsOptions } from "../../data/ConditionFieldsOptions.jsx";

const RulesCard = ({
  handleInputChange,
  ruleData,
  currData,
  ruleIndex,
  currDisplayData,
}) => {
  const handleCunditionDelete = (field_data) => {
    const filterCundition = currData.conditions.filter(
      (currCondition) => currCondition !== field_data
    );
    handleInputChange("conditions", filterCundition, ruleIndex, "tiers");
  };

  const handleRuleDelete = (rule_data) => {
    const filterCundition = ruleData.tiers.filter(
      (currRule) => currRule !== rule_data
    );
    handleInputChange("tiers", filterCundition);
  };

  const handleButtonUpDownClick = (currRuleIndex, type) => {
    let conditionTemp = currData.conditions;

    if (type == "move_up") {
      if (currRuleIndex == 0) {
        return;
      }

      let temp = conditionTemp[currRuleIndex];
      conditionTemp[currRuleIndex] = conditionTemp[currRuleIndex - 1];
      conditionTemp[currRuleIndex - 1] = temp;
    } else {
      if (currRuleIndex == conditionTemp.length) {
        return;
      }

      let temp = conditionTemp[currRuleIndex];
      conditionTemp[currRuleIndex] = conditionTemp[currRuleIndex + 1];
      conditionTemp[currRuleIndex + 1] = temp;
    }

    handleInputChange("conditions", conditionTemp);
  };

  return (
    <Card padding="0" key={`RulesCard${ruleIndex}`}>
      <Box padding="300" borderBlockEndWidth="025" borderColor="border">
        <InlineStack align="space-between">
          <Text variant="headingSm">Rule #{ruleIndex + 1}</Text>
          {ruleData.tiers.length > 1 && (
            <Button
              onClick={() => handleRuleDelete(currData)}
              variant="plain"
              tone="critical"
            >
              Delete
            </Button>
          )}
        </InlineStack>
      </Box>

      <Divider />

      <Box padding="300">
        <BlockStack gap="300">
          {currData.conditions.length > 1 && (
            <>
              <Text fontWeight="medium">When Match</Text>
              <InlineStack align="space-between" blockAlign="start">
                <RadioButton
                  label="And"
                  checked={currData.rule_cundition === "and"}
                  name="rule_cundition"
                  id="test"
                  onChange={() =>
                    handleInputChange(
                      "rule_cundition",
                      "and",
                      ruleIndex,
                      "tiers"
                    )
                  }
                />
                <RadioButton
                  label="Or"
                  helpText="If any one conditions are fulfilled, the validation will be applied."
                  name="rule_cundition"
                  checked={currData.rule_cundition === "or"}
                  onChange={() =>
                    handleInputChange(
                      "rule_cundition",
                      "or",
                      ruleIndex,
                      "tiers"
                    )
                  }
                />
              </InlineStack>
            </>
          )}

          {currData.conditions.map((currField, index) => {
            return (
              <Box key={`conditionFields-${index}`}>
                {index !== 0 && (
                  <Box paddingBlockEnd="200">
                    <InlineStack
                      wrap={false}
                      align="center"
                      blockAlign="center"
                    >
                      <Box
                        width="100%"
                        borderBlockEndWidth="025"
                        borderColor="border"
                      ></Box>
                      <Badge>
                        {currData.rule_cundition == "and" ? "and" : "or"}
                      </Badge>
                      <Box
                        width="100%"
                        borderBlockEndWidth="025"
                        borderColor="border"
                      ></Box>
                    </InlineStack>
                  </Box>
                )}

                <Card background="bg-fill-active" key={index}>
                  <ConditionFileds
                    currDisplayData={currDisplayData}
                    currField={currField}
                    ruleData={ruleData}
                    ruleIndex={ruleIndex}
                    handleInputChange={handleInputChange}
                    currData={currData}
                    index={index}
                  />
                  {currData.conditions.length > 1 && (
                    <InlineStack align="space-between" blockAlign="center">
                      <ButtonGroup>
                        <Button
                          icon={ChevronUpIcon}
                          onClick={() =>
                            handleButtonUpDownClick(index, "move_up")
                          }
                        >
                          Move Up
                        </Button>
                        <Button
                          icon={ChevronDownIcon}
                          onClick={() =>
                            handleButtonUpDownClick(index, "move_down")
                          }
                        >
                          Move Down
                        </Button>
                      </ButtonGroup>
                      <Box onClick={() => handleCunditionDelete(currField)}>
                        <Icon source={DeleteIcon} tone="critical" />
                      </Box>
                    </InlineStack>
                  )}
                </Card>
              </Box>
            );
          })}
        </BlockStack>

        <Box paddingBlock="300">
          <Divider />
        </Box>

        <Button
          variant="primary"
          onClick={() =>
            handleInputChange(
              "conditions",
              [
                ...currData.conditions,
                {
                  value_1: "",
                  value: null,
                  type: "Always",
                },
              ],
              ruleIndex,
              "tiers"
            )
          }
          disabled={
            currData.conditions[0].type == "Always" ||
            currData.conditions[0].type == undefined
          }
        >
          Add Conditon
        </Button>
      </Box>

      <Box background="bg-fill-active">
        {currDisplayData?.display?.includes("discount-adder") && (
          <Box padding="300">
            <InlineStack wrap={false} gap="200">
              <Box width="100%">
                <Select
                  options={[
                    { value: "Fix", label: "Fix" },
                    { value: "percentage", label: "percentage" },
                  ]}
                  label="Discount type"
                  onChange={(val) => handleInputChange("discount_type", val)}
                  value={ruleData.discount_type}
                />
              </Box>
              <Box width="100%">
                <TextField
                  placeholder="0"
                  label="Value"
                  onChange={(val) =>
                    handleInputChange("discount_type_value", val)
                  }
                  value={ruleData.discount_type_value}
                />
              </Box>
            </InlineStack>
          </Box>
        )}

        {currDisplayData?.display?.includes("message-position-display") ? (
          <Box padding="300">
            <BlockStack gap="200">
              <Select
                label="Then block checkout and show a error message"
                options={conditionFieldsOptions.error_message_position}
                onChange={(val) =>
                  handleInputChange(
                    "show_error_message",
                    val,
                    ruleIndex,
                    "tiers"
                  )
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
        ) : (
          <PaymentAndShippingMethods
            method={
              currDisplayData?.display?.includes("payment-method-adder")
                ? "payment_method"
                : "shipping_method"
            }
            currDisplayData={currDisplayData}
            ruleIndex={ruleIndex}
            ruleData={ruleData}
            handleInputChange={handleInputChange}
          />
        )}
      </Box>
    </Card>
  );
};

export default RulesCard;
