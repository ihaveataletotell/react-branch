import * as React from 'react';

declare global {
	interface VCProps extends VCWrapProps, VCWithClass, VCWithStyle, VCWithSlot {
	}

	interface VCFullProps<T extends HTMLElement = HTMLDivElement> extends VCWrapProps, React.HTMLAttributes<T>, VCWithRootRef<T> {
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
		slotDoNotRender?: React.ReactNode;
	}

	interface VCBranchProps {
		children: [React.ReactNode, React.ReactNode];
		if: boolean;
	}
}