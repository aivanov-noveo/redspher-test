/* cspell:ignore lcov */
/* eslint-disable import/no-default-export */

import type { Config } from '@jest/types';

const configuration: Config.InitialOptions = {
  cacheDirectory: '<rootDir>/.cache/jest',
  clearMocks: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/test/', '/lib/'],
  coverageProvider: 'babel',
  coverageReporters: ['lcov', 'text', 'text-summary'],
  forceExit: true,
  globals: {
    'ts-jest': {
      diagnostics: false,
      isolatedModules: true,
    },
  },
  logHeapUsage: true,
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
};

export default configuration;
