import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { ForgeComponentDirective } from './forge-component.directive';
import type { 
  ForgeCustomEvent, 
  ForgeTableSortEvent, 
  ForgeTableFilterEvent, 
  ForgeTableSelectEvent, 
  ForgeTableRowClickEvent 
} from '../types/forge-angular.types';

/**
 * Directive for Forge data table component integration
 * Provides Angular-friendly data binding and event handling
 */
@Directive({
  selector: 'forge-data-table[forgeDataTable]',
  exportAs: 'forgeDataTable'
})
export class ForgeDataTableDirective extends ForgeComponentDirective {
  @Input() data: any[] = [];
  @Output() sort = new EventEmitter<ForgeCustomEvent<ForgeTableSortEvent>>();
  @Output() filter = new EventEmitter<ForgeCustomEvent<ForgeTableFilterEvent>>();
  @Output() select = new EventEmitter<ForgeCustomEvent<ForgeTableSelectEvent>>();
  @Output() rowClick = new EventEmitter<ForgeCustomEvent<ForgeTableRowClickEvent>>();

  private _selectedRows: any[] = [];

  get selectedRows(): any[] {
    return this._selectedRows;
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.addEventListener('sort', (event) => this.sort.emit(event));
    this.addEventListener('filter', (event) => this.filter.emit(event));
    this.addEventListener('select', (event) => {
      this._selectedRows = event.detail.selected;
      this.select.emit(event);
    });
    this.addEventListener('row-click', (event) => this.rowClick.emit(event));

    // Set initial data
    if (this.data) {
      (this.getElement() as any).data = this.data;
    }
  }

  @Input() set tableData(data: any[]) {
    this.data = data;
    const element = this.getElement() as any;
    if (element) {
      element.data = data;
    }
  }
}