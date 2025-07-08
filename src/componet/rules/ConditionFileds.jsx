import React, { useEffect, useState } from "react";
import { conditionFieldsOptions } from "../../data/RulesPageOptions";
import { conditionFields } from "../../data/ConditionField";
import {
  Box,
  ChoiceList,
  InlineStack,
  Select,
  TextField,
} from "@shopify/polaris";
import CustomComboBox from "./CustomComboBox";
import PopoverSelect from "./PopoverSelect";

const ConditionFileds = ({
  handleInputChange,
  currField,
  index,
  ruleData,
  ruleIndex,
}) => {
  const [currConditionData, setCurrConditionData] = useState();

  useEffect(() => {
    if (ruleData.is_popover_select_show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    console.log("document.body---------");
    return () => {
      document.body.style.overflow = "";
    };
  }, [ruleData.is_popover_select_show]);

  useEffect(() => {
    const result = conditionFields?.find(
      (currItem) => currItem.type == currField?.type
    );
    setCurrConditionData(result);

    handleInputChange("value_1", "", ruleIndex, "tiers", index, "conditions");
    handleInputChange("value", null, ruleIndex, "tiers", index, "conditions");
  }, [currField.type]);
  return (
    <>
      <InlineStack gap="300" wrap={false}>
        <Box width="100%">
          <Select
            label="Type"
            options={conditionFieldsOptions.Type.Options}
            onChange={(value) => {
              handleInputChange(
                "type",
                value,
                ruleIndex,
                "tiers",
                index,
                "conditions"
              );
            }}
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
              helpText={currConditionData?.helpText}
              type={currConditionData?.field_type}
              placeholder={currConditionData?.placeholder}
              onChange={(value) =>
                handleInputChange(
                  "value",
                  value,
                  ruleIndex,
                  "tiers",
                  index,
                  "conditions"
                )
              }
              value={currField?.value}
            />
          )}

          {(currConditionData?.field_type == "combo_box" ||
            currConditionData?.field_type == "popover_select") && (
            <CustomComboBox
              ruleIndex={ruleIndex}
              index={index}
              handleInputChange={handleInputChange}
              ruleData={ruleData}
              currConditionData={currConditionData}
            />
          )}

          {currConditionData?.field_type == "choice_list" && (
            <ChoiceList
              allowMultiple
              title="Delivery Method Type"
              choices={currConditionData?.field_option}
              selected={currField?.value_1}
              onChange={(value) =>
                handleInputChange(
                  "value_1",
                  value,
                  ruleIndex,
                  "tiers",
                  index,
                  "conditions"
                )
              }
            />
          )}
        </Box>

        {currField?.condition == "Is between" && (
          <Box paddingBlockStart="200" width="100%">
            <TextField
              helpText={currConditionData?.helpText}
              type={currConditionData?.field_type}
              placeholder={currConditionData?.placeholder}
              onChange={(value) =>
                handleInputChange(
                  "value_2",
                  value,
                  ruleIndex,
                  "tiers",
                  index,
                  "conditions"
                )
              }
              value={currField?.value_2}
            />
          </Box>
        )}
      </InlineStack>
    </>
  );
};

export default ConditionFileds;
