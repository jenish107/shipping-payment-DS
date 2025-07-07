import {
  BlockStack,
  Box,
  Button,
  ChoiceList,
  Divider,
  Filters,
  Icon,
  InlineStack,
  RangeSlider,
  ResourceItem,
  ResourceList,
  Select,
  TextField,
  Thumbnail,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { Text } from "@shopify/polaris";
import { ImageIcon, PlusIcon, SearchIcon, XIcon } from "@shopify/polaris-icons";

import "../../style/PopoverSelect.css";

const PopoverSelect = ({
  handleInputChange,
  ruleIndex,
  ruleData,
  index,
  currConditionData,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [accountStatus, setAccountStatus] = useState(undefined);

  const handleAccountStatusChange = useCallback(
    (value) => setAccountStatus(value),
    []
  );

  const handleAccountStatusRemove = useCallback(
    () => setAccountStatus(undefined),
    []
  );

  const filters = [
    {
      key: "accountStatus",
      label: "Account status",
      filter: (
        <ChoiceList
          title="Account status"
          titleHidden
          choices={[
            { label: "Enabled", value: "enabled" },
            { label: "Not invited", value: "not invited" },
            { label: "Invited", value: "invited" },
            { label: "Declined", value: "declined" },
          ]}
          selected={accountStatus || []}
          onChange={handleAccountStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = [];
  if (!isEmpty(accountStatus)) {
    const key = "accountStatus";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, accountStatus),
      onRemove: handleAccountStatusRemove,
    });
  }

  return (
    <>
      <Box
        position="absolute"
        minHeight="100vh"
        width="100%"
        insetBlockStart="0"
      >
        <Box background="bg-fill-critical-hover" position="relative">
          <Box
            width="100%"
            position="absolute"
            background="backdrop-bg"
            minHeight="100vh"
            onClick={() => handleInputChange("is_popover_select_show", false)}
          ></Box>

          <Box position="relative">
            <Box id="center_item" position="absolute">
              <Box
                padding="0"
                background="bg-surface"
                width="32rem"
                borderRadius="300"
              >
                <Box
                  padding="300"
                  borderStartStartRadius="300"
                  borderStartEndRadius="300"
                  background="bg-fill-active"
                >
                  <InlineStack align="space-between">
                    <Text variant="headingMd">Select collections</Text>
                    <Box
                      onClick={() =>
                        handleInputChange("is_popover_select_show", false)
                      }
                    >
                      <Icon source={XIcon} tone="base" />
                    </Box>
                  </InlineStack>
                </Box>

                <Box minHeight="65vh" id="resource_list">
                  <ResourceList
                    showHeader={false}
                    items={currConditionData.field_item}
                    renderItem={renderItem}
                    selectedItems={selectedItems}
                    onSelectionChange={setSelectedItems}
                    selectable
                    filterControl={
                      <Box id="filter_header">
                        <InlineStack gap="200" wrap={false}>
                          <Box width="100%">
                            <TextField
                              prefix={<Icon source={SearchIcon} tone="base" />}
                              autoComplete="off"
                              placeholder="Search products"
                            />
                          </Box>

                          {currConditionData.field_extra_filter && (
                            <Box minWidth="30%">
                              <Select
                                labelHidden
                                options={[
                                  {
                                    label: "All",
                                    value: "all",
                                    prefix: (
                                      <Text tone="subdued"> Search by</Text>
                                    ),
                                  },
                                  {
                                    label: "Title",
                                    value: "title",
                                    prefix: (
                                      <Text tone="subdued"> Search by</Text>
                                    ),
                                  },
                                  {
                                    label: "Product number",
                                    value: "product_number",
                                    prefix: (
                                      <Text tone="subdued"> Search by</Text>
                                    ),
                                  },
                                ]}
                                value="all"
                                onChange={() => {}}
                              />
                            </Box>
                          )}
                        </InlineStack>
                        {currConditionData.field_extra_filter && (
                          <Filters
                            hideQueryField
                            filters={filters}
                            appliedFilters={appliedFilters}
                          />
                        )}
                      </Box>
                    }
                  />
                </Box>

                <Box
                  padding="300"
                  borderBlockStartWidth="025"
                  borderColor="border"
                >
                  <InlineStack align="space-between">
                    <Text>{selectedItems.length} collections selected</Text>
                    <InlineStack gap="200">
                      <Button
                        onClick={() =>
                          handleInputChange("is_popover_select_show", false)
                        }
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() =>
                          handleInputChange(
                            "value_1",
                            selectedItems,
                            ruleIndex,
                            "tiers",
                            index,
                            "conditions"
                          )
                        }
                      >
                        Select
                      </Button>
                    </InlineStack>
                  </InlineStack>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );

  function renderItem(item) {
    const { title, product, product_number } = item;
    const media = <Thumbnail size="small" alt="Black choker necklace" />;

    return (
      <ResourceItem
        id={product_number}
        media={media}
        accessibilityLabel={`View details for ${title}`}
      >
        <Box
          paddingBlockStart={!product && "200"}
          minHeight="2.5rem"
          onClick={() => setSelectedItems((pre) => [...pre, product_number])}
        >
          <Text variant="bodyMd" fontWeight={product && "bold"} as="h3">
            {title}
          </Text>
          {product && <Text>{product}</Text>}
        </Box>
      </ResourceItem>
    );
  }

  function disambiguateLabel(key, value) {
    switch (key) {
      case "accountStatus":
        return value?.map((val) => `Customer ${val}`).join(", ");
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }
};

export default PopoverSelect;
