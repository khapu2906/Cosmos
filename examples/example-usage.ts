import { Application } from '../lib/Application';
import { ServiceProvider } from '../lib/ServiceProvider';

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

class LogServiceProvider extends ServiceProvider {
	register(): void {
		this.app.bind<Logger>('logger', ConsoleLogger);

		this.app.singleton<Logger>('file.logger', () => new FileLogger('app.log'));

		this.app.alias('logger', 'log');
	}
}

class UserServiceProvider extends ServiceProvider {
	register(): void {
		this.app.singleton('user.service', () => {
			const logger = this.app.make<Logger>('logger');
			return new UserService(logger);
		});
	}
}

class PaymentService {
	constructor(private logger: Logger) { }

	processPayment(amount: number): void {
		this.logger.log(`Processing payment: $${amount}`);
	}
}

class PaymentServiceProvider extends ServiceProvider {
	register(): void {
		this.app.when('payment.service').needs('logger').give('file.logger');

		this.app.singleton('payment.service', () => {
			const logger = this.app.make<Logger>('logger');
			return new PaymentService(logger);
		});
	}
}

const app = new Application();

app.register(new LogServiceProvider(app));
app.register(new UserServiceProvider(app));
app.register(new PaymentServiceProvider(app));

app.boot();

const userService = app.make<UserService>('user.service');
userService.createUser('John Doe');

const paymentService = app.make<PaymentService>('payment.service');
paymentService.processPayment(100);

const logger1 = app.make<Logger>('logger');
logger1.log('Direct logger usage');

const logger2 = app.make<Logger>('log');
logger2.log('Using logger alias');

const fileLogger = app.make<Logger>('file.logger');
fileLogger.log('Using file logger directly');