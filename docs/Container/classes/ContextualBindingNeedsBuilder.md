[**cosmos**](../../README.md)

***

[cosmos](../../modules.md) / [Container](../README.md) / ContextualBindingNeedsBuilder

# Class: ContextualBindingNeedsBuilder

Defined in: Container.ts:431

The `ContextualBindingNeedsBuilder` class is a helper class used to define the
implementation for a contextual binding.

## Constructors

### Constructor

> **new ContextualBindingNeedsBuilder**(`container`, `concrete`, `abstract`): `ContextualBindingNeedsBuilder`

Defined in: Container.ts:441

Creates a new `ContextualBindingNeedsBuilder` instance.

#### Parameters

##### container

[`Container`](Container.md)

The dependency injection container.

##### concrete

`string`

The concrete identifier that represents the context in which the
                binding should be applied.

##### abstract

`string`

The abstract identifier (usually a string or symbol) that you want to
                bind a different implementation for in the specified context.

#### Returns

`ContextualBindingNeedsBuilder`

## Methods

### give()

> **give**(`implementation`): `void`

Defined in: Container.ts:456

Specifies the implementation (a constructor or a service factory function) that
should be used when resolving the abstract identifier in the specified context.

#### Parameters

##### implementation

`string`

The implementation (a constructor or a service factory function)
                     that should be used when resolving the abstract identifier in the
                     specified context.

#### Returns

`void`

void
