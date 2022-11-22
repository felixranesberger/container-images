type ResponsiveImage = {
    [key: string]: {
        webp?: string,
        jpg?: string,
    },
};

const kebabize = (str: string) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())

export default (images: HTMLElement[]) => {
    images.forEach((image) => {
        const source = image.querySelector('source') as HTMLSourceElement | null;
        if (source === null) throw new Error('No source element found');

        let resources: ResponsiveImage = {};

        Object.entries(source.dataset)
            .map(([key, value]) => [kebabize(key), value])
            .filter(([key]) => {
                if (key === undefined) return false;
                return key.startsWith('source-')
            })
            .map(([key, value]) => [key.replace('source-', ''), value])
            .forEach(([width, url]) => {
                if (!width || !url) return;

                if (resources[width] === undefined) {
                    resources[width] = {};
                }

                resources[width] = url;
            });

        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                const { width: imageWidth } = entry.contentRect;

                // sort resources desc, default key comes last
                const sortedResources = Object.entries(resources)
                    .sort((a, b) => {
                        if (a[0] === 'default') return 1;
                        if (b[0] === 'default') return -1;

                        return parseInt(b[0]) <= parseInt(a[0]) ? -1 : 1;
                    });

                // get first resource that is larger than the image width
                const result = sortedResources.find(([width]) => {
                    return parseInt(width) <= imageWidth;
                });

                console.log(1669126698024, result);

                if (result === undefined) {
                    source.srcset = resources['default'];
                    return;
                }

                const [, url] = result;

                source.srcset = url;
            });
        });

        const img = image.querySelector('img');
        if (img === null) throw new Error('No img element found');
        resizeObserver.observe(img);
    });
};
