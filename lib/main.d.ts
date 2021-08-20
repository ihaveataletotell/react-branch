import * as React from 'react';
import * as vcLib from '../src/components';
import * as hocs from '../src/hocs';

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

declare namespace VC {
	export const Styled = vcLib.VCStyled;
	export const Wrap = vcLib.VCWrap;
	export const Full = vcLib.VCFull;
	export const IfChildren = vcLib.VCIfChildren;
	export const Branch = vcLib.VCBranch;

	export const hocPredicate = hocs.predicateHoc;
	export const hocMountBranch = hocs.mountBranchHoc;
}

export = VC;
export as namespace VC;