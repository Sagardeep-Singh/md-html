const Editor = ({ label, placeholder, readOnly, value, onChange, id }) => {
  return (
    <div className="form-floating mb-3">
      <textarea id={id} style={{ minHeight: "50vh" }}
        placeholder={placeholder}
        readOnly={readOnly}
        className="form-control bg-white w-100"
        onChange={onChange}
        value={value}></textarea>
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Editor;
