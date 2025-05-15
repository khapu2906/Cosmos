[**@khapu2906/cosmos**](../../README.md)

***

[@khapu2906/cosmos](../../modules.md) / [Container](../README.md) / Container

# Class: Container

Defined in: Container.ts:13

The `Container` class is a dependency injection container that manages the creation
and resolution of dependencies within an application. It provides methods for binding
abstractions to concrete implementations, managing singleton instances, and resolving
dependencies with contextual configurations.

## Extended by

- [`Application`](../../Application/classes/Application.md)

## Constructors

### Constructor

> **new Container**(): `Container`

#### Returns

`Container`

## Methods

### addContextualBinding()

> **addContextualBinding**(`concrete`, `abstract`, `implementation`): `void`

Defined in: Container.ts:176

Adds a contextual binding to the container.  This method is called by the
`ContextualBindingBuilder` to register the binding.

#### Parameters

##### concrete

[`Abstract`](../type-aliases/Abstract.md)

The concrete identifier that represents the context in which the
                binding should be applied.

##### abstract

[`Abstract`](../type-aliases/Abstract.md)

The abstract identifier (usually a string or symbol) that you want to
                bind a different implementation for in the specified context.

##### implementation

[`Abstract`](../type-aliases/Abstract.md)

The implementation (a constructor or a service factory function)
                     that should be used when resolving the abstract identifier in the
                     specified context.

#### Returns

`void`

void

***

### alias()

> **alias**(`abstract`, `alias`): `void`

Defined in: Container.ts:128

Registers an alias for an abstract identifier. This allows you to refer to the same
dependency using multiple names.

#### Parameters

##### abstract

[`Abstract`](../type-aliases/Abstract.md)

The abstract identifier (usually a string or symbol) that you want to alias.

##### alias

[`Abstract`](../type-aliases/Abstract.md)

The alias that you want to use to refer to the abstract identifier.

#### Returns

`void`

void

#### Example

```typescript
container.alias('my_service', 'myService');
```

***

### bind()

> **bind**\<`T`\>(`abstract`, `concrete`, `shared`): `void`

Defined in: Container.ts:63

Binds an abstract identifier to a concrete implementation or a service factory.
This method allows you to define how an abstract dependency should be resolved.

#### Type Parameters

##### T

`T`

The type of the dependency being bound.

#### Parameters

##### abstract

[`Abstract`](../type-aliases/Abstract.md)\<`T`\>

The abstract identifier (usually a string or symbol) representing the dependency.

##### concrete

The concrete implementation (a constructor or a service factory function)
                that will be used to resolve the dependency.

[`Constructor`](../type-aliases/Constructor.md)\<`T`\> | [`ServiceFactory`](../type-aliases/ServiceFactory.md)\<`T`\>

##### shared

`boolean` = `false`

Optional. If `true`, the container will manage the instance as a singleton,
              returning the same instance each time the dependency is resolved. Defaults to `false`.

#### Returns

`void`

void

#### Examples

```typescript
container.bind<MyService>('myService', () => new MyService());
```

```typescript
container.bind<MyService>('myService', MyService);
```

***

### flush()

> **flush**(): `void`

Defined in: Container.ts:437

Clears all bindings, instances, and aliases from the container.  This effectively
resets the container to its initial state.

#### Returns

`void`

void

#### Example

```typescript
container.flush(); // Clears the container
```

***

### getAlias()

> **getAlias**(`abstract`): [`Abstract`](../type-aliases/Abstract.md)

Defined in: Container.ts:269

Resolves an alias to its original abstract identifier.  If the given identifier is not
an alias, it is returned as is.  This method recursively resolves aliases until it
reaches the original abstract identifier.

#### Parameters

##### abstract

[`Abstract`](../type-aliases/Abstract.md)

The abstract identifier (or alias) that you want to resolve.

#### Returns

[`Abstract`](../type-aliases/Abstract.md)

The original abstract identifier.

#### Example

```typescript
container.alias('my_service', 'myService');
container.getAlias('my_service'); // Returns 'myService'
```

***

### getContextualConcrete()

> **getContextualConcrete**(`abstract`, `concrete`): `null` \| [`Abstract`](../type-aliases/Abstract.md)\<`any`\>

Defined in: Container.ts:193

Retrieves the concrete implementation for an abstract identifier in a specific context.

#### Parameters

##### abstract

[`Abstract`](../type-aliases/Abstract.md)

The abstract identifier (usually a string or symbol) that you want to
                resolve.

##### concrete

[`Abstract`](../type-aliases/Abstract.md)

The concrete identifier that represents the context in which you are
                resolving the abstract identifier.

