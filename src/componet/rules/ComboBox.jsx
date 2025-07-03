import React, { useCallback, useEffect, useState } from "react";
import { conditionFieldsOptions } from "../../data/RulesPageOptions";
import {
  AutoSelection,
  Combobox,
  InlineStack,
  Listbox,
  Tag,
} from "@shopify/polaris";

const ComboBox = ({ handleInputChange, ruleData, options, placeholder }) => {
  const [suggestionOptions, setSuggestionOptions] = useState(options || null);
  const escapeSpecialRegExCharacters = useCallback(
    (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    []
  );
  useEffect(() => {
    if (!ruleData.tiers[0].conditions[0].value_1) {
      ruleData.tiers[0].conditions[0].value_1;
      handleInputChange("value_1", [], 0, "tiers", 0, "conditions");
    }
  }, []);

  const updateText = useCallback(
    (value) => {
      handleInputChange("value", value, 0, "tiers", 0, "conditions");
      if (value === "") {
        setSuggestionOptions(options);
        return;
      }

      const filterRegex = new RegExp(escapeSpecialRegExCharacters(value), "i");
      const resultOptions = options?.filter((option) =>
        option.label.match(filterRegex)
      );
      setSuggestionOptions(resultOptions);
    },
    [options, escapeSpecialRegExCharacters]
  );

  const updateSelection = useCallback(
    (selected) => {
      console.log("selected -------", selected);

      if (ruleData.tiers[0].conditions[0].value_1?.includes(selected)) {
        let selectedValueList = ruleData.tiers[0].conditions[0].value_1.filter(
          (option) => option !== selected
        );

        handleInputChange(
          "value_1",
          selectedValueList,
          0,
          "tiers",
          0,
          "conditions"
        );
      } else {
        handleInputChange(
          "value_1",
          [...ruleData.tiers[0].conditions[0].value_1, selected],
          0,
          "tiers",
          0,
          "conditions"
        );
      }
      updateText("");
    },
    [ruleData.tiers[0].payment_method, updateText]
  );

  const removeTag = useCallback(
    (tag) => () => {
      const options = [...ruleData.tiers[0].conditions[0].value_1];
      options.splice(options.indexOf(tag), 1);
      handleInputChange("value_1", options, 0, "tiers", 0, "conditions");
    },
    [ruleData.tiers[0].conditions[0].value_1]
  );

  const optionsMarkup =
    suggestionOptions?.length > 0
      ? suggestionOptions?.map((option) => {
          const { label, value } = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={ruleData.tiers[0].conditions[0].value_1?.includes(
                value
              )}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;

  const verticalContentMarkup =
    ruleData.tiers[0].conditions[0].value_1?.length > 0 ? (
      <InlineStack spacing="extraTight" gap="200" alignment="center">
        {ruleData.tiers[0].conditions[0].value_1.map((tag) => (
          <Tag key={`option-${tag}`} onRemove={removeTag(tag)}>
            {tag}
          </Tag>
        ))}
      </InlineStack>
    ) : null;
  const listboxMarkup = options ? (
    <Listbox autoSelection={AutoSelection.None} onSelect={updateSelection}>
      {optionsMarkup}
    </Listbox>
  ) : null;

  return (
    <Combobox
      allowMultiple
      activator={
        <Combobox.TextField
          onBlur={!options && ((e) => updateSelection(e.target.value))}
          onChange={updateText}
          value={ruleData.tiers[0].conditions[0].value}
          label="Search tags"
          labelHidden
          placeholder={placeholder}
          autoComplete="off"
          verticalContent={verticalContentMarkup}
        />
      }
    >
      {listboxMarkup}
    </Combobox>
  );
};

export default ComboBox;
