// @flow

import { connect } from 'react-redux';

import { createToolbarEvent, sendAnalytics } from '../../../../analytics';
import { translate } from '../../../../base/i18n';
import { openDeviceSelectionDialog } from '../../../../device-selection';
import { toggleSettings } from '../../../../side-panel';

import AbstractButton from '../AbstractButton';
import type { Props as AbstractButtonProps } from '../AbstractButton';

declare var interfaceConfig: Object;

type Props = AbstractButtonProps & {

    /**
     * Whether we are in filmstrip only mode or not.
     */
    _filmStripOnly: boolean,

    /**
     * Array containing the enabled settings sections.
     */
    _sections: Array<string>,

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
}

/**
 * An abstract implementation of a button for accessing settings.
 */
class SettingsButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'Settings';
    iconName = 'icon-settings';
    label = 'toolbar.Settings';
    tooltip = 'toolbar.Settings';

    /**
     * Handles clicking / pressing the button, and opens the appropriate dialog.
     *
     * @private
     * @returns {void}
     */
    _handleClick() {
        const { _filmStripOnly, _sections, dispatch } = this.props;

        sendAnalytics(createToolbarEvent('settings'));
        if (_filmStripOnly
                || (_sections.length === 1 && _sections.includes('devices'))) {
            dispatch(openDeviceSelectionDialog());
        } else {
            dispatch(toggleSettings());
        }
    }

    /**
     * Indicates whether this button is disabled or not.
     *
     * @override
     * @private
     * @returns {boolean}
     */
    _isDisabled() {
        return false;
    }
}

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code SettingsButton} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _filmStripOnly: boolean
 * }}
 */
function _mapStateToProps(state): Object { // eslint-disable-line no-unused-vars
    // XXX: We are not currently using state here, but in the future, when
    // interfaceConfig is part of redux we will.

    return {
        _filmStripOnly: Boolean(interfaceConfig.filmStripOnly),
        _sections: interfaceConfig.SETTINGS_SECTIONS || []
    };
}

export default translate(connect(_mapStateToProps)(SettingsButton));
