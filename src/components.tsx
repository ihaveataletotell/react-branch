import * as React from 'react';
import * as RBC from '../lib/main';

// Если doNotRender == true, для всех чайлдов компонента:
// будет выполнен вызов React.createElement
// не будет создан их this (если это класс)
// не будут вызваны методы жизненного цикла
function ConditionalComponentWrapper(props: RBC.WrapProps): React.ReactNode | null {
	if (props.doNotRender) return props.slotDoNotRender || null;
	return props.children;
}

function ConditionalComponent(props: RBC.MainProps): React.ReactNode | null {
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

function ConditionalComponentIfChildren(props: RBC.MainProps): React.ReactElement | null {
	if (!props.children) return null;

	return (
		<CCMain {...props} />
	);
}

function ConditionalComponentBranch(props: RBC.BranchProps): React.ReactNode {
	if (props.condition) return props.children[0];
	return props.children[1];
}

export const CCWrap = ConditionalComponentWrapper as React.FunctionComponent<RBC.WrapProps>;
export const CCMain = React.memo(ConditionalComponent as React.FunctionComponent<RBC.MainProps>);
export const CCIfChildren = ConditionalComponentIfChildren as React.FunctionComponent<RBC.MainProps>;
export const CCIfElse = ConditionalComponentBranch as React.FunctionComponent<RBC.BranchProps>;
