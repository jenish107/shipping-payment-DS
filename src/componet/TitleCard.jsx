import React from "react";

import { Card, Select, TextField } from "@shopify/polaris";

const TitleCard = ({
  handleInputChange,
  setIsShowError,
  ruleData,
  isShowError,
  currDisplayData,
}) => {
  return (
    <Card>
      <TextField
        onChange={(v) => {
          handleInputChange("Title", v);
          setIsShowError((pre) => ({ ...pre, titleError: false }));
        }}
        value={ruleData?.Title}
        label="Title (Internal Use)"
        error={isShowError.titleError ? "This field is required" : null}
      />

      <Select
        onChange={(v) => handleInputChange("Status", v)}
        value={ruleData?.Status}
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
  );
};

export default TitleCard;
