import * as React from 'react';
import * as rbcComponents from '../src/components';
import * as rbcHocs from '../src/hocs';

declare namespace RBC {
	interface StyledProps extends WrapProps, WithClass, WithStyle, WithSlot {
	}

	interface MainProps<T extends HTMLElement = HTMLDivElement> extends WrapProps, React.HTMLAttributes<T>, WithRootRef<T> {
		tagName?: string;
	}

	interface WithDoNotRender {
		doNotRender?: boolean;
	}

	interface WithRootRef<T> {
		rootRef?: React.Ref<T>;
	}

	interface WithStyle {
		style?: React.CSSProperties;
	}

	interface WithClass {
		className?: string;
	}

	interface WithSlot<T = React.ReactNode> {
		children?: T;
	}

	interface WrapProps extends WithDoNotRender, WithSlot {
		slotDoNotRender?: React.ReactNode;
	}

	interface WithConditionProps {
		condition?: boolean;
	}

	interface BranchProps extends Required<WithConditionProps> {
		children: [React.ReactNode, React.ReactNode];
	}
}

declare namespace RBC {
	// нужно синхронизировать с src/index
	export const Wrap = rbcComponents.CCWrap;
	export const Main = rbcComponents.CCMain;
	export const IfChildren = rbcComponents.CCIfChildren;
	export const IfElse = rbcComponents.CCIfElse;

	export const hocDoNotAppearPredicate = rbcHocs.doNotAppearPredicateHoc;
	export const hocDoNotAppearCondition = rbcHocs.doNotAppearConditionHoc;
}

export = RBC;
export as namespace RBC;