import React, { useEffect, useState } from "react";

import {
  Box,
  ChoiceList,
  InlineStack,
  Select,
  TextField,
} from "@shopify/polaris";
import { conditionFields } from "../../data/ConditionFieldData";
import CustomComboBox from "./CustomComboBox";

const ConditionFileds = ({
  handleInputChange,
  currField,
  index,
  ruleData,
  ruleIndex,
  currDisplayData,
  handleButtonUpDownClick,
  isShowError,
  setIsShowError,
}) => {
  const [currConditionData, setCurrConditionData] = useState();

  useEffect(() => {
    if (ruleData.is_popover_select_show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [ruleData.is_popover_select_show]);

  useEffect(() => {
    const result = conditionFields?.find(
      (currItem) => currItem.type == currField?.type
    );
    setCurrConditionData(result);
  }, [handleButtonUpDownClick, currField?.type]);

  const handleTypeChange = (value) => {
    handleInputChange("type", value, ruleIndex, "tiers", index, "conditions");

    handleInputChange("value_1", "", ruleIndex, "tiers", index, "conditions");
    handleInputChange("value", null, ruleIndex, "tiers", index, "conditions");
    handleInputChange(
      "condition",
      null,
      ruleIndex,
      "tiers",
      index,
      "conditions"
    );
  };

  return (
    <Box key={`conditionFields${index}`} paddingBlockEnd="200">
      <InlineStack gap="300" wrap={false}>
        <Box width="100%">
          <Select
            label="Type"
            options={currDisplayData?.Type?.Options}
            onChange={(value) => handleTypeChange(value)}
            value={currField?.type}
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
                  ruleIndex,
                  "tiers",
                  index,
                  "conditions"
                )
              }
              value={currField?.condition}
            />
          </Box>
        )}
      </InlineStack>

      <InlineStack wrap={false} gap="200">
        <Box width="100%" paddingBlockStart="200">
          {(currConditionData?.field_type == "text" ||
            currConditionData?.field_type == "number") && (
            <TextField
              error={
                isShowError.valueError &&
                (currField.value === "" || currField.value === null)
                  ? "This field is required"
                  : null
              }
              helpText={currConditionData?.helpText}
              type={currConditionData?.field_type}
              placeholder={currConditionData?.placeholder}
              onChange={(value) => {
                setIsShowError((pre) => ({ ...pre, valueError: false }));
                handleInputChange(
                  currField?.type == "Cart Attribute" ? "key" : "value",
                  value,
                  ruleIndex,
                  "tiers",
                  index,
                  "conditions"
                );
              }}
              value={
                currField?.type == "Cart Attribute"
                  ? currField?.key
                  : currField.value
              }
            />
          )}

          {(currConditionData?.field_type == "combo_box" ||
            currConditionData?.field_type == "popover_select") && (
            <CustomComboBox
              setIsShowError={setIsShowError}
              isShowError={isShowError}
              ruleIndex={ruleIndex}
              index={index}
              handleInputChange={handleInputChange}
              ruleData={ruleData}
              currConditionData={currConditionData}
            />
          )}

          {currConditionData?.field_type == "choice_list" && (
            <ChoiceList
              error={
                isShowError.valueError &&
                (currField.value === "" || currField.value === null)
                  ? "This field is required"
                  : null
              }
              allowMultiple
              title="Delivery Method Type"
              choices={currConditionData?.field_option}
              selected={currField?.value}
              onChange={(value) => {
                setIsShowError((pre) => ({ ...pre, valueError: false }));
                handleInputChange(
                  "value",
                  value,
                  ruleIndex,
                  "tiers",
                  index,
                  "conditions"
                );
              }}
            />
          )}
        </Box>

        {currField?.condition == "Is between" && (
          <Box paddingBlockStart="200" width="100%">
            <TextField
              error={
                isShowError.value1Error &&
                (currField.value_1 === "" || currField.value_1 === null)
                  ? "This field is required"
                  : null
              }
              helpText={currConditionData?.helpText}
              type={currConditionData?.field_type}
              placeholder={currConditionData?.placeholder}
              onChange={(value) => {
                setIsShowError((pre) => ({ ...pre, value1Error: false }));
                handleInputChange(
                  "value_1",
                  value,
                  ruleIndex,
                  "tiers",
                  index,
                  "conditions"
                );
              }}
              value={currField?.value_1}
            />
          </Box>
        )}

        {currConditionData?.type == "Cart Attribute" && (
          <Box paddingBlockStart="200" width="100%">
            <CustomComboBox
              setIsShowError={setIsShowError}
              ruleIndex={ruleIndex}
              index={index}
              handleInputChange={handleInputChange}
              ruleData={ruleData}
              currConditionData={currConditionData}
            />
          </Box>
        )}
      </InlineStack>
    </Box>
  );
};

export default ConditionFileds;
