import * as React from 'react';
import * as RB from '../lib/main';

export class GetComponentName {
	private static _method: RB.GetComponentNameT | undefined;

	private static defaultMethod(Component: React.ComponentType): string {
		return Component.name || Component.displayName || 'Component';
	}

	static set method(method: RB.GetComponentNameT) {
		this._method = method;
	}

	static get method(): RB.GetComponentNameT {
		return this._method || this.defaultMethod;
	}
}

export const doNotAppearPredicateHoc: RB.DoNotAppearPredicateHocT = <
	T extends React.ComponentType<any>,
	P extends RB.PredicateProps,
>(
	WrappedComponent: T,
	predicate: (props: RB.WithPredicateProps<T, P>) => boolean,
): React.ComponentType<RB.WithPredicateProps<T, P>> => {

	const result = function (props: RB.WithPredicateProps<T, P>): React.ReactElement | null {
		if (predicate(props)) return props.slotDoNotAppear || null;
		return <WrappedComponent {...props} />;
	}

	result.displayName = `ReactBranch.hocDoNotAppearPredicate(${GetComponentName.method(WrappedComponent)})`;
	return result;
}

// частный случай doNotAppearPredicateHoc
export const doNotAppearConditionHoc: RB.DoNotAppearConditionHocT = <
	T extends React.ComponentType<any>,
>(
	WrappedComponent: T,
): React.ComponentType<RB.WithConditionalBranchProps<T>> => {

	const result = doNotAppearPredicateHoc<T, RB.ConditionalBranchProps>(WrappedComponent, (props) => props.doNotAppear);
	result.displayName = `ReactBranch.hocDoNotAppearCondition(${GetComponentName.method(WrappedComponent)})`;
	return result;
};