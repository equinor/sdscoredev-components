import buildQuery, { ITEM_ROOT } from 'odata-query';

interface Filter {
    [index: string]: any;
}

interface FilterParserConfiguration {
    logging: boolean;
    defaultPagination: string;
}

class FilterParser {
    filter: Filter;

    sort: string;

    pagination: any;

    params: URLSearchParams;

    logging: boolean;

    constructor(params: URLSearchParams, config: FilterParserConfiguration) {
        this.filter = {};
        this.params = params;
        this.logging = config.logging || false;
        this.sort = '';
        this.pagination = this.getPagination(config.defaultPagination) || {};
        this.init();
    }

    getParsedUrlFilter() {
        try {
            // eslint-disable-next-line no-restricted-globals
            const params = new URLSearchParams(location.search);
            const value = params.get('filter');

            if (value) {
                const str = value.toString();
                const decoded = decodeURIComponent(str);
                const parsed = JSON.parse(decoded);
                if (parsed) return parsed;
            }
        } catch (err) {
            console.log(err);
        }

        return null;
    }

    init() {
        if (this.logging) {
            console.log('\u257E'.repeat(80));
        }

        this.params.forEach((value: any, key: string, _searchParams: URLSearchParams) => {
            if (this.logging) {
                console.log(`QUERY: ${key}=${value}`);
            }

            if (key === 'sort') {
                this.sort = this.getSort(value);
            } else if (key === 'pagination') {
                this.pagination = this.getPagination(value);
            } else {
                this.filter = this.getParsedUrlFilter();
            }
        });

        return this;
    }

    parse = () => {
        const payload = Object.keys(this.filter).map((x: any) => {
            return this.filter[x];
        });

        let query = buildQuery({ filter: payload, orderBy: this.sort, ...this.pagination });

        // TODO: Implement this rewrite later
        // const i = query.indexOf('any(technicalobjects');

        // if (i !== -1) {
        //     const re = /(\(technicalobjects)/g;
        //     query = query.replace(re, '(i');
        // }

        // const j = query.indexOf('any(technicalobject/childtechnicalobjects');

        // if (j !== -1) {
        //     const re = /(\(technicalobject\/childtechnicalobjects)/g;
        //     query = query.replace(re, '(p');
        //     const te = /(:technicalobject\/childtechnicalobjects)/g;
        //     query = query.replace(te, ':p');
        // }

        query = this.stripSingleQuoteFromDateTime(query);

        return query;
    };

    /**
     * Strip single quotes from date/time values in a query string.
     *
     * @param {string} query The query string to process.
     * @returns {string} The processed query string with single quotes removed from date/time values.
     */
    private stripSingleQuoteFromDateTime = (query: string): string => {
        const regex = / ge [\w\d\S]*| le [\w\d\S]*/gi;
        return query.replace(regex, (match: any) => match.replaceAll("'", ''));
    };

    /**
     * Handler for url query param that has key `sort`.
     * Will be treated as sorting
     * @param value A string `ascending` or `descending`
     * @returns FilterParser
     */
    private getSort = (value: any) => {
        const values = value.split(',');
        const order = values[1] === 'ascending' ? 'asc' : 'desc';
        const sort = values[0].replace(/\./g, '/');
        if (this.logging) {
            console.log('  \u25CB SORT: ', `${sort} ${order}`);
        }

        return `${sort} ${order}`;
    };

    /**
     * Handler for url query param that has key `pagination`.
     * Will be treated as sorting
     * @param value An array: `[page, rowsPerPage]`
     * @returns FilterParser
     */
    private getPagination = (value: any) => {
        const values = value.split(',');
        const top = parseFloat(values[1]);
        const skip = parseFloat(values[1]) * (parseFloat(values[0]) - 1); // -1 because Odata send param skip=0 when on first page.
        if (this.logging) {
            console.log('  \u25CB PAGINATION: ', { skip, top });
        }

        return { skip, top };
    };
}

export default FilterParser;
