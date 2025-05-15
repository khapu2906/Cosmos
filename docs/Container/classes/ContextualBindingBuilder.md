[**cosmos**](../../README.md)

***

[cosmos](../../modules.md) / [Container](../README.md) / ContextualBindingBuilder

# Class: ContextualBindingBuilder

Defined in: Container.ts:400

The `ContextualBindingBuilder` class is a helper class used to define contextual bindings
within the container.  It allows you to specify different implementations for an abstract
identifier based on the context in which it is being resolved.

## Constructors

### Constructor

> **new ContextualBindingBuilder**(`container`, `concrete`): `ContextualBindingBuilder`

Defined in: Container.ts:408

Creates a new `ContextualBindingBuilder` instance.

#### Parameters

##### container

[`Container`](Container.md)

The dependency injection container.

##### concrete

`string`

The concrete identifier that represents the context in which the
                binding should be applied.

#### Returns

`ContextualBindingBuilder`

## Methods

### needs()

> **needs**(`abstract`): [`ContextualBindingNeedsBuilder`](ContextualBindingNeedsBuilder.md)

Defined in: Container.ts:422

Specifies the abstract identifier that you want to bind a different implementation
for in the specified context.

#### Parameters

##### abstract

`string`

The abstract identifier (usually a string or symbol) that you want to
                bind a different implementation for in the specified context.

#### Returns

[`ContextualBindingNeedsBuilder`](ContextualBindingNeedsBuilder.md)

A `ContextualBindingNeedsBuilder` instance that allows you to specify the
         implementation to use in the specified context.
