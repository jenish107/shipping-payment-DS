import React, { useCallback, useEffect, useState } from "react";
import {
  AutoSelection,
  Combobox,
  InlineStack,
  Listbox,
  Tag,
} from "@shopify/polaris";

const CustomComboBox = ({
  handleInputChange,
  ruleData,
  ruleIndex,
  index,
  currConditionData,
}) => {
  const { placeholder, field_type, options, combo_box_option } =
    currConditionData;
  const [suggestionOptions, setSuggestionOptions] = useState(
    combo_box_option || null
  );
  const escapeSpecialRegExCharacters = useCallback(
    (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    []
  );

  useEffect(() => {
    if (!ruleData.tiers[ruleIndex].conditions[index].value_1) {
      handleInputChange("value_1", [], ruleIndex, "tiers", index, "conditions");
    }
    setSuggestionOptions(combo_box_option);
  }, [ruleData.tiers[ruleIndex].conditions[index].type, combo_box_option]);

  const updateText = useCallback(
    (value) => {
      handleInputChange(
        "value",
        value,
        ruleIndex,
        "tiers",
        index,
        "conditions"
      );

      if (value === "") {
        setSuggestionOptions(combo_box_option);
        return;
      }

      const filterRegex = new RegExp(escapeSpecialRegExCharacters(value), "i");
      const resultOptions = combo_box_option?.filter((option) =>
        option.label.match(filterRegex)
      );
      setSuggestionOptions(resultOptions);
    },
    [combo_box_option, escapeSpecialRegExCharacters]
  );

  const updateSelection = useCallback(
    (selected) => {
      if (
        ruleData.tiers[ruleIndex].conditions[index].value_1?.includes(selected)
      ) {
        let selectedValueList = ruleData.tiers[ruleIndex].conditions[
          index
        ].value_1.filter((option) => option !== selected);

        handleInputChange(
          "value_1",
          selectedValueList,
          ruleIndex,
          "tiers",
          index,
          "conditions"
        );
      } else {
        handleInputChange(
          "value_1",
          [...ruleData.tiers[ruleIndex].conditions[index].value_1, selected],
          ruleIndex,
          "tiers",
          index,
          "conditions"
        );
      }
      updateText("");
    },
    [ruleData.tiers[ruleIndex].payment_method, updateText]
  );

  const removeTag = useCallback(
    (tag) => () => {
      const options = [...ruleData.tiers[ruleIndex].conditions[index].value_1];
      options.splice(options.indexOf(tag), 1);
      handleInputChange(
        "value_1",
        options,
        ruleIndex,
        "tiers",
        index,
        "conditions"
      );
    },
    [ruleData.tiers[ruleIndex].conditions[index].value_1]
  );

  const optionsMarkup =
    suggestionOptions?.length > 0
      ? suggestionOptions?.map((option) => {
          const { label, value } = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={ruleData.tiers[ruleIndex].conditions[
                index
              ].value_1?.includes(value)}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;

  const verticalContentMarkup =
    ruleData.tiers[ruleIndex].conditions[index].value_1?.length > 0 ? (
      <InlineStack spacing="extraTight" gap="200" alignment="center">
        {ruleData.tiers[ruleIndex].conditions[index].value_1.map((tag) => (
          <Tag key={`option-${tag}`} onRemove={removeTag(tag)}>
            {tag}
          </Tag>
        ))}
      </InlineStack>
    ) : null;

  const listboxMarkup = combo_box_option ? (
    <Listbox autoSelection={AutoSelection.None} onSelect={updateSelection}>
      {optionsMarkup}
    </Listbox>
  ) : null;

  return (
    <Combobox
      allowMultiple
      activator={
        <Combobox.TextField
          onFocus={
            field_type == "popover_select" &&
            (() => {
              handleInputChange("is_popover_select_show", true);
              handleInputChange(
                "popover_select_current_data",
                currConditionData
              );
              handleInputChange("popover_location_field", {
                ruleIndex: ruleIndex,
                index: index,
              });
            })
          }
          onBlur={!combo_box_option && ((e) => updateSelection(e.target.value))}
          onChange={updateText}
          value={ruleData.tiers[ruleIndex].conditions[index].value}
          label="Search tags"
          labelHidden
          placeholder={placeholder}
          autoComplete="off"
          verticalContent={verticalContentMarkup}
        />
      }
    >
      {field_type !== "popover_select" ? listboxMarkup : undefined}
    </Combobox>
  );
};

export default CustomComboBox;
