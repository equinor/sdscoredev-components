/* eslint-disable no-cond-assign */
/* eslint-disable no-const-assign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
import buildQuery, { ITEM_ROOT } from 'odata-query';
import f from 'odata-filter-builder';
import { mergeAdvanced } from 'object-merge-advanced';

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

    any: boolean;

    or: boolean;

    constructor(params: URLSearchParams, config: FilterParserConfiguration) {
        this.filter = {};
        this.params = params;
        this.logging = config.logging || false;
        this.sort = '';
        this.pagination = this.getPagination(config.defaultPagination) || {};
        this.any = false;
        this.or = false;

        this.init();
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
                this.filter = mergeAdvanced(this.filter, this.getFilter(value, key), {});
            }
        });

        return this;
    }

    composeQuery = (obj: any) => {
        const run = (obj: any) => {
            for (const k in obj) {
                if (typeof obj[k] === 'object') {
                    // Only wrap with `and` if child object contains multiple objects and the current parse is not `or`
                    // TODO: try refactor this.or
                    if (Object.keys(obj[k]).length > 1 && typeof Object.values(obj[k])[0] === 'object' && !this.or) {
                        const m = { and: obj[k] };
                        obj[k] = m;
                        run(obj[k].and);
                    } else {
                        run(obj[k]);
                    }
                }
            }
        };

        run(obj);
        return obj;
    };

    parse = () => {
        if (this.filter) {
            this.filter = this.composeQuery(this.filter);
        }

        let query = buildQuery({ filter: this.filter, orderBy: this.sort, ...this.pagination });
        query = this.stripSingleQuoteFromDateTime(query);

        if (this.logging) {
            console.log('  \u25C9 OUTPUT: ', query);
        }

        return query;
    };

    private stripSingleQuoteFromDateTime = (query: string) => {
        const regex = / ge [\w\d\S]*| le [\w\d\S]*/gi;
        return query.replace(regex, (match: any) => match.replaceAll("'", ''));
    };

    /**
     * Check if url query value contains a comma character, then it will
     * be treated as an array.
     * @param value url query param value
     * @returns FilterParser
     */
    isCommaSeparatedString = (value: string) => value.includes(',');

    stdTimezoneOffset = () => {
        const jan = new Date(0, 1);
        const jul = new Date(6, 1);
        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    };

    isDstObserved = (today: Date) => today.getTimezoneOffset() < this.stdTimezoneOffset();

    isDateString = (str: any): boolean => {
        if (typeof str !== 'string') return false;
        // TODO: Some values must fit with maximum months and days of month.
        const regex = /^(19|20)[0-9][0-9]-[0-1][0-9]-[0-3][0-9]$/g;
        const found = str.match(regex);
        if (found) return true;

        return false;
    };

    private getFilter(value: any, key: string) {
        if (key.startsWith('*')) {
            key = key.slice(1);
            this.any = true;
        } else if (key.includes('|')) {
            this.or = true;
        } else {
            this.any = false;
        }

        if (key.endsWith('>')) {
            return this.getGreaterThanFilter(value, key);
        }

        if (key.endsWith('<')) {
            return this.getLesserThanFilter(value, key);
        }

        if (key.endsWith('[]')) {
            return this.getArrayFilter(value, key);
        }

        if (key.endsWith('[str]')) {
            return this.getStringArrayFilter(value, key);
        }

        if (value.includes('|')) {
            return this.getOrArrayFilter(value, key);
        }

        if (value.endsWith('*') && value.startsWith('*')) {
            return this.getContainsFilter(value, key);
        }

        return this.getDefaultFilter(value, key);
    }

    /**
     * Handler for url query param that has a key that contain a `>` character at the end.
     * Will be treated as a `greater than` value in odata
     * @param value url query param value. Accepts `number` or `yyyy-MM-dd`
     * @param key url query param key
     * @returns FilterParser
     */
    private getGreaterThanFilter(value: any, key: string) {
        // Removes the '>' at the end
        key = key.slice(0, -1);

        if (this.isDateString(value)) {
            value = new Date(value);
            const dts = this.isDstObserved(value) ? 0 : 60;
            value = new Date(value.valueOf() + (value.getTimezoneOffset() - dts) * 60 * 1000).toISOString();
        } else {
            value = parseFloat(value);
        }

        const result: Filter = { ge: value };
        return this.appendKeys(key, result);
    }

    /**
     * Handler for url query param that has a key that contain a `<` character at the end.
     * Will be treated as a `lesser than` value in odata
     * @param value url query param value. Accepts `number` or `yyyy-MM-dd`
     * @param key url query param key
     * @returns FilterParser
     */
    private getLesserThanFilter(value: any, key: string) {
        // Removes the '<' at the end
        key = key.slice(0, -1);

        if (this.isDateString(value)) {
            value = new Date(value);
            const dts = this.isDstObserved(value) ? 0 : 60;
            value = new Date(value.valueOf() - (value.getTimezoneOffset() - dts) * 60 * 1000).toISOString();
        } else {
            value = parseFloat(value);
        }

        const result: Filter = { le: value };
        return this.appendKeys(key, result);
    }

    /**
     * Handler for url query param that has no special characters.
     * Will be treated as an `equal` value in odata
     * @param value url query param value.
     * @param key url query param key
     * @returns FilterParser
     */
    private getDefaultFilter(value: any, key: string) {
        // eslint-disable-next-line no-nested-ternary
        value = value === 'true' ? true : value === 'false' ? false : value;
        return this.appendKeys(key, value);
    }

    /**
     * Handler for url query param that has a key that contain `[]` character at the end.
     * Will be treated as an `and array` value in odata
     * @param value url query param value
     * @param key url query param key
     * @returns FilterParser
     */
    private getArrayFilter(value: any, key: string) {
        // Removes '[]' at the end
        key = key.slice(0, -2);
        const result: Filter = { in: this.parseArray(value) };

        return this.appendKeys(key, result);
    }

    /**
     * Handler for url query param that has a key that contain `[str]` character at the end.
     * Will be treated as an `and array` value with strings in odata
     * @param value url query param value
     * @param key url query param key
     * @returns FilterParser
     */
    private getStringArrayFilter(value: any, key: string) {
        // Removes '[str]' at the end
        key = key.slice(0, -5);
        const result: Filter = { in: this.parseStringArray(value) };

        return this.appendKeys(key, result);
    }

    /**
     * Handler for url query param that has a value that contain `|` character.
     * Will be treated as an `or array` value in odata
     * @param value url query param value. An array with objects
     * @param key url query param key
     * @returns FilterParser
     */
    private getOrArrayFilter(value: any, key: string) {
        this.or = true;
        const values = value.split('|').map((x: string) => {
            const parsed = JSON.parse(x);
            return this.getFilter(parsed[Object.keys(parsed)[0]], Object.keys(parsed)[0]);
        });
        const result: Filter = { or: values };
        return this.appendKeys(key, result);
    }

    /**
     * Handler for url query param that has a value that beginns and ends with `*` character.
     * Will be treated as a `contains` value in odata
     * @param value url query param value.
     * @param key url query param key
     * @returns FilterParser
     */
    private getContainsFilter(value: any, key: string) {
        value = value.substring(1, value.length - 1);
        let result: Filter = [...new Set(key.split('|').map((x: any) => ({ [`tolower(${x})`]: { contains: value } })))];
        return this.appendKeys(ITEM_ROOT, { or: result });

        // const g = f('or')

        // key.split('|').forEach(x => {
        //     g.contains(y => y.toLower(x), value.toLowerCase());
        // })

        // return g.toString()
    }

    /**
     * Handler for url query param that has key `sort`.
     * Will be treated as sorting
     * @param value A string `ascending` or `descending`
     * @returns FilterParser
     */
    private getSort = (value: any) => {
        const values = value.split(',');
        const order = values[1] === 'ascending' ? 'asc' : 'desc';

        if (this.logging) {
            console.log('  \u25CB SORT: ', `${values[0].replace('.', '/')} ${order}`);
        }

        return `${values[0].replace('.', '/')} ${order}`;
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

    /**
     * Converts the url query param key to an array. If the key is `trigger.id`,
     * this function will return an array `["trigger", "id"]`.
     * @param value url query param key
     * @returns Array<string>
     */
    private parseKeys = (value: string): Array<string> => {
        const items = value.split('.');
        return items.length > 0 ? items : [value];
    };

    private parseArray = (value: any): Array<string> => {
        const items = value.split(',');

        if (items.length > 0) {
            const parsed = items.map((x: any) => (!isNaN(x) ? parseFloat(x) : x));
            return parsed;
        }

        return !isNaN(value) ? parseFloat(value) : value;
    };

    private parseStringArray = (value: any): Array<string> => {
        const items = value.split(',');

        if (items.length > 0) {
            return items;
        }

        return value;
    };

    /**
     * Appends `key=>value` pairs to the result. In the loop it will check if
     * we will wrap the key with `any`, that is if the key in the url query begins with char `*`
     * @param key string, example: `labels.id`
     * @param result Filter
     * @returns
     */
    private appendKeys(key: string, result: Filter) {
        const keys = this.parseKeys(key);
        const n = keys.length;

        for (let i = n - 1; i >= 0; i--) {
            if (i === 0 && this.any) {
                result = { [keys[i]]: { any: result } };
            } else {
                result = { [keys[i]]: result };
            }
        }

        if (this.logging) {
            console.log('  \u25CB PARSED: ', result);
        }

        return result;
    }
}

export default FilterParser;
