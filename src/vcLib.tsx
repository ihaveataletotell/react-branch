import * as React from 'react';

// Если doNotRender == true, для всех чайлдов компонента:
// будет выполнен вызов React.createElement
// не будет создан их this (если это класс)
// не будут вызваны методы жизненного цикла
function VisualComponentWrapper(props: VCWrapProps): React.ReactNode | null {
	if (props.doNotRender) return props.slotDoNotRender || null;
	return props.children;
}

function VisualComponent(props: VCProps): React.ReactNode | null {
	if (props.doNotRender) return props.slotDoNotRender || null;

	return (
		<div
			children={props.children}
			className={props.className}
			style={props.style}
		/>
	);
}

function VisualComponentFull(props: VCFullProps): React.ReactNode | null {
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

function VisualComponentIfChildren(props: VCFullProps): React.ReactElement | null {
	if (!props.children) return null;

	return (
		<VC {...props} />
	);
}

function VisualComponentBranch(props: VCBranchProps): React.ReactNode {
	if (props.if) return props.children[0];
	return props.children[1];
}

export const VCWrap = VisualComponentWrapper;
export const VC = React.memo(VisualComponent as React.FunctionComponent<VCProps>);
export const VCFull = React.memo(VisualComponentFull as React.FunctionComponent<VCFullProps>);
export const VCIfChildren = VisualComponentIfChildren;
export const VCBranch = VisualComponentBranch;
