import React from "react";

function FormItem(props) {
  const itemValueSection = props.data[props.dataSection];
  let itemValue = {};
  if (itemValueSection !== undefined) {
    itemValue = props.data[props.dataSection][props.dataKey];
  }

  if (itemValueSection === undefined && itemValue === undefined) {
    return <></>;
  }

  const viewField = <span>{itemValue}</span>;
  const editField = (
    <input
      id={props.ident}
      name={props.ident}
      type={props.type}
      onChange={(e) => props.changeHandler(props.dataSection, props.dataKey, e)}
      value={itemValue}
    />
  );

  return (
    <div>
      <label htmlFor={props.ident}>{props.name}: </label>
      {props.editable ? editField : viewField}
    </div>
  );
}

export default FormItem;
