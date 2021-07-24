import PropTypes from "prop-types";
import React from "react";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

const HighlightedOptionItem = (props) => {
  const { option, rest, labelKey } = props;
  const { inputValue } = rest;

  //console.log("key", labelKey, option, option[labelKey])

  const matches = match(
    option.value ? option.value : option[labelKey],
    inputValue
  );
  const parts = parse(option.value ? option.value : option[labelKey], matches);

  return (
    <div>
      {parts.map((part, index) => (
        <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
          {part.text}
        </span>
      ))}
    </div>
  );
};

HighlightedOptionItem.propTypes = {
  option: PropTypes.object.isRequired,
  rest: PropTypes.object.isRequired,
  labelKey: PropTypes.string,
};

HighlightedOptionItem.defaultProps = {
  option: { value: "" },
  rest: { inputValue: "" },
};

export default HighlightedOptionItem;
