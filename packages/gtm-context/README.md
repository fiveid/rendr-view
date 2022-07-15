# @rendr-view/gtm-context

React context to help manage GTM events in React apps.

## Installation

```sh
yarn add @rendr-view/gtm-context
```

## Exports

This library exports three utilites.

- **GTMContext** - the React context
- **GTMHandler** - a component that implements GTMContext.Provider
- **gtmPush** - a standalone utility function that simply pushes to dataLayer

## Usage

`GTMContext` should sit at the top level of your application. It exposes a `push` function to trigger GTM events.

```jsx
<div className="app">
  <GTMHandler event={{ page: "storybook" }}>
    <GTMContext.Consumer>
      {({ push }) => (
        <div>
          <Button.Primary
            onClick={() => {
              push({
                event: "click",
                category: "cta",
                label: "Click me",
              });
            }}
          >
            Click me
          </Button.Primary>
        </div>
      )}
    </GTMContext.Consumer>
  </GTMHandler>
</div>
```

## Implementations

### Capture Clicks

You can optionally set the `captureClicks` prop of `GTMHandler` to `true` to avoid having to manually trigger `push` events. This will cause `GTMHandler` to listen to all click events in the application and trigger a push if the clicked element has the expected data attributes.

```jsx
<div className="app">
  <GTMHandler captureClicks event={{ page: "storybook" }}>
    <div>
      <Button.Primary data-event-type="click" data-event-category="cta" data-event-label="Click me">
        Click me
      </Button.Primary>
    </div>
  </GTMHandler>
</div>
```

Supported data attributes are:

- `data-event-type`
- `data-event-category`
- `data-event-label`
- `data-event-page`
- `data-event-action`
- `data-event-context`
- `data-event-data`

### Default event values

You can pass default event values to `GTMHandler` in the `event` prop. The properties you provide will be used if the target event does not define them itself.

It is possible to nest `GTMHandler` components to supply default event values to specific sections of the app. In such cases, nested GTMHandler's will inherit the default values of parent GTMHandlers.

In the example below, the root GTMHandler has `page: storybook` as a default event property. Clicking the first button will log an event with that value.

The second button is wrapped in its own GTMHandler, which has a default event with `context: content-section`. Clicking the second button will log an event with both `page: storybook` and `context: content-section`, as well as the properties assigned to the button.

If the parent GTMHandler has `mockPushHandler` defined, the child GTMHandler will also inherit this.

```jsx
<div className="app">
  <GTMHandler captureClicks event={{ page: "storybook" }}>
    <div>
      <Typography.Paragraph>Clicking this button will log a GTM event with `page: "storybook"`</Typography.Paragraph>
      <Button.Primary data-event-type="click" data-event-category="cta" data-event-label="Click me">
        Click me
      </Button.Primary>
    </div>
    <div className="mt-12">
      <Typography.Subheading>Content Section</Typography.Subheading>
      <GTMHandler captureClicks event={{ context: "content-section" }}>
        <Typography.Paragraph>Clicking this button will log a GTM event with `page: "storybook"` AND `context: "content-section"`</Typography.Paragraph>
        <Button.Primary data-event-type="click" data-event-category="cta" data-event-label="Click me">
          Click me
        </Button.Primary>
      </GTMHandler>
    </div>
  </GTMHandler>
</div>
```

### Disable event in specific instances

You may need to disable GTM on a specific element when it's used in a certain instancce, but for convenience have added the data attributes in a generic way. You can do this using the `data-event-disable` attribute.

```jsx
<div>
  <GTMHandler captureClicks event={{ page: "storybook" }}>
    <div>
      <Typography.Paragraph>Clicking this button will log a GTM event in the actions tab</Typography.Paragraph>
      <Button.Primary data-event-type="click" data-event-category="cta" data-event-label="Click me">
        Click me
      </Button.Primary>
    </div>
    <div className="mt-12">
      <Typography.Paragraph>Clicking this button will not</Typography.Paragraph>
      <Button.Primary data-event-type="click" data-event-category="cta" data-event-label="Click me" data-event-disable>
        Click me
      </Button.Primary>
    </div>
  </GTMHandler>
</div>
```

## Props

`GTMHandler` is the recommended way to implement `GTMContext`. This component has the following props:

```ts
interface Props {
  containerClassName?: string;
  trackingId?: string;
  captureClicks?: boolean;
  mockPushHandler?: GTMPushFn;
  children: React.ReactNode;
  event?: GTMEventDataset;
  transformer?: GTMEventTransformer;
}
```

### containerClassName

An optional className to pass to the root div in `GTMHandler` that wraps all the children.

### trackingId

You can optionally use `GTMHandler` to set up GTM by passing a tracking ID to this prop. This uses `react-gtm-module` to initialise GTM.

### captureClicks

Set this optional prop to `true` to capture clicks on child elements as described above. If not set to true, you will have to manually call the `GTMContext` `push` function to trigger events.

### mockPushHandler

Replace the default dataLayer.push function with a mock handler of your own (for example, in Storybook you may want to pass `action("gtm")` to this prop).

### event

Default event object (optional). These values will be used unless overridden by the event. Supports the following properties:

```ts
event?: string;
page?: string;
category?: string;
action?: string;
label?: string;
context?: string;
data?: string;
```

### transformer

Optional function to transform the event object before it's pushed to GTM. The function receives the event data in format shown above and returns any object.
