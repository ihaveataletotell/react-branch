import * as React from 'react';
import * as RB from '../lib/main';

const getComponentName = (Component: React.ComponentType): string => {
	return Component.name || Component.displayName || 'Component';
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

	result.displayName = `predicateHoc(${getComponentName(WrappedComponent)})`;
	return result;
}

// частный случай doNotAppearPredicateHoc
export const doNotAppearConditionHoc: RB.DoNotAppearConditionHocT = <
	T extends React.ComponentType<any>,
>(
	WrappedComponent: T,
): React.ComponentType<RB.WithConditionalBranchProps<T>> => {

	const result = doNotAppearPredicateHoc<T, RB.ConditionalBranchProps>(WrappedComponent, (props) => props.doNotAppear);
	result.displayName = `mountBranchHoc(${getComponentName(WrappedComponent)})`;
	return result;
};