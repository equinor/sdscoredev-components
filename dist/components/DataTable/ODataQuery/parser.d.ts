interface Filter {
    [index: string]: any;
}
interface FilterParserConfiguration {
    logging: boolean;
    defaultPagination: string;
}
declare class FilterParser {
    filter: Filter;
    sort: string;
    pagination: any;
    params: URLSearchParams;
    logging: boolean;
    any: boolean;
    or: boolean;
    constructor(params: URLSearchParams, config: FilterParserConfiguration);
    init(): this;
    composeQuery: (obj: any) => any;
    parse: () => string;
    private stripSingleQuoteFromDateTime;
    /**
     * Check if url query value contains a comma character, then it will
     * be treated as an array.
     * @param value url query param value
     * @returns FilterParser
     */
    isCommaSeparatedString: (value: string) => boolean;
    stdTimezoneOffset: () => number;
    isDstObserved: (today: Date) => boolean;
    isDateString: (str: any) => boolean;
    private getFilter;
    /**
     * Handler for url query param that has a key that contain a `>` character at the end.
     * Will be treated as a `greater than` value in odata
     * @param value url query param value. Accepts `number` or `yyyy-MM-dd`
     * @param key url query param key
     * @returns FilterParser
     */
    private getGreaterThanFilter;
    /**
     * Handler for url query param that has a key that contain a `<` character at the end.
     * Will be treated as a `lesser than` value in odata
     * @param value url query param value. Accepts `number` or `yyyy-MM-dd`
     * @param key url query param key
     * @returns FilterParser
     */
    private getLesserThanFilter;
    /**
     * Handler for url query param that has no special characters.
     * Will be treated as an `equal` value in odata
     * @param value url query param value.
     * @param key url query param key
     * @returns FilterParser
     */
    private getDefaultFilter;
    /**
     * Handler for url query param that has a key that contain `[]` character at the end.
     * Will be treated as an `and array` value in odata
     * @param value url query param value
     * @param key url query param key
     * @returns FilterParser
     */
    private getArrayFilter;
    /**
     * Handler for url query param that has a key that contain `[str]` character at the end.
     * Will be treated as an `and array` value with strings in odata
     * @param value url query param value
     * @param key url query param key
     * @returns FilterParser
     */
    private getStringArrayFilter;
    /**
     * Handler for url query param that has a value that contain `|` character.
     * Will be treated as an `or array` value in odata
     * @param value url query param value. An array with objects
     * @param key url query param key
     * @returns FilterParser
     */
    private getOrArrayFilter;
    /**
     * Handler for url query param that has a value that beginns and ends with `*` character.
     * Will be treated as a `contains` value in odata
     * @param value url query param value.
     * @param key url query param key
     * @returns FilterParser
     */
    private getContainsFilter;
    /**
     * Handler for url query param that has key `sort`.
     * Will be treated as sorting
     * @param value A string `ascending` or `descending`
     * @returns FilterParser
     */
    private getSort;
    /**
     * Handler for url query param that has key `pagination`.
     * Will be treated as sorting
     * @param value An array: `[page, rowsPerPage]`
     * @returns FilterParser
     */
    private getPagination;
    /**
     * Converts the url query param key to an array. If the key is `trigger.id`,
     * this function will return an array `["trigger", "id"]`.
     * @param value url query param key
     * @returns Array<string>
     */
    private parseKeys;
    private parseArray;
    private parseStringArray;
    /**
     * Appends `key=>value` pairs to the result. In the loop it will check if
     * we will wrap the key with `any`, that is if the key in the url query begins with char `*`
     * @param key string, example: `labels.id`
     * @param result Filter
     * @returns
     */
    private appendKeys;
}
export default FilterParser;
