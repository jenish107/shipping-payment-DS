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
  const [popoverSelectData, setPopoverSelectData] = useState({
    selectedItems: "",
    accountStatus: "",
    field_item: currConditionData.field_item,
  });

  const escapeSpecialRegExCharacters = useCallback(
    (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    []
  );
  const handlePopoverInputChange = (
    name,
    value,
    index,
    dataKey,
    subDataKey,
    subIndex
  ) => {
    setPopoverSelectData((prevData) => {
      if (index !== undefined) {
        const updatedIcon = [...prevData[dataKey]];
        if (subDataKey !== undefined) {
          updatedIcon[index][subDataKey][subIndex][name] = value;
          return { ...prevData, [dataKey]: updatedIcon };
        } else {
          updatedIcon[index][name] = value;
          return { ...prevData, [dataKey]: updatedIcon };
        }
      } else {
        return { ...prevData, [name]: value };
      }
    });
  };

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
          selected={popoverSelectData.accountStatus || []}
          onChange={(val) => handlePopoverInputChange("accountStatus", val)}
          allowMultiple
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = [];
  if (!isEmpty(popoverSelectData.accountStatus)) {
    const key = "accountStatus";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, popoverSelectData.accountStatus),
      onRemove: () => handlePopoverInputChange("accountStatus", ""),
    });
  }

  const updateText = useCallback(
    (value) => {
      handlePopoverInputChange("search_field", value);

      if (value === "") {
        handlePopoverInputChange("field_item", currConditionData.field_item);
        return;
      }

      const filterRegex = new RegExp(escapeSpecialRegExCharacters(value), "i");
      const resultOptions = currConditionData.field_item?.filter((currData) =>
        currData.title.match(filterRegex)
      );
      handlePopoverInputChange("field_item", resultOptions);
    },
    [currConditionData.field_item, escapeSpecialRegExCharacters]
  );
  return (
    <>
      <Box
        position="fixed"
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
                width="40rem"
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

                <Box minHeight="75vh" id="resource_list">
                  <ResourceList
                    showHeader={false}
                    items={popoverSelectData.field_item}
                    renderItem={renderItem}
                    selectedItems={popoverSelectData.selectedItems}
                    onSelectionChange={(value) =>
                      handlePopoverInputChange("selectedItems", value)
                    }
                    selectable
                    filterControl={
                      <Box id="filter_header">
                        <InlineStack gap="200" wrap={false}>
                          <Box width="100%">
                            <TextField
                              prefix={<Icon source={SearchIcon} tone="base" />}
                              autoComplete="off"
                              value={popoverSelectData.search_field}
                              onChange={updateText}
                              placeholder="Search products"
                            />
                          </Box>

                          {currConditionData.field_extra_filter && (
                            <Box minWidth="35%">
                              <Select
                                labelHidden
                                options={[
                                  {
                                    label: "All",
                                    value: "All",
                                    prefix: (
                                      <Text tone="subdued"> Search by</Text>
                                    ),
                                  },
                                  {
                                    label: "Product title",
                                    value: "Product title",
                                    prefix: (
                                      <Text tone="subdued"> Search by</Text>
                                    ),
                                  },
                                  {
                                    label: "Product ID",
                                    value: "Product ID",
                                    prefix: (
                                      <Text tone="subdued"> Search by</Text>
                                    ),
                                  },
                                  {
                                    label: "Barcode",
                                    value: "Barcode",
                                    prefix: (
                                      <Text tone="subdued"> Search by</Text>
                                    ),
                                  },
                                  {
                                    label: "SKU",
                                    value: "SKU",
                                    prefix: (
                                      <Text tone="subdued"> Search by</Text>
                                    ),
                                  },
                                ]}
                                value={popoverSelectData.filter_type}
                                onChange={(val) => {
                                  handlePopoverInputChange("filter_type", val);
                                }}
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
                    <Text>
                      {popoverSelectData.selectedItems.length} collections
                      selected
                    </Text>
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
                        onClick={() => {
                          handleInputChange("is_popover_select_show", false);
                          handleInputChange(
                            "value_1",
                            popoverSelectData.selectedItems,
                            ruleIndex,
                            "tiers",
                            index,
                            "conditions"
                          );
                        }}
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
    const { title, product, product_number, img } = item;
    const media = (
      <Thumbnail size="small" source={img} alt="Black choker necklace" />
    );

    return (
      <ResourceItem
        id={product_number}
        media={media}
        accessibilityLabel={`View details for ${title}`}
      >
        <Box
          paddingBlockStart={!product && "200"}
          minHeight="2.5rem"
          onClick={() =>
            handlePopoverInputChange("selectedItems", [
              ...popoverSelectData.selectedItems,
              product_number,
            ])
          }
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
