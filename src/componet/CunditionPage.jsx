import {
  BlockStack,
  Box,
  Button,
  Card,
  Divider,
  Page,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import RulesCard from "./rules/RulesCard.jsx";
import PopoverSelect from "./rules/PopoverSelect.jsx";

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
            label: "Cash on Delivery (COD)",
            value: "Cash on Delivery (COD)",
          },
          {
            label: "Bank Deposit",
            value: "Bank Deposit",
          },
          {
            label: "Money Order",
            value: "Money Order",
          },
          {
            label: "Shopify Payments",
            value: "Shopify Payments",
          },
          {
            label: "Stripe",
            value: "Stripe",
          },
          {
            label: "Gift card",
            value: "Gift card",
          },
          {
            label: "Redeemable payment method",
            value: "Redeemable payment method",
          },
          {
            label: "PayPal",
            value: "PayPal",
          },
          {
            label: "PayPal Express Checkout",
            value: "PayPal Express Checkout",
          },
          {
            label: "Amazon Pay",
            value: "Amazon Pay",
          },
        ],
        payment_method_condition: "Contains",
        payment_method_field_value: "",
      },
    ],
  });
  const params = useParams();

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
          </Card>

          <Card>
            <Text variant="headingMd" as="h6">
              Rules
            </Text>
            <Box paddingBlock="300">
              <Divider />
            </Box>

            <BlockStack gap="200">
              {ruleData.tiers.map((currData, ruleIndex) => {
                return (
                  <RulesCard
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
