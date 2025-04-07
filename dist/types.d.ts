type LinkifyConfig = {
    labelText?: string;
    labelURL?: string;
    placeholderText?: string;
    placeholderURL?: string;
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
};
