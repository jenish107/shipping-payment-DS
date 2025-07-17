import {
  BlockStack,
  Box,
  Button,
  Card,
  DataTable,
  Divider,
  InlineStack,
  Page,
  Text,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RuleList = () => {
  const [ruleList, setRuleList] = useState(
    JSON.parse(localStorage.getItem("ruleList")) || []
  );
  const navigat = useNavigate();
  const handleRuleItemDelete = (currIndex) => {
    let temp = [...ruleList];

    setRuleList(temp.slice(0, currIndex));
  };

  useEffect(() => {
    localStorage.setItem("ruleList", JSON.stringify(ruleList));
  }, [ruleList]);

  const rows = ruleList.map((currItem, index) => {
    return [
      <Box minWidth="30vw">
        <Button
          variant="plain"
          onClick={() => navigat(`/rules-page/${currItem?.cardTitle}/${index}`)}
        >
          {currItem.ruleData.Title}
        </Button>
      </Box>,
      currItem.cardTitle,
      <Button variant="primary" onClick={() => handleRuleItemDelete(index)}>
        Delele
      </Button>,
    ];
  });
  return (
    <Page>
      <Card padding="0">
        <BlockStack gap="300">
          {ruleList.length > 0 && (
            <DataTable
              columnContentTypes={["text", "text", "text"]}
              headings={["Title", "Type", "Action"]}
              rows={rows}
            />
          )}

          <Box padding="300">
            <Button
              onClick={() => navigat(`/deshbord/${ruleList?.length}`)}
              variant="primary"
            >
              Create new rule
            </Button>
          </Box>
        </BlockStack>
      </Card>
    </Page>
  );
};

export default RuleList;
