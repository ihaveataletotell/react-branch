import * as React from 'react';
import {VC} from 'src';

declare namespace VC {
	interface StyledProps extends WrapProps, WithClass, WithStyle, WithSlot {
	}

	interface FullProps<T extends HTMLElement = HTMLDivElement> extends WrapProps, React.HTMLAttributes<T>, WithRootRef<T> {
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

	interface BranchProps {
		children: [React.ReactNode, React.ReactNode];
		if: boolean;
	}
}

export = VC;
export as namespace VC;