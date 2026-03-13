'use strict';

const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const DEFAULT_CANARY_PATH = '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary';

function isTruthy(value, fallback = false) {
    if (value === undefined || value === null) return fallback;
    return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase());
}

function resolveBrowserConfig(agentIdFallback = 'codex') {
    const agentId = (process.env.AGENT_ID || agentIdFallback).toLowerCase();
    const userDataDir = process.env.USER_DATA_DIR
        ? path.resolve(process.env.USER_DATA_DIR)
        : path.join(process.cwd(), `user_data_${agentId}`);

    const configuredPath = process.env.BROWSER_EXECUTABLE_PATH;
    const executablePath = configuredPath
        ? configuredPath
        : (fs.existsSync(DEFAULT_CANARY_PATH) ? DEFAULT_CANARY_PATH : undefined);

    return {
        agentId,
        sessionMethod: (process.env.SESSION_METHOD || 'isolated_profile').toLowerCase(),
        userDataDir,
        browserChannel: process.env.BROWSER_CHANNEL,
        executablePath,
        singleInstance: isTruthy(process.env.BROWSER_SINGLE_INSTANCE, true)
    };
}

function killProfileProcesses(userDataDir) {
    const escaped = userDataDir.replace(/(["\\$`])/g, '\\$1');
    execSync(`pkill -f "${escaped}"`, { stdio: 'ignore' });
}

async function launchBrowserWithSingleProfile(puppeteer, config) {
    const launchOptions = {
        headless: false,
        userDataDir: config.userDataDir,
        defaultViewport: null,
        args: ['--start-maximized']
    };
    if (config.browserChannel) launchOptions.channel = config.browserChannel;
    if (config.executablePath) launchOptions.executablePath = config.executablePath;

    try {
        return await puppeteer.launch(launchOptions);
    } catch (error) {
        const message = String(error?.message || '');
        const isProfileLock = message.includes('The browser is already running for');
        if (!isProfileLock || !config.singleInstance) throw error;

        console.warn(`⚠️  Existing browser session detected for profile: ${config.userDataDir}`);
        console.warn('♻️  Developer mode single-instance is enabled; closing old session and retrying...');

        try {
            killProfileProcesses(config.userDataDir);
        } catch (_) {
            // Ignore: if nothing was running, retry launch anyway.
        }

        await new Promise(resolve => setTimeout(resolve, 1200));
        return puppeteer.launch(launchOptions);
    }
}

module.exports = {
    DEFAULT_CANARY_PATH,
    resolveBrowserConfig,
    launchBrowserWithSingleProfile
};
