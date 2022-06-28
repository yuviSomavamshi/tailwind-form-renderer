import { useState, useEffect, useRef } from "react";
import IconRenderer from "../../../IconRenderer";

function uniq(arr) {
  const out = [];
  for (let i = 0; i < arr.length; i++) {
    if (out.indexOf(arr[i]) === -1) {
      out.push(arr[i]);
    }
  }
  return out;
}

function getClipboardData(e) {
  if (window.clipboardData) {
    return window.clipboardData.getData("Text");
  }

  if (e.clipboardData) {
    return e.clipboardData.getData("text/plain");
  }

  return "";
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  }, [value]); //this code will run when the value of "value" changes
  return ref.current; //in the end, return the current ref value.
}

export default function TagsInput(props) {
  const [tag, setTag] = useState("");
  const [focusedTagIndex, setFocusedTagIndex] = useState(undefined);
  const prevFocusedTagIndex = usePrevious(focusedTagIndex);

  let tags = useRef();
  let div = useRef();
  let input = useRef();

  const _getTagDisplayValue = (t) => {
    const { tagDisplayProp } = props;
    if (tagDisplayProp) {
      return t[tagDisplayProp];
    }
    return t;
  };

  const _makeTag = (t) => {
    const { tagDisplayProp, type } = props;
    if (tagDisplayProp) {
      return {
        [tagDisplayProp]: t
      };
    }
    if (type === "integer") t = parseInt(t);
    if (type === "number") t = parseFloat(t);
    if (type === "boolean") t = Boolean(t);
    return t;
  };

  const _removeTag = (index) => {
    const value = props.value?.concat([]);
    if (index > -1 && index < value.length) {
      const changed = value.splice(index, 1);
      props.onChange(value, changed, [index]);
      props.removeItems(props.path, [index]);
    }
  };

  const _clearInput = () => {
    if (hasControlledInput()) {
      props.onChangeInput("");
    } else {
      setTag("");
    }
  };

  const _tag = () => {
    if (hasControlledInput()) {
      return props.inputValue;
    }
    return tag;
  };

  const _addTags = (tags) => {
    const { onChange, onValidationReject, onlyUnique = false, maxTags = -1, value } = props;

    if (onlyUnique) {
      tags = uniq(tags);
      tags = tags.filter((tag) => value.every((currentTag) => _getTagDisplayValue(currentTag) !== _getTagDisplayValue(tag)));
    }

    const rejectedTags = tags.filter((tag) => !_validate(_getTagDisplayValue(tag)));
    tags = tags.filter((tag) => _validate(_getTagDisplayValue(tag)));
    tags = tags.filter((tag) => {
      const tagDisplayValue = _getTagDisplayValue(tag);
      if (typeof tagDisplayValue.trim === "function") {
        return tagDisplayValue.trim().length > 0;
      } else {
        return tagDisplayValue;
      }
    });

    if (maxTags >= 0) {
      tags = tags.slice(0, Math.max(maxTags - value.length, 0));
    }

    if (onValidationReject && rejectedTags.length > 0) {
      onValidationReject(rejectedTags);
    }

    if (tags.length > 0) {
      const indexes = [];
      for (let i = 0; i < tags.length; i++) {
        indexes.push(value.length + i);
      }
      onChange(value.concat(tags), tags, indexes);
      _clearInput();
      return true;
    }

    if (rejectedTags.length > 0) {
      return false;
    }

    _clearInput();
    return false;
  };

  const _validate = (t) => {
    if (props.type === "integer") {
      return /^-?(0|[1-9]\d*)(?<!-0)$/.test(t);
    }
    if (props.type === "number") {
      return /^(?!-0(\.0+)?$)-?(0|[1-9]\d*)(\.\d+)?$/.test(t);
    }
    if (props.type === "boolean") {
      return ["true", "false", 0, 1].includes(t);
    }
    //const { validate, validationRegex } = props;
    //return validate(t) && ;
    return true;
  };

  const _shouldPreventDefaultEventOnAdd = (added, empty, keyCode) => {
    if (added) {
      return true;
    }

    if (keyCode === 13) {
      return props.preventSubmit || (!props.preventSubmit && !empty);
    }

    return false;
  };

  const accept = () => {
    let t = _tag();
    if (t !== "") {
      t = _makeTag(t);
      props.addItem(props.path, t);
      return _addTags([t]);
    }
    return false;
  };

  const addTag = (t) => {
    return _addTags([t]);
  };

  const handlePaste = (e) => {
    const { addOnPaste } = props;

    if (!addOnPaste) {
      return;
    }

    e.preventDefault();

    const data = getClipboardData(e);
    const tags = pasteSplit(data).map((tag) => _makeTag(tag));

    _addTags(tags);
  };

  const handleKeyDown = (e) => {
    if (e.defaultPrevented) {
      return;
    }

    const { value, removeKeys = [8], addKeys = [9, 13] } = props;
    const t = _tag();
    const empty = t === "";
    const keyCode = e.keyCode;
    const key = e.key;
    const add = addKeys.indexOf(keyCode) !== -1 || addKeys.indexOf(key) !== -1;
    const remove = removeKeys.indexOf(keyCode) !== -1 || removeKeys.indexOf(key) !== -1;

    if (add) {
      const added = accept();
      if (_shouldPreventDefaultEventOnAdd(added, empty, keyCode)) {
        e.preventDefault();
      }
    }

    if (remove && value.length > 0 && empty) {
      e.preventDefault();
      _removeTag(value.length - 1);
    }
  };

  const handleClick = (e) => {
    if (e.target === div) {
    }
  };

  const handleChange = (e) => {
    const { onChangeInput } = props;

    const t = e.target.value;
    if (hasControlledInput()) {
      onChangeInput(t);
    } else {
      setTag(t);
    }
  };

  const handleRemove = (t) => {
    _removeTag(t);
  };

  const inputValue = (props) => {
    return props.currentValue || props.inputValue || "";
  };

  const hasControlledInput = () => {
    const { inputValue, onChangeInput } = props;
    return typeof onChangeInput === "function" && typeof inputValue === "string";
  };

  const handleClickOutside = (e) => {
    e.stopPropagation();

    if (div && e.target.dataset.isTag === "true") {
      setFocusedTagIndex(parseInt(e.target.dataset.index, 10));
    } else {
      if (focusedTagIndex) {
        setFocusedTagIndex(undefined);
      }
    }
  };

  const handleKeyDownOnTags = (e) => {
    const { value } = props;

    if (e.keyCode === 8 && value.length > 0 && focusedTagIndex !== undefined) {
      e.preventDefault();

      const fi = focusedTagIndex;

      _removeTag(focusedTagIndex);

      if (fi === 0) {
        setFocusedTagIndex(0);
      } else {
        setFocusedTagIndex(--fi);
      }
    }
  };

  const renderTag = (p) => {
    const { tag, key, disabled, onRemove, getTagDisplayValue, ...other } = p;
    return (
      <span key={key} {...other} data-is-tag={true} className="flex flex-row bg-color-0100 hover:bg-color-0200 border rounded m-1 p-0.5 shadow">
        {getTagDisplayValue(tag)}
        {!disabled && (
          <button className="flex flex-row items-center p-px focus:outline-none hover:shadow-2xl" onClick={(e) => onRemove(key)}>
            <IconRenderer icon="Close" className="text-slate-500 hover:text-red-500 font-extrabold" fontSize="small" />
          </button>
        )}
      </span>
    );
  };

  const renderInput = ({ addTag, ...p }) => {
    const { onChange, value, ...other } = p;
    switch (props.type) {
      case "integer":
        other.type = "number";
        other.step = 1;
        break;
      case "number":
        other.type = "number";
        other.step = 0.1;
        break;
      case "boolean":
        other.type = "boolean";
        break;
      default:
        other.type = "text";
    }
    return (
      <input
        onChange={handleChange}
        value={value}
        {...other}
        className="block caret-slate-300 text-xs py-[1px] px-1 my-1 mx-2 rounded border text-slate-700 placeholder-slate-500 shadow focus:shadow-md focus:border-color-0600 border-slate-200 focus:ring-color-0500 focus:outline-none"
      />
    );
  };

  const renderLayout = (tagComponents, inputComponent) => {
    return (
      <span className="container flex flex-row overflow-ellipsis">
        {tagComponents}
        {inputComponent}
      </span>
    );
  };

  const pasteSplit = (data) => {
    return data.split(" ").map((d) => d.trim());
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    if (hasControlledInput()) {
      return;
    }
    setTag(inputValue(props));
  }, []);

  useEffect(() => {
    if (focusedTagIndex !== undefined && prevFocusedTagIndex !== focusedTagIndex) {
      tags.children[focusedTagIndex].focus();
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    if (hasControlledInput()) {
      return;
    }
    if (!inputValue(props)) {
      return;
    }
    setTag(inputValue(props));
    return () => {};
  }, [props]);

  const { value, disabled } = props;

  const tagComponents = value?.map((tag, index) => {
    return renderTag({
      ref: (r) => {
        tag = r;
      },
      key: index,
      "data-index": index,
      tag,
      onRemove: handleRemove,
      disabled,
      getTagDisplayValue: _getTagDisplayValue,
      tabIndex: "-1"
    });
  });

  const inputComponent = renderInput({
    ref: (r) => {
      input = r;
    },
    value: _tag(),
    onPaste: handlePaste,
    onKeyDown: handleKeyDown,
    onChange: handleChange,
    addTag: addTag,
    placeholder: props.placeholder
  });

  return (
    <div ref={div} onClick={handleClick} className="container border rounded hover:border-blue-300 flex flex-row select-none">
      {renderLayout(
        <div className="flex flex-row" ref={tags} onKeyDown={handleKeyDownOnTags}>
          {tagComponents}
        </div>,
        inputComponent
      )}
    </div>
  );
}
