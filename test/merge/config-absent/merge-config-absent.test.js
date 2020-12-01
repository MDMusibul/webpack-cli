'use strict';

const fs = require('fs');
const { join } = require('path');

const { run } = require('../../utils/test-utils');

describe('merge flag configuration', () => {
    it('Show warning message when the merge config is absent', () => {
        // 2.js doesn't exist, let's try merging with it
        const { stdout, stderr } = run(__dirname, ['--config', './1.js', '--config', './2.js', '--merge'], false);

        // Since the process will exit, nothing on stdout
        expect(stdout).toBeFalsy();
        // Confirm that the user is notified
        expect(stderr).toContain(`The specified config file doesn't exist`);
        // Default config would be used
        expect(fs.existsSync(join(__dirname, './dist/merged.js'))).toBeFalsy();
        // Since the process will exit so no compilation will be done
        expect(fs.existsSync(join(__dirname, './dist/main.js'))).toBeFalsy();
    });
});
