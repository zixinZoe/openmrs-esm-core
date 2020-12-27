import React, { useEffect, useState, useRef } from "react";
import { Button, ButtonSet } from "carbon-components-react";
import { Close16, Save16 } from "@carbon/icons-react";
import { ConfigValueDescriptor } from "./editable-value.component";
import { ValueEditorField } from "./value-editors/value-editor-field";
import styles from "./configuration.styles.css";

export type CustomValueType = "add" | "remove" | "order" | "configure";

interface ValueEditorProps {
  element: ConfigValueDescriptor;
  customType?: CustomValueType;
  path: String[];
  handleSave: (val: string) => void;
  handleClose: () => void;
}

export function ValueEditor({
  element,
  customType,
  path,
  handleSave,
  handleClose,
}: ValueEditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tmpValue, setTmpValue] = useState(element._value);

  const valueType = customType ?? element._type;

  const keyListener = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    } else if (e.key === "Enter") {
      handleSave(JSON.stringify(tmpValue));
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", keyListener);
    return () => {
      document.removeEventListener("keyup", keyListener);
    };
  }, [tmpValue]);

  return (
    <div ref={ref} style={{ display: "inherit" }}>
      <ValueEditorField
        element={element}
        path={path}
        value={tmpValue}
        onChange={(v) => setTmpValue(v)}
        valueType={valueType}
      />
      <div className={styles.valueEditorButtons}>
        <Button
          renderIcon={Save16}
          size="small"
          kind="primary"
          iconDescription="Save"
          hasIconOnly
          onClick={() => handleSave(JSON.stringify(tmpValue))}
        />
        <Button
          renderIcon={Close16}
          size="small"
          kind="secondary"
          iconDescription="Cancel"
          hasIconOnly
          onClick={handleClose}
        />
      </div>
    </div>
  );
}
