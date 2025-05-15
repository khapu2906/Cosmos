[**@khapu2906/cosmos**](../../README.md)

***

[@khapu2906/cosmos](../../modules.md) / [Container](../README.md) / ContextualBindingNeedsBuilder

# Class: ContextualBindingNeedsBuilder

Defined in: Container.ts:481

The `ContextualBindingNeedsBuilder` class is a helper class used to define the
implementation for a contextual binding.

## Constructors

### Constructor

> **new ContextualBindingNeedsBuilder**(`container`, `concrete`, `abstract`): `ContextualBindingNeedsBuilder`

Defined in: Container.ts:490

Creates a new `ContextualBindingNeedsBuilder` instance.

#### Parameters

##### container

[`Container`](Container.md)

The concrete identifier that represents the context in which the
                binding should be applied.

##### concrete

[`Abstract`](../type-aliases/Abstract.md)

##### abstract

[`Abstract`](../type-aliases/Abstract.md)

The abstract identifier (usually a string or symbol) that you want to
                bind a different implementation for in the specified context.

#### Returns

`ContextualBindingNeedsBuilder`

## Methods

### give()

> **give**(`implementation`): `void`

Defined in: Container.ts:505

Specifies the implementation (a constructor or a service factory function) that
should be used when resolving the abstract identifier in the specified context.

#### Parameters

##### implementation

[`Abstract`](../type-aliases/Abstract.md)

The implementation (a constructor or a service factory function)
                     that should be used when resolving the abstract identifier in the
                     specified context.

#### Returns

`void`

void
