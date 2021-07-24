import React from "react";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import PropTypes from "prop-types";
import HighlightedOptionItem from "./HighlightedOptionItem";
import Chip from "@material-ui/core/Chip";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    height: "auto",
    border: "1px solid #707070",
  },
  muiAutoCompleteRoot: {
    backgroundColor: "#f3f3f7",
    padding: 9,
    "& label + .MuiInput-formControl": {
      marginTop: 0,
    },
    "& .MuiInputLabel-root": {
      display: "none",
    },
    "& .MuiInput-underline::before": {
      border: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      border: "none",
    },
    "& .MuiInput-underline:hover": {
      border: "none",
    },
    "& .MuiInput-underline:after": {
      border: "none",
    },
  },
};

const MultipleAutoCompleteHighlights = (props) => {
  const {
    classes,
    optionList,
    value: parentValue,
    defaultValue,
    handleSearchChange,
    handleSearchTextChange,
    style,
    loading,
    loadingText,
    noOptionsText,
    isDisabled,
    className,
    id,
    labelKey,
    valueKey,
  } = props;

  const autocompleteProps = {
    style: { ...style },
    className: className,
    loading,
    loadingText,
    onInputChange: handleSearchTextChange,
  };

  const [selectedOption, setSelectedOption] = React.useState(
    defaultValue || []
  );

  React.useEffect(() => {
    if (parentValue !== undefined) setSelectedOption(parentValue);
  }, [parentValue]);

  const getValueToPut = (chosenValue) => {
    let valueToPut = { [valueKey]: "" };

    if (typeof chosenValue === "string") valueToPut[valueKey] = chosenValue;
    else valueToPut = chosenValue;

    return valueToPut;
  };

  const handleChange = (e, v) => {
    const valueToPut = getValueToPut(v);

    if (parentValue === undefined) setSelectedOption(valueToPut);
    if (handleSearchChange) handleSearchChange(e, valueToPut);
  };

  const handleEnterKey = (e) => {
    if (e.keyCode === 13) handleChange(e, [...selectedOption]);
  };

  const renderOptions = (option, { inputValue }, labelKey) => {
    return (
      <HighlightedOptionItem
        option={option}
        rest={{ inputValue }}
        labelKey={props.labelKey}
      />
    );
  };

  return (
    <Autocomplete
      multiple
      id={id}
      //freeSolo
      {...autocompleteProps}
      onChange={handleChange}
      classes={{ root: classes.muiAutoCompleteRoot }}
      options={optionList}
      filterSelectedOptions
      disabled={isDisabled}
      value={selectedOption}
      noOptionsText={noOptionsText}
      onKeyUp={handleEnterKey}
      renderOption={renderOptions}
      getOptionLabel={(option) => option[labelKey] || ""}
      getOptionSelected={(option, selectedValue) =>
        option[valueKey] === selectedValue[valueKey]
      }
      renderTags={(value, getTagProps) => {
        return value.map((option, index) => {
          return (
            <Chip
              variant="outlined"
              deleteIcon={<CloseIcon fontSize="small" />}
              classes={{ root: classes.root }}
              label={option[valueKey] || option}
              {...getTagProps({ index })}
            />
          );
        });
      }}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

MultipleAutoCompleteHighlights.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.any,
  handleSearchChange: PropTypes.func,
  handleSearchTextChange: PropTypes.any,
  id: PropTypes.string,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  noOptionsText: PropTypes.string,
  optionList: PropTypes.array,
  style: PropTypes.object,
  value: PropTypes.any,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  isDisabled: PropTypes.bool,
};

MultipleAutoCompleteHighlights.defaultProps = {
  optionList: [],
  value: undefined,
  id: "combo-box-demo",
  labelKey: "value", // ideal key would be "label". coding to "value" just to not break the current implementation.
  valueKey: "value",
  isDisabled: false,
};

export default withStyles(styles)(MultipleAutoCompleteHighlights);
