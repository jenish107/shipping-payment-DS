import {
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
import Rules from "./rules/Rules.jsx";

const CunditionPage = () => {
  const [ruleData, setRuleData] = useState({
    tiers: [{ payment_method: [], conditions: [{}] }],
  });

  const params = useParams();
  // console.log("ruledata =========", <ruleData></ruleData>);
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
    <Page compactTitle>
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
            {
              title: "cart",
              options: [
                { label: "Inactive", value: "Inactive" },
                { label: "Active", value: "active" },
              ],
            },
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

        <Rules handleInputChange={handleInputChange} ruleData={ruleData} />

        <Box paddingBlock="300">
          <Divider />
        </Box>
        <Button variant="primary">Add another rule</Button>
      </Card>
    </Page>
  );
};

export default CunditionPage;
