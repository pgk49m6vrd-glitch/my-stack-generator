#!/usr/bin/env node

/**
 * My Stack Generator — CLI entry point.
 *
 * This file serves as the bin entry for backward compatibility.
 * All logic has been refactored into src/ modules.
 *
 * Exports are preserved for existing test compatibility.
 */

// Re-export utilities for backward compatibility (used by test-validation.js)
export { validateProjectName, checkPackageManager } from './src/utils.js';

// Launch the CLI
import './src/cli.js';
