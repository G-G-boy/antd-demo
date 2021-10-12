/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

import path from 'path';
import {startDevServer} from '@cypress/vite-dev-server';

const plugin: Cypress.PluginConfig = (on, config) => {
    on('dev-server:start', (options) => {
        return startDevServer({
            options,
            viteConfig: {
                configFile: path.resolve(__dirname, '..', '..', 'vite.config.ts'),
            },
        });
    });

    return config;
};

module.exports = plugin;
