import { Container } from './Container';

/**
 * Abstract base class for service providers.  Service providers are responsible for
 * registering services with the dependency injection container and booting those
 * services when the application starts.
 */
export abstract class ServiceProvider {
	/**
	 * The application container instance.  This is the dependency injection container
	 * that the service provider will register services with.
	 * @protected
	 */
	protected app: Container;

	/**
	 * Creates a new service provider instance.
	 *
	 * @param {Container} app The application container instance.
	 *
	 * @example
	 * ```typescript
	 * class MyServiceProvider extends ServiceProvider {
	 *   constructor(app: Container) {
	 *     super(app);
	 *   }
	 *   register() {
	 *     // ...
	 *   }
	 * }
	 * ```
	 */
	constructor(app: Container) {
		this.app = app;
	}

	/**
	 * Registers services with the container.  This method should be overridden by
	 * child classes to register the services that the provider provides.
	 * @abstract
	 * @returns void
	 *
	 * @example
	 * ```typescript
	 * class MyServiceProvider extends ServiceProvider {
	 *   register() {
	 *     this.app.bind('myService', () => new MyService());
	 *   }
	 * }
	 * ```
	 */
	abstract register(): void;

	/**
	 * Boots the registered services. This method is called after all service providers
	 * have been registered. It can be overridden by child providers to perform
	 * tasks such as registering event listeners or defining routes.
	 * @returns void
	 *
	 * @example
	 * ```typescript
	 * class MyServiceProvider extends ServiceProvider {
	 *   boot() {
	 *     console.log('Booting MyService!');
	 *   }
	 * }
	 * ```
	 */
	boot(): void {
		// Can be overridden by child providers
	}
}
