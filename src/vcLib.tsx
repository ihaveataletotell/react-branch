import * as React from 'react';

// VisualComponentWrapper
// для полного понимания этой библиотеки достаточно понять логику работы этого компонента
export function VCWrap(props: VCWrapProps): React.ReactElement | null {
	// Для всех чайлдов будет выполнен React.createElement, но НЕ БУДЕТ: создан их this (если это класс), вызван render и дальнейший лайфсайкл
	if (props.doNotRender) return props.fallback || null;
	return <>{props.children}</>;
}

export const VCIfChildren = function VCIfChildren(props: VCProps): React.ReactElement | null {
	if (!props.children) return null;
	return <VC {...props} />;
};

export const VCIfElse = React.memo(
	function VCIf(props: VCIfProps): React.ReactElement {
		if (props.if) return props.children[0];
		return props.children[1];
	}
);

export const VC = React.memo(
	function VC(props: VCProps): React.ReactElement | null {
		if (props.doNotRender) return props.fallback || null;
		const Component: any = (props.tagName || 'div');

		const {doNotRender, fallback, tagName, rootRef, ...next} = props;

		return (
			<Component
				ref={props.rootRef}
				{...next}
			/>
		);
	}
);

declare global {
	interface VCProps<T extends HTMLElement = HTMLDivElement> extends VCWrapProps, React.HTMLAttributes<T> {
		rootRef?: React.Ref<T>;
		tagName?: string;
	}

	interface VCWithDoNotRender {
		doNotRender?: boolean;
	}

	interface VCWithRootRef<T> {
		rootRef?: React.Ref<T>;
	}

	interface VCWithStyle {
		style?: React.CSSProperties;
	}

	interface VCWithClass {
		className?: string;
	}

	interface VCWithSlot<T = React.ReactNode> {
		children?: T;
	}

	interface VCWrapProps extends VCWithDoNotRender, VCWithSlot {
		fallback?: JSX.Element;
	}

	interface VCIfProps {
		children: [React.ReactElement, React.ReactElement];
		if: boolean;
	}
}
