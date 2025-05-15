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
	 * A set to track whether a service provider has been loaded, preventing duplicate loading.
	 */
	private loadedProviders: Set<string> = new Set();

	/**
	 * Registers a service provider with the application.
	 *
	 * This method allows you to register a service provider, which can be either a class constructor or an instance of a service provider.
	 * If a constructor is provided, it will be instantiated with the application instance.
	 *
	 * @param {Constructor<ServiceProvider> | ServiceProvider} provider The service provider to register. It can be either a class constructor or an instance of a service provider.
	 * @returns {ServiceProvider} The registered service provider instance.
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
		this.loadedProviders.add(name);

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
	 */
	protected bootProvider(provider: ServiceProvider): void {
		provider.boot();
	}

	/**
	 * Boots all service providers.
	 *
	 * This method boots all registered service providers. It first runs the `bootingCallbacks` callbacks, then boots each service provider, and finally runs the `bootedCallbacks` callbacks.
	 * @returns void
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
	 */
	booting(callback: Function): void {
		if (!this.bootingCallbacks.includes(callback)) {
			this.bootingCallbacks.push(callback);
		}
	}

	/**
	 * Registers a callback to run after booting.
	 *
	 * This method registers a callback function to be executed after the application has been booted.
	 * If the application is already booted, the callback will be executed immediately.
	 *
	 * @param {Function} callback The callback function to register.
	 * @returns void
	 */
	onBooted(callback: Function): void {
		if (!this.bootedCallbacks.includes(callback)) {
			this.bootedCallbacks.push(callback);
		}

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
		callbacks.forEach((callback: Function) => { // Thêm type cho callback
			callback(this);
		});
	}
}
