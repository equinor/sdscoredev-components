import { CompactDialog as CompactDialogBase, CompactDialogProps, CompactDialogRef } from './CompactDialog';
import { CompactDialogAction } from './CompactDialogAction';

type CompactDialogCompound = typeof CompactDialogBase & {
    Actions: typeof CompactDialogAction;
};

const CompactDialog = CompactDialogBase as CompactDialogCompound;

CompactDialog.Actions = CompactDialogAction;

CompactDialog.Actions.displayName = 'CompactDialog.Actions';

export { CompactDialog };

// export Props and Types
export { CompactDialogProps, CompactDialogRef };
