import * as React from 'react';
import { FormContext } from '../context';
import { composeRef } from '../util';

export default function useItemRef() {
    // const { itemRef } = React.useContext(FormContext);
    const cacheRef = React.useRef<{
        name?: string;
        originRef?: React.Ref<any>;
        ref?: React.Ref<any>;
    }>({});

    function getRef(name: any, children: any) {
        const childrenRef: React.Ref<React.ReactElement> =
            children && typeof children === 'object' && children.ref;
        // const nameStr = name.join('_');
        const nameStr = name;
        if (cacheRef.current.name !== nameStr || cacheRef.current.originRef !== childrenRef) {
            cacheRef.current.name = nameStr;
            cacheRef.current.originRef = childrenRef;
            // let vvv = itemRef(name);
            // cacheRef.current.ref = composeRef(itemRef(name), childrenRef);
        }

        return cacheRef.current.ref;
    }

    return getRef;
}