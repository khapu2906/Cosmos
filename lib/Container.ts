/// <reference types="reflect-metadata" />
import "reflect-metadata"
export type Constructor<T = any> = new (...args: any[]) => T;
export type ServiceFactory<T = any> = (...args: any[]) => T;
export type Abstract<T = any> = string | symbol | Constructor<T>;

/**
 * The `Container` class is a dependency injection container that manages the creation
 * and resolution of dependencies within an application. It provides methods for binding
 * abstractions to concrete implementations, managing singleton instances, and resolving
 * dependencies with contextual configurations.
 */
export class Container {
	/**
	 * A map that stores the bindings between abstract identifiers and their concrete
	 * implementations or factory functions.
	 * @private
	 */
	private bindings: Map<Abstract, any> = new Map();

	/**
	 * A map that stores singleton instances, associating abstract identifiers with their
	 * resolved instances.
	 * @private
	 */
	private instances: Map<Abstract, any> = new Map();

	/**
	 * A map that stores aliases, allowing an abstract identifier to be referred to by
	 * another name.
	 * @private
	 */
	private aliases: Map<Abstract, Abstract> = new Map();

	/**
	 * A map that stores contextual bindings, allowing different implementations to be
	 * resolved based on the context in which the dependency is being resolved.
	 * @private
	 */
	private contextual: Map<Abstract, Map<Abstract, Abstract>> = new Map();

	/**
	 * Binds an abstract identifier to a concrete implementation or a service factory.
	 * This method allows you to define how an abstract dependency should be resolved.
	 *
	 * @template T The type of the dependency being bound.
	 * @param abstract The abstract identifier (usually a string or symbol) representing the dependency.
	 * @param concrete The concrete implementation (a constructor or a service factory function)
	 *                 that will be used to resolve the dependency.
	 * @param shared Optional. If `true`, the container will manage the instance as a singleton,
	 *               returning the same instance each time the dependency is resolved. Defaults to `false`.
	 * @returns void
	 *
	 * @example
	 * ```typescript
	 * container.bind<MyService>('myService', () => new MyService());
	 * ```
	 * @example
	 * ```typescript
	 * container.bind<MyService>('myService', MyService);
	 * ```
	 */
	bind<T>(abstract: Abstract<T>, concrete: Constructor<T> | ServiceFactory<T>, shared = false): void {
		if (this.bindings.has(abstract)) {
			throw new Error(`Abstract "${String(abstract)}" is already bound.`);
		}

		this.bindings.set(abstract, { concrete, shared });
	}

	/**
	 * Binds an abstract identifier to a concrete implementation as a singleton. This means
	 * that the container will only create one instance of the concrete implementation, and
	 * all subsequent resolutions of the abstract identifier will return the same instance.
	 *
	 * @template T The type of the dependency being bound.
	 * @param abstract The abstract identifier (usually a string or symbol) representing the dependency.
	 * @param concrete The concrete implementation (a constructor or a service factory function)
	 *                 that will be used to resolve the dependency.
	 * @returns void
	 *
	 * @example
	 * ```typescript
	 * container.singleton<MyService>('myService', () => new MyService());
	 * ```
	 *  @example
	 * ```typescript
	 * container.singleton<MyService>('myService', MyService);
	 * ```
	 */
	singleton<T>(abstract: Abstract<T>, concrete: Constructor<T> | ServiceFactory<T>): void {
		this.bind(abstract, concrete, true);
	}

	/**
	 * Registers an existing instance with the container, associating it with an abstract identifier.
	 * This is useful when you have an instance that you want to be managed by the container but
	 * don't want the container to create it.
	 *
	 * @template T The type of the instance being registered.
	 * @param abstract The abstract identifier (usually a string or symbol) representing the dependency.
	 * @param instance The instance to be registered with the container.
	 * @returns void
	 *
	 * @example
	 * ```typescript
	 * const myServiceInstance = new MyService();
	 * container.instance<MyService>('myService', myServiceInstance);
	 * ```
	 */
	instance<T>(abstract: Abstract<T>, instance: T): void {
		this.instances.set(abstract, instance);
	}

