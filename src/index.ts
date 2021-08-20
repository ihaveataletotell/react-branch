import * as vcLib from 'src/components';
import * as hocs from './hocs';

export namespace VC {
	export const Styled = vcLib.VCStyled;
	export const Wrap = vcLib.VCWrap;
	export const Full = vcLib.VCFull;
	export const IfChildren = vcLib.VCIfChildren;
	export const Branch = vcLib.VCBranch;

	export const hocPredicate = hocs.predicateHoc;
	export const hocMountBranch = hocs.mountBranchHoc;
}