import React from 'react';
import { addons, types } from 'storybook/manager-api';
import { AddonPanel } from 'storybook/internal/components';
import { AIPanelContent } from './AIPanelContent';

const ADDON_ID = 'forge/ai-panel';
const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: '🤖 AI Metadata',
    match: ({ viewMode }) => viewMode === 'story',
    render: ({ active }) => (
      <AddonPanel active={active}>
        <AIPanelContent />
      </AddonPanel>
    ),
  });
});
