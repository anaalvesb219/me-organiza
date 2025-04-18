// src/tests/setup.js
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Estende o objeto 'expect' com matchers para DOM
expect.extend(matchers);

// Cleanup automático após cada teste
afterEach(() => {
  cleanup();
}); 