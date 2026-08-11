import {
  Router
} from "./chunk-3JGP2WVY.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-RIHHD435.js";
import {
  ApiService,
  CommonModule,
  NgForOf,
  NgIf,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-I3CDNSY2.js";

// src/app/components/calls/calls.component.ts
function CallsComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 7);
    \u0275\u0275twoWayListener("ngModelChange", function CallsComponent_div_0_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.productName, $event) || (ctx_r1.productName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 8)(5, "button", 9);
    \u0275\u0275listener("click", function CallsComponent_div_0_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmWon());
    });
    \u0275\u0275text(6, "To Product Dev");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 10);
    \u0275\u0275listener("click", function CallsComponent_div_0_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.wonBox = null);
    });
    \u0275\u0275text(8, "Cancel");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.wonBox.handle, " won! Enter product name.");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.productName);
  }
}
function CallsComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 13);
    \u0275\u0275twoWayListener("ngModelChange", function CallsComponent_div_1_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.callLabel, $event) || (ctx_r1.callLabel = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", function CallsComponent_div_1_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.callDate, $event) || (ctx_r1.callDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 15)(6, "button", 16);
    \u0275\u0275listener("click", function CallsComponent_div_1_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveCall());
    });
    \u0275\u0275text(7, "Save");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 10);
    \u0275\u0275listener("click", function CallsComponent_div_1_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.scheduleFor = null);
    });
    \u0275\u0275text(9, "Cancel");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Schedule call \u2014 ", ctx_r1.scheduleFor.handle, "");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.callLabel);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.callDate);
  }
}
function CallsComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1, "No booked calls. Book from Active conversations in Outreach.");
    \u0275\u0275elementEnd();
  }
}
function CallsComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 20);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 8)(6, "button", 21);
    \u0275\u0275listener("click", function CallsComponent_div_5_Template_button_click_6_listener() {
      const c_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openSchedule(c_r5));
    });
    \u0275\u0275text(7, "Schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 22);
    \u0275\u0275listener("click", function CallsComponent_div_5_Template_button_click_8_listener() {
      const c_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openWon(c_r5));
    });
    \u0275\u0275text(9, "Won");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 23);
    \u0275\u0275listener("click", function CallsComponent_div_5_Template_button_click_10_listener() {
      const c_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.markLost(c_r5));
    });
    \u0275\u0275text(11, "Lost");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r5.handle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", c_r5.niche, " \xB7 ", c_r5.exchangeCount, " exchanges");
  }
}
var CallsComponent = class _CallsComponent {
  api;
  router;
  booked = [];
  wonBox = null;
  productName = "";
  scheduleFor = null;
  callLabel = "";
  callDate = "";
  constructor(api, router) {
    this.api = api;
    this.router = router;
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.api.getCreators("call_booked").subscribe((b) => this.booked = b);
  }
  openSchedule(c) {
    this.scheduleFor = c;
    this.callLabel = "";
    this.callDate = "";
  }
  saveCall() {
    if (!this.scheduleFor?.id)
      return;
    this.api.scheduleCall({
      creatorId: this.scheduleFor.id,
      callNumber: 1,
      label: this.callLabel,
      scheduledAt: this.callDate || void 0,
      completed: false
    }).subscribe(() => {
      this.scheduleFor = null;
      this.load();
    });
  }
  openWon(c) {
    this.wonBox = c;
    this.productName = "";
  }
  confirmWon() {
    if (!this.wonBox?.id)
      return;
    this.api.markWon(this.wonBox.id, this.productName).subscribe(() => {
      this.wonBox = null;
      this.load();
      this.router.navigate(["/product"]);
    });
  }
  markLost(c) {
    if (c.id)
      this.api.markLost(c.id).subscribe(() => this.load());
  }
  static \u0275fac = function CallsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CallsComponent)(\u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CallsComponent, selectors: [["app-calls"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 6, vars: 4, consts: [["class", "card won-box", 4, "ngIf"], ["class", "card", "style", "margin-bottom:16px;", 4, "ngIf"], [1, "section-head", 2, "background", "var(--accent-bg)", "color", "var(--accent)"], ["class", "card muted", "style", "text-align:center;", 4, "ngIf"], ["class", "card", "style", "margin-bottom:8px;", 4, "ngFor", "ngForOf"], [1, "card", "won-box"], [1, "won-title"], ["placeholder", "Product name", 3, "ngModelChange", "ngModel"], [1, "btn-row", 2, "margin-top", "8px"], [1, "success", 3, "click"], [1, "secondary", 3, "click"], [1, "card", 2, "margin-bottom", "16px"], [1, "handle", 2, "margin-bottom", "8px"], ["placeholder", "Label (e.g. Intro call)", 2, "margin-bottom", "8px", 3, "ngModelChange", "ngModel"], ["type", "datetime-local", 2, "margin-bottom", "8px", 3, "ngModelChange", "ngModel"], [1, "btn-row"], [1, "warning", 3, "click"], [1, "card", "muted", 2, "text-align", "center"], [1, "card", 2, "margin-bottom", "8px"], [1, "handle"], [1, "sub"], [1, "small", "secondary", 3, "click"], [1, "small", "success", 3, "click"], [1, "small", "danger", 3, "click"]], template: function CallsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, CallsComponent_div_0_Template, 9, 2, "div", 0)(1, CallsComponent_div_1_Template, 10, 3, "div", 1);
      \u0275\u0275elementStart(2, "div", 2);
      \u0275\u0275text(3, "Booked calls");
      \u0275\u0275elementEnd();
      \u0275\u0275template(4, CallsComponent_div_4_Template, 2, 0, "div", 3)(5, CallsComponent_div_5_Template, 12, 3, "div", 4);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.wonBox);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.scheduleFor);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.booked.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.booked);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.won-box[_ngcontent-%COMP%] {\n  background: var(--success-bg);\n  border-color: var(--success);\n  margin-bottom: 16px;\n}\n.won-title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--success);\n  margin-bottom: 8px;\n}\n.btn-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n/*# sourceMappingURL=calls.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CallsComponent, { className: "CallsComponent", filePath: "src\\app\\components\\calls\\calls.component.ts", lineNumber: 13 });
})();
export {
  CallsComponent
};
//# sourceMappingURL=chunk-L4O3V5XM.js.map
