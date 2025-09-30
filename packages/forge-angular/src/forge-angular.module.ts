import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ForgeThemeService } from './services/forge-theme.service';
import { ForgeComponentService } from './services/forge-component.service';
import { ForgeComponentDirective } from './directives/forge-component.directive';
import { ForgeControlValueAccessor } from './forms/forge-control-value-accessor.directive';
import { ForgeModalDirective } from './directives/forge-modal.directive';
import { ForgeDataTableDirective } from './directives/forge-data-table.directive';

/**
 * Angular module for Forge component integration
 * Provides all directives, services, and configuration needed to use Forge components in Angular
 */
@NgModule({
  declarations: [
    ForgeComponentDirective,
    ForgeControlValueAccessor,
    ForgeModalDirective,
    ForgeDataTableDirective
  ],
  exports: [
    ForgeComponentDirective,
    ForgeControlValueAccessor,
    ForgeModalDirective,
    ForgeDataTableDirective
  ],
  providers: [
    ForgeThemeService,
    ForgeComponentService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ForgeAngularModule {
  static forRoot() {
    return {
      ngModule: ForgeAngularModule,
      providers: [
        ForgeThemeService,
        ForgeComponentService
      ]
    };
  }

  static getSchemas() {
    return [CUSTOM_ELEMENTS_SCHEMA];
  }

  static getDirectives() {
    return [
      ForgeComponentDirective,
      ForgeControlValueAccessor,
      ForgeModalDirective,
      ForgeDataTableDirective
    ];
  }
}