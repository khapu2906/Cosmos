**cosmos**

***

<p align="center">
  <img width="250" src="https://github.com/knfs-jsc/IoC/blob/master/docs/images/logo-background.png?raw=true">
  <br>
</p>

<h1> <span style="color:black;">About</span> <span style="color:gray;">Cosmos</span></h1>

This package was developed to provide a simple and flexible Inversion of Control (IoC) container for TypeScript projects.

---

## Install
```bash
npm install Cosmos
#or
yarn add Cosmos
```

## Usage

### Importing Modules

```javascript
const { Container } = require("cosmos");
```

### Initializing the Container

To initialize the container, create an instance of the Container class:

```javascript
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
* [Main](https://github.com/knfs-jsc/IoC/blob/master/docs/MAIN.md)
  
## License

IoC is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
