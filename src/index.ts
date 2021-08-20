import * as rbcComponents from './components';
import * as rbcHocs from './hocs';

export const Wrap = rbcComponents.CCWrap;
export const Main = rbcComponents.CCMain;
export const IfChildren = rbcComponents.CCIfChildren;
export const IfElse = rbcComponents.CCIfElse;

export const hocDoNotAppearPredicate = rbcHocs.doNotAppearPredicateHoc;
export const hocDoNotAppearCondition = rbcHocs.doNotAppearConditionHoc;