import { ServiceProvider } from '../lib/ServiceProvider';
import { Container } from '../lib/Container';

class MockServiceProvider extends ServiceProvider {
  register(): void {
    // Mock implementation
  }
}

describe('ServiceProvider', () => {
  let app: Container;
  let provider: MockServiceProvider;

  beforeEach(() => {
    app = new Container();
    provider = new MockServiceProvider(app);
  });

  it('should set the app property in the constructor', () => {
    expect(provider['app']).toBe(app);
  });

  it('should call the boot method without errors', () => {
    expect(() => provider.boot()).not.toThrow();
  });
});
