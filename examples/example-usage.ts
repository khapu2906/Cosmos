import { Application } from '../lib/Application';
import { ServiceProvider } from '../lib/ServiceProvider';

// Định nghĩa một interface
interface Logger {
	log(message: string): void;
}

// Hiện thực interface
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
		// Trong thực tế, bạn sẽ viết vào file ở đây
	}
}

// Tạo một service cần Logger
class UserService {
	constructor(private logger: Logger) { }

	createUser(name: string): void {
		this.logger.log(`Creating user: ${name}`);
		// Xử lý tạo user...
	}
}

// Tạo một service provider cho các logger
class LogServiceProvider extends ServiceProvider {
	register(): void {
		// Bind interface Logger vào implementation ConsoleLogger
		this.app.bind<Logger>('logger', ConsoleLogger);

		// Bind một singleton FileLogger với tên khác
		this.app.singleton<Logger>('file.logger', () => new FileLogger('app.log'));

		// Tạo alias
		this.app.alias('logger', 'log');
	}
}

// Tạo service provider cho UserService
class UserServiceProvider extends ServiceProvider {
	register(): void {
		this.app.singleton('user.service', () => {
			// Resolve logger từ container
			const logger = this.app.make<Logger>('logger');
			return new UserService(logger);
		});
	}
}

// Sử dụng contextual binding
class PaymentService {
	constructor(private logger: Logger) { }

	processPayment(amount: number): void {
		this.logger.log(`Processing payment: $${amount}`);
		// Xử lý thanh toán...
	}
}

class PaymentServiceProvider extends ServiceProvider {
	register(): void {
		// Đăng ký PaymentService với FileLogger thay vì ConsoleLogger
		this.app.when('payment.service').needs('logger').give('file.logger');

		this.app.singleton('payment.service', () => {
			// Logger sẽ được resolve dựa trên contextual binding
			const logger = this.app.make<Logger>('logger');
			return new PaymentService(logger);
		});
	}
}

// Khởi tạo ứng dụng
const app = new Application();

// Đăng ký các service provider
app.register(new LogServiceProvider(app));
app.register(new UserServiceProvider(app));
app.register(new PaymentServiceProvider(app));

// Boot ứng dụng
app.boot();

// Sử dụng các service
const userService = app.make<UserService>('user.service');
userService.createUser('John Doe');

const paymentService = app.make<PaymentService>('payment.service');
paymentService.processPayment(100);

// Sử dụng trực tiếp các logger
const logger1 = app.make<Logger>('logger');
logger1.log('Direct logger usage');

const logger2 = app.make<Logger>('log'); // Sử dụng alias
logger2.log('Using logger alias');

const fileLogger = app.make<Logger>('file.logger');
fileLogger.log('Using file logger directly');