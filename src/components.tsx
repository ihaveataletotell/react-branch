import * as React from 'react';
import * as RB from '../lib/main';

// Если doNotRender == true, для всех чайлдов компонента:
// будет выполнен вызов React.createElement
// не будет создан их this (если это класс)
// не будут вызваны методы жизненного цикла
function ConditionalComponentWrapper(props: RB.WrapProps): React.ReactNode | null {
	if (props.doNotRender) return props.slotDoNotRender || null;
	return props.children;
}
// ConditionalComponentWrapper.displayName = 'ConditionalComponentWrapper';

function ConditionalComponent(props: RB.MainProps): React.ReactNode | null {
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
// ConditionalComponent.displayName = 'ConditionalComponent';

function ConditionalComponentIfChildren(props: RB.MainProps): React.ReactElement | null {
	if (!props.children) return null;

	return (
		<CCMain {...props} />
	);
}
// ConditionalComponentIfChildren.displayName = 'ConditionalComponentIfChildren';

function ConditionalComponentBranch(props: RB.BranchProps): React.ReactNode {
	if (props.condition) return props.children[0];
	return props.children[1];
}
// ConditionalComponentBranch.displayName = 'ConditionalComponentBranch';

export const CCWrap = ConditionalComponentWrapper as React.FunctionComponent<RB.WrapProps>;
export const CCMain = React.memo(ConditionalComponent as React.FunctionComponent<RB.MainProps>);
export const CCIfChildren = ConditionalComponentIfChildren as React.FunctionComponent<RB.MainProps>;
export const CCIfElse = ConditionalComponentBranch as React.FunctionComponent<RB.BranchProps>;
