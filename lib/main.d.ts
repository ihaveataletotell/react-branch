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

	type GetComponentNameT = (Component: React.ComponentType) => string;
}

declare namespace RB {
	declare const Wrap: React.FunctionComponent<RB.WrapProps>;
	declare const Main: React.FunctionComponent<RB.MainProps>;
	declare const IfChildren: React.FunctionComponent<RB.MainProps>;
	declare const IfElse: React.FunctionComponent<RB.BranchProps>;

	declare const hocDoNotAppearPredicate: RB.DoNotAppearPredicateHocT;
	declare const hocDoNotAppearCondition: RB.DoNotAppearConditionHocT;

	declare class GetComponentName {
		static set method(method: RB.GetComponentNameT);
	}
}

export = RB;