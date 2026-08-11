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
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-I3CDNSY2.js";

// src/app/components/journal/journal.component.ts
function JournalComponent_button_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function JournalComponent_button_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.adding = true);
    });
    \u0275\u0275text(1, "+ New entry");
    \u0275\u0275elementEnd();
  }
}
function JournalComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "input", 5);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_div_1_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.draft.title, $event) || (ctx_r1.draft.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "textarea", 6);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_div_1_Template_textarea_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.draft.body, $event) || (ctx_r1.draft.body = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 7);
    \u0275\u0275text(4, "What went well?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "textarea", 8);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_div_1_Template_textarea_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.draft.wentWell, $event) || (ctx_r1.draft.wentWell = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 7);
    \u0275\u0275text(7, "What blocked you?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "textarea", 8);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_div_1_Template_textarea_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.draft.blocked, $event) || (ctx_r1.draft.blocked = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 7);
    \u0275\u0275text(10, "What will you do differently tomorrow?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "textarea", 9);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_div_1_Template_textarea_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.draft.tomorrow, $event) || (ctx_r1.draft.tomorrow = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 10);
    \u0275\u0275listener("click", function JournalComponent_div_1_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(13, "Save");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 11);
    \u0275\u0275listener("click", function JournalComponent_div_1_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.adding = false);
    });
    \u0275\u0275text(15, "Cancel");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.draft.title);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.draft.body);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.draft.wentWell);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.draft.blocked);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.draft.tomorrow);
  }
}
function JournalComponent_div_2_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r4.body);
  }
}
function JournalComponent_div_2_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "b");
    \u0275\u0275text(2, "Went well:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", e_r4.wentWell, "");
  }
}
function JournalComponent_div_2_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "b");
    \u0275\u0275text(2, "Blocked:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", e_r4.blocked, "");
  }
}
function JournalComponent_div_2_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "b");
    \u0275\u0275text(2, "Tomorrow:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", e_r4.tomorrow, "");
  }
}
function JournalComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 13);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, JournalComponent_div_2_div_3_Template, 2, 1, "div", 14)(4, JournalComponent_div_2_div_4_Template, 4, 1, "div", 15)(5, JournalComponent_div_2_div_5_Template, 4, 1, "div", 15)(6, JournalComponent_div_2_div_6_Template, 4, 1, "div", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r4.title || "Entry");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", e_r4.body);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", e_r4.wentWell);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", e_r4.blocked);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", e_r4.tomorrow);
  }
}
var JournalComponent = class _JournalComponent {
  api;
  entries = [];
  adding = false;
  draft = {};
  constructor(api) {
    this.api = api;
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.api.getJournal().subscribe((e) => this.entries = e);
  }
  save() {
    if (!this.draft.title && !this.draft.body && !this.draft.wentWell && !this.draft.blocked && !this.draft.tomorrow)
      return;
    this.api.createJournal(this.draft).subscribe(() => {
      this.draft = {};
      this.adding = false;
      this.load();
    });
  }
  static \u0275fac = function JournalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _JournalComponent)(\u0275\u0275directiveInject(ApiService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _JournalComponent, selectors: [["app-journal"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 3, vars: 3, consts: [["style", "margin-bottom:16px;", 3, "click", 4, "ngIf"], ["class", "card", "style", "margin-bottom:16px;", 4, "ngIf"], ["class", "card", "style", "margin-bottom:10px;", 4, "ngFor", "ngForOf"], [2, "margin-bottom", "16px", 3, "click"], [1, "card", 2, "margin-bottom", "16px"], ["placeholder", "Title", 2, "margin-bottom", "8px", 3, "ngModelChange", "ngModel"], ["placeholder", "Free writing...", "rows", "3", 2, "margin-bottom", "12px", 3, "ngModelChange", "ngModel"], [1, "q-label"], ["rows", "2", 2, "margin-bottom", "10px", 3, "ngModelChange", "ngModel"], ["rows", "2", 2, "margin-bottom", "12px", 3, "ngModelChange", "ngModel"], [3, "click"], [1, "secondary", 2, "margin-top", "8px", 3, "click"], [1, "card", 2, "margin-bottom", "10px"], [1, "j-title"], ["class", "j-body", 4, "ngIf"], ["class", "j-q", 4, "ngIf"], [1, "j-body"], [1, "j-q"]], template: function JournalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, JournalComponent_button_0_Template, 2, 0, "button", 0)(1, JournalComponent_div_1_Template, 16, 5, "div", 1)(2, JournalComponent_div_2_Template, 7, 5, "div", 2);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", !ctx.adding);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.adding);
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.entries);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.q-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-secondary);\n  margin-bottom: 4px;\n}\n.j-title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 4px;\n}\n.j-body[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n  line-height: 1.5;\n  margin-bottom: 6px;\n}\n.j-q[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-secondary);\n  line-height: 1.5;\n  margin-top: 3px;\n}\n.j-q[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  color: var(--text);\n}\n/*# sourceMappingURL=journal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(JournalComponent, { className: "JournalComponent", filePath: "src\\app\\components\\journal\\journal.component.ts", lineNumber: 12 });
})();
export {
  JournalComponent
};
//# sourceMappingURL=chunk-QMQZ7FDX.js.map
