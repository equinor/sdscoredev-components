import React from 'react';
export declare const useForm: (defaultData: any, props: any) => {
    data: any;
    submit: () => void;
    update: (e: React.ChangeEvent<HTMLInputElement>) => void;
    cancel: () => void;
    valid: () => any;
};
