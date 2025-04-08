type LinkifyConfig = {
    labelText?: string;
    labelURL?: string;
    placeholderText?: string;
    placeholderURL?: string;
    container?: HTMLElement;
    classNames?: {
        tooltip?: string;
        label?: string;
        input?: string;
        submit?: string;
        remove?: string;
    };
    styles?: {
        tooltip?: Partial<CSSStyleDeclaration>;
        label?: Partial<CSSStyleDeclaration>;
        input?: Partial<CSSStyleDeclaration>;
        submit?: Partial<CSSStyleDeclaration>;
        remove?: Partial<CSSStyleDeclaration>;
    };
    attributes?: { [key: string | number | symbol ]: any };
    done?: () => void
};

