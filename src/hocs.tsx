import * as React from 'react';

const getComponentName = (Component: React.ComponentType): string => {
	return Component.name || Component.displayName || 'Component';
}

interface PredicateProps {
	slotDoNotAppear?: React.ReactNode;
}

type WithPredicateProps<T extends React.ComponentType<any>, P extends PredicateProps> = React.ComponentProps<T> & P;

export const doNotAppearPredicateHoc = <
	T extends React.ComponentType<any>,
	P extends PredicateProps,
>(
	WrappedComponent: T,
	predicate: (props: WithPredicateProps<T, P>) => boolean,
): React.ComponentType<WithPredicateProps<T, P>> => {

	const result = function (props: WithPredicateProps<T, P>): React.ReactElement | null {
		if (predicate(props)) return props.slotDoNotAppear || null;
		return <WrappedComponent {...props} />;
	}

	result.displayName = `predicateHoc(${getComponentName(WrappedComponent)})`;
	return result;
}

interface ConditionalBranchProps extends PredicateProps {
	doNotAppear?: boolean;
}

type WithConditionalBranchProps<T extends React.ComponentType<any>> = React.ComponentProps<T> & ConditionalBranchProps;

// частный случай doNotAppearPredicateHoc
export const doNotAppearConditionHoc = <
	T extends React.ComponentType<any>,
>(
	WrappedComponent: T,
): React.ComponentType<WithConditionalBranchProps<T>> => {

	const result = doNotAppearPredicateHoc<T, ConditionalBranchProps>(WrappedComponent, (props) => props.doNotAppear);
	result.displayName = `mountBranchHoc(${getComponentName(WrappedComponent)})`;
	return result;
};