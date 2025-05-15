[**@khapu2906/cosmos**](../../README.md)

***

[@khapu2906/cosmos](../../modules.md) / [Container](../README.md) / ContextualBindingBuilder

# Class: ContextualBindingBuilder

Defined in: Container.ts:450

The `ContextualBindingBuilder` class is a helper class used to define contextual bindings
within the container.  It allows you to specify different implementations for an abstract
identifier based on the context in which it is being resolved.

## Constructors

### Constructor

> **new ContextualBindingBuilder**(`container`, `concrete`): `ContextualBindingBuilder`

Defined in: Container.ts:458

Creates a new `ContextualBindingBuilder` instance.

#### Parameters

##### container

[`Container`](Container.md)

The dependency injection container.

##### concrete

[`Abstract`](../type-aliases/Abstract.md)

The concrete identifier that represents the context in which the
                binding should be applied.

#### Returns

`ContextualBindingBuilder`

## Methods

### needs()

> **needs**(`abstract`): [`ContextualBindingNeedsBuilder`](ContextualBindingNeedsBuilder.md)

Defined in: Container.ts:472

Specifies the abstract identifier that you want to bind a different implementation
for in the specified context.

#### Parameters

##### abstract

[`Abstract`](../type-aliases/Abstract.md)

The abstract identifier (usually a string or symbol) that you want to
                bind a different implementation for in the specified context.

#### Returns

[`ContextualBindingNeedsBuilder`](ContextualBindingNeedsBuilder.md)

A `ContextualBindingNeedsBuilder` instance that allows you to specify the
         implementation to use in the specified context.
