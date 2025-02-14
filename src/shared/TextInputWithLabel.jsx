function TextInputWithLabel({
  elementId,
  ref,
  value,
  onChange,
  onKeyDown,
  label,
}) {
  return (
    <>
      <label htmlFor={elementId}>{label}</label>
      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </>
  );
}

export default TextInputWithLabel;
