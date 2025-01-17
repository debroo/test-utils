import {
  ComponentHarness,
  ComponentHarnessConstructor,
} from '@angular/cdk/testing';

import { CypressHarnessEnvironment } from './cypress-harness-environment';
import {
  addHarnessMethodsToChainer,
  ChainableHarness,
  getDocumentRoot,
} from './internals';

export function getRootHarness<HARNESS extends ComponentHarness>(
  harnessType: ComponentHarnessConstructor<HARNESS>
) {
  /* Create a local variable so `pipe` can log name. */
  const getRootHarness = ($documentRoot: JQuery<Element>) => {
    const documentRoot = $documentRoot.get(0);
    const rootEl =
      /* This is the selector when using `@jscutlery/cypress-mount>=0.5.0` (real app bootstrap). */
      documentRoot.querySelector('#root') ??
      /* This is the selector when using `@jscutlery/cypress-mount<0.5.0` (TestBed). */
      documentRoot.querySelector('#root0');
    return new harnessType(
      new CypressHarnessEnvironment(rootEl, {
        documentRoot,
      })
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Proxy<ChainableHarness<HARNESS>>({} as any, {
    get: (_target, prop) =>
      addHarnessMethodsToChainer(getDocumentRoot().pipe(getRootHarness))[prop],
  });
}
