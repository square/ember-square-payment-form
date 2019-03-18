# Caveats

This addon comes with a few constraints designed to help you provide a great
experience for your customers:

- The form will only re-render if you modify the application ID or location ID
- You must use the form elements yielded by the component, and not custom ones
- Apple Pay buttons will only show up in Safari when Apple Pay is set up on
  the Mac or iOS device; Apple Pay is not compatible with Chrome, Edge,
  Firefox, or Opera browsers

Below, we'll explain why each of these constraints exists.

## Why we only re-render on application or location changes

## Why we require use of yielded form elements

The underlying Payment Form implementation relies on DOM IDs to determine which
placeholder `div`s should be replaced with input fields.

In many cases, this works just fine; however, some people may choose to use the
form in multiple locations inside of their Ember App. To make this addon more
robust, we autogenerate random IDs on a per-form basis and use them to fulfill
the DOM ID requirement of the underlying implementation.

These random IDs are inserted into the yielded form components and referenced by
the parent component. By using the addon as-is, you get this protection by
default and never have to worry about ID conflicts.

## Why we only show Apple Pay on Safari with set up devices

This is a constraint imposed by Apple. The Apple Pay buttons are rendered via
a Safari-specific CSS property; they are not allowed to be rendered by any other
means. Therefore, we can't render them in other browsers.

In addition, clicking the button will only work on devices where Apple Pay
is already set up - so it doesn't make sense to show it on devices where it isn't
set up.

[Apple's Developer Documentation](https://developer.apple.com/documentation/apple_pay_on_the_web/displaying_apple_pay_buttons)
explains more about how it's implemented.