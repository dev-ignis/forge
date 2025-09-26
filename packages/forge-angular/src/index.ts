/**
 * Angular Integration for Nexcraft Forge
 * Directives and services for using Forge components in Angular applications
 */

// Core services
export { ForgeThemeService } from './services/forge-theme.service';
export { ForgeComponentService } from './services/forge-component.service';

// Directives
export { ForgeComponentDirective } from './directives/forge-component.directive';
export { ForgeModalDirective } from './directives/forge-modal.directive';
export { ForgeDataTableDirective } from './directives/forge-data-table.directive';

// Form integration
export { ForgeControlValueAccessor } from './forms/forge-control-value-accessor.directive';

// Module
export { ForgeAngularModule } from './forge-angular.module';

// Utilities
export { ForgeAngularUtils } from './utils/forge-angular.utils';

// Types
export * from './types/forge-angular.types';