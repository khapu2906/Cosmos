import 'reflect-metadata'; // Import để sử dụng reflect-metadata
import { Application } from '../lib/Application';
import { ServiceProvider } from '../lib/ServiceProvider';

// Định nghĩa token cho PaymentGateway
const PAYMENT_GATEWAY = Symbol('PAYMENT_GATEWAY');

// Định nghĩa các interface và class
interface Logger {
	log(message: string): void;
}

class ConsoleLogger implements Logger {
	log(message: string): void {
		console.log(`[ConsoleLogger] ${message}`);
	}
}

class FileLogger implements Logger {
	private filename: string;

	constructor(filename: string) {
		this.filename = filename;
	}

	log(message: string): void {
		console.log(`[FileLogger] Writing to ${this.filename}: ${message}`);
	}
}

class UserService {
	constructor(private logger: Logger) { }

	createUser(name: string): void {
		this.logger.log(`Creating user: ${name}`);
	}
}

//payment
interface PaymentGateway {
	processPayment(amount: number): void;
}

class PaypalGateway implements PaymentGateway {
	processPayment(amount: number): void {
		console.log(`[PaypalGateway] Processing payment: ${amount}`);
	}
}

class StripeGateway implements PaymentGateway {
	processPayment(amount: number): void {
		console.log(`[StripeGateway] Processing payment: ${amount}`);
	}
}

class OrderService {
	constructor(private paymentGateway: PaymentGateway, private logger: Logger) { }

	createOrder(amount: number): void {
		this.paymentGateway.processPayment(amount);
		this.logger.log(`Order created with amount: ${amount}`);
	}
}

// Định nghĩa các Service Provider
class LogServiceProvider extends ServiceProvider {
	register(): void {
		// Binding thông thường
		this.app.bind<Logger>('logger', ConsoleLogger);

		// Binding FileLogger (không phải singleton)
		this.app.bind<Logger>('file.logger', () => new FileLogger('app.log'));

		// Alias
		this.app.alias('logger', 'log');
	}
}

class UserServiceProvider extends ServiceProvider {
	register(): void {
		// Binding UserService (không phải singleton)
		this.app.bind('user.service', () => {
			const logger = this.app.make<Logger>('logger');
			return new UserService(logger);
		});
	}
}

class PaymentServiceProvider extends ServiceProvider {
	register(): void {
		// Contextual binding
		this.app.when(OrderService).needs(PAYMENT_GATEWAY).give(PaypalGateway);

		// Binding PaymentGateway (không phải singleton)
		this.app.bind<PaymentGateway>(PAYMENT_GATEWAY, StripeGateway);

		this.app.bind('order.service', () => {
			const paymentGateway = this.app.make<PaymentGateway>(PAYMENT_GATEWAY);
			const logger = this.app.make<Logger>('logger');
			return new OrderService(paymentGateway, logger);
		});
	}
}

// Tạo và cấu hình Application
const app = new Application();

// Đăng ký các Service Provider
app.register(new LogServiceProvider(app));
app.register(new UserServiceProvider(app));
app.register(new PaymentServiceProvider(app));

// Boot Application
app.boot();

// Sử dụng các service
const userService = app.make<UserService>('user.service');
userService.createUser('John Doe');

const orderService = app.make<OrderService>('order.service');
orderService.createOrder(100);

const logger1 = app.make<Logger>('logger');
logger1.log('Direct logger usage');

const logger2 = app.make<Logger>('log');
logger2.log('Using logger alias');

const fileLogger = app.make<Logger>('file.logger');
fileLogger.log('Using file logger directly');

const paymentGateway = app.make<PaymentGateway>(PAYMENT_GATEWAY);
paymentGateway.processPayment(200);
