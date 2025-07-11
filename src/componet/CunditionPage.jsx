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
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import RulesCard from "./rules/RulesCard.jsx";
import PopoverSelect from "./popoverSelect/PopoverSelect.jsx";
import { dashBordData } from "../data/DashBordData.jsx";

const CunditionPage = () => {
  const [ruleData, setRuleData] = useState({
    tiers: [
      {
        payment_method: [],
        conditions: [
          {
            value_1: "",
            value: null,
          },
        ],
        payment_method_options: [
          {
            key: "Cash on Delivery (COD)",
            value: "Cash on Delivery (COD)",
          },
          {
            key: "Bank Deposit",
            value: "Bank Deposit",
          },
          {
            key: "Money Order",
            value: "Money Order",
          },
          {
            key: "Shopify Payments",
            value: "Shopify Payments",
          },
          {
            key: "Stripe",
            value: "Stripe",
          },
          {
            key: "Gift card",
            value: "Gift card",
          },
          {
            key: "Redeemable payment method",
            value: "Redeemable payment method",
          },
          {
            key: "PayPal",
            value: "PayPal",
          },
          {
            key: "PayPal Express Checkout",
            value: "PayPal Express Checkout",
          },
          {
            key: "Amazon Pay",
            value: "Amazon Pay",
          },
        ],
        rule_type: "basic",
        payment_method_condition: "Contains",
        payment_method_field_value: "",
      },
    ],
  });
  const [currDisplayData, setCurrDisplayData] = useState();
  const params = useParams();

  // console.log("this is dashbord dat", currDisplayData);
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

  return (
    <>
      <Page compactTitle>
        <BlockStack gap="200">
          <Card>
            <TextField
              onChange={(v) => handleInputChange("Title", v)}
              value={ruleData?.Title}
              label="Title (Internal Use)"
            />

            <Select
              onChange={(v) => handleInputChange("Status", v)}
              value={ruleData?.Title}
              label="Status"
              options={[
                { label: "Inactive", value: "Inactive" },
                { label: "Active", value: "active" },
              ]}
            />

            {currDisplayData?.display?.includes("discount-code") && (
              <TextField
                onChange={(v) => handleInputChange("discount_code", v)}
                value={ruleData?.discount_code}
                label="Discount code"
              />
            )}
          </Card>

          <Card>
            <Text variant="headingMd" as="h6">
              Rules
            </Text>

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

            <Box paddingBlock="300">
              <Divider />
            </Box>

            <BlockStack gap="200">
              {ruleData.tiers.map((currData, ruleIndex) => {
                return (
                  <RulesCard
                    currDisplayData={currDisplayData}
                    currData={currData}
                    key={ruleIndex}
                    ruleIndex={ruleIndex}
                    handleInputChange={handleInputChange}
                    ruleData={ruleData}
                  />
                );
              })}
            </BlockStack>

            <Box paddingBlock="300">
              <Divider />
            </Box>
            <Button
              variant="primary"
              onClick={() =>
                handleInputChange("tiers", [
                  ...ruleData.tiers,
                  { payment_method: [], conditions: [{}] },
                ])
              }
            >
              Add another rule
            </Button>
          </Card>

          {currDisplayData?.display?.includes("discount-combiner") && (
            <Card>
              <ChoiceList
                allowMultiple
                title="This discount can be combined with:"
                choices={[
                  {
                    label: "Product discounts",
                    value: "product_discount",
                  },
                  {
                    label: "Order discounts",
                    value: "order_discount",
                  },
                ]}
                selected={ruleData.discount_type || "none"}
                onChange={(val) => handleInputChange("discount_combine", val)}
              />
            </Card>
          )}
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
