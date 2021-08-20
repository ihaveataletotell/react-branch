import * as React from 'react';
import * as VC from 'lib/types';

// Если doNotRender == true, для всех чайлдов компонента:
// будет выполнен вызов React.createElement
// не будет создан их this (если это класс)
// не будут вызваны методы жизненного цикла
function VisualComponentWrapper(props: VC.WrapProps): React.ReactNode | null {
	if (props.doNotRender) return props.slotDoNotRender || null;
	return props.children;
}

function VisualComponentStyled(props: VC.StyledProps): React.ReactNode | null {
	if (props.doNotRender) return props.slotDoNotRender || null;

	return (
		<div
			children={props.children}
			className={props.className}
			style={props.style}
		/>
	);
}

function VisualComponentFull(props: VC.FullProps): React.ReactNode | null {
	if (props.doNotRender) return props.slotDoNotRender || null;

	const DynamicJsxConstructor: any = (props.tagName || 'div');
	// необходимо извлечь собственные пропсы, чтобы они не попадали в конструктор jsx dom элемента
	const {doNotRender, slotDoNotRender, tagName, rootRef, ...next} = props;

	return (
		<DynamicJsxConstructor
			ref={props.rootRef}
			{...next}
		/>
	);
}

function VisualComponentIfChildren(props: VC.StyledProps): React.ReactElement | null {
	if (!props.children) return null;

	return (
		<VCStyled {...props} />
	);
}

function VisualComponentBranch(props: VC.BranchProps): React.ReactNode {
	if (props.if) return props.children[0];
	return props.children[1];
}

export const VCWrap = VisualComponentWrapper;
export const VCStyled = React.memo(VisualComponentStyled as React.FunctionComponent<VC.StyledProps>);
export const VCFull = React.memo(VisualComponentFull as React.FunctionComponent<VC.FullProps>);
export const VCIfChildren = VisualComponentIfChildren;
export const VCBranch = VisualComponentBranch;
