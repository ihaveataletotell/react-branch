import * as React from 'react';

declare namespace RB {
	interface StyledProps extends WrapProps, WithClass, WithStyle, WithSlot {}

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

	interface PredicateProps {
		slotDoNotAppear?: React.ReactNode;
	}

	type WithPredicateProps<
		T extends React.ComponentType<any>,
		P extends PredicateProps,
	> = React.ComponentProps<T> & P;

	type DoNotAppearPredicateHocT = <
		T extends React.ComponentType<any>,
		P extends PredicateProps,
	>(
		WrappedComponent: T,
		predicate: (props: WithPredicateProps<T, P>) => boolean,
	) => React.ComponentType<WithPredicateProps<T, P>>;

	interface ConditionalBranchProps extends PredicateProps {
		doNotAppear?: boolean;
	}

	type WithConditionalBranchProps<T extends React.ComponentType<any>> = React.ComponentProps<T> & ConditionalBranchProps;

	type DoNotAppearConditionHocT = <
		T extends React.ComponentType<any>,
	>(
		WrappedComponent: T,
	) => React.ComponentType<RB.WithConditionalBranchProps<T>>;
}

declare namespace RB {
	export const Wrap: React.FunctionComponent<RB.WrapProps>;
	export const Main: React.FunctionComponent<RB.MainProps>;
	export const IfChildren: React.FunctionComponent<RB.MainProps>;
	export const IfElse: React.FunctionComponent<RB.BranchProps>;

	export const hocDoNotAppearPredicate: RB.DoNotAppearPredicateHocT;
	export const hocDoNotAppearCondition: RB.DoNotAppearConditionHocT;
}

export = RB;
// export as namespace RB;