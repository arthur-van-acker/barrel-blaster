/**
 * SettingsManager.js
 *
 * Manages game settings persistence using localStorage for Barrel Blaster.
 * Provides centralized settings storage, validation, and persistence for mobile controls.
 *
 * Features:
 * - Settings persistence across browser sessions via localStorage
 * - Validation for all setting values with automatic fallback to defaults
 * - Get/set methods for individual settings
 * - Reset to defaults functionality
 * - Graceful handling of localStorage errors and disabled storage
 * - Support for control scheme, button size, opacity, haptic feedback, and positions
 *
 * Settings Structure:
 * - controlScheme: 'dpad' | 'joystick' (default: 'dpad')
 * - buttonSize: 'small' | 'medium' | 'large' (default: 'medium')
 *   - small: 0.8x, medium: 1.0x, large: 1.2x multiplier
 * - buttonOpacity: 0.3 - 1.0 (default: 0.6)
 * - hapticEnabled: boolean (default: true)
 * - buttonPositions: { dpad: {x, y}, jump: {x, y} }
 */

class SettingsManager {
    /**
     * Create a new SettingsManager instance
     * Automatically loads settings from localStorage if available
     */
    constructor() {
        // localStorage key for settings persistence
        this.storageKey = 'barrelBlasterSettings';

        // Define default settings
        this.defaultSettings = {
            controlScheme: 'dpad',
            buttonSize: 'medium',
            buttonOpacity: 0.6,
            hapticEnabled: true,
            buttonPositions: {
                dpad: { x: 30, y: 610 },
                jump: { x: 1130, y: 580 }
            }
        };

        // Initialize current settings with defaults
        this.settings = this.deepClone(this.defaultSettings);

        // Validation rules
        this.validationRules = {
            controlScheme: ['dpad', 'joystick'],
            buttonSize: ['small', 'medium', 'large']
        };

        // Button size multipliers
        this.buttonSizeMultipliers = {
            small: 0.8,
            medium: 1.0,
            large: 1.2
        };

        // Auto-load from localStorage on construction
        this.load();
    }

    /**
     * Get a specific setting value
     * @param {string} key - Setting key to retrieve
     * @returns {*} Setting value or undefined if key doesn't exist
     */
    get(key) {
        return this.settings[key];
    }

    /**
     * Set a specific setting value with validation
     * Invalid values are rejected and setting remains unchanged
     * @param {string} key - Setting key to update
     * @param {*} value - New value for the setting
     */
    set(key, value) {
        // Validate and sanitize the value
        const validatedValue = this.validateSetting(key, value);

        if (validatedValue !== null) {
            this.settings[key] = validatedValue;
        }
    }

    /**
     * Get all current settings
     * @returns {Object} All current settings
     */
    getAll() {
        return this.deepClone(this.settings);
    }

    /**
     * Validate a setting value based on key
     * @param {string} key - Setting key
     * @param {*} value - Value to validate
     * @returns {*} Validated value or null if invalid
     */
    validateSetting(key, value) {
        switch (key) {
            case 'controlScheme':
                return this.validationRules.controlScheme.includes(value) ? value : null;

            case 'buttonSize':
                return this.validationRules.buttonSize.includes(value) ? value : null;

            case 'buttonOpacity':
                // Clamp opacity between 0.3 and 1.0
                const opacity = parseFloat(value);
                if (isNaN(opacity)) return null;
                return Math.max(0.3, Math.min(1.0, opacity));

            case 'hapticEnabled':
                // Convert to boolean
                return Boolean(value);

            case 'buttonPositions':
                // Validate structure: must have dpad and jump with x, y properties
                if (!value || typeof value !== 'object') return null;
                if (!value.dpad || !value.jump) return null;
                if (typeof value.dpad.x !== 'number' || typeof value.dpad.y !== 'number') return null;
                if (typeof value.jump.x !== 'number' || typeof value.jump.y !== 'number') return null;
                return value;

            default:
                // Unknown key - allow it but don't validate
                return value;
        }
    }

    /**
     * Save current settings to localStorage
     * Handles localStorage errors gracefully
     */
    save() {
        try {
            const serialized = JSON.stringify(this.settings);
            localStorage.setItem(this.storageKey, serialized);
        } catch (error) {
            // localStorage disabled, quota exceeded, or other error
            console.warn('SettingsManager: Unable to save settings to localStorage', error);
        }
    }

    /**
     * Load settings from localStorage
     * Falls back to defaults if localStorage is unavailable or data is corrupted
     */
    load() {
        try {
            const stored = localStorage.getItem(this.storageKey);

            if (stored) {
                const parsed = JSON.parse(stored);

                // Validate and merge stored settings with defaults
                this.settings = this.mergeWithDefaults(parsed);
            }
        } catch (error) {
            // localStorage disabled, corrupted data, or JSON parse error
            console.warn('SettingsManager: Unable to load settings from localStorage, using defaults', error);
            this.settings = this.deepClone(this.defaultSettings);
        }
    }

    /**
     * Reset all settings to default values
     * Also clears localStorage
     */
    resetToDefaults() {
        this.settings = this.deepClone(this.defaultSettings);

        try {
            localStorage.removeItem(this.storageKey);
        } catch (error) {
            console.warn('SettingsManager: Unable to clear localStorage', error);
        }
    }

    /**
     * Get button size multiplier based on current buttonSize setting
     * @returns {number} Multiplier (0.8, 1.0, or 1.2)
     */
    getButtonSizeMultiplier() {
        const size = this.settings.buttonSize;
        return this.buttonSizeMultipliers[size] || 1.0;
    }

    /**
     * Merge stored settings with defaults
     * Validates each stored setting and falls back to default if invalid
     * @param {Object} stored - Stored settings from localStorage
     * @returns {Object} Merged and validated settings
     */
    mergeWithDefaults(stored) {
        const merged = this.deepClone(this.defaultSettings);

        // Validate and merge each setting
        for (const key in stored) {
            if (stored.hasOwnProperty(key) && merged.hasOwnProperty(key)) {
                const validatedValue = this.validateSetting(key, stored[key]);

                if (validatedValue !== null) {
                    merged[key] = validatedValue;
                }
            }
        }

        return merged;
    }

    /**
     * Deep clone an object
     * @param {Object} obj - Object to clone
     * @returns {Object} Cloned object
     */
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
}