#### Returns

`null` \| [`Abstract`](../type-aliases/Abstract.md)\<`any`\>

The concrete implementation for the abstract identifier in the specified context,
         or `null` if no contextual binding is found.

***

### has()

> **has**(`abstract`): `boolean`

Defined in: Container.ts:212

Determines whether an abstract identifier has been registered with the container.
This includes bindings, instances, and aliases.

#### Parameters

##### abstract

[`Abstract`](../type-aliases/Abstract.md)

The abstract identifier (usually a string or symbol) that you want to check.

#### Returns

`boolean`

`true` if the abstract identifier has been registered, `false` otherwise.

#### Example

```typescript
container.has('myService'); // Returns true or false
```

***

### instance()

> **instance**\<`T`\>(`abstract`, `instance`): `void`

Defined in: Container.ts:111

Registers an existing instance with the container, associating it with an abstract identifier.
This is useful when you have an instance that you want to be managed by the container but
don't want the container to create it.

#### Type Parameters

##### T

`T`

The type of the instance being registered.

#### Parameters

##### abstract

[`Abstract`](../type-aliases/Abstract.md)\<`T`\>

The abstract identifier (usually a string or symbol) representing the dependency.

##### instance

`T`

The instance to be registered with the container.

#### Returns

`void`

void

#### Example

```typescript
const myServiceInstance = new MyService();
container.instance<MyService>('myService', myServiceInstance);
```

***

### isShared()

> **isShared**(`abstract`): `boolean`

Defined in: Container.ts:241

Determines whether an abstract identifier is bound as a singleton.

#### Parameters

##### abstract

[`Abstract`](../type-aliases/Abstract.md)

The abstract identifier (usually a string or symbol) that you want to check.

#### Returns

`boolean`

`true` if the abstract identifier is bound as a singleton, `false` otherwise.

#### Example

```typescript
container.isShared('myService'); // Returns true or false
```

***

### make()

> **make**\<`T`\>(`abstract`, `parameters`, `resolving`): `T`

Defined in: Container.ts:292

Resolves an abstract identifier from the container, creating an instance of the
corresponding concrete implementation or retrieving an existing instance.

#### Type Parameters

##### T

`T`

The type of the dependency being resolved.

#### Parameters

##### abstract

[`Abstract`](../type-aliases/Abstract.md)\<`T`\>

The abstract identifier (usually a string or symbol) that you want to resolve.

##### parameters

`any`[] = `[]`

Optional. An array of parameters to pass to the constructor or factory
                  function when creating an instance.

##### resolving

[`Abstract`](../type-aliases/Abstract.md)\<`any`\>[] = `[]`

#### Returns

`T`

An instance of the resolved dependency.

#### Example

```typescript
const myService = container.make<MyService>('myService');
```

***

### singleton()

> **singleton**\<`T`\>(`abstract`, `concrete`): `void`

Defined in: Container.ts:91

Binds an abstract identifier to a concrete implementation as a singleton. This means
that the container will only create one instance of the concrete implementation, and
all subsequent resolutions of the abstract identifier will return the same instance.

#### Type Parameters

##### T

`T`

The type of the dependency being bound.

#### Parameters

##### abstract

[`Abstract`](../type-aliases/Abstract.md)\<`T`\>

The abstract identifier (usually a string or symbol) representing the dependency.

##### concrete

The concrete implementation (a constructor or a service factory function)
                that will be used to resolve the dependency.

[`Constructor`](../type-aliases/Constructor.md)\<`T`\> | [`ServiceFactory`](../type-aliases/ServiceFactory.md)\<`T`\>

#### Returns

`void`

void

#### Examples

```typescript
container.singleton<MyService>('myService', () => new MyService());
```

```typescript
container.singleton<MyService>('myService', MyService);
```

***

### when()

> **when**(`concrete`): [`ContextualBindingBuilder`](ContextualBindingBuilder.md)

Defined in: Container.ts:159

Begins the definition of a contextual binding.  Contextual bindings allow you to
specify different implementations for an abstract identifier based on the context
in which it is being resolved.

#### Parameters

##### concrete

[`Abstract`](../type-aliases/Abstract.md)

The concrete identifier that represents the context in which the
                binding should be applied.

#### Returns

[`ContextualBindingBuilder`](ContextualBindingBuilder.md)

A `ContextualBindingBuilder` instance that allows you to define the
         abstract identifier and the implementation to use in the specified context.

#### Example

```typescript
class MyComponent {
  constructor(@inject('MyService') private myService: MyService) {}
}

container.when('MyComponent').needs('MyService').give(() => new SpecialMyService());
```
