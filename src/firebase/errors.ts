
export type SecurityRuleContext = {
    path: string;
    operation: 'get' | 'list' | 'create' | 'update' | 'delete';
    requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
    public context: SecurityRuleContext;

    constructor(context: SecurityRuleContext) {
        const message = `FirestoreError: Missing or insufficient permissions: The following request was denied by Firestore Security Rules:\n${JSON.stringify(context, null, 2)}`;
        super(message);
        this.name = 'FirestorePermissionError';
        this.context = context;
        
        // This is to make the error visible in the Next.js development overlay
        // by attaching the stack trace of the original error location.
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, FirestorePermissionError);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}
