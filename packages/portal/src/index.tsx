import React from "react";
import ReactDOM from "react-dom";

export interface Props {
  children: React.ReactNode;
  className?: string;
  el?: string;
  id?: string;
}

const Portal: React.ComponentType<Props> = ({
  children,
  className = "root-portal",
  el = "div",
  id
}: Props) => {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const container = document.createElement(el);
    container.classList.add(className);

    if (id) {
      const existingContainer = document.getElementById(id);

      if (existingContainer) {
        existingContainer.remove();
      }

      container.id = id;
    }

    setContainer(container);

    document.body.appendChild(container);

    return () => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    };
  }, []);

  if (!container) {
    return null;
  }

  return ReactDOM.createPortal(children, container);
};

export default Portal;
