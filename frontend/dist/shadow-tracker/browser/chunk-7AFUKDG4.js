import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-RIHHD435.js";
import {
  ApiService,
  CommonModule,
  NgForOf,
  NgIf,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
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

// src/app/components/settings/settings.component.ts
function SettingsComponent_div_0_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29)(1, "input", 30);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsComponent_div_0_div_6_Template_input_ngModelChange_1_listener($event) {
      const row_r3 = \u0275\u0275restoreView(_r2).$implicit;
      \u0275\u0275twoWayBindingSet(row_r3.handle, $event) || (row_r3.handle = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsComponent_div_0_div_6_Template_input_ngModelChange_2_listener($event) {
      const row_r3 = \u0275\u0275restoreView(_r2).$implicit;
      \u0275\u0275twoWayBindingSet(row_r3.niche, $event) || (row_r3.niche = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 32);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsComponent_div_0_div_6_Template_input_ngModelChange_3_listener($event) {
      const row_r3 = \u0275\u0275restoreView(_r2).$implicit;
      \u0275\u0275twoWayBindingSet(row_r3.followers, $event) || (row_r3.followers = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", row_r3.handle);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", row_r3.niche);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", row_r3.followers);
  }
}
function SettingsComponent_div_0_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 34);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "span", 35);
    \u0275\u0275listener("click", function SettingsComponent_div_0_div_17_Template_span_click_5_listener() {
      const c_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.deleteVaultCreator(c_r6));
    });
    \u0275\u0275text(6, "\xD7");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", c_r6.handle, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("\xB7 ", c_r6.niche, " \xB7 ", c_r6.followers, "");
  }
}
function SettingsComponent_div_0_div_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 35);
    \u0275\u0275listener("click", function SettingsComponent_div_0_div_33_Template_span_click_3_listener() {
      const g_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.removeGoal(g_r8));
    });
    \u0275\u0275text(4, "\xD7");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const g_r8 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(g_r8.label);
  }
}
function SettingsComponent_div_0_button_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 37);
    \u0275\u0275listener("click", function SettingsComponent_div_0_button_37_Template_button_click_0_listener() {
      const p_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.addPredefined(p_r10));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r10 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r3.hasGoal(p_r10.type));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r10.label);
  }
}
function SettingsComponent_div_0_div_97_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275text(1, "None.");
    \u0275\u0275elementEnd();
  }
}
function SettingsComponent_div_0_div_98_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 34);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const c_r11 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", c_r11.handle, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\xB7 ", c_r11.niche, "");
  }
}
function SettingsComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "h3", 1);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 2)(4, "div", 3);
    \u0275\u0275text(5, "Add creators (handle required):");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, SettingsComponent_div_0_div_6_Template, 4, 3, "div", 4);
    \u0275\u0275elementStart(7, "button", 5);
    \u0275\u0275listener("click", function SettingsComponent_div_0_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.addVaultRow());
    });
    \u0275\u0275text(8, "+ Row");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 6);
    \u0275\u0275listener("click", function SettingsComponent_div_0_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.saveVault());
    });
    \u0275\u0275text(10, "Save to vault");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 7);
    \u0275\u0275text(12, "Or add many handles at once (one per line, no niche/followers):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "textarea", 8);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsComponent_div_0_Template_textarea_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.bulkHandles, $event) || (ctx_r3.bulkHandles = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 5);
    \u0275\u0275listener("click", function SettingsComponent_div_0_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.addBulkToVault());
    });
    \u0275\u0275text(15, "Add bulk to vault");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 9);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsComponent_div_0_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.vaultSearch, $event) || (ctx_r3.vaultSearch = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, SettingsComponent_div_0_div_17_Template, 7, 3, "div", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "h3", 1);
    \u0275\u0275text(19, "Leads per Day");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 11)(21, "span");
    \u0275\u0275text(22, "Leads (15-20)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 12)(24, "button", 13);
    \u0275\u0275listener("click", function SettingsComponent_div_0_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.step("leadsPerDay", -1));
    });
    \u0275\u0275text(25, "-");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span");
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 13);
    \u0275\u0275listener("click", function SettingsComponent_div_0_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.step("leadsPerDay", 1));
    });
    \u0275\u0275text(29, "+");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "h3", 1);
    \u0275\u0275text(31, "Daily challenge goals");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 2);
    \u0275\u0275template(33, SettingsComponent_div_0_div_33_Template, 5, 1, "div", 14);
    \u0275\u0275elementStart(34, "div", 15);
    \u0275\u0275text(35, "Add predefined:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 16);
    \u0275\u0275template(37, SettingsComponent_div_0_button_37_Template, 2, 2, "button", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 18)(39, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsComponent_div_0_Template_input_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.customGoal, $event) || (ctx_r3.customGoal = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function SettingsComponent_div_0_Template_input_keyup_enter_39_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.addCustom());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "button", 20);
    \u0275\u0275listener("click", function SettingsComponent_div_0_Template_button_click_40_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.addCustom());
    });
    \u0275\u0275text(41, "+");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(42, "h3", 1);
    \u0275\u0275text(43, "Follow-up timing");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 11)(45, "span");
    \u0275\u0275text(46, "First");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 12)(48, "button", 13);
    \u0275\u0275listener("click", function SettingsComponent_div_0_Template_button_click_48_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.step("fuFirstDays", -1));
    });
    \u0275\u0275text(49, "-");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "span");
    \u0275\u0275text(51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "button", 13);
    \u0275\u0275listener("click", function SettingsComponent_div_0_Template_button_click_52_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.step("fuFirstDays", 1));
    });
    \u0275\u0275text(53, "+");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(54, "div", 21)(55, "span");
    \u0275\u0275text(56, "Second");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "div", 12)(58, "button", 13);
    \u0275\u0275listener("click", function SettingsComponent_div_0_Template_button_click_58_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.step("fuSecondDays", -1));
    });
    \u0275\u0275text(59, "-");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "span");
    \u0275\u0275text(61);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "button", 13);
    \u0275\u0275listener("click", function SettingsComponent_div_0_Template_button_click_62_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.step("fuSecondDays", 1));
    });
    \u0275\u0275text(63, "+");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(64, "div", 22)(65, "div", 23)(66, "span");
    \u0275\u0275text(67, "Third follow-up");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsComponent_div_0_Template_input_ngModelChange_68_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.s.fuThirdEnabled, $event) || (ctx_r3.s.fuThirdEnabled = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function SettingsComponent_div_0_Template_input_change_68_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.save());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(69, "div", 25)(70, "div", 21)(71, "span");
    \u0275\u0275text(72, "Third");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "div", 12)(74, "button", 13);
    \u0275\u0275listener("click", function SettingsComponent_div_0_Template_button_click_74_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.step("fuThirdDays", -1));
    });
    \u0275\u0275text(75, "-");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "span");
    \u0275\u0275text(77);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "button", 13);
    \u0275\u0275listener("click", function SettingsComponent_div_0_Template_button_click_78_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.step("fuThirdDays", 1));
    });
    \u0275\u0275text(79, "+");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "button", 26);
    \u0275\u0275listener("click", function SettingsComponent_div_0_Template_button_click_80_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.disableThird());
    });
    \u0275\u0275text(81, "\xD7");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(82, "h3", 1);
    \u0275\u0275text(83, "Auto-reject");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "div", 11)(85, "span");
    \u0275\u0275text(86, "Days until reject");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "div", 12)(88, "button", 13);
    \u0275\u0275listener("click", function SettingsComponent_div_0_Template_button_click_88_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.step("rejectAfterDays", -1));
    });
    \u0275\u0275text(89, "-");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "span");
    \u0275\u0275text(91);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(92, "button", 13);
    \u0275\u0275listener("click", function SettingsComponent_div_0_Template_button_click_92_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.step("rejectAfterDays", 1));
    });
    \u0275\u0275text(93, "+");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(94, "h3", 1);
    \u0275\u0275text(95);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(96, "div", 2);
    \u0275\u0275template(97, SettingsComponent_div_0_div_97_Template, 2, 0, "div", 27)(98, SettingsComponent_div_0_div_98_Template, 5, 2, "div", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(99, "h3", 1);
    \u0275\u0275text(100, "Whop (optional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(101, "div", 2)(102, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", function SettingsComponent_div_0_Template_input_ngModelChange_102_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.s.whopApiKey, $event) || (ctx_r3.s.whopApiKey = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("blur", function SettingsComponent_div_0_Template_input_blur_102_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.save());
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Vault (", ctx_r3.vault.length, ")");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r3.vaultRows);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.bulkHandles);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.vaultSearch);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.filteredVault);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r3.s.leadsPerDay);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r3.goals);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r3.predefinedGoals);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.customGoal);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r3.s.fuFirstDays);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r3.s.fuSecondDays);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("open", !ctx_r3.s.fuThirdEnabled);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.s.fuThirdEnabled);
    \u0275\u0275advance();
    \u0275\u0275classProp("open", ctx_r3.s.fuThirdEnabled);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r3.s.fuThirdDays);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate(ctx_r3.s.rejectAfterDays);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Rejected (", ctx_r3.rejected.length, ")");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r3.rejected.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.rejected);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.s.whopApiKey);
  }
}
var SettingsComponent = class _SettingsComponent {
  api;
  s;
  goals = [];
  vault = [];
  rejected = [];
  // vault add
  vaultRows = [{ handle: "" }];
  vaultSearch = "";
  customGoal = "";
  bulkHandles = "";
  predefinedGoals = [
    { type: "dms", label: "Send DMs" },
    { type: "engagement", label: "Engage with creators" },
    { type: "followups", label: "Send follow-ups" },
    { type: "journal", label: "Write journal" }
  ];
  constructor(api) {
    this.api = api;
  }
  ngOnInit() {
    this.api.getSettings().subscribe((s) => this.s = s);
    this.loadGoals();
    this.loadVault();
    this.loadRejected();
  }
  loadGoals() {
    this.api.getGoals().subscribe((g) => this.goals = g);
  }
  loadVault() {
    this.api.getVault().subscribe((v) => this.vault = v);
  }
  loadRejected() {
    this.api.getRejected().subscribe((r) => this.rejected = r);
  }
  save() {
    if (!this.s)
      return;
    this.s.leadsPerDay = Math.min(20, Math.max(15, this.s.leadsPerDay));
    this.api.updateSettings(this.s).subscribe((u) => this.s = u);
  }
  step(field, delta) {
    if (!this.s)
      return;
    this.s[field] = Math.max(1, this.s[field] + delta);
    this.save();
  }
  disableThird() {
    if (!this.s)
      return;
    this.s.fuThirdEnabled = false;
    this.save();
  }
  // Goals
  hasGoal(type) {
    return this.goals.some((g) => g.type === type && g.type !== "custom");
  }
  addPredefined(g) {
    if (this.hasGoal(g.type))
      return;
    this.api.addGoal({ type: g.type, label: g.label, autoTracked: g.type === "dms" || g.type === "journal", sortOrder: this.goals.length }).subscribe(() => this.loadGoals());
  }
  addCustom() {
    if (!this.customGoal.trim())
      return;
    this.api.addGoal({ type: "custom", label: this.customGoal, autoTracked: false, sortOrder: this.goals.length }).subscribe(() => {
      this.customGoal = "";
      this.loadGoals();
    });
  }
  removeGoal(g) {
    if (g.id)
      this.api.deleteGoal(g.id).subscribe(() => this.loadGoals());
  }
  // Vault
  addVaultRow() {
    this.vaultRows.push({ handle: "" });
  }
  saveVault() {
    const valid = this.vaultRows.filter((r) => r.handle.trim());
    if (valid.length === 0)
      return;
    this.api.createBatch(valid).subscribe(() => {
      this.vaultRows = [{ handle: "" }];
      this.loadVault();
    });
  }
  deleteVaultCreator(c) {
    if (c.id)
      this.api.deleteCreator(c.id).subscribe(() => this.loadVault());
  }
  addBulkToVault() {
    const handles = this.bulkHandles.split("\n").map((h) => h.trim()).filter((h) => h);
    if (handles.length === 0)
      return;
    const dtos = handles.map((handle) => ({ handle }));
    this.api.createBatch(dtos).subscribe(() => {
      this.bulkHandles = "";
      this.loadVault();
    });
  }
  get filteredVault() {
    const q = this.vaultSearch.toLowerCase();
    if (!q)
      return this.vault;
    return this.vault.filter((c) => c.handle.toLowerCase().includes(q) || c.niche.toLowerCase().includes(q) || String(c.followers).includes(q));
  }
  static \u0275fac = function SettingsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SettingsComponent)(\u0275\u0275directiveInject(ApiService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SettingsComponent, selectors: [["app-settings"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "h3"], [1, "card"], [1, "muted", 2, "margin-bottom", "8px"], ["class", "vault-row", 4, "ngFor", "ngForOf"], [1, "secondary", 2, "margin-top", "8px", 3, "click"], [1, "success", 2, "margin-top", "8px", 3, "click"], [1, "muted", 2, "margin", "14px 0 8px"], ["rows", "5", "placeholder", "@handle1\n@handle2\n@handle3", 3, "ngModelChange", "ngModel"], ["placeholder", "Search vault (handle, niche, followers)", 2, "margin-top", "12px", 3, "ngModelChange", "ngModel"], ["class", "vault-item", 4, "ngFor", "ngForOf"], [1, "card", "stepper-card"], [1, "stepper"], [1, "secondary", "sq", 3, "click"], ["class", "goal-item", 4, "ngFor", "ngForOf"], [1, "muted", 2, "margin", "10px 0 6px"], [1, "goal-add"], ["class", "small secondary", 3, "disabled", "click", 4, "ngFor", "ngForOf"], [2, "display", "flex", "gap", "6px", "margin-top", "10px"], ["placeholder", "Custom goal", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "small", 3, "click"], [1, "card", "stepper-card", 2, "margin-top", "8px"], [1, "fu-third-toggle-wrap"], [1, "card", "toggle-card", 2, "margin-top", "8px"], ["type", "checkbox", 2, "width", "auto", 3, "ngModelChange", "change", "ngModel"], [1, "fu-third-wrap"], ["title", "Turn off third follow-up", 1, "fu-third-off", 3, "click"], ["class", "muted", "style", "text-align:center;", 4, "ngIf"], ["placeholder", "Whop API key", 3, "ngModelChange", "blur", "ngModel"], [1, "vault-row"], ["placeholder", "handle", 3, "ngModelChange", "ngModel"], ["placeholder", "niche", 3, "ngModelChange", "ngModel"], ["placeholder", "foll", "type", "number", 1, "narrow", 3, "ngModelChange", "ngModel"], [1, "vault-item"], [1, "muted"], [1, "del", 3, "click"], [1, "goal-item"], [1, "small", "secondary", 3, "click", "disabled"], [1, "muted", 2, "text-align", "center"]], template: function SettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, SettingsComponent_div_0_Template, 103, 22, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.s);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.h3[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 16px 0 10px;\n}\n.h3[_ngcontent-%COMP%]:first-child {\n  margin-top: 0;\n}\n.vault-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  margin-bottom: 6px;\n}\n.vault-row[_ngcontent-%COMP%]   .narrow[_ngcontent-%COMP%] {\n  max-width: 70px;\n}\n.vault-item[_ngcontent-%COMP%], \n.goal-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 12px;\n  padding: 6px 0;\n  border-bottom: 0.5px solid var(--border);\n}\n.del[_ngcontent-%COMP%] {\n  color: var(--danger);\n  cursor: pointer;\n  font-size: 16px;\n}\n.stepper-card[_ngcontent-%COMP%], \n.toggle-card[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 13px;\n}\n.stepper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.stepper[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  min-width: 20px;\n  text-align: center;\n}\nbutton.sq[_ngcontent-%COMP%] {\n  width: 34px;\n  padding: 6px;\n}\n.goal-add[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.fu-third-wrap[_ngcontent-%COMP%], \n.fu-third-toggle-wrap[_ngcontent-%COMP%] {\n  overflow: hidden;\n  max-height: 0;\n  opacity: 0;\n  transition: max-height 0.25s ease, opacity 0.2s ease;\n}\n.fu-third-wrap.open[_ngcontent-%COMP%], \n.fu-third-toggle-wrap.open[_ngcontent-%COMP%] {\n  max-height: 70px;\n  opacity: 1;\n}\n.fu-third-off[_ngcontent-%COMP%] {\n  width: auto;\n  padding: 4px 8px;\n  margin-left: 2px;\n  background: transparent;\n  color: var(--text-secondary);\n  font-size: 14px;\n  font-weight: 400;\n}\n.fu-third-off[_ngcontent-%COMP%]:hover {\n  color: var(--danger);\n}\n/*# sourceMappingURL=settings.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SettingsComponent, { className: "SettingsComponent", filePath: "src\\app\\components\\settings\\settings.component.ts", lineNumber: 13 });
})();
export {
  SettingsComponent
};
//# sourceMappingURL=chunk-7AFUKDG4.js.map
