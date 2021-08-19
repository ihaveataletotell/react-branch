import * as React from 'react';

const getComponentName = (Component: React.ComponentType): string => {
	return Component.name || Component.displayName || 'Component';
}

interface PredicateProps {
	slotDoNotMount?: React.ReactNode;
}

type WithPredicateProps<T extends React.ComponentType<any>, P extends PredicateProps> = React.ComponentProps<T> & P;

export const predicateHoc = <
	T extends React.ComponentType<any>,
	P extends PredicateProps,
>(
	WrappedComponent: T,
	predicate: (props: WithPredicateProps<T, P>) => boolean,
): React.ComponentType<WithPredicateProps<T, P>> => {

	const result = function (props: WithPredicateProps<T, P>): React.ReactElement | null {
		if (predicate(props)) return props.slotDoNotMount || null;
		return <WrappedComponent {...props} />;
	}

	result.displayName = `predicateHoc(${getComponentName(WrappedComponent)})`;
	return result;
}

interface MountBranchProps extends PredicateProps {
	doNotMount?: boolean;
}

type WithMountBranchProps<T extends React.ComponentType<any>> = React.ComponentProps<T> & MountBranchProps;

// частный случай predicateHoc
export const mountBranchHoc = <
	T extends React.ComponentType<any>,
>(
	WrappedComponent: T,
): React.ComponentType<WithMountBranchProps<T>> => {

	const result = predicateHoc<T, MountBranchProps>(WrappedComponent, (props) => props.doNotMount);
	result.displayName = `mountBranchHoc(${getComponentName(WrappedComponent)})`;
	return result;
};