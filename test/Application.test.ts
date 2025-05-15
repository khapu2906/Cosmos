import { Application } from '../lib/Application';
import { ServiceProvider } from '../lib/ServiceProvider';

class MockServiceProvider extends ServiceProvider {
  register(): void {
    // Mock implementation
  }

  boot(): void {
    // Mock implementation
  }
}

describe('Application', () => {
  let app: Application;

  beforeEach(() => {
    app = new Application();
  });

  it('should be defined', () => {
    expect(Application).toBeDefined();
  });

  it('should register a service provider', () => {
    const provider = new MockServiceProvider(app);
    const registeredProvider = app.register(provider);
    expect(registeredProvider).toBe(provider);
  });

  it('should boot a service provider', () => {
    const provider = new MockServiceProvider(app);
    const bootSpy = jest.spyOn(provider, 'boot');
    app.register(provider);
    app.boot();
    expect(bootSpy).toHaveBeenCalled();
  });

  it('should determine if the application has been booted', () => {
    expect(app.isBooted()).toBe(false);
    app.boot();
    expect(app.isBooted()).toBe(true);
  });

  it('should register a booting callback', () => {
    const callback = jest.fn();
    app.booting(callback);
    app.boot();
    expect(callback).toHaveBeenCalledWith(app);
  });

  it('should register an onBooted callback', () => {
    const callback = jest.fn();
    app.onBooted(callback);
    app.boot();
    expect(callback).toHaveBeenCalledWith(app);
  });
});
