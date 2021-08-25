import * as rbComponents from './components';
import * as rbHocs from './hocs';

// нужно синхронизировать с lib/main.d.ts
export const Wrap = rbComponents.CCWrap;
export const Main = rbComponents.CCMain;
export const IfChildren = rbComponents.CCIfChildren;
export const IfElse = rbComponents.CCIfElse;

export const hocDoNotAppearPredicate = rbHocs.doNotAppearPredicateHoc;
export const hocDoNotAppearCondition = rbHocs.doNotAppearConditionHoc;