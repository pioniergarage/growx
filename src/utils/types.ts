import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<P = object> = NextPage<P> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

export type Consumer<T> = (value: T) => void;
