export type BuildSearchparamsProps = {
    searchParams:  Record<string ,  string>;
};

export default function BuildSearchparams({ searchParams }: BuildSearchparamsProps) {
    const params = new URLSearchParams();
    if (!searchParams) return params;
    Object.entries(searchParams).forEach(([key, value]) => {
        if (typeof value === 'string') {
            params.set(key, value);
        }
    });
    return params;
}
