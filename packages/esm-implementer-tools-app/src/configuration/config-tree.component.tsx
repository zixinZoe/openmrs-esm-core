import React from "react";
import styles from "./configuration.styles.css";
import Accordion, {
  AccordionItem,
} from "carbon-components-react/es/components/Accordion";
import { ConfigTreeForModule } from "./config-tree-for-module.component";

export interface ConfigTreeProps {
  config: Record<string, any>;
}

export function ConfigTree({ config }: ConfigTreeProps) {
  return (
    <div>
      <Accordion align="start">
        {config &&
          Object.keys(config)
            .sort()
            .map((moduleName) => {
              const moduleConfig = config[moduleName];
              return (
                <AccordionItem
                  title={<h6 className={styles.moduleName}>{moduleName}</h6>}
                  className={styles.fullWidthAccordion}
                  key={`accordion-${moduleName}`}
                >
                  <div key={`${moduleName}-config`}>
                    <ConfigTreeForModule
                      config={moduleConfig}
                      moduleName={moduleName}
                    />
                  </div>
                </AccordionItem>
              );
            })}
      </Accordion>
    </div>
  );
}
