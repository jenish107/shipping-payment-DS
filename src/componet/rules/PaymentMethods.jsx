import React, { useCallback, useEffect, useState } from "react";
import { conditionFieldsOptions } from "../../data/RulesPageOptions";
import {
  Box,
  Button,
  Card,
  Combobox,
  Divider,
  InlineStack,
  Listbox,
  RadioButton,
  Select,
  Tag,
  Text,
} from "@shopify/polaris";

import "../../style/PaymentMethods.css";

const PaymentMethods = ({ ruleData, handleInputChange, ruleIndex }) => {
  const escapeSpecialRegExCharacters = useCallback(
    (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    []
  );

  useEffect(() => {
    handleInputChange(
      "payment_method_options",
      conditionFieldsOptions.PaymentMethods,
      ruleIndex,
      "tiers"
    );
  }, []);

  const updateText = useCallback(
    (value) => {
      handleInputChange(
        "payment_method_field_value",
        value,
        ruleIndex,
        "tiers"
      );
      if (value === "") {
        handleInputChange(
          "payment_method_options",
          conditionFieldsOptions.PaymentMethods,
          ruleIndex,
          "tiers"
        );
        return;
      }

      const filterRegex = new RegExp(escapeSpecialRegExCharacters(value), "i");
      const resultOptions = conditionFieldsOptions.PaymentMethods.filter(
        (option) => option.label.match(filterRegex)
      );
      handleInputChange(
        "payment_method_options",
        resultOptions,
        ruleIndex,
        "tiers"
      );
    },
    [conditionFieldsOptions.PaymentMethods, escapeSpecialRegExCharacters]
  );

  const updateSelection = useCallback(
    (selected) => {
      if (ruleData.tiers[ruleIndex].payment_method?.includes(selected)) {
        let selectedValueList = ruleData.tiers[ruleIndex].payment_method.filter(
          (option) => option !== selected
        );

        handleInputChange(
          "payment_method",
          selectedValueList,
          ruleIndex,
          "tiers"
        );
      } else {
        handleInputChange(
          "payment_method",
          [...ruleData.tiers[ruleIndex].payment_method, selected],
          ruleIndex,
          "tiers"
        );
      }

      updateText("");
    },
    [ruleData.tiers[ruleIndex].payment_method, updateText]
  );

  const removeTag = useCallback(
    (tag) => () => {
      const options = [...ruleData.tiers[ruleIndex].payment_method];
      options.splice(options.indexOf(tag), 1);
      handleInputChange("payment_method", options, ruleIndex, "tiers");
    },
    [ruleData.tiers[ruleIndex].payment_method]
  );

  const optionsMarkup =
    ruleData.tiers[ruleIndex].payment_method_options?.length > 0
      ? ruleData.tiers[ruleIndex].payment_method_options?.map((option) => {
          const { label, value } = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={ruleData.tiers[ruleIndex].payment_method?.includes(
                value
              )}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;

  return (
    <Box background="bg-fill-active">
      <Box padding="300">
        <Text>Payment method</Text>
        <InlineStack align="space-between">
          <Box minWidth="30%">
            <RadioButton
              label="Contains"
              name="payment_method_condition"
              checked={
                ruleData.tiers[ruleIndex].payment_method_condition == "Contains"
              }
              onChange={() =>
                handleInputChange(
                  "payment_method_condition",
                  "Contains",
                  ruleIndex,
                  "tiers"
                )
              }
            />
          </Box>

          <Box minWidth="30%">
            <RadioButton
              label="Exact (Case-Sensitive)"
              name="payment_method_condition"
              checked={
                ruleData.tiers[ruleIndex].payment_method_condition ==
                "Exact (Case-Sensitive)"
              }
              onChange={() =>
                handleInputChange(
                  "payment_method_condition",
                  "Exact (Case-Sensitive)",
                  ruleIndex,
                  "tiers"
                )
              }
            />
          </Box>

          <Box minWidth="30%">
            <RadioButton
              label="Exact (Non Case)"
              name="payment_method_condition"
              checked={
                ruleData.tiers[ruleIndex].payment_method_condition ==
                "Exact (Non Case)"
              }
              onChange={() =>
                handleInputChange(
                  "payment_method_condition",
                  "Exact (Non Case)",
                  ruleIndex,
                  "tiers"
                )
              }
            />
          </Box>
        </InlineStack>
        <Box paddingBlock="300">
          <Divider />
        </Box>

        <Combobox
          allowMultiple
          activator={
            <Combobox.TextField
              onChange={updateText}
              value={ruleData.tiers[ruleIndex].payment_method_field_value}
              label="Search tags"
              labelHidden
              placeholder="Search tags"
              autoComplete="off"
            />
          }
        >
          {optionsMarkup ? (
            <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
          ) : null}
        </Combobox>

        <Box paddingBlockStart="200">
          <Card padding="0">
            {ruleData.tiers[ruleIndex].payment_method.map((currItem) => {
              return (
                <>
                  <Box id="hover_effect" padding="300">
                    <InlineStack blockAlign="center" align="space-between">
                      <Text>{currItem}</Text>
                      <Button
                        onClick={removeTag(currItem)}
                        variant="primary"
                        tone="critical"
                      >
                        Delete
                      </Button>
                    </InlineStack>
                  </Box>
                  <Divider />
                </>
              );
            })}
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentMethods;
