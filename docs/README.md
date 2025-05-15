**@khapu2906/cosmos**

***

<h1> <span style="color:black;">About</span> <span style="color:gray;">Cosmos</span></h1>
<p align="center">
	<a href="https://github.com/khapu2906/cosmos/actions/workflows/unit-test.yml" alt="github">
		<img src="https://github.com/khapu2906/cosmos/actions/workflows/unit-test.yml/badge.svg" alt="Github " />
	</a>
</p>

This package was developed to provide a simple and flexible Inversion of Control (IoC) container for TypeScript projects.

---

## Install
```bash
npm install @khapu2906/cosmos
#or
yarn add @khapu2906/cosmos
```

## Usage

### Importing Modules

```typescript
import { Container } from "@khapu2906/cosmos";
```

### Initializing the Container

To initialize the container, create an instance of the Container class:

```typescript
const container = new Container();
```

### Binding Services

You can bind services to the container using the `bind` method:

```javascript
container.bind('myService', () => new MyService());
```

### Resolving Services

You can resolve services from the container using the `get` method:

```javascript
const myService = container.get('myService');
```

## Author
* [Kent Phung](https://github.com/khapu2906)
  

## More
* [Main](https://github.com/khapu2906/Cosmos/blob/master/docs/MAIN.md)
  
## Modules

- [Application](_media/README.md)
- [Container](_media/README-1.md)
- [CosmosJS](_media/README-2.md)
- [ServiceProvider](_media/README-3.md)

## License

IoC is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
