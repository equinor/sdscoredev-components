import { CompactDialog as BaseCompactDialog } from './CompactDialog';
import type { CompactDialogRef } from './CompactDialog';
import { CompactDialogAction } from './CompactDialogAction';

type CompactDialogCompound = typeof BaseCompactDialog & {
    Actions: typeof CompactDialogAction;
};

const CompactDialog = BaseCompactDialog as CompactDialogCompound;

CompactDialog.Actions = CompactDialogAction;

CompactDialog.Actions.displayName = 'CompactDialog.Actions';

export { CompactDialog };

// export Props and Types
export { CompactDialogRef };