	/**
	 * Registers an alias for an abstract identifier. This allows you to refer to the same
	 * dependency using multiple names.
	 *
	 * @param abstract The abstract identifier (usually a string or symbol) that you want to alias.
	 * @param alias The alias that you want to use to refer to the abstract identifier.
	 * @returns void
	 *
	 * @example
	 * ```typescript
	 * container.alias('my_service', 'myService');
	 * ```
	 */
	alias(abstract: Abstract, alias: Abstract): void {
		if (this.aliases.has(alias)) {
			throw new Error(`Alias "${String(alias)}" is already defined.`);
		}

		if (!this.has(abstract)) {
			throw new Error(`Abstract "${String(abstract)}" not bound, cannot create alias.`);
		}

		this.aliases.set(alias, abstract);
	}

	/**
	 * Begins the definition of a contextual binding.  Contextual bindings allow you to
	 * specify different implementations for an abstract identifier based on the context
	 * in which it is being resolved.
	 *
	 * @param concrete The concrete identifier that represents the context in which the
	 *                 binding should be applied.
	 * @returns A `ContextualBindingBuilder` instance that allows you to define the
	 *          abstract identifier and the implementation to use in the specified context.
	 *
	 * @example
	 * ```typescript
	 * class MyComponent {
	 *   constructor(@inject('MyService') private myService: MyService) {}
	 * }
	 *
	 * container.when('MyComponent').needs('MyService').give(() => new SpecialMyService());
	 * ```
	 */
	when(concrete: Abstract): ContextualBindingBuilder {
		return new ContextualBindingBuilder(this, concrete);
	}

	/**
	 * Adds a contextual binding to the container.  This method is called by the
	 * `ContextualBindingBuilder` to register the binding.
	 *
	 * @param concrete The concrete identifier that represents the context in which the
	 *                 binding should be applied.
	 * @param abstract The abstract identifier (usually a string or symbol) that you want to
	 *                 bind a different implementation for in the specified context.
	 * @param implementation The implementation (a constructor or a service factory function)
	 *                      that should be used when resolving the abstract identifier in the
	 *                      specified context.
	 * @returns void
	 */
	addContextualBinding(concrete: Abstract, abstract: Abstract, implementation: Abstract): void {
		if (!this.contextual.has(concrete)) {
			this.contextual.set(concrete, new Map());
		}
		this.contextual.get(concrete)!.set(abstract, implementation);
	}

	/**
	 * Retrieves the concrete implementation for an abstract identifier in a specific context.
	 *
	 * @param abstract The abstract identifier (usually a string or symbol) that you want to
	 *                 resolve.
	 * @param concrete The concrete identifier that represents the context in which you are
	 *                 resolving the abstract identifier.
	 * @returns The concrete implementation for the abstract identifier in the specified context,
	 *          or `null` if no contextual binding is found.
	 */
	getContextualConcrete(abstract: Abstract, concrete: Abstract): Abstract | null {
		if (this.contextual.has(concrete) && this.contextual.get(concrete)!.has(abstract)) {
			return this.contextual.get(concrete)!.get(abstract)!;
		}
		return null;
	}

