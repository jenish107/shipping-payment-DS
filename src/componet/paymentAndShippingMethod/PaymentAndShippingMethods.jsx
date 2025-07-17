import React, { useCallback, useEffect, useState } from "react";

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
  Text,
  TextField,
} from "@shopify/polaris";
import { conditionFieldsOptions } from "../../data/ConditionFieldsOptions";

import { shippingAndPaymentData } from "../../data/ShippingAndPaymentData";
import "../../style/PaymentAndShippingMethods.css";
import MethodsList from "./MethodsList";

const PaymentAndShippingMethods = ({
  ruleData,
  handleInputChange,
  ruleIndex,
  currDisplayData,
  method,
  isShowError,
  setIsShowError,
}) => {
  const [paymentOption, setPaymentOption] = useState(
    currDisplayData?.display?.includes("payment-method-adder") &&
      conditionFieldsOptions.PaymentMethods
  );

  const { field_name, list_name, placeholder, label, label_hidden, help_text } =
    shippingAndPaymentData[method];

  const escapeSpecialRegExCharacters = useCallback(
    (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    []
  );

  useEffect(() => {
    setPaymentOption(
      currDisplayData?.display?.includes("payment-method-adder") &&
        conditionFieldsOptions.PaymentMethods
    );
  }, [currDisplayData]);

  const updateText = useCallback(
    (value) => {
      handleInputChange(field_name, value, ruleIndex, "tiers");

      if (currDisplayData?.display?.includes("payment-method-adder")) {
        if (value === "") {
          setPaymentOption(conditionFieldsOptions.PaymentMethods);
          return;
        }

        const filterRegex = new RegExp(
          escapeSpecialRegExCharacters(value),
          "i"
        );

        const resultOptions = conditionFieldsOptions.PaymentMethods.filter(
          (option) => option.label.match(filterRegex)
        );

        setPaymentOption(resultOptions);
      }
    },
    [
      conditionFieldsOptions.PaymentMethods,
      escapeSpecialRegExCharacters,
      currDisplayData,
    ]
  );

  const updataPaymentMethodName = (val, index) => {
    handleInputChange("value", val, ruleIndex, "tiers", index, list_name);
  };

  const updateSelection = useCallback(
    (selected) => {
      setIsShowError((pre) => ({ ...pre, paymentError: false }));

      if (selected == "") {
        return;
      }
      if (
        ruleData.tiers[ruleIndex][list_name]?.some(
          (currItem) => currItem.key == selected
        )
      ) {
        if (currDisplayData.display?.includes("payment-method-adder")) {
          let selectedValueList = ruleData.tiers[ruleIndex][list_name].filter(
            (option) => option.key !== selected
          );
          handleInputChange(list_name, selectedValueList, ruleIndex, "tiers");
        }
      } else {
        if (ruleData.tiers[ruleIndex][list_name] == undefined) {
          handleInputChange(
            list_name,
            [{ key: selected, value: selected }],
            ruleIndex,
            "tiers"
          );
        } else {
          let newData = [
            ...ruleData.tiers[ruleIndex][list_name],
            { key: selected, value: selected },
          ];
          handleInputChange(list_name, newData, ruleIndex, "tiers");
        }
      }

      updateText("");
    },
    [ruleData.tiers[ruleIndex][list_name], updateText]
  );

  const removeTag = useCallback(
    (index) => () => {
      const options = [...ruleData.tiers[ruleIndex][list_name]];
      options.splice(index, 1);
      handleInputChange(list_name, options, ruleIndex, "tiers");
    },
    [ruleData.tiers[ruleIndex][list_name]]
  );

  const optionsMarkup =
    paymentOption?.length > 0
      ? paymentOption?.map((option) => {
          const { label, value } = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={ruleData.tiers[ruleIndex][list_name]?.some(
                (currItem) => currItem.key == value
              )}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;

  return (
    <Box padding="300">
      <Text>{shippingAndPaymentData[method].title}</Text>
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

      {(currDisplayData?.display?.includes("payment-method-hide-show") ||
        currDisplayData?.display?.includes("shipping-method-hide-show")) && (
        <Box paddingBlock="200">
          <Select
            options={[
              {
                label: "Hide these Payment methods",
                value: "Hide these Payment methods",
              },
              {
                label: "Show these Payment methods",
                value: "Show these Payment methods",
              },
              {
                label: "Hide all Payment methods",
                value: "hide_all_method",
              },
            ]}
            onChange={(value) =>
              handleInputChange("method_hide_show", value, ruleIndex, "tiers")
            }
            value={ruleData.tiers[ruleIndex].method_hide_show}
          />
        </Box>
      )}
      {ruleData.tiers[ruleIndex].method_hide_show !== "hide_all_method" && (
        <InlineStack wrap={false} blockAlign="center" gap="100">
          <Box width="100%">
            <Combobox
              allowMultiple
              activator={
                <Combobox.TextField
                  error={
                    isShowError.paymentError &&
                    (ruleData.tiers[ruleIndex][field_name]?.length < 1 ||
                      ruleData.tiers[ruleIndex][field_name] == undefined)
                      ? "Enter at least one method"
                      : null
                  }
                  onChange={updateText}
                  value={ruleData.tiers[ruleIndex][field_name]}
                  label={label}
                  labelHidden={label_hidden}
                  placeholder={placeholder}
                  helpText={help_text}
                  autoComplete="off"
                />
              }
            >
              {currDisplayData?.display?.includes("payment-method-adder") ? (
                <Listbox onSelect={updateSelection}>
                  {optionsMarkup}

                  {ruleData.tiers[ruleIndex][field_name] !== "" && (
                    <Listbox.Option
                      value={ruleData.tiers[ruleIndex][field_name]}
                    >
                      <Box paddingInlineStart="300">
                        <Button>
                          Add “{ruleData.tiers[ruleIndex][field_name]}” as
                          Payment Method
                        </Button>
                      </Box>
                    </Listbox.Option>
                  )}
                </Listbox>
              ) : null}
            </Combobox>
          </Box>

          {currDisplayData?.display?.includes("shipping-method-adder") && (
            <Box minWidth="10rem">
              <Button
                disabled={
                  !ruleData.tiers[ruleIndex].shipping_method_field_value
                }
                variant="primary"
                onClick={() =>
                  updateSelection(
                    ruleData.tiers[ruleIndex].shipping_method_field_value
                  )
                }
              >
                Add Shipping Method
              </Button>
            </Box>
          )}
        </InlineStack>
      )}

      <Box paddingBlockStart="200">
        {ruleData.tiers[ruleIndex].method_hide_show !== "hide_all_method" && (
          <Card padding="0">
            {currDisplayData?.display?.includes("payment-method-move") ||
            currDisplayData?.display?.includes("shipping-method-move") ? (
              <MethodsList
                handleInputChange={handleInputChange}
                currDisplayData={currDisplayData}
                ruleData={ruleData}
                ruleIndex={ruleIndex}
                list_name={list_name}
                updataPaymentMethodName={updataPaymentMethodName}
                removeTag={removeTag}
              />
            ) : (
              ruleData.tiers[ruleIndex][list_name]?.map((currItem, index) => {
                return (
                  <Box padding="300">
                    <InlineStack
                      blockAlign={
                        currDisplayData.display?.includes(
                          "payment-method-rename"
                        ) ||
                        currDisplayData.display?.includes(
                          "shipping-method-rename"
                        )
                          ? "end"
                          : "center"
                      }
                      wrap={false}
                      gap="300"
                      align="space-between"
                    >
                      {currDisplayData.display?.includes(
                        "payment-method-rename"
                      ) ||
                      currDisplayData.display?.includes(
                        "shipping-method-rename"
                      ) ? (
                        <Box width="100%">
                          <InlineStack wrap={false} gap="300">
                            <Box width="100%">
                              <TextField
                                label="Old name"
                                value={currItem.key}
                                disabled
                              />
                            </Box>

                            <Box width="100%">
                              <TextField
                                label="New name"
                                value={
                                  ruleData.tiers[ruleIndex][list_name][index]
                                    .value
                                }
                                onChange={(val) =>
                                  updataPaymentMethodName(val, index)
                                }
                              />
                            </Box>
                          </InlineStack>
                        </Box>
                      ) : (
                        <Text>{currItem.key}</Text>
                      )}

                      <Button
                        onClick={removeTag(index)}
                        variant="primary"
                        tone="critical"
                      >
                        Delete
                      </Button>
                    </InlineStack>
                  </Box>
                );
              })
            )}
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default PaymentAndShippingMethods;
