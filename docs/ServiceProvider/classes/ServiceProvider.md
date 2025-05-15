[**@khapu2906/cosmos**](../../README.md)

***

[@khapu2906/cosmos](../../modules.md) / [ServiceProvider](../README.md) / ServiceProvider

# Class: `abstract` ServiceProvider

Defined in: ServiceProvider.ts:8

Abstract base class for service providers.  Service providers are responsible for
registering services with the dependency injection container and booting those
services when the application starts.

## Constructors

### Constructor

> **new ServiceProvider**(`app`): `ServiceProvider`

Defined in: ServiceProvider.ts:33

Creates a new service provider instance.

#### Parameters

##### app

[`Container`](../../Container/classes/Container.md)

The application container instance.

#### Returns

`ServiceProvider`

#### Example

```typescript
class MyServiceProvider extends ServiceProvider {
  constructor(app: Container) {
    super(app);
  }
  register() {
    // ...
  }
}
```

## Properties

### app

> `protected` **app**: [`Container`](../../Container/classes/Container.md)

Defined in: ServiceProvider.ts:14

The application container instance.  This is the dependency injection container
that the service provider will register services with.

## Methods

### boot()

> **boot**(): `void`

Defined in: ServiceProvider.ts:69

Boots the registered services. This method is called after all service providers
have been registered. It can be overridden by child providers to perform
tasks such as registering event listeners or defining routes.

#### Returns

`void`

void

#### Example

```typescript
class MyServiceProvider extends ServiceProvider {
  boot() {
    console.log('Booting MyService!');
  }
}
```

***

### register()

> `abstract` **register**(): `void`

Defined in: ServiceProvider.ts:52

Registers services with the container.  This method should be overridden by
child classes to register the services that the provider provides.

#### Returns

`void`

void

#### Example

```typescript
class MyServiceProvider extends ServiceProvider {
  register() {
    this.app.bind('myService', () => new MyService());
  }
}
```
