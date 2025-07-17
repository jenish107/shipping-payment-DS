import React, { useEffect, useState } from "react";

import {
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
  ChoiceList,
  Divider,
  Page,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { useParams } from "react-router-dom";
import RulesCard from "./rules/RulesCard.jsx";
import PopoverSelect from "./popoverSelect/PopoverSelect.jsx";
import { AdvanceOptions, dashBordData } from "../data/DashBordData.jsx";
import DiscountCombiner from "./DiscountCombiner.jsx";
import TitleCard from "./TitleCard.jsx";
import RuleTypeSelect from "./RuleTypeSelect.jsx";
import { conditionFieldsOptions } from "../data/ConditionFieldsOptions.jsx";
import ErrorBanner from "./ErrorBanner.jsx";

const CunditionPage = () => {
  const [ruleList, setRuleList] = useState(
    JSON.parse(localStorage.getItem("ruleList")) || []
  );
  const [ruleData, setRuleData] = useState({});
  const [currDisplayData, setCurrDisplayData] = useState({});
  const [isShowError, setIsShowError] = useState({
    titleError: false,
    paymentError: false,
    valueError: false,
    value1Error: false,
  });
  const params = useParams();

  useEffect(() => {
    if (currDisplayData == undefined) {
      return;
    }

    if (ruleData.rule_type == "basic") {
      setCurrDisplayData((pre) => {
        return {
          ...pre,
          Type: {
            ...pre.Type,
            Options: dashBordData.find(
              (currData) => currData.title == "Hide Shipping Methods"
            ).Type.Options,
          },
        };
      });
    } else {
      setCurrDisplayData((pre) => {
        return {
          ...pre,
          Type: { ...pre.Type, Options: AdvanceOptions },
        };
      });
    }
  }, [ruleData?.rule_type]);

  useEffect(() => {
    setCurrDisplayData(
      dashBordData.find((currItem) => {
        return currItem.title == params.title;
      })
    );
  }, [params]);

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
  const chackIsFieldEmpty = () => {
    let list_name = currDisplayData?.display?.includes("payment-method-adder")
      ? "payment_method"
      : "shipping_method";

    let isError = false;
    if (ruleData?.Title == "" || ruleData.Title == undefined) {
      setIsShowError((pre) => ({ ...pre, titleError: true }));
      isError = true;
    }

    ruleData.tiers?.map((currItem) => {
      currItem.conditions?.map((currCondition) => {
        if (
          currCondition.type !== "Always" &&
          (currCondition.value == "" || currCondition.value == null)
        ) {
          setIsShowError((pre) => ({ ...pre, valueError: true }));
          isError = true;
        }
        if (
          currCondition.condition == "Is between" &&
          (currCondition.value_1 == "" || currCondition.value_1 == null)
        ) {
          setIsShowError((pre) => ({ ...pre, value1Error: true }));
          isError = true;
        }
      });

      if (currItem[list_name]?.length < 1 || currItem[list_name] == undefined) {
        setIsShowError((pre) => ({ ...pre, paymentError: true }));
        isError = true;
      }
    });

    if (isError) {
      return true;
    }
  };

  const handleSaveButton = () => {
    if (chackIsFieldEmpty() == true) return;

    if (ruleList[params.ruleIndex] !== undefined) {
      setRuleList((pre) => {
        let temp = pre.map((currItem, index) => {
          if (index == params.ruleIndex) {
            return { ...currItem, ruleData: ruleData };
          }
          return currItem;
        });
        return temp;
      });
    } else {
      setRuleList((pre) => [
        ...pre,
        { ruleData: ruleData, cardTitle: params.title },
      ]);
    }
  };

  const handleAddNewRule = () => {
    if (chackIsFieldEmpty() == true) return;
    handleInputChange("tiers", [
      ...ruleData.tiers,
      { payment_method: [], conditions: [{}] },
    ]);
  };

  useEffect(() => {
    if (ruleList[params.ruleIndex] !== undefined) {
      setRuleData(ruleList[params.ruleIndex].ruleData);
    } else {
      setRuleData({
        tiers: [
          {
            payment_method: [],
            conditions: [
              {
                value_1: "",
                value: "",
                condition: null,
                type: "Always",
              },
            ],
            payment_method_options: conditionFieldsOptions.PaymentMethods.map(
              (currOption) => ({ ...currOption, key: currOption.label })
            ),
            payment_method_condition: "Contains",
            payment_method_field_value: "",
            rule_cundition: "and",
          },
        ],
        rule_type: "basic",
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ruleList", JSON.stringify(ruleList));
  }, [ruleList]);

  return (
    <>
      <Page compactTitle>
        <BlockStack gap="200">
          {Object.values(isShowError).includes(true) && <ErrorBanner />}

          <TitleCard
            handleInputChange={handleInputChange}
            setIsShowError={setIsShowError}
            ruleData={ruleData}
            isShowError={isShowError}
            currDisplayData={currDisplayData}
          />

          <Card>
            <Text variant="headingMd" as="h6">
              Rules
            </Text>

            {currDisplayData?.display?.includes("rule-type-select") && (
              <RuleTypeSelect
                ruleData={ruleData}
                handleInputChange={handleInputChange}
              />
            )}

            <Box paddingBlock="300">
              <Divider />
            </Box>

            <BlockStack gap="200">
              {ruleData.tiers?.map((currData, ruleIndex) => {
                return (
                  <RulesCard
                    currDisplayData={currDisplayData}
                    currData={currData}
                    key={ruleIndex}
                    ruleIndex={ruleIndex}
                    handleInputChange={handleInputChange}
                    ruleData={ruleData}
                    isShowError={isShowError}
                    setIsShowError={setIsShowError}
                    chackIsFieldEmpty={chackIsFieldEmpty}
                  />
                );
              })}
            </BlockStack>

            <Box paddingBlock="300">
              <Divider />
            </Box>

            <Button variant="primary" onClick={handleAddNewRule}>
              Add another rule
            </Button>
          </Card>

          {currDisplayData?.display?.includes("discount-combiner") && (
            <DiscountCombiner
              ruleData={ruleData}
              handleInputChange={handleInputChange}
            />
          )}

          <Button onClick={handleSaveButton}>Save</Button>
        </BlockStack>
      </Page>

      {ruleData.is_popover_select_show && (
        <PopoverSelect
          ruleData={ruleData}
          currConditionData={ruleData.popover_select_current_data}
          handleInputChange={handleInputChange}
          ruleIndex={ruleData.popover_location_field.ruleIndex}
          index={ruleData.popover_location_field.index}
        />
      )}
    </>
  );
};

export default CunditionPage;