	/**
	 * Determines whether an abstract identifier has been registered with the container.
	 * This includes bindings, instances, and aliases.
	 *
	 * @param abstract The abstract identifier (usually a string or symbol) that you want to check.
	 * @returns `true` if the abstract identifier has been registered, `false` otherwise.
	 *
	 * @example
	 * ```typescript
	 * container.has('myService'); // Returns true or false
	 * ```
	 */
	has(abstract: Abstract): boolean {
		if (this.bindings.has(abstract) || this.instances.has(abstract) || this.aliases.has(abstract)) {
			return true;
		}

		// Kiểm tra xem có class nào implement interface abstract hay không
		if (typeof abstract === 'function') {
			for (const [key, binding] of Array.from(this.bindings.entries())) {
				if (typeof key === 'symbol') continue
				if (typeof binding.concrete === 'function' && this.isClass(binding.concrete) && abstract.prototype.isPrototypeOf(binding.concrete.prototype)) {
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * Determines whether an abstract identifier is bound as a singleton.
	 *
	 * @param abstract The abstract identifier (usually a string or symbol) that you want to check.
	 * @returns `true` if the abstract identifier is bound as a singleton, `false` otherwise.
	 *
	 * @example
	 * ```typescript
	 * container.isShared('myService'); // Returns true or false
	 * ```
	 */
	isShared(abstract: Abstract): boolean {
		abstract = this.getAlias(abstract);

		if (this.instances.has(abstract)) {
			return true;
		}

		if (!this.bindings.has(abstract)) {
			return false;
		}

		return this.bindings.get(abstract).shared;
	}

	/**
	 * Resolves an alias to its original abstract identifier.  If the given identifier is not
	 * an alias, it is returned as is.  This method recursively resolves aliases until it
	 * reaches the original abstract identifier.
	 *
	 * @param abstract The abstract identifier (or alias) that you want to resolve.
	 * @returns The original abstract identifier.
	 *
	 * @example
	 * ```typescript
	 * container.alias('my_service', 'myService');
	 * container.getAlias('my_service'); // Returns 'myService'
	 * ```
	 */
	getAlias(abstract: Abstract): Abstract {
		if (this.aliases.has(abstract)) {
			return this.getAlias(this.aliases.get(abstract)!);
		}

		return abstract;
	}

	/**
	 * Resolves an abstract identifier from the container, creating an instance of the
	 * corresponding concrete implementation or retrieving an existing instance.
	 *
	 * @template T The type of the dependency being resolved.
	 * @param abstract The abstract identifier (usually a string or symbol) that you want to resolve.
	 * @param parameters Optional. An array of parameters to pass to the constructor or factory
	 *                   function when creating an instance.
	 * @returns An instance of the resolved dependency.
	 *
	 * @example
	 * ```typescript
	 * const myService = container.make<MyService>('myService');
	 * ```
	 */
	make<T>(abstract: Abstract<T>, parameters: any[] = [], resolving: Abstract[] = []): T {
		abstract = this.getAlias(abstract);

		function isConstructor<T>(fn: any): fn is Constructor<T> {
			return fn.prototype !== undefined;
		}

		// Kiểm tra circular dependencies
		if (resolving.includes(abstract)) {
			throw new Error(`Circular dependency detected: ${resolving.map(String).join(' -> ')} -> ${String(abstract)}`);
		}

		// Nếu instance đã tồn tại, trả về nó
		if (this.instances.has(abstract)) {
			return this.instances.get(abstract) as T;
		}

		// Lấy concrete từ binding
		let concrete = this.getConcrete<T>(abstract);

		// Nếu concrete là một abstract khác, resolve nó
		if (typeof concrete !== 'function' && typeof concrete !== 'string' && typeof concrete !== 'symbol') {
			return this.make<T>(concrete, parameters, [...resolving, abstract]);
		}

		// Xác định nếu cần lưu trữ instance cho lần sử dụng tiếp theo
		const needsStore = this.isShared(abstract);

		// Nếu concrete là một factory function
		if (typeof concrete === 'function' && !this.isBuildable(concrete, abstract)) {
			// Gọi factory function hoặc constructor để lấy instance
			let instance: T;

			if (isConstructor(concrete)) {
				instance = new concrete(...parameters);
			} else {
				instance = concrete(...parameters);
			}

			if (needsStore) {
				this.instances.set(abstract, instance);
			}

			return instance as T;
		}

		// Build concrete instance
		const instance = this.build<T>(concrete as Constructor<T>, parameters, [...resolving, abstract]);

		// Lưu instance nếu cần thiết
		if (needsStore) {
			this.instances.set(abstract, instance);
		}

		return instance;
	}

	/**
	 * Retrieves the concrete implementation associated with an abstract identifier.
	 *
	 * @template T The type of the dependency being resolved.
	 * @param abstract The abstract identifier (usually a string or symbol) that you want to resolve.
	 * @returns The concrete implementation (a constructor or a service factory function)
	 *          associated with the abstract identifier.
	 */
	private getConcrete<T>(abstract: Abstract<T>): Constructor<T> | ServiceFactory<T> {
		// Nếu không có binding, trả về abstract
		if (!this.bindings.has(abstract)) {
			return abstract as unknown as Constructor<T>;
		}

		return this.bindings.get(abstract).concrete;
	}

	/**
	 * Determines whether a concrete implementation can be instantiated directly.
	 *
	 * @param concrete The concrete implementation to check.
	 * @param abstract The abstract identifier associated with the concrete implementation.
	 * @returns `true` if the concrete implementation can be instantiated directly, `false` otherwise.
	 */
	private isBuildable(concrete: any, abstract: Abstract): boolean {
		return concrete === abstract || typeof concrete === 'function';
	}

	/**
	 * Creates a new instance of a concrete implementation.
	 *
	 * @template T The type of the instance being created.
	 * @param concrete The constructor of the concrete implementation.
	 * @param parameters Optional. An array of parameters to pass to the constructor.
	 * @returns A new instance of the concrete implementation.
	 */
	private build<T>(concrete: Constructor<T>, parameters: any[] = [], resolving: Abstract[] = []): T {
		// Nếu có tham số được cung cấp, sử dụng chúng
		if (parameters.length > 0) {
			return new concrete(...parameters);
		}

		// Phân tích các phụ thuộc của constructor
		const dependencies = this.resolveDependencies(concrete, resolving);

		return new concrete(...dependencies);
	}

	/**
	 * Resolves the dependencies of a constructor.
	 *
	 * @template T The type of the constructor.
	 * @param concrete The constructor whose dependencies should be resolved.
	 * @returns An array of resolved dependencies.
	 */
	private resolveDependencies<T>(concrete: Constructor<T>, resolving: Abstract[]): any[] {
		// Trong trường hợp thực tế, bạn sẽ cần sử dụng reflection hoặc metadata
		// để lấy thông tin về các phụ thuộc của constructor.
		// TypeScript không có các tính năng này sẵn có, do đó bạn có thể cần
		// sử dụng thư viện như 'reflect-metadata' hoặc triển khai một cơ chế
		// đăng ký các phụ thuộc riêng.
		const paramTypes: any[] = Reflect.getMetadata('design:paramtypes', concrete) || [];

		const dependencies = paramTypes.map((paramType: any) => {
			if (!this.has(paramType)) {
				throw new Error(`Dependency ${String(paramType)} is not bound in the container.`);
			}

			return this.make(paramType, [], resolving);
		});

		return dependencies;
	}
	private isClass(fn: any): boolean {
		return typeof fn === 'function' && /^\s*class\s+/.test(fn.toString());
	}

	/**
	 * Clears all bindings, instances, and aliases from the container.  This effectively
	 * resets the container to its initial state.
	 *
	 * @returns void
	 *
	 * @example
	 * ```typescript
	 * container.flush(); // Clears the container
	 * ```
	 */
	flush(): void {
		this.bindings.clear();
		this.instances.clear();
		this.aliases.clear();
		this.contextual.clear();
	}
}

/**
 * The `ContextualBindingBuilder` class is a helper class used to define contextual bindings
 * within the container.  It allows you to specify different implementations for an abstract
 * identifier based on the context in which it is being resolved.
 */
export class ContextualBindingBuilder {
	/**
	 * Creates a new `ContextualBindingBuilder` instance.
	 *
	 * @param container The dependency injection container.
	 * @param concrete The concrete identifier that represents the context in which the
	 *                 binding should be applied.
	 */
	constructor(
		private container: Container,
		private concrete: Abstract
	) { }

	/**
	 * Specifies the abstract identifier that you want to bind a different implementation
	 * for in the specified context.
	 *
	 * @param abstract The abstract identifier (usually a string or symbol) that you want to
	 *                 bind a different implementation for in the specified context.
	 * @returns A `ContextualBindingNeedsBuilder` instance that allows you to specify the
	 *          implementation to use in the specified context.
	 */
	needs(abstract: Abstract): ContextualBindingNeedsBuilder {
		return new ContextualBindingNeedsBuilder(this.container, this.concrete, abstract);
	}
}

/**
 * The `ContextualBindingNeedsBuilder` class is a helper class used to define the
 * implementation for a contextual binding.
 */
export class ContextualBindingNeedsBuilder {
	/**
	 * Creates a new `ContextualBindingNeedsBuilder` instance.
	 *
	 * @param container The concrete identifier that represents the context in which the
	 *                 binding should be applied.
	 * @param abstract The abstract identifier (usually a string or symbol) that you want to
	 *                 bind a different implementation for in the specified context.
	 */
	constructor(
		private container: Container,
		private concrete: Abstract,
		private abstract: Abstract
	) { }

	/**
	 * Specifies the implementation (a constructor or a service factory function) that
	 * should be used when resolving the abstract identifier in the specified context.
	 *
	 * @param implementation The implementation (a constructor or a service factory function)
	 *                      that should be used when resolving the abstract identifier in the
	 *                      specified context.
	 * @returns void
	 */
	give(implementation: Abstract): void {
		this.container.addContextualBinding(this.concrete, this.abstract, implementation);
	}
}
