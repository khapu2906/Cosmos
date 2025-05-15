import { Container } from '../lib/Container';

describe('Container', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  it('should be defined', () => {
    expect(Container).toBeDefined();
  });

  it('should bind an abstract to a concrete', () => {
    const abstract = 'testAbstract';
    const concrete = class TestConcrete {};
    container.bind(abstract, concrete);
    expect(container.has(abstract)).toBe(true);
  });

  it('should bind a singleton', () => {
    const abstract = 'testSingleton';
    const concrete = class TestSingleton {};
    container.singleton(abstract, concrete);
    expect(container.isShared(abstract)).toBe(true);
  });

  it('should bind an instance', () => {
    const abstract = 'testInstance';
    const instance = {};
    container.instance(abstract, instance);
    expect(container.has(abstract)).toBe(true);
  });

  it('should register an alias', () => {
    const abstract = 'testAbstract';
    const alias = 'testAlias';
    container.alias(abstract, alias);
    expect(container.getAlias(alias)).toBe(abstract);
  });

  it('should add and get a contextual binding', () => {
    const concrete = 'testConcrete';
    const abstract = 'testAbstract';
    const implementation = 'testImplementation';
    container.addContextualBinding(concrete, abstract, implementation);
    expect(container.getContextualConcrete(abstract, concrete)).toBe(implementation);
  });

  it('should determine if an abstract is registered', () => {
    const abstract = 'testAbstract';
    expect(container.has(abstract)).toBe(false);
    container.bind(abstract, class TestConcrete {});
    expect(container.has(abstract)).toBe(true);
  });

  it('should determine if an abstract is shared', () => {
    const abstract = 'testAbstract';
    expect(container.isShared(abstract)).toBe(false);
    container.singleton(abstract, class TestSingleton {});
    expect(container.isShared(abstract)).toBe(true);
  });

  it('should get the alias of an abstract', () => {
    const abstract = 'testAbstract';
    const alias = 'testAlias';
    container.alias(abstract, alias);
    expect(container.getAlias(alias)).toBe(abstract);
    expect(container.getAlias(abstract)).toBe(abstract);
  });

  it('should make an instance of an abstract', () => {
    const abstract = 'testAbstract';
    container.bind(abstract, TestConcrete);
    const instance = container.make<TestConcrete>(abstract);
    expect(instance.value).toBe('test');
  });

  it('should flush the container', () => {
    const abstract = 'testAbstract';
    container.bind(abstract, class TestConcrete {});
    container.instance(abstract, {});
    container.alias(abstract, 'testAlias');
    container.addContextualBinding('testConcrete', abstract, 'testImplementation');
    container.flush();
    expect(container.has(abstract)).toBe(false);
    expect(container.getContextualConcrete(abstract, 'testConcrete')).toBe(null);
  });

  it('should resolve dependencies', () => {
    const dependencies = container['resolveDependencies'](TestConcrete);
    expect(dependencies).toEqual([]);
  });
});

class TestConcrete {
  value: string;
  constructor() {
    this.value = 'test';
  }
}
