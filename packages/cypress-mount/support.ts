/// <reference types="cypress"/>

/**
 * @hack fixes dependency injection in JIT
 */
import 'reflect-metadata';

/**
 * @hack we have to import `zone.js/dist/zone-testing`.
 * This is due to implicit call to `resetFakeAsyncZone()`
 * in `@angular/core/testing`.
 * Cf. https://github.com/jscutlery/test-utils/issues/2
 */
import 'zone.js/dist/zone';

/**
 * @hack fixes "Mocha has already been patched with Zone" error.
 */
(globalThis as unknown)['Mocha']['__zone_patch__'] = false;
import 'zone.js/dist/zone-testing';

/**
 * @see {@link https://github.com/bahmutov/cypress-angular-unit-test/blame/master/support.js}.
 */
beforeEach(() =>
  cy.document().then((document) => {
    document.write(`
  <head>
    <meta charset="UTF-8">
    <base href="/">
  </head>
    <body>
      <div id="root"></root0>
    </body>
  `);
    document.close();
  })
);
