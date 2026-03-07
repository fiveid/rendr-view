# @rendr-view/gtm-context

A powerful React context and handler system for managing Google Tag Manager (GTM) events with support for automatic click capturing and nested default event values.

## 1. Metadata

- **Package Name:** `@rendr-view/gtm-context`
- **Description:** A robust GTM event management system for React.
- **Category:** Logic / Logic

## 2. API Design

### Exports

- `GTMContext` (Default): The React context.
- `GTMHandler`: The primary provider component with automatic click capture support.
- `gtmPush`: Standalone utility for pushing to `dataLayer`.

### GTMHandler Props

```ts
interface Props {
  captureClicks?: boolean; // Automatically track clicks with data attributes
  event?: GTMEventDataset; // Default event data for all nested pushes
  mockPushHandler?: GTMPushFn; // Custom logger for dev/testing
  transformer?: GTMEventTransformer; // Modify event data before push
}
```

## 3. Implementation Details

- **Nested Defaults:** `GTMHandler` components can be nested; children inherit and merge default event values from parents.
- **Click Capture:** When `captureClicks` is enabled, any element with `data-event-*` attributes will trigger a GTM push on click.

## 4. Usage Example

### Basic Setup

```tsx
import { GTMHandler } from "@rendr-view/gtm-context";

function App() {
  return (
    <GTMHandler event={{ page: "home" }} captureClicks>
      <button
        data-event-type="click"
        data-event-category="cta"
        data-event-label="Sign Up"
      >
        Register Now
      </button>
    </GTMHandler>
  );
}
```

### Manual Push

```tsx
import { useContext } from "react";
import GTMContext from "@rendr-view/gtm-context";

function CustomButton() {
  const { push } = useContext(GTMContext);

  return (
    <button onClick={() => push({ event: "form_submit", status: "success" })}>
      Submit
    </button>
  );
}
```
