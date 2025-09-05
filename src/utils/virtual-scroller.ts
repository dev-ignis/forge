export interface VirtualScrollerOptions {
  container: HTMLElement;
  itemHeight: number;
  totalItems: number;
  buffer?: number;
  onVisibleRangeChange?: (range: { start: number; end: number }) => void;
}

export interface VirtualScrollerRange {
  start: number;
  end: number;
}

export class VirtualScroller {
  private container: HTMLElement;
  private itemHeight: number;
  private totalItems: number;
  private buffer: number;
  private onVisibleRangeChange?: (range: VirtualScrollerRange) => void;
  
  private visibleRange: VirtualScrollerRange = { start: 0, end: 0 };
  private scrollTop = 0;
  private containerHeight = 0;
  
  constructor(options: VirtualScrollerOptions) {
    this.container = options.container;
    this.itemHeight = options.itemHeight;
    this.totalItems = options.totalItems;
    this.buffer = options.buffer ?? 5;
    this.onVisibleRangeChange = options.onVisibleRangeChange;
    
    this.init();
  }
  
  private init() {
    this.containerHeight = this.container.clientHeight;
    this.container.addEventListener('scroll', this.handleScroll.bind(this));
    
    // Set initial total height
    this.updateTotalHeight();
    this.calculateVisibleRange();
  }
  
  private handleScroll() {
    const newScrollTop = this.container.scrollTop;
    if (Math.abs(newScrollTop - this.scrollTop) < this.itemHeight / 2) {
      return; // Skip minor scroll changes
    }
    
    this.scrollTop = newScrollTop;
    this.calculateVisibleRange();
  }
  
  private calculateVisibleRange() {
    const visibleItems = Math.ceil(this.containerHeight / this.itemHeight);
    const startIndex = Math.floor(this.scrollTop / this.itemHeight);
    
    const start = Math.max(0, startIndex - this.buffer);
    const end = Math.min(this.totalItems, startIndex + visibleItems + this.buffer);
    
    if (start !== this.visibleRange.start || end !== this.visibleRange.end) {
      this.visibleRange = { start, end };
      this.onVisibleRangeChange?.(this.visibleRange);
    }
  }
  
  private updateTotalHeight() {
    const totalHeight = this.totalItems * this.itemHeight;
    this.container.style.setProperty('--virtual-total-height', `${totalHeight}px`);
  }
  
  public updateTotalItems(totalItems: number) {
    this.totalItems = totalItems;
    this.updateTotalHeight();
    this.calculateVisibleRange();
  }
  
  public getVisibleRange(): VirtualScrollerRange {
    return { ...this.visibleRange };
  }
  
  public scrollToIndex(index: number) {
    const scrollTop = index * this.itemHeight;
    this.container.scrollTop = scrollTop;
  }
  
  public destroy() {
    this.container.removeEventListener('scroll', this.handleScroll.bind(this));
  }
}