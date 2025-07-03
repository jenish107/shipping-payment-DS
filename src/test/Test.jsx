import { Combobox, InlineStack } from "@shopify/polaris";
import React, { useEffect, useMemo } from "react";
import {
  LegacyStack,
  Tag,
  Listbox,
  EmptySearchResult,
  Text,
  AutoSelection,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { conditionFieldsOptions } from "../data/RulesPageOptions";
import { conuntry } from "../data/Country";

const Test = () => {
  const [ruleData, setRuleData] = useState({
    tiers: [{ payment_method: [], conditions: [{}] }],
  });

  const country = conuntry.map((currData) => {
    return { value: currData.name, label: currData.name };
  });

  const handleInputChange = (
    name,
    value,
    index,
    dataKey,
    subIndex,
    subDataKey,
    messageIndex,
    messageKey
  ) => {
    setRuleData((prevData) => {
      if (index !== undefined) {
        const updatedData = [...prevData[dataKey]];
        if (subDataKey !== undefined) {
          if (messageKey !== undefined) {
            if (
              updatedData[index][subDataKey][subIndex][messageKey][
                messageIndex
              ][name] !== undefined
            ) {
              updatedData[index][subDataKey][subIndex][messageKey][
                messageIndex
              ][name] = value;
            }
          } else {
            updatedData[index][subDataKey][subIndex][name] = value;
          }
          return { ...prevData, [dataKey]: updatedData };
        } else {
          updatedData[index][name] = value;
          return { ...prevData, [dataKey]: updatedData };
        }
      } else {
        return { ...prevData, [name]: value };
      }
    });
  };

  const escapeSpecialRegExCharacters = useCallback(
    (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    []
  );

  useEffect(() => {
    handleInputChange("payment_method_options", country, 0, "tiers");
  }, []);

  const updateText = useCallback(
    (value) => {
      handleInputChange("payment_method_field_value", value, 0, "tiers");
      if (value === "") {
        handleInputChange("payment_method_options", country, 0, "tiers");
        return;
      }

      const filterRegex = new RegExp(escapeSpecialRegExCharacters(value), "i");
      const resultOptions = conditionFieldsOptions.PaymentMethods.filter(
        (option) => option.label.match(filterRegex)
      );
      handleInputChange("payment_method_options", resultOptions, 0, "tiers");
    },
    [conditionFieldsOptions.PaymentMethods, escapeSpecialRegExCharacters]
  );

  const updateSelection = useCallback(
    (selected) => {
      if (ruleData.tiers[0].payment_method?.includes(selected)) {
        let selectedValueList = ruleData.tiers[0].payment_method.filter(
          (option) => option !== selected
        );

        handleInputChange("payment_method", selectedValueList, 0, "tiers");
      } else {
        handleInputChange(
          "payment_method",
          [...ruleData.tiers[0].payment_method, selected],
          0,
          "tiers"
        );
      }

      updateText("");
    },
    [ruleData.tiers[0].payment_method, updateText]
  );

  const removeTag = useCallback(
    (tag) => () => {
      const options = [...ruleData.tiers[0].payment_method];
      options.splice(options.indexOf(tag), 1);
      handleInputChange("payment_method", options, 0, "tiers");
    },
    [ruleData.tiers[0].payment_method]
  );

  const optionsMarkup =
    ruleData.tiers[0].payment_method_options?.length > 0
      ? ruleData.tiers[0].payment_method_options?.map((option) => {
          const { label, value } = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={ruleData.tiers[0].payment_method?.includes(value)}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;

  const verticalContentMarkup =
    ruleData.tiers[0].payment_method.length > 0 ? (
      <InlineStack spacing="extraTight" gap="200" alignment="center">
        {ruleData.tiers[0].payment_method.map((tag) => (
          <Tag key={`option-${tag}`} onRemove={removeTag(tag)}>
            {tag}
          </Tag>
        ))}
      </InlineStack>
    ) : null;

  const listboxMarkup = (
    <Listbox autoSelection={AutoSelection.None} onSelect={updateSelection}>
      {optionsMarkup}
    </Listbox>
  );

  return (
    <Combobox
      allowMultiple
      activator={
        <Combobox.TextField
          onChange={updateText}
          value={ruleData.tiers[0].payment_method_field_value}
          label="Search tags"
          labelHidden
          placeholder="Search tags"
          autoComplete="off"
          verticalContent={verticalContentMarkup}
        />
      }
    >
      {listboxMarkup}
    </Combobox>
  );
};

export default Test;
