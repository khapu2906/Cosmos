[**@khapu2906/cosmos**](../../README.md)

***

[@khapu2906/cosmos](../../modules.md) / [Application](../README.md) / Application

# Class: Application

Defined in: Application.ts:9

The `Application` class extends the `Container` class and represents the core of the
application. It manages service providers, handles the booting process, and provides
lifecycle hooks for running code before and after the application is booted.

## Extends

- [`Container`](../../Container/classes/Container.md)

## Constructors

### Constructor

> **new Application**(): `Application`

#### Returns

`Application`

#### Inherited from

[`Container`](../../Container/classes/Container.md).[`constructor`](../../Container/classes/Container.md#constructor)

## Methods

### addContextualBinding()

> **addContextualBinding**(`concrete`, `abstract`, `implementation`): `void`

Defined in: Container.ts:175

Adds a contextual binding to the container.  This method is called by the
`ContextualBindingBuilder` to register the binding.

#### Parameters

##### concrete

[`Abstract`](../../Container/type-aliases/Abstract.md)

The concrete identifier that represents the context in which the
                binding should be applied.

##### abstract

[`Abstract`](../../Container/type-aliases/Abstract.md)

The abstract identifier (usually a string or symbol) that you want to
                bind a different implementation for in the specified context.

##### implementation

[`Abstract`](../../Container/type-aliases/Abstract.md)

The implementation (a constructor or a service factory function)
                     that should be used when resolving the abstract identifier in the
                     specified context.

#### Returns

`void`

void

#### Inherited from

[`Container`](../../Container/classes/Container.md).[`addContextualBinding`](../../Container/classes/Container.md#addcontextualbinding)

***

### alias()

> **alias**(`abstract`, `alias`): `void`

Defined in: Container.ts:127

Registers an alias for an abstract identifier. This allows you to refer to the same
dependency using multiple names.

#### Parameters

##### abstract

[`Abstract`](../../Container/type-aliases/Abstract.md)

The abstract identifier (usually a string or symbol) that you want to alias.

##### alias

[`Abstract`](../../Container/type-aliases/Abstract.md)

The alias that you want to use to refer to the abstract identifier.

#### Returns

`void`

void

#### Example

```typescript
container.alias('my_service', 'myService');
```

#### Inherited from

[`Container`](../../Container/classes/Container.md).[`alias`](../../Container/classes/Container.md#alias)

***

### bind()

> **bind**\<`T`\>(`abstract`, `concrete`, `shared`): `void`

Defined in: Container.ts:62

Binds an abstract identifier to a concrete implementation or a service factory.
This method allows you to define how an abstract dependency should be resolved.

#### Type Parameters

##### T

`T`

The type of the dependency being bound.

#### Parameters

##### abstract

[`Abstract`](../../Container/type-aliases/Abstract.md)\<`T`\>

The abstract identifier (usually a string or symbol) representing the dependency.

##### concrete

The concrete implementation (a constructor or a service factory function)
                that will be used to resolve the dependency.

[`Constructor`](../../Container/type-aliases/Constructor.md)\<`T`\> | [`ServiceFactory`](../../Container/type-aliases/ServiceFactory.md)\<`T`\>

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

#### Inherited from

[`Container`](../../Container/classes/Container.md).[`bind`](../../Container/classes/Container.md#bind)

***

### boot()

> **boot**(): `void`

Defined in: Application.ts:92

Boots all service providers.

This method boots all registered service providers. It first runs the `bootingCallbacks` callbacks, then boots each service provider, and finally runs the `bootedCallbacks` callbacks.

#### Returns

`void`

void

***

### booting()

> **booting**(`callback`): `void`

Defined in: Application.ts:131

Registers a callback to run before booting.

This method registers a callback function to be executed before the application is booted.

#### Parameters

##### callback

`Function`

The callback function to register.

#### Returns

`void`

void

***

### bootProvider()

> `protected` **bootProvider**(`provider`): `void`

Defined in: Application.ts:82

Boots a service provider.

This method boots the given service provider, calling its `boot` method.

#### Parameters

##### provider

[`ServiceProvider`](../../ServiceProvider/classes/ServiceProvider.md)

The service provider to boot.

#### Returns

`void`

void

***

### flush()

> **flush**(): `void`

Defined in: Container.ts:436

Clears all bindings, instances, and aliases from the container.  This effectively
resets the container to its initial state.

#### Returns

`void`

void

#### Example

```typescript
container.flush(); // Clears the container
```

#### Inherited from

[`Container`](../../Container/classes/Container.md).[`flush`](../../Container/classes/Container.md#flush)

***

### getAlias()

> **getAlias**(`abstract`): [`Abstract`](../../Container/type-aliases/Abstract.md)

Defined in: Container.ts:268

Resolves an alias to its original abstract identifier.  If the given identifier is not
an alias, it is returned as is.  This method recursively resolves aliases until it
reaches the original abstract identifier.

#### Parameters

##### abstract

[`Abstract`](../../Container/type-aliases/Abstract.md)

The abstract identifier (or alias) that you want to resolve.

#### Returns

[`Abstract`](../../Container/type-aliases/Abstract.md)

The original abstract identifier.

#### Example

```typescript
container.alias('my_service', 'myService');
container.getAlias('my_service'); // Returns 'myService'
```

#### Inherited from

[`Container`](../../Container/classes/Container.md).[`getAlias`](../../Container/classes/Container.md#getalias)

***

### getContextualConcrete()

> **getContextualConcrete**(`abstract`, `concrete`): `null` \| [`Abstract`](../../Container/type-aliases/Abstract.md)\<`any`\>

Defined in: Container.ts:192

Retrieves the concrete implementation for an abstract identifier in a specific context.

#### Parameters

##### abstract

[`Abstract`](../../Container/type-aliases/Abstract.md)

The abstract identifier (usually a string or symbol) that you want to
                resolve.

##### concrete

[`Abstract`](../../Container/type-aliases/Abstract.md)

The concrete identifier that represents the context in which you are
                resolving the abstract identifier.

#### Returns

`null` \| [`Abstract`](../../Container/type-aliases/Abstract.md)\<`any`\>

The concrete implementation for the abstract identifier in the specified context,
         or `null` if no contextual binding is found.

#### Inherited from

[`Container`](../../Container/classes/Container.md).[`getContextualConcrete`](../../Container/classes/Container.md#getcontextualconcrete)

***

### has()

> **has**(`abstract`): `boolean`

Defined in: Container.ts:211

Determines whether an abstract identifier has been registered with the container.
This includes bindings, instances, and aliases.

#### Parameters

##### abstract

[`Abstract`](../../Container/type-aliases/Abstract.md)

The abstract identifier (usually a string or symbol) that you want to check.

#### Returns

`boolean`

`true` if the abstract identifier has been registered, `false` otherwise.

#### Example

```typescript
container.has('myService'); // Returns true or false
```

#### Inherited from

[`Container`](../../Container/classes/Container.md).[`has`](../../Container/classes/Container.md#has)

***

### instance()

> **instance**\<`T`\>(`abstract`, `instance`): `void`

Defined in: Container.ts:110

Registers an existing instance with the container, associating it with an abstract identifier.
This is useful when you have an instance that you want to be managed by the container but
don't want the container to create it.

#### Type Parameters

##### T

`T`

The type of the instance being registered.

#### Parameters

##### abstract

[`Abstract`](../../Container/type-aliases/Abstract.md)\<`T`\>

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

#### Inherited from

[`Container`](../../Container/classes/Container.md).[`instance`](../../Container/classes/Container.md#instance)

***

### isBooted()

> **isBooted**(): `boolean`

Defined in: Application.ts:119

Determines whether the application has been booted.

This method returns a boolean indicating whether the application has been booted.

#### Returns

`boolean`

Whether the application has been booted.

***

### isShared()

> **isShared**(`abstract`): `boolean`

Defined in: Container.ts:240

Determines whether an abstract identifier is bound as a singleton.

#### Parameters

##### abstract

[`Abstract`](../../Container/type-aliases/Abstract.md)

The abstract identifier (usually a string or symbol) that you want to check.

#### Returns

`boolean`

`true` if the abstract identifier is bound as a singleton, `false` otherwise.

#### Example

```typescript
container.isShared('myService'); // Returns true or false
```

#### Inherited from

[`Container`](../../Container/classes/Container.md).[`isShared`](../../Container/classes/Container.md#isshared)

***

### make()

> **make**\<`T`\>(`abstract`, `parameters`, `resolving`): `T`

Defined in: Container.ts:291

Resolves an abstract identifier from the container, creating an instance of the
corresponding concrete implementation or retrieving an existing instance.

#### Type Parameters

##### T

`T`

The type of the dependency being resolved.

#### Parameters

##### abstract

[`Abstract`](../../Container/type-aliases/Abstract.md)\<`T`\>

The abstract identifier (usually a string or symbol) that you want to resolve.

##### parameters

`any`[] = `[]`

Optional. An array of parameters to pass to the constructor or factory
                  function when creating an instance.

##### resolving

[`Abstract`](../../Container/type-aliases/Abstract.md)\<`any`\>[] = `[]`

#### Returns

`T`

An instance of the resolved dependency.

#### Example

```typescript
const myService = container.make<MyService>('myService');
```

#### Inherited from

[`Container`](../../Container/classes/Container.md).[`make`](../../Container/classes/Container.md#make)

***

### onBooted()

> **onBooted**(`callback`): `void`

Defined in: Application.ts:146

Registers a callback to run after booting.

This method registers a callback function to be executed after the application has been booted.
If the application is already booted, the callback will be executed immediately.

#### Parameters

##### callback

`Function`

The callback function to register.

#### Returns

`void`

void

***

### register()

> **register**(`provider`): [`ServiceProvider`](../../ServiceProvider/classes/ServiceProvider.md)

Defined in: Application.ts:44

Registers a service provider with the application.

This method allows you to register a service provider, which can be either a class constructor or an instance of a service provider.
If a constructor is provided, it will be instantiated with the application instance.

#### Parameters

##### provider

The service provider to register. It can be either a class constructor or an instance of a service provider.

[`ServiceProvider`](../../ServiceProvider/classes/ServiceProvider.md) | [`Constructor`](../../Container/type-aliases/Constructor.md)\<[`ServiceProvider`](../../ServiceProvider/classes/ServiceProvider.md)\>

#### Returns

[`ServiceProvider`](../../ServiceProvider/classes/ServiceProvider.md)

The registered service provider instance.

***

### singleton()

> **singleton**\<`T`\>(`abstract`, `concrete`): `void`

Defined in: Container.ts:90

Binds an abstract identifier to a concrete implementation as a singleton. This means
that the container will only create one instance of the concrete implementation, and
all subsequent resolutions of the abstract identifier will return the same instance.

#### Type Parameters

##### T

`T`

The type of the dependency being bound.

#### Parameters

##### abstract

[`Abstract`](../../Container/type-aliases/Abstract.md)\<`T`\>

The abstract identifier (usually a string or symbol) representing the dependency.

##### concrete

The concrete implementation (a constructor or a service factory function)
                that will be used to resolve the dependency.

[`Constructor`](../../Container/type-aliases/Constructor.md)\<`T`\> | [`ServiceFactory`](../../Container/type-aliases/ServiceFactory.md)\<`T`\>

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

#### Inherited from

[`Container`](../../Container/classes/Container.md).[`singleton`](../../Container/classes/Container.md#singleton)

***

### when()

> **when**(`concrete`): [`ContextualBindingBuilder`](../../Container/classes/ContextualBindingBuilder.md)

Defined in: Container.ts:158

Begins the definition of a contextual binding.  Contextual bindings allow you to
specify different implementations for an abstract identifier based on the context
in which it is being resolved.

#### Parameters

##### concrete

[`Abstract`](../../Container/type-aliases/Abstract.md)

The concrete identifier that represents the context in which the
                binding should be applied.

#### Returns

[`ContextualBindingBuilder`](../../Container/classes/ContextualBindingBuilder.md)

A `ContextualBindingBuilder` instance that allows you to define the
         abstract identifier and the implementation to use in the specified context.

#### Example

```typescript
class MyComponent {
  constructor(@inject('MyService') private myService: MyService) {}
}

container.when('MyComponent').needs('MyService').give(() => new SpecialMyService());
```

#### Inherited from

[`Container`](../../Container/classes/Container.md).[`when`](../../Container/classes/Container.md#when)
