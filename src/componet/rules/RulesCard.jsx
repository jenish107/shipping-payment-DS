import React from "react";

import {
  Badge,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
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

import { conditionFieldsOptions } from "../../data/ConditionFieldsOptions.jsx";
import PaymentAndShippingMethods from "../paymentAndShippingMethod/PaymentAndShippingMethods.jsx";
import ConditionFileds from "./ConditionFileds.jsx";
import MessagePositionDisplay from "./MessagePositionDisplay.jsx";

const RulesCard = ({
  handleInputChange,
  ruleData,
  currData,
  ruleIndex,
  currDisplayData,
  isShowError,
  setIsShowError,
  chackIsFieldEmpty,
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
      conditionTemp[currRuleIndex] = conditionTemp?.[currRuleIndex - 1];
      conditionTemp[currRuleIndex - 1] = temp;
    } else {
      if (currRuleIndex == conditionTemp.length - 1) {
        return;
      }

      let temp = conditionTemp[currRuleIndex];
      conditionTemp[currRuleIndex] = conditionTemp[currRuleIndex + 1];
      conditionTemp[currRuleIndex + 1] = temp;
    }

    handleInputChange("conditions", conditionTemp, ruleIndex, "tiers");
  };

  const handleNewConditionClick = () => {
    if (chackIsFieldEmpty() == true) return;

    setIsShowError(() => ({
      titleError: false,
      paymentError: false,
      valueError: false,
    }));
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
    );
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
                  checked={currData?.rule_cundition === "and"}
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
                  checked={currData?.rule_cundition === "or"}
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
                      />
                      <Badge>
                        {currData.rule_cundition == "and" ? "and" : "or"}
                      </Badge>
                      <Box
                        width="100%"
                        borderBlockEndWidth="025"
                        borderColor="border"
                      />
                    </InlineStack>
                  </Box>
                )}

                <Card background="bg-fill-active" key={index}>
                  <ConditionFileds
                    handleButtonUpDownClick={handleButtonUpDownClick}
                    currDisplayData={currDisplayData}
                    currField={currField}
                    ruleData={ruleData}
                    ruleIndex={ruleIndex}
                    handleInputChange={handleInputChange}
                    index={index}
                    isShowError={isShowError}
                    setIsShowError={setIsShowError}
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
          onClick={handleNewConditionClick}
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
          <MessagePositionDisplay
            handleInputChange={handleInputChange}
            conditionFieldsOptions={conditionFieldsOptions}
            ruleIndex={ruleIndex}
            currData={currData}
          />
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
            isShowError={isShowError}
            setIsShowError={setIsShowError}
          />
        )}
      </Box>
    </Card>
  );
};

export default RulesCard;
