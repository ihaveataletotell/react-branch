import * as rbComponents from './components';
import * as rbHocs from './hocs';

// нужно синхронизировать с lib/main.d.ts
export const Wrap = rbComponents.CCWrap;
Wrap.displayName = 'ReactBranch.Wrap';

export const Main = rbComponents.CCMain;
Main.displayName = 'ReactBranch.Main';

export const IfChildren = rbComponents.CCIfChildren;
IfChildren.displayName = 'ReactBranch.IfChildren';

export const IfElse = rbComponents.CCIfElse;
IfElse.displayName = 'ReactBranch.IfElse';

export const hocDoNotAppearPredicate = rbHocs.doNotAppearPredicateHoc;
export const hocDoNotAppearCondition = rbHocs.doNotAppearConditionHoc;

export {GetComponentName} from './hocs';