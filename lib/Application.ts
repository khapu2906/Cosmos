import { Container, Constructor } from './Container';
import { ServiceProvider } from './ServiceProvider';

/**
 * The `Application` class extends the `Container` class and represents the core of the
 * application. It manages service providers, handles the booting process, and provides
 * lifecycle hooks for running code before and after the application is booted.
 */
export class Application extends Container {
	/**
	 * Indicates whether the application has been booted.
	 */
	private booted = false;

	/**
	 * An array of callback functions to be executed before the application is booted.
	 */
	private bootingCallbacks: Array<Function> = [];

	/**
	 * An array of callback functions to be executed after the application has been booted.
	 */
	private bootedCallbacks: Array<Function> = [];

	/**
	 * An array of registered service providers.
	 */
	private serviceProviders: Array<ServiceProvider> = [];

	/**
	 * A map to track whether a service provider has been loaded, preventing duplicate loading.
	 */
	private loadedProviders: Map<string, boolean> = new Map();

	/**
	 * Registers a service provider with the application.
	 *
	 * This method allows you to register a service provider, which can be either a class constructor or an instance of a service provider.
	 * If a constructor is provided, it will be instantiated with the application instance.
	 *
	 * @param {Constructor<ServiceProvider> | ServiceProvider} provider The service provider to register. It can be either a class constructor or an instance of a service provider.
	 * @returns {ServiceProvider} The registered service provider instance.
	 *
	 * @example
	 * ```typescript
	 * class MyServiceProvider extends ServiceProvider {
	 *   register() {
	 *     this.app.bind('myService', () => new MyService());
	 *   }
	 * }
	 *
	 * const app = new Application();
	 * const provider = app.register(MyServiceProvider); // Registering the provider
	 * ```
	 *
	 * @example
	 * ```typescript
	 * const app = new Application();
	 * const provider = new MyServiceProvider(app);
	 * app.register(provider); // Registering an instance
	 * ```
	 */
	register(provider: Constructor<ServiceProvider> | ServiceProvider): ServiceProvider {
		// If the provider is a constructor, instantiate it
		if (typeof provider === 'function') {
			provider = new provider(this);
		}

		const name = provider.constructor.name;

		// Check if the provider has already been registered
		if (this.loadedProviders.has(name)) {
			return provider;
		}

		// Mark the provider as registered
		this.loadedProviders.set(name, true);

		// Register the provider's services
		provider.register();

		// Save the provider for booting later
		this.serviceProviders.push(provider);

		// Boot the provider if the application has already been booted
		if (this.booted) {
			this.bootProvider(provider);
		}

		return provider;
	}

	/**
	 * Boots a service provider.
	 *
	 * This method boots the given service provider, calling its `boot` method.
	 *
	 * @param {ServiceProvider} provider The service provider to boot.
	 * @returns void
	 *
	 * @example
	 * ```typescript
	 * class MyServiceProvider extends ServiceProvider {
	 *   register() {
	 *     // ...
	 *   }
	 *   boot() {
	 *     console.log('MyServiceProvider is booting!');
	 *   }
	 * }
	 *
	 * const app = new Application();
	 * const provider = app.register(MyServiceProvider);
	 * app.boot(); // This will call MyServiceProvider's boot method.
	 * ```
	 */
	protected bootProvider(provider: ServiceProvider): void {
		provider.boot();
	}

	/**
	 * Boots all service providers.
	 *
	 * This method boots all registered service providers. It first runs the `bootingCallbacks` callbacks, then boots each service provider, and finally runs the `bootedCallbacks` callbacks.
	 * @returns void
	 *
	 * @example
	 * ```typescript
	 * const app = new Application();
	 * app.register(MyServiceProvider);
	 * app.booting(() => {
	 *   console.log('Application is booting...');
	 * });
	 * app.booted(() => {
	 *   console.log('Application has booted!');
	 * });
	 * app.boot(); // Boots all registered service providers.
	 * ```
	 */
	boot(): void {
		if (this.booted) {
			return;
		}

		// Run the bootingCallbacks callbacks
		this.fireAppCallbacks(this.bootingCallbacks);

		// Boot all service providers
		this.serviceProviders.forEach(provider => {
			this.bootProvider(provider);
		});

		// Mark the application as booted
		this.booted = true;

		// Run the bootedCallbacks callbacks
		this.fireAppCallbacks(this.bootedCallbacks);
	}

	/**
	 * Determines whether the application has been booted.
	 *
	 * This method returns a boolean indicating whether the application has been booted.
	 *
	 * @returns {boolean} Whether the application has been booted.
	 *
	 * @example
	 * ```typescript
	 * const app = new Application();
	 * console.log(app.isBooted()); // Output: false
	 * app.boot();
	 * console.log(app.isBooted()); // Output: true
	 * ```
	 */
	isBooted(): boolean {
		return this.booted;
	}

	/**
	 * Registers a callback to run before booting.
	 *
	 * This method registers a callback function to be executed before the application is booted.
	 *
	 * @param {Function} callback The callback function to register.
	 * @returns void
	 *
	 * @example
	 * ```typescript
	 * const app = new Application();
	 * app.booting(() => {
	 *   console.log('Application is about to boot!');
	 * });
	 * app.boot(); // Executes the booting callback before booting providers.
	 * ```
	 */
	booting(callback: Function): void {
		this.bootingCallbacks.push(callback);
	}

	/**
	 * Registers a callback to run after booting.
	 *
	 * This method registers a callback function to be executed after the application has been booted.
	 * If the application is already booted, the callback will be executed immediately.
	 *
	 * @param {Function} callback The callback function to register.
	 * @returns void
	 *
	 * @example
	 * ```typescript
	 * const app = new Application();
	 * app.onBooted(() => {
	 *   console.log('Application has finished booting!');
	 * });
	 * app.boot(); // Executes the booted callback after booting providers.
	 * ```
	 */
	onBooted(callback: Function): void {
		this.bootedCallbacks.push(callback);

		if (this.isBooted()) {
			callback(this);
		}
	}

	/**
	 * Fires the registered callbacks.
	 *
	 * This method iterates over the provided array of callback functions and executes each one with the application instance as the argument.
	 *
	 * @param {Array<Function>} callbacks The callbacks to fire.
	 * @returns void
	 */
	private fireAppCallbacks(callbacks: Array<Function>): void {
		callbacks.forEach(callback => {
			callback(this);
		});
	}
}
