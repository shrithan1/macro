declare const CorporateActions: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL,TSLA"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of symbols.";
                };
                readonly types: {
                    readonly type: "string";
                    readonly examples: readonly ["forward_split,reverse_split"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of types. If not provided, search all types.\n\nThe following types are supported:\n  - reverse_split\n  - forward_split\n  - unit_split\n  - cash_dividend\n  - stock_dividend\n  - spin_off\n  - cash_merger\n  - stock_merger\n  - stock_and_cash_merger\n  - redemption\n  - name_change\n  - worthless_removal\n  - rights_distribution\n";
                };
                readonly start: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly examples: readonly ["2024-08-14"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive start of the interval. Format: YYYY-MM-DD. Default: current day.\n";
                };
                readonly end: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly examples: readonly ["2024-08-25"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive end of the interval. Format: YYYY-MM-DD. Default: current day.\n";
                };
                readonly ids: {
                    readonly type: "string";
                    readonly examples: readonly ["1dbc7685-9517-4a77-a236-8527d49cefdc,f8489167-4e4b-431d-a0be-6017ae1cf08a"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of corporate action IDs. This parameter is mutually exclusive with all other filters (symbols, types, start, end).\n";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 1000;
                    readonly default: 100;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Maximum number of corporate actions to return in a response.\nThe limit applies to the total number of data points, not the count per symbol!\nUse `next_page_token` to fetch the next set of corporate actions.\n";
                };
                readonly page_token: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The pagination token from which to continue. The value to pass here is returned in specific requests when more data is available, usually because of a response result limit.\n";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly description: "Sort data in ascending or descending order.";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "asc";
                    readonly "x-go-name": "TypeSort";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly corporate_actions: {
                    readonly type: "object";
                    readonly properties: {
                        readonly reverse_splits: {
                            readonly type: "array";
                            readonly "x-go-type-skip-optional-pointer": true;
                            readonly items: {
                                readonly type: "object";
                                readonly description: "Reverse split.";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly format: "uuid";
                                        readonly description: "The internal Alpaca identifier of the corporate action.";
                                        readonly examples: readonly ["913de862-c02c-46dc-a89c-fc8779a50d30"];
                                    };
                                    readonly symbol: {
                                        readonly type: "string";
                                        readonly examples: readonly ["MNTS"];
                                    };
                                    readonly new_rate: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly examples: readonly [1];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly old_rate: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly examples: readonly [50];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly process_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The date when the corporate action is processed by Alpaca.";
                                        readonly examples: readonly ["2023-08-24"];
                                    };
                                    readonly ex_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The ex-date marks the cutoff point for shareholders to be credited.";
                                        readonly examples: readonly ["2023-08-24"];
                                    };
                                    readonly record_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly examples: readonly ["2023-08-24"];
                                    };
                                    readonly payable_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                    };
                                };
                                readonly required: readonly ["id", "symbol", "new_rate", "old_rate", "process_date", "ex_date"];
                            };
                        };
                        readonly forward_splits: {
                            readonly type: "array";
                            readonly "x-go-type-skip-optional-pointer": true;
                            readonly items: {
                                readonly type: "object";
                                readonly description: "Forward split.";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly format: "uuid";
                                        readonly description: "The internal Alpaca identifier of the corporate action.";
                                        readonly examples: readonly ["189bd849-ab9f-4b4d-aaaa-a6d415fd976d"];
                                    };
                                    readonly symbol: {
                                        readonly type: "string";
                                        readonly examples: readonly ["SRE"];
                                    };
                                    readonly new_rate: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly examples: readonly [2];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly old_rate: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly examples: readonly [1];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly process_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The date when the corporate action is processed by Alpaca.";
                                        readonly examples: readonly ["2023-08-22"];
                                    };
                                    readonly ex_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The ex-date marks the cutoff point for shareholders to be credited.";
                                        readonly examples: readonly ["2023-08-22"];
                                    };
                                    readonly record_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly examples: readonly ["2023-08-14"];
                                    };
                                    readonly payable_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly examples: readonly ["2023-08-21"];
                                    };
                                    readonly due_bill_redemption_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly examples: readonly ["2023-08-23"];
                                    };
                                };
                                readonly required: readonly ["id", "symbol", "new_rate", "old_rate", "process_date", "ex_date"];
                            };
                        };
                        readonly unit_splits: {
                            readonly type: "array";
                            readonly "x-go-type-skip-optional-pointer": true;
                            readonly items: {
                                readonly type: "object";
                                readonly description: "Unit split.";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly format: "uuid";
                                        readonly description: "The internal Alpaca identifier of the corporate action.";
                                        readonly examples: readonly ["3e68e87e-ae95-4d68-91d1-715d52ef143a"];
                                    };
                                    readonly old_symbol: {
                                        readonly type: "string";
                                        readonly examples: readonly ["TPBAU"];
                                    };
                                    readonly old_rate: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly examples: readonly [1];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly new_symbol: {
                                        readonly type: "string";
                                        readonly examples: readonly ["LVRO"];
                                    };
                                    readonly new_rate: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly examples: readonly [1];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly alternate_symbol: {
                                        readonly type: "string";
                                        readonly examples: readonly ["LVROW"];
                                    };
                                    readonly alternate_rate: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly examples: readonly [0.3333];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly process_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The date when the corporate action is processed by Alpaca.";
                                        readonly examples: readonly ["2023-03-01"];
                                    };
                                    readonly effective_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The effective date marks the cutoff point for shareholders to be credited.";
                                        readonly examples: readonly ["2023-03-01"];
                                    };
                                    readonly payable_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly examples: readonly ["2023-08-21"];
                                    };
                                };
                                readonly required: readonly ["id", "old_symbol", "old_rate", "new_symbol", "new_rate", "alternate_symbol", "alternate_rate", "process_date", "effective_date"];
                            };
                        };
                        readonly stock_dividends: {
                            readonly type: "array";
                            readonly "x-go-type-skip-optional-pointer": true;
                            readonly items: {
                                readonly type: "object";
                                readonly description: "Stock dividend.";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly format: "uuid";
                                        readonly description: "The internal Alpaca identifier of the corporate action.";
                                        readonly examples: readonly ["3ae94c30-2d37-473a-bf29-5f7b4ab6d3ca"];
                                    };
                                    readonly symbol: {
                                        readonly type: "string";
                                        readonly examples: readonly ["MSBC"];
                                    };
                                    readonly rate: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly examples: readonly [0.05];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly process_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The date when the corporate action is processed by Alpaca.";
                                        readonly examples: readonly ["2023-05-19"];
                                    };
                                    readonly ex_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The ex-date marks the cutoff point for shareholders to be credited.";
                                        readonly examples: readonly ["2023-05-19"];
                                    };
                                    readonly record_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly examples: readonly ["2023-05-22"];
                                    };
                                    readonly payable_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly examples: readonly ["2023-05-05"];
                                    };
                                };
                                readonly required: readonly ["id", "symbol", "rate", "process_date", "ex_date"];
                            };
                        };
                        readonly cash_dividends: {
                            readonly type: "array";
                            readonly "x-go-type-skip-optional-pointer": true;
                            readonly items: {
                                readonly type: "object";
                                readonly description: "Cash dividend.";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly format: "uuid";
                                        readonly description: "The internal Alpaca identifier of the corporate action.";
                                        readonly examples: readonly ["11cfd108-292e-4cc6-bfbf-5999cdbc4029"];
                                    };
                                    readonly symbol: {
                                        readonly type: "string";
                                        readonly examples: readonly ["FCF"];
                                    };
                                    readonly rate: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly examples: readonly [0.125];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly special: {
                                        readonly type: "boolean";
                                    };
                                    readonly foreign: {
                                        readonly type: "boolean";
                                    };
                                    readonly process_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The date when the corporate action is processed by Alpaca.";
                                        readonly examples: readonly ["2023-05-19"];
                                    };
                                    readonly ex_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The ex-date marks the cutoff point for shareholders to be credited.";
                                        readonly examples: readonly ["2023-05-04"];
                                    };
                                    readonly record_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly examples: readonly ["2023-05-05"];
                                    };
                                    readonly payable_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly examples: readonly ["2023-05-19"];
                                    };
                                    readonly due_bill_on_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                    };
                                    readonly due_bill_off_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                    };
                                };
                                readonly required: readonly ["id", "symbol", "rate", "special", "foreign", "process_date", "ex_date"];
                            };
                        };
                        readonly spin_offs: {
                            readonly type: "array";
                            readonly "x-go-type-skip-optional-pointer": true;
                            readonly items: {
                                readonly type: "object";
                                readonly description: "Spin-off.";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly format: "uuid";
                                        readonly description: "The internal Alpaca identifier of the corporate action.";
                                        readonly examples: readonly ["82e602f6-35bc-4651-a5dd-f6d88ff37c55"];
                                    };
                                    readonly source_symbol: {
                                        readonly type: "string";
                                        readonly examples: readonly ["JUPW"];
                                    };
                                    readonly source_rate: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly examples: readonly [19.35];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly new_symbol: {
                                        readonly type: "string";
                                        readonly examples: readonly ["SRM"];
                                    };
                                    readonly new_rate: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly examples: readonly [1];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly process_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The date when the corporate action is processed by Alpaca.";
                                        readonly examples: readonly ["2023-08-15"];
                                    };
                                    readonly ex_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The ex-date marks the cutoff point for shareholders to be credited.";
                                        readonly examples: readonly ["2023-08-15"];
                                    };
                                    readonly record_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly examples: readonly ["2023-08-15"];
                                    };
                                    readonly payable_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly examples: readonly ["2023-05-19"];
                                    };
                                    readonly due_bill_redemption_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly examples: readonly ["2023-08-23"];
                                    };
                                };
                                readonly required: readonly ["id", "source_symbol", "source_rate", "new_symbol", "new_rate", "process_date", "ex_date"];
                            };
                        };
                        readonly cash_mergers: {
                            readonly type: "array";
                            readonly "x-go-type-skip-optional-pointer": true;
                            readonly items: {
                                readonly type: "object";
                                readonly description: "Cash merger.";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly format: "uuid";
                                        readonly description: "The internal Alpaca identifier of the corporate action.";
                                        readonly examples: readonly ["3772bbd7-4ad5-44d4-9cc0-f69156a2f8f5"];
                                    };
                                    readonly acquirer_symbol: {
                                        readonly type: "string";
                                    };
                                    readonly acquiree_symbol: {
                                        readonly type: "string";
                                        readonly examples: readonly ["GLOP"];
                                    };
                                    readonly rate: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly examples: readonly [5.37];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly process_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The date when the corporate action is processed by Alpaca.";
                                        readonly examples: readonly ["2023-07-17"];
                                    };
                                    readonly effective_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The effective date marks the cutoff point for shareholders to be credited.";
                                        readonly examples: readonly ["2023-07-17"];
                                    };
                                    readonly payable_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly examples: readonly ["2023-07-17"];
                                    };
                                };
                                readonly required: readonly ["id", "acquiree_symbol", "rate", "process_date", "effective_date"];
                            };
                        };
                        readonly stock_mergers: {
                            readonly type: "array";
                            readonly "x-go-type-skip-optional-pointer": true;
                            readonly items: {
                                readonly type: "object";
                                readonly description: "Stock merger.";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly format: "uuid";
                                        readonly description: "The internal Alpaca identifier of the corporate action.";
                                        readonly examples: readonly ["728f8cb2-a00e-4bc7-ad14-d15fe82bbcff"];
                                    };
                                    readonly acquirer_symbol: {
                                        readonly type: "string";
                                        readonly examples: readonly ["EXR"];
                                    };
                                    readonly acquirer_rate: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly examples: readonly [0.895];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly acquiree_symbol: {
                                        readonly type: "string";
                                        readonly examples: readonly ["LSI"];
                                    };
                                    readonly acquiree_rate: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly examples: readonly [1];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly process_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The date when the corporate action is processed by Alpaca.";
                                        readonly examples: readonly ["2023-07-20"];
                                    };
                                    readonly effective_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The effective date marks the cutoff point for shareholders to be credited.";
                                        readonly examples: readonly ["2023-07-20"];
                                    };
                                    readonly payable_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly examples: readonly ["2023-07-20"];
                                    };
                                };
                                readonly required: readonly ["id", "acquirer_symbol", "acquirer_rate", "acquiree_symbol", "acquiree_rate", "process_date", "effective_date"];
                            };
                        };
                        readonly stock_and_cash_mergers: {
                            readonly type: "array";
                            readonly "x-go-type-skip-optional-pointer": true;
                            readonly items: {
                                readonly type: "object";
                                readonly description: "Stock and cash merger.";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly format: "uuid";
                                        readonly description: "The internal Alpaca identifier of the corporate action.";
                                        readonly examples: readonly ["e5248356-2c06-42cf-aeb9-1595bd616cdb"];
                                    };
                                    readonly acquirer_symbol: {
                                        readonly type: "string";
                                        readonly examples: readonly ["FRBA"];
                                    };
                                    readonly acquirer_rate: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly examples: readonly [0.7733];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly acquiree_symbol: {
                                        readonly type: "string";
                                        readonly examples: readonly ["MLVF"];
                                    };
                                    readonly acquiree_rate: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly examples: readonly [1];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly cash_rate: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly examples: readonly [7.8];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly process_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The date when the corporate action is processed by Alpaca.";
                                        readonly examples: readonly ["2023-07-18"];
                                    };
                                    readonly effective_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The effective date marks the cutoff point for shareholders to be credited.";
                                        readonly examples: readonly ["2023-07-18"];
                                    };
                                    readonly payable_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly examples: readonly ["2023-07-18"];
                                    };
                                };
                                readonly required: readonly ["id", "acquirer_symbol", "acquirer_rate", "acquiree_symbol", "acquiree_rate", "cash_rate", "process_date", "effective_date"];
                            };
                        };
                        readonly redemptions: {
                            readonly type: "array";
                            readonly "x-go-type-skip-optional-pointer": true;
                            readonly items: {
                                readonly type: "object";
                                readonly description: "Redemption.";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly format: "uuid";
                                        readonly description: "The internal Alpaca identifier of the corporate action.";
                                        readonly examples: readonly ["395da031-0e57-4918-a6fb-64a7c713aca4"];
                                    };
                                    readonly symbol: {
                                        readonly type: "string";
                                        readonly examples: readonly ["ORPHY"];
                                    };
                                    readonly rate: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly examples: readonly [0.141134];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly process_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The date when the corporate action is processed by Alpaca.";
                                        readonly examples: readonly ["2023-06-13"];
                                    };
                                    readonly payable_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly examples: readonly ["2023-06-13"];
                                    };
                                };
                                readonly required: readonly ["id", "symbol", "rate", "process_date"];
                            };
                        };
                        readonly name_changes: {
                            readonly type: "array";
                            readonly "x-go-type-skip-optional-pointer": true;
                            readonly items: {
                                readonly type: "object";
                                readonly description: "Name change.";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly format: "uuid";
                                        readonly description: "The internal Alpaca identifier of the corporate action.";
                                        readonly examples: readonly ["5a774c35-edec-4532-a812-a56d0bbb623a"];
                                    };
                                    readonly old_symbol: {
                                        readonly type: "string";
                                        readonly examples: readonly ["BSAQ"];
                                    };
                                    readonly new_symbol: {
                                        readonly type: "string";
                                        readonly examples: readonly ["VFS"];
                                    };
                                    readonly process_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The date when the corporate action is processed by Alpaca.";
                                        readonly examples: readonly ["2023-08-15"];
                                    };
                                };
                                readonly required: readonly ["id", "old_symbol", "new_symbol", "process_date"];
                            };
                        };
                        readonly worthless_removals: {
                            readonly type: "array";
                            readonly "x-go-type-skip-optional-pointer": true;
                            readonly items: {
                                readonly type: "object";
                                readonly description: "Worthless removal.";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly format: "uuid";
                                        readonly description: "The internal Alpaca identifier of the corporate action.";
                                        readonly examples: readonly ["106c2149-ee04-4d2e-a943-98dbb4d21a3c"];
                                    };
                                    readonly symbol: {
                                        readonly type: "string";
                                        readonly examples: readonly ["BLPH"];
                                    };
                                    readonly process_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The date when the corporate action is processed by Alpaca.";
                                        readonly examples: readonly ["2024-12-19"];
                                    };
                                };
                                readonly required: readonly ["id", "symbol", "process_date"];
                            };
                        };
                        readonly rights_distributions: {
                            readonly type: "array";
                            readonly "x-go-type-skip-optional-pointer": true;
                            readonly items: {
                                readonly type: "object";
                                readonly description: "Rights distribution.";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly format: "uuid";
                                        readonly description: "The internal Alpaca identifier of the corporate action.";
                                        readonly examples: readonly ["69794cfd-0adc-4e11-9211-9210a9cf8932"];
                                    };
                                    readonly source_symbol: {
                                        readonly type: "string";
                                        readonly examples: readonly ["IFN"];
                                    };
                                    readonly new_symbol: {
                                        readonly type: "string";
                                        readonly examples: readonly ["IFN.RTWI"];
                                    };
                                    readonly rate: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly examples: readonly [1];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly process_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The date when the corporate action is processed by Alpaca.";
                                        readonly examples: readonly ["2024-04-19"];
                                    };
                                    readonly ex_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly description: "The ex-date marks the cutoff point for shareholders to be credited.";
                                        readonly examples: readonly ["2024-04-17"];
                                    };
                                    readonly record_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly examples: readonly ["2024-04-18"];
                                    };
                                    readonly payable_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly examples: readonly ["2024-04-19"];
                                    };
                                    readonly expiration_date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly examples: readonly ["2024-05-14"];
                                    };
                                };
                                readonly required: readonly ["id", "source_symbol", "new_symbol", "rate", "process_date", "ex_date", "payable_date"];
                            };
                        };
                    };
                };
                readonly next_page_token: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "Pagination token for the next page.";
                };
            };
            readonly required: readonly ["corporate_actions", "next_page_token"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const CryptoBars: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly loc: {
                    readonly type: "string";
                    readonly enum: readonly ["us"];
                    readonly description: "Crypto location.";
                    readonly "x-go-name": "TypeLoc";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["loc"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["BTC/USD,LTC/USD"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of crypto symbols.";
                };
                readonly timeframe: {
                    readonly type: "string";
                    readonly examples: readonly ["1Min"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The timeframe represented by each bar in aggregation.\nYou can use any of the following values:\n - `[1-59]Min` or `[1-59]T`, e.g. `5Min` or `5T` creates 5-minute aggregations\n - `[1-23]Hour` or `[1-23]H`, e.g. `12Hour` or `12H` creates 12-hour aggregations\n - `1Day` or `1D` creates 1-day aggregations\n - `1Week` or `1W` creates 1-week aggregations\n - `[1,2,3,4,6,12]Month` or `[1,2,3,4,6,12]M`, e.g. `3Month` or `3M` creates 3-month aggregations\n";
                };
                readonly start: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-03T00:00:00Z", "2024-01-03T01:02:03.123456789Z", "2024-01-03T09:30:00-04:00", "2024-01-03"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive start of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the beginning of the current day.\n";
                };
                readonly end: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-04T00:00:00Z", "2024-01-04T01:02:03.123456789Z", "2024-01-04T09:30:00-04:00", "2024-01-04"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive end of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the current time.\n";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 10000;
                    readonly default: 1000;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of data points to return in the response page.\nThe API may return less, even if there are more available data points in the requested interval.\nAlways check the `next_page_token` for more pages.\nThe limit applies to the total number of data points, not per symbol!\n";
                };
                readonly page_token: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The pagination token from which to continue. The value to pass here is returned in specific requests when more data is available, usually because of a response result limit.\n";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly description: "Sort data in ascending or descending order.";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "asc";
                    readonly "x-go-name": "TypeSort";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["symbols", "timeframe"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly bars: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly description: "OHLC aggregate of all the trades in a given interval.";
                            readonly properties: {
                                readonly t: {
                                    readonly type: "string";
                                    readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                    readonly format: "date-time";
                                    readonly "x-go-name": "Timestamp";
                                    readonly examples: readonly ["2022-05-27T10:18:00Z"];
                                };
                                readonly o: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Opening price.";
                                    readonly "x-go-name": "Open";
                                    readonly examples: readonly [28999];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly h: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "High price.";
                                    readonly "x-go-name": "High";
                                    readonly examples: readonly [29003];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly l: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Low price.";
                                    readonly "x-go-name": "Low";
                                    readonly examples: readonly [28999];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly c: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Closing price.";
                                    readonly "x-go-name": "Close";
                                    readonly examples: readonly [29003];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly v: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Bar volume.";
                                    readonly "x-go-name": "Volume";
                                    readonly examples: readonly [0.01];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly n: {
                                    readonly type: "integer";
                                    readonly format: "int64";
                                    readonly description: "Trade count in the bar.";
                                    readonly "x-go-name": "TradeCount";
                                    readonly examples: readonly [4];
                                    readonly minimum: -9223372036854776000;
                                    readonly maximum: 9223372036854776000;
                                };
                                readonly vw: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Volume weighted average price.";
                                    readonly "x-go-name": "VWAP";
                                    readonly examples: readonly [29001];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                            };
                            readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                        };
                    };
                };
                readonly next_page_token: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "Pagination token for the next page.";
                };
            };
            readonly required: readonly ["bars", "next_page_token"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const CryptoLatestBars: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly loc: {
                    readonly type: "string";
                    readonly enum: readonly ["us"];
                    readonly description: "Crypto location.";
                    readonly "x-go-name": "TypeLoc";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["loc"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["BTC/USD,LTC/USD"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of crypto symbols.";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly bars: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly description: "OHLC aggregate of all the trades in a given interval.";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2022-05-27T10:18:00Z"];
                            };
                            readonly o: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Opening price.";
                                readonly "x-go-name": "Open";
                                readonly examples: readonly [28999];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly h: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "High price.";
                                readonly "x-go-name": "High";
                                readonly examples: readonly [29003];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly l: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Low price.";
                                readonly "x-go-name": "Low";
                                readonly examples: readonly [28999];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly c: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Closing price.";
                                readonly "x-go-name": "Close";
                                readonly examples: readonly [29003];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly v: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Bar volume.";
                                readonly "x-go-name": "Volume";
                                readonly examples: readonly [0.01];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly n: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly description: "Trade count in the bar.";
                                readonly "x-go-name": "TradeCount";
                                readonly examples: readonly [4];
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly vw: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Volume weighted average price.";
                                readonly "x-go-name": "VWAP";
                                readonly examples: readonly [29001];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                        };
                        readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                    };
                };
            };
            readonly required: readonly ["bars"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const CryptoLatestOrderbooks: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly loc: {
                    readonly type: "string";
                    readonly enum: readonly ["us"];
                    readonly description: "Crypto location.";
                    readonly "x-go-name": "TypeLoc";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["loc"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["BTC/USD,LTC/USD"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of crypto symbols.";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly orderbooks: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly description: "Snapshot of the orderbook.";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2022-06-24T08:00:14.137774336Z"];
                            };
                            readonly b: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly description: "A single entry in a crypto orderbook.";
                                    readonly properties: {
                                        readonly p: {
                                            readonly type: "number";
                                            readonly format: "double";
                                            readonly description: "Price.";
                                            readonly "x-go-name": "Price";
                                            readonly examples: readonly [20846];
                                            readonly minimum: -1.7976931348623157e+308;
                                            readonly maximum: 1.7976931348623157e+308;
                                        };
                                        readonly s: {
                                            readonly type: "number";
                                            readonly format: "double";
                                            readonly description: "Size.";
                                            readonly "x-go-name": "Size";
                                            readonly examples: readonly [0.1902];
                                            readonly minimum: -1.7976931348623157e+308;
                                            readonly maximum: 1.7976931348623157e+308;
                                        };
                                    };
                                    readonly required: readonly ["p", "s"];
                                };
                                readonly "x-go-name": "Bids";
                            };
                            readonly a: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly description: "A single entry in a crypto orderbook.";
                                    readonly properties: {
                                        readonly p: {
                                            readonly type: "number";
                                            readonly format: "double";
                                            readonly description: "Price.";
                                            readonly "x-go-name": "Price";
                                            readonly examples: readonly [20846];
                                            readonly minimum: -1.7976931348623157e+308;
                                            readonly maximum: 1.7976931348623157e+308;
                                        };
                                        readonly s: {
                                            readonly type: "number";
                                            readonly format: "double";
                                            readonly description: "Size.";
                                            readonly "x-go-name": "Size";
                                            readonly examples: readonly [0.1902];
                                            readonly minimum: -1.7976931348623157e+308;
                                            readonly maximum: 1.7976931348623157e+308;
                                        };
                                    };
                                    readonly required: readonly ["p", "s"];
                                };
                                readonly "x-go-name": "Asks";
                            };
                        };
                        readonly required: readonly ["t", "b", "a"];
                    };
                };
            };
            readonly required: readonly ["orderbooks"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const CryptoLatestQuotes: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly loc: {
                    readonly type: "string";
                    readonly enum: readonly ["us"];
                    readonly description: "Crypto location.";
                    readonly "x-go-name": "TypeLoc";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["loc"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["BTC/USD,LTC/USD"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of crypto symbols.";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly quotes: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly description: "The best bid and ask information for a given security.";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2022-05-26T11:47:18.44347136Z"];
                            };
                            readonly bp: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Bid price.";
                                readonly "x-go-name": "BidPrice";
                                readonly examples: readonly [29058];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly bs: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Bid size.";
                                readonly "x-go-name": "BidSize";
                                readonly examples: readonly [0.3544];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly ap: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Ask price.";
                                readonly "x-go-name": "AskPrice";
                                readonly examples: readonly [29059];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly as: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Ask size.";
                                readonly "x-go-name": "AskSize";
                                readonly examples: readonly [3.252];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                        };
                        readonly required: readonly ["t", "bp", "bs", "ap", "as"];
                    };
                };
            };
            readonly required: readonly ["quotes"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const CryptoLatestTrades: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly loc: {
                    readonly type: "string";
                    readonly enum: readonly ["us"];
                    readonly description: "Crypto location.";
                    readonly "x-go-name": "TypeLoc";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["loc"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["BTC/USD,LTC/USD"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of crypto symbols.";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly trades: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly description: "A crypto trade.";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2022-05-18T12:00:05.225055Z"];
                            };
                            readonly p: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Trade price.";
                                readonly "x-go-name": "Price";
                                readonly examples: readonly [29798];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly s: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Trade size.";
                                readonly "x-go-name": "Size";
                                readonly examples: readonly [0.1209];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly i: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly description: "Trade ID.";
                                readonly "x-go-name": "ID";
                                readonly examples: readonly [31455277];
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly tks: {
                                readonly type: "string";
                                readonly description: "Taker side: B for buyer, S for seller\n";
                                readonly "x-go-name": "TakerSide";
                                readonly examples: readonly ["S"];
                            };
                        };
                        readonly required: readonly ["t", "p", "s", "i", "tks"];
                    };
                };
            };
            readonly required: readonly ["trades"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const CryptoPerpLatestBars: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly loc: {
                    readonly type: "string";
                    readonly enum: readonly ["global"];
                    readonly description: "Crypto perpetual location.";
                    readonly "x-go-name": "TypePerpLoc";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["loc"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["BTC-PERP,LTC-PERP"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of crypto symbols.";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly bars: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly description: "OHLC aggregate of all the trades in a given interval.";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2022-05-27T10:18:00Z"];
                            };
                            readonly o: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Opening price.";
                                readonly "x-go-name": "Open";
                                readonly examples: readonly [28999];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly h: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "High price.";
                                readonly "x-go-name": "High";
                                readonly examples: readonly [29003];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly l: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Low price.";
                                readonly "x-go-name": "Low";
                                readonly examples: readonly [28999];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly c: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Closing price.";
                                readonly "x-go-name": "Close";
                                readonly examples: readonly [29003];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly v: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Bar volume.";
                                readonly "x-go-name": "Volume";
                                readonly examples: readonly [0.01];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly n: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly description: "Trade count in the bar.";
                                readonly "x-go-name": "TradeCount";
                                readonly examples: readonly [4];
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly vw: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Volume weighted average price.";
                                readonly "x-go-name": "VWAP";
                                readonly examples: readonly [29001];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                        };
                        readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                    };
                };
            };
            readonly required: readonly ["bars"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const CryptoPerpLatestFuturesPricing: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly loc: {
                    readonly type: "string";
                    readonly enum: readonly ["global"];
                    readonly description: "Crypto perpetual location.";
                    readonly "x-go-name": "TypePerpLoc";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["loc"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["BTC-PERP,LTC-PERP"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of crypto symbols.";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly pricing: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly description: "Crypto perpetual futures pricing data.";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2022-05-27T10:18:00Z"];
                            };
                            readonly ft: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly description: "Next funding time";
                                readonly "x-go-name": "NextFundingTime";
                                readonly examples: readonly ["2022-05-27T10:18:00Z"];
                            };
                            readonly oi: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Open interest.";
                                readonly "x-go-name": "OpenInterest";
                                readonly examples: readonly [90.7367];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly ip: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Index price.";
                                readonly "x-go-name": "IndexPrice";
                                readonly examples: readonly [50702.8];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly mp: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Mark price.";
                                readonly "x-go-name": "MarkPrice";
                                readonly examples: readonly [50652.3553];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly fr: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Funding rate.";
                                readonly "x-go-name": "FundingRate";
                                readonly examples: readonly [0.000565699];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                        };
                        readonly required: readonly ["t", "ft", "oi", "ip", "mp", "fr"];
                    };
                };
            };
            readonly required: readonly ["pricing"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const CryptoPerpLatestOrderbooks: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly loc: {
                    readonly type: "string";
                    readonly enum: readonly ["global"];
                    readonly description: "Crypto perpetual location.";
                    readonly "x-go-name": "TypePerpLoc";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["loc"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["BTC-PERP,LTC-PERP"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of crypto symbols.";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly orderbooks: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly description: "Snapshot of the orderbook.";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2022-06-24T08:00:14.137774336Z"];
                            };
                            readonly b: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly description: "A single entry in a crypto orderbook.";
                                    readonly properties: {
                                        readonly p: {
                                            readonly type: "number";
                                            readonly format: "double";
                                            readonly description: "Price.";
                                            readonly "x-go-name": "Price";
                                            readonly examples: readonly [20846];
                                            readonly minimum: -1.7976931348623157e+308;
                                            readonly maximum: 1.7976931348623157e+308;
                                        };
                                        readonly s: {
                                            readonly type: "number";
                                            readonly format: "double";
                                            readonly description: "Size.";
                                            readonly "x-go-name": "Size";
                                            readonly examples: readonly [0.1902];
                                            readonly minimum: -1.7976931348623157e+308;
                                            readonly maximum: 1.7976931348623157e+308;
                                        };
                                    };
                                    readonly required: readonly ["p", "s"];
                                };
                                readonly "x-go-name": "Bids";
                            };
                            readonly a: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly description: "A single entry in a crypto orderbook.";
                                    readonly properties: {
                                        readonly p: {
                                            readonly type: "number";
                                            readonly format: "double";
                                            readonly description: "Price.";
                                            readonly "x-go-name": "Price";
                                            readonly examples: readonly [20846];
                                            readonly minimum: -1.7976931348623157e+308;
                                            readonly maximum: 1.7976931348623157e+308;
                                        };
                                        readonly s: {
                                            readonly type: "number";
                                            readonly format: "double";
                                            readonly description: "Size.";
                                            readonly "x-go-name": "Size";
                                            readonly examples: readonly [0.1902];
                                            readonly minimum: -1.7976931348623157e+308;
                                            readonly maximum: 1.7976931348623157e+308;
                                        };
                                    };
                                    readonly required: readonly ["p", "s"];
                                };
                                readonly "x-go-name": "Asks";
                            };
                        };
                        readonly required: readonly ["t", "b", "a"];
                    };
                };
            };
            readonly required: readonly ["orderbooks"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const CryptoPerpLatestQuotes: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly loc: {
                    readonly type: "string";
                    readonly enum: readonly ["global"];
                    readonly description: "Crypto perpetual location.";
                    readonly "x-go-name": "TypePerpLoc";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["loc"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["BTC-PERP,LTC-PERP"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of crypto symbols.";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly quotes: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly description: "The best bid and ask information for a given security.";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2022-05-26T11:47:18.44347136Z"];
                            };
                            readonly bp: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Bid price.";
                                readonly "x-go-name": "BidPrice";
                                readonly examples: readonly [29058];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly bs: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Bid size.";
                                readonly "x-go-name": "BidSize";
                                readonly examples: readonly [0.3544];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly ap: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Ask price.";
                                readonly "x-go-name": "AskPrice";
                                readonly examples: readonly [29059];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly as: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Ask size.";
                                readonly "x-go-name": "AskSize";
                                readonly examples: readonly [3.252];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                        };
                        readonly required: readonly ["t", "bp", "bs", "ap", "as"];
                    };
                };
            };
            readonly required: readonly ["quotes"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const CryptoPerpLatestTrades: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly loc: {
                    readonly type: "string";
                    readonly enum: readonly ["global"];
                    readonly description: "Crypto perpetual location.";
                    readonly "x-go-name": "TypePerpLoc";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["loc"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["BTC-PERP,LTC-PERP"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of crypto symbols.";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly trades: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly description: "A crypto trade.";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2022-05-18T12:00:05.225055Z"];
                            };
                            readonly p: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Trade price.";
                                readonly "x-go-name": "Price";
                                readonly examples: readonly [29798];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly s: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Trade size.";
                                readonly "x-go-name": "Size";
                                readonly examples: readonly [0.1209];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly i: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly description: "Trade ID.";
                                readonly "x-go-name": "ID";
                                readonly examples: readonly [31455277];
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly tks: {
                                readonly type: "string";
                                readonly description: "Taker side: B for buyer, S for seller\n";
                                readonly "x-go-name": "TakerSide";
                                readonly examples: readonly ["S"];
                            };
                        };
                        readonly required: readonly ["t", "p", "s", "i", "tks"];
                    };
                };
            };
            readonly required: readonly ["trades"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const CryptoQuotes: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly loc: {
                    readonly type: "string";
                    readonly enum: readonly ["us"];
                    readonly description: "Crypto location.";
                    readonly "x-go-name": "TypeLoc";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["loc"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["BTC/USD,LTC/USD"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of crypto symbols.";
                };
                readonly start: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-03T00:00:00Z", "2024-01-03T01:02:03.123456789Z", "2024-01-03T09:30:00-04:00", "2024-01-03"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive start of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the beginning of the current day.\n";
                };
                readonly end: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-04T00:00:00Z", "2024-01-04T01:02:03.123456789Z", "2024-01-04T09:30:00-04:00", "2024-01-04"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive end of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the current time.\n";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 10000;
                    readonly default: 1000;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of data points to return in the response page.\nThe API may return less, even if there are more available data points in the requested interval.\nAlways check the `next_page_token` for more pages.\nThe limit applies to the total number of data points, not per symbol!\n";
                };
                readonly page_token: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The pagination token from which to continue. The value to pass here is returned in specific requests when more data is available, usually because of a response result limit.\n";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly description: "Sort data in ascending or descending order.";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "asc";
                    readonly "x-go-name": "TypeSort";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly quotes: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly description: "The best bid and ask information for a given security.";
                            readonly properties: {
                                readonly t: {
                                    readonly type: "string";
                                    readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                    readonly format: "date-time";
                                    readonly "x-go-name": "Timestamp";
                                    readonly examples: readonly ["2022-05-26T11:47:18.44347136Z"];
                                };
                                readonly bp: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Bid price.";
                                    readonly "x-go-name": "BidPrice";
                                    readonly examples: readonly [29058];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly bs: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Bid size.";
                                    readonly "x-go-name": "BidSize";
                                    readonly examples: readonly [0.3544];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly ap: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Ask price.";
                                    readonly "x-go-name": "AskPrice";
                                    readonly examples: readonly [29059];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly as: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Ask size.";
                                    readonly "x-go-name": "AskSize";
                                    readonly examples: readonly [3.252];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                            };
                            readonly required: readonly ["t", "bp", "bs", "ap", "as"];
                        };
                    };
                };
                readonly next_page_token: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "Pagination token for the next page.";
                };
            };
            readonly required: readonly ["quotes", "next_page_token"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const CryptoSnapshots: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly loc: {
                    readonly type: "string";
                    readonly enum: readonly ["us"];
                    readonly description: "Crypto location.";
                    readonly "x-go-name": "TypeLoc";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["loc"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["BTC/USD,LTC/USD"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of crypto symbols.";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly snapshots: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly description: "A snapshot provides the latest trade, latest quote, latest minute bar, latest daily bar and previous daily bar.\n";
                        readonly properties: {
                            readonly dailyBar: {
                                readonly type: "object";
                                readonly description: "OHLC aggregate of all the trades in a given interval.";
                                readonly properties: {
                                    readonly t: {
                                        readonly type: "string";
                                        readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                        readonly format: "date-time";
                                        readonly "x-go-name": "Timestamp";
                                        readonly examples: readonly ["2022-05-27T10:18:00Z"];
                                    };
                                    readonly o: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Opening price.";
                                        readonly "x-go-name": "Open";
                                        readonly examples: readonly [28999];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly h: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "High price.";
                                        readonly "x-go-name": "High";
                                        readonly examples: readonly [29003];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly l: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Low price.";
                                        readonly "x-go-name": "Low";
                                        readonly examples: readonly [28999];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly c: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Closing price.";
                                        readonly "x-go-name": "Close";
                                        readonly examples: readonly [29003];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly v: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Bar volume.";
                                        readonly "x-go-name": "Volume";
                                        readonly examples: readonly [0.01];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly n: {
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly description: "Trade count in the bar.";
                                        readonly "x-go-name": "TradeCount";
                                        readonly examples: readonly [4];
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly vw: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Volume weighted average price.";
                                        readonly "x-go-name": "VWAP";
                                        readonly examples: readonly [29001];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                };
                                readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                            };
                            readonly latestQuote: {
                                readonly type: "object";
                                readonly description: "The best bid and ask information for a given security.";
                                readonly properties: {
                                    readonly t: {
                                        readonly type: "string";
                                        readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                        readonly format: "date-time";
                                        readonly "x-go-name": "Timestamp";
                                        readonly examples: readonly ["2022-05-26T11:47:18.44347136Z"];
                                    };
                                    readonly bp: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Bid price.";
                                        readonly "x-go-name": "BidPrice";
                                        readonly examples: readonly [29058];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly bs: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Bid size.";
                                        readonly "x-go-name": "BidSize";
                                        readonly examples: readonly [0.3544];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly ap: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Ask price.";
                                        readonly "x-go-name": "AskPrice";
                                        readonly examples: readonly [29059];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly as: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Ask size.";
                                        readonly "x-go-name": "AskSize";
                                        readonly examples: readonly [3.252];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                };
                                readonly required: readonly ["t", "bp", "bs", "ap", "as"];
                            };
                            readonly latestTrade: {
                                readonly type: "object";
                                readonly description: "A crypto trade.";
                                readonly properties: {
                                    readonly t: {
                                        readonly type: "string";
                                        readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                        readonly format: "date-time";
                                        readonly "x-go-name": "Timestamp";
                                        readonly examples: readonly ["2022-05-18T12:00:05.225055Z"];
                                    };
                                    readonly p: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Trade price.";
                                        readonly "x-go-name": "Price";
                                        readonly examples: readonly [29798];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly s: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Trade size.";
                                        readonly "x-go-name": "Size";
                                        readonly examples: readonly [0.1209];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly i: {
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly description: "Trade ID.";
                                        readonly "x-go-name": "ID";
                                        readonly examples: readonly [31455277];
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly tks: {
                                        readonly type: "string";
                                        readonly description: "Taker side: B for buyer, S for seller\n";
                                        readonly "x-go-name": "TakerSide";
                                        readonly examples: readonly ["S"];
                                    };
                                };
                                readonly required: readonly ["t", "p", "s", "i", "tks"];
                            };
                            readonly minuteBar: {
                                readonly type: "object";
                                readonly description: "OHLC aggregate of all the trades in a given interval.";
                                readonly properties: {
                                    readonly t: {
                                        readonly type: "string";
                                        readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                        readonly format: "date-time";
                                        readonly "x-go-name": "Timestamp";
                                        readonly examples: readonly ["2022-05-27T10:18:00Z"];
                                    };
                                    readonly o: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Opening price.";
                                        readonly "x-go-name": "Open";
                                        readonly examples: readonly [28999];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly h: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "High price.";
                                        readonly "x-go-name": "High";
                                        readonly examples: readonly [29003];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly l: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Low price.";
                                        readonly "x-go-name": "Low";
                                        readonly examples: readonly [28999];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly c: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Closing price.";
                                        readonly "x-go-name": "Close";
                                        readonly examples: readonly [29003];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly v: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Bar volume.";
                                        readonly "x-go-name": "Volume";
                                        readonly examples: readonly [0.01];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly n: {
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly description: "Trade count in the bar.";
                                        readonly "x-go-name": "TradeCount";
                                        readonly examples: readonly [4];
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly vw: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Volume weighted average price.";
                                        readonly "x-go-name": "VWAP";
                                        readonly examples: readonly [29001];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                };
                                readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                            };
                            readonly prevDailyBar: {
                                readonly type: "object";
                                readonly description: "OHLC aggregate of all the trades in a given interval.";
                                readonly properties: {
                                    readonly t: {
                                        readonly type: "string";
                                        readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                        readonly format: "date-time";
                                        readonly "x-go-name": "Timestamp";
                                        readonly examples: readonly ["2022-05-27T10:18:00Z"];
                                    };
                                    readonly o: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Opening price.";
                                        readonly "x-go-name": "Open";
                                        readonly examples: readonly [28999];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly h: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "High price.";
                                        readonly "x-go-name": "High";
                                        readonly examples: readonly [29003];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly l: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Low price.";
                                        readonly "x-go-name": "Low";
                                        readonly examples: readonly [28999];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly c: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Closing price.";
                                        readonly "x-go-name": "Close";
                                        readonly examples: readonly [29003];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly v: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Bar volume.";
                                        readonly "x-go-name": "Volume";
                                        readonly examples: readonly [0.01];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly n: {
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly description: "Trade count in the bar.";
                                        readonly "x-go-name": "TradeCount";
                                        readonly examples: readonly [4];
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly vw: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Volume weighted average price.";
                                        readonly "x-go-name": "VWAP";
                                        readonly examples: readonly [29001];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                };
                                readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                            };
                        };
                    };
                };
            };
            readonly required: readonly ["snapshots"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const CryptoTrades: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly loc: {
                    readonly type: "string";
                    readonly enum: readonly ["us"];
                    readonly description: "Crypto location.";
                    readonly "x-go-name": "TypeLoc";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["loc"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["BTC/USD,LTC/USD"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of crypto symbols.";
                };
                readonly start: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-03T00:00:00Z", "2024-01-03T01:02:03.123456789Z", "2024-01-03T09:30:00-04:00", "2024-01-03"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive start of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the beginning of the current day.\n";
                };
                readonly end: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-04T00:00:00Z", "2024-01-04T01:02:03.123456789Z", "2024-01-04T09:30:00-04:00", "2024-01-04"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive end of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the current time.\n";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 10000;
                    readonly default: 1000;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of data points to return in the response page.\nThe API may return less, even if there are more available data points in the requested interval.\nAlways check the `next_page_token` for more pages.\nThe limit applies to the total number of data points, not per symbol!\n";
                };
                readonly page_token: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The pagination token from which to continue. The value to pass here is returned in specific requests when more data is available, usually because of a response result limit.\n";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly description: "Sort data in ascending or descending order.";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "asc";
                    readonly "x-go-name": "TypeSort";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly trades: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly description: "A crypto trade.";
                            readonly properties: {
                                readonly t: {
                                    readonly type: "string";
                                    readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                    readonly format: "date-time";
                                    readonly "x-go-name": "Timestamp";
                                    readonly examples: readonly ["2022-05-18T12:00:05.225055Z"];
                                };
                                readonly p: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Trade price.";
                                    readonly "x-go-name": "Price";
                                    readonly examples: readonly [29798];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly s: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Trade size.";
                                    readonly "x-go-name": "Size";
                                    readonly examples: readonly [0.1209];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly i: {
                                    readonly type: "integer";
                                    readonly format: "int64";
                                    readonly description: "Trade ID.";
                                    readonly "x-go-name": "ID";
                                    readonly examples: readonly [31455277];
                                    readonly minimum: -9223372036854776000;
                                    readonly maximum: 9223372036854776000;
                                };
                                readonly tks: {
                                    readonly type: "string";
                                    readonly description: "Taker side: B for buyer, S for seller\n";
                                    readonly "x-go-name": "TakerSide";
                                    readonly examples: readonly ["S"];
                                };
                            };
                            readonly required: readonly ["t", "p", "s", "i", "tks"];
                        };
                    };
                };
                readonly next_page_token: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "Pagination token for the next page.";
                };
            };
            readonly required: readonly ["trades", "next_page_token"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const LatestRates: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly currency_pairs: {
                    readonly type: "string";
                    readonly description: "A comma-separated string with currency pairs.";
                    readonly "x-go-name": "TypeCurrencyPairs";
                    readonly examples: readonly ["USDJPY,USDMXN"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["currency_pairs"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly description: "The response object of the latest forex rates.";
            readonly type: "object";
            readonly properties: {
                readonly rates: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly description: "A foreign exchange rate between two currencies at a given time.";
                        readonly type: "object";
                        readonly properties: {
                            readonly bp: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly "x-go-name": "BidPrice";
                                readonly description: "The last bid price value of the currency at the end of the timeframe.";
                                readonly examples: readonly [127.702];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly mp: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly "x-go-name": "MidPrice";
                                readonly description: "The last mid price value of the currency at the end of the timeframe.";
                                readonly examples: readonly [127.757];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly ap: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly "x-go-name": "AskPrice";
                                readonly description: "The last ask price value of the currency at the end of the timeframe.";
                                readonly examples: readonly [127.763];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly t: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly description: "Timestamp of the rate.";
                                readonly examples: readonly ["2022-04-20T18:23:00Z"];
                            };
                        };
                        readonly required: readonly ["bp", "mp", "ap", "t"];
                    };
                };
            };
            readonly required: readonly ["rates"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const Logos: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbol: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A unique series of letters assigned to a security for trading purposes.";
                };
            };
            readonly required: readonly ["symbol"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly placeholder: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "string";
            readonly format: "binary";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const MostActives: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly by: {
                    readonly type: "string";
                    readonly enum: readonly ["volume", "trades"];
                    readonly default: "volume";
                    readonly description: "The metric used for ranking the most active stocks.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly top: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of top most active stocks to fetch per day.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly most_actives: {
                    readonly type: "array";
                    readonly description: "List of top N most active symbols.";
                    readonly items: {
                        readonly description: "A stock that is most active by either volume or trade count.";
                        readonly type: "object";
                        readonly properties: {
                            readonly symbol: {
                                readonly type: "string";
                                readonly examples: readonly ["AAPL"];
                            };
                            readonly volume: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly description: "Cumulative volume for the current trading day.";
                                readonly examples: readonly [122709184];
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly trade_count: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly description: "Cumulative trade count for the current trading day.";
                                readonly examples: readonly [639626];
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                        };
                        readonly required: readonly ["symbol", "volume", "trade_count"];
                    };
                };
                readonly last_updated: {
                    readonly type: "string";
                    readonly description: "Time when the most actives were last computed. Formatted as a RFC-3339 date-time with nanosecond precision.\n";
                };
            };
            readonly required: readonly ["most_actives", "last_updated"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const Movers: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly market_type: {
                    readonly type: "string";
                    readonly enum: readonly ["stocks", "crypto"];
                    readonly description: "Screen-specific market (stocks or crypto).";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["market_type"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly top: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 10;
                    readonly minimum: 1;
                    readonly maximum: 50;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of top market movers to fetch (gainers and losers). Will return this number of results for each. By default, 10 gainers and 10 losers.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly description: "Contains list of market movers.";
            readonly properties: {
                readonly gainers: {
                    readonly type: "array";
                    readonly description: "List of top N gainers.";
                    readonly items: {
                        readonly title: "Mover";
                        readonly type: "object";
                        readonly description: "A symbol whose price moved significantly.";
                        readonly properties: {
                            readonly symbol: {
                                readonly type: "string";
                                readonly description: "Symbol of market moving asset.";
                                readonly examples: readonly ["AGRI"];
                            };
                            readonly percent_change: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Percentage difference change for the day.";
                                readonly examples: readonly [145.56];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly change: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Difference in change for the day.";
                                readonly examples: readonly [2.46];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly price: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Current price of market moving asset.";
                                readonly examples: readonly [4.15];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                        };
                        readonly required: readonly ["symbol", "percent_change", "change", "price"];
                    };
                };
                readonly losers: {
                    readonly description: "List of top N losers.";
                    readonly type: "array";
                    readonly items: {
                        readonly title: "Mover";
                        readonly type: "object";
                        readonly description: "A symbol whose price moved significantly.";
                        readonly properties: {
                            readonly symbol: {
                                readonly type: "string";
                                readonly description: "Symbol of market moving asset.";
                                readonly examples: readonly ["AGRI"];
                            };
                            readonly percent_change: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Percentage difference change for the day.";
                                readonly examples: readonly [145.56];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly change: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Difference in change for the day.";
                                readonly examples: readonly [2.46];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly price: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Current price of market moving asset.";
                                readonly examples: readonly [4.15];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                        };
                        readonly required: readonly ["symbol", "percent_change", "change", "price"];
                    };
                };
                readonly market_type: {
                    readonly type: "string";
                    readonly enum: readonly ["stocks", "crypto"];
                    readonly description: "Market type (stocks or crypto).\n\n`stocks` `crypto`";
                };
                readonly last_updated: {
                    readonly type: "string";
                    readonly description: "Time when the movers were last computed. Formatted as a RFC-3339 date-time with nanosecond precision.\n";
                };
            };
            readonly required: readonly ["gainers", "losers", "market_type", "last_updated"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const News: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly start: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-03T00:00:00Z", "2024-01-03T01:02:03.123456789Z", "2024-01-03T09:30:00-04:00", "2024-01-03"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive start of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the beginning of the current day.\n";
                };
                readonly end: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-04T00:00:00Z", "2024-01-04T01:02:03.123456789Z", "2024-01-04T09:30:00-04:00", "2024-01-04"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive end of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the current time.\n";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "desc";
                    readonly description: "Sort articles by updated date.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL,TSLA,BTCUSD"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of symbols for which to query news.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 50;
                    readonly examples: readonly [10];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limit of news items to be returned for a result page.";
                };
                readonly include_content: {
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Boolean indicator to include content for news articles (if available).";
                };
                readonly exclude_contentless: {
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Boolean indicator to exclude news articles that do not contain content.";
                };
                readonly page_token: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The pagination token from which to continue. The value to pass here is returned in specific requests when more data is available, usually because of a response result limit.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly news: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Model representing a news article from the Alpaca Market Data API.";
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly description: "News article ID.";
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly headline: {
                                readonly type: "string";
                                readonly minLength: 1;
                                readonly description: "Headline or title of the article.";
                            };
                            readonly author: {
                                readonly type: "string";
                                readonly minLength: 1;
                                readonly description: "Original author of news article.";
                            };
                            readonly created_at: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly description: "Date article was created (RFC-3339).";
                            };
                            readonly updated_at: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly description: "Date article was updated (RFC-3339).";
                            };
                            readonly summary: {
                                readonly type: "string";
                                readonly minLength: 1;
                                readonly description: "Summary text for the article (may be first sentence of content).";
                            };
                            readonly content: {
                                readonly type: "string";
                                readonly minLength: 1;
                                readonly description: "Content of the news article (might contain HTML).";
                            };
                            readonly url: {
                                readonly type: readonly ["string", "null"];
                                readonly format: "uri";
                                readonly description: "URL of article (if applicable).";
                            };
                            readonly images: {
                                readonly type: "array";
                                readonly uniqueItems: true;
                                readonly description: "List of images (URLs) related to given article (may be empty).";
                                readonly items: {
                                    readonly description: "A model representing images for a news article. Simply a URL to the image along with a size parameter suggesting the display size of the image.";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly size: {
                                            readonly type: "string";
                                            readonly minLength: 1;
                                            readonly description: "Possible values for size are thumb, small and large.\n\n`thumb` `small` `large`";
                                            readonly enum: readonly ["thumb", "small", "large"];
                                            readonly examples: readonly ["thumb"];
                                        };
                                        readonly url: {
                                            readonly type: "string";
                                            readonly minLength: 1;
                                            readonly description: "URL to image from news article.";
                                            readonly format: "uri";
                                        };
                                    };
                                    readonly required: readonly ["size", "url"];
                                };
                            };
                            readonly symbols: {
                                readonly type: "array";
                                readonly description: "List of related or mentioned symbols.";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly source: {
                                readonly type: "string";
                                readonly minLength: 1;
                                readonly description: "Source where the news originated from (e.g. Benzinga).";
                            };
                        };
                        readonly required: readonly ["id", "headline", "author", "created_at", "updated_at", "summary", "content", "images", "symbols", "source"];
                    };
                };
                readonly next_page_token: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "Pagination token for the next page.";
                };
            };
            readonly required: readonly ["news", "next_page_token"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const OptionBars: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL241220C00300000,AAPL240315C00225000"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of contract symbols with a limit of 100.";
                };
                readonly timeframe: {
                    readonly type: "string";
                    readonly examples: readonly ["1Min"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The timeframe represented by each bar in aggregation.\nYou can use any of the following values:\n - `[1-59]Min` or `[1-59]T`, e.g. `5Min` or `5T` creates 5-minute aggregations\n - `[1-23]Hour` or `[1-23]H`, e.g. `12Hour` or `12H` creates 12-hour aggregations\n - `1Day` or `1D` creates 1-day aggregations\n - `1Week` or `1W` creates 1-week aggregations\n - `[1,2,3,4,6,12]Month` or `[1,2,3,4,6,12]M`, e.g. `3Month` or `3M` creates 3-month aggregations\n";
                };
                readonly start: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-03T00:00:00Z", "2024-01-03T01:02:03.123456789Z", "2024-01-03T09:30:00-04:00", "2024-01-03"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive start of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the beginning of the current day.\n";
                };
                readonly end: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-04T00:00:00Z", "2024-01-04T01:02:03.123456789Z", "2024-01-04T09:30:00-04:00", "2024-01-04"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive end of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the current time if the user has `opra` access, otherwise 15 minutes before the current time.\n";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 10000;
                    readonly default: 1000;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of data points to return in the response page.\nThe API may return less, even if there are more available data points in the requested interval.\nAlways check the `next_page_token` for more pages.\nThe limit applies to the total number of data points, not per symbol!\n";
                };
                readonly page_token: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The pagination token from which to continue. The value to pass here is returned in specific requests when more data is available, usually because of a response result limit.\n";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly description: "Sort data in ascending or descending order.";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "asc";
                    readonly "x-go-name": "TypeSort";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["symbols", "timeframe"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly bars: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly description: "OHLC aggregate of all the trades in a given interval.";
                            readonly properties: {
                                readonly t: {
                                    readonly type: "string";
                                    readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                    readonly format: "date-time";
                                    readonly "x-go-name": "Timestamp";
                                    readonly examples: readonly ["2024-01-18T05:00:00Z"];
                                };
                                readonly o: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Opening price.";
                                    readonly "x-go-name": "Open";
                                    readonly examples: readonly [0.28];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly h: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "High price.";
                                    readonly "x-go-name": "High";
                                    readonly examples: readonly [0.28];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly l: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Low price.";
                                    readonly "x-go-name": "Low";
                                    readonly examples: readonly [0.23];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly c: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Closing price.";
                                    readonly "x-go-name": "Close";
                                    readonly examples: readonly [0.23];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly v: {
                                    readonly type: "integer";
                                    readonly format: "int64";
                                    readonly description: "Bar volume.";
                                    readonly "x-go-name": "Volume";
                                    readonly examples: readonly [224];
                                    readonly minimum: -9223372036854776000;
                                    readonly maximum: 9223372036854776000;
                                };
                                readonly n: {
                                    readonly type: "integer";
                                    readonly format: "int64";
                                    readonly description: "Trade count in the bar.";
                                    readonly "x-go-name": "TradeCount";
                                    readonly examples: readonly [26];
                                    readonly minimum: -9223372036854776000;
                                    readonly maximum: 9223372036854776000;
                                };
                                readonly vw: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Volume weighted average price.";
                                    readonly "x-go-name": "VWAP";
                                    readonly examples: readonly [0.245045];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                            };
                            readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                        };
                    };
                };
                readonly next_page_token: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "Pagination token for the next page.";
                };
                readonly currency: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["bars", "next_page_token"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const OptionChain: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly underlying_symbol: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The financial instrument on which an option contract is based or derived.";
                };
            };
            readonly required: readonly ["underlying_symbol"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly feed: {
                    readonly type: "string";
                    readonly enum: readonly ["opra", "indicative"];
                    readonly default: "opra";
                    readonly description: "The source feed of the data. `opra` is the official OPRA feed, `indicative` is a free indicative feed where trades are delayed and quotes are modified. Default: `opra` if the user has a subscription, otherwise `indicative`.\n";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 1000;
                    readonly default: 100;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of maximum snapshots to return in a response.\nThe limit applies to the total number of data points, not the number per symbol!\nUse `next_page_token` to fetch the next set of responses.\n";
                };
                readonly updated_since: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter to snapshots that were updated since this timestamp, meaning that the timestamp of the trade or the quote is greater than or equal to this value.\nFormat: RFC-3339 or YYYY-MM-DD. If missing, all values are returned.\n";
                };
                readonly page_token: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The pagination token from which to continue. The value to pass here is returned in specific requests when more data is available, usually because of a response result limit.\n";
                };
                readonly type: {
                    readonly type: "string";
                    readonly enum: readonly ["call", "put"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter contracts by the type (call or put).";
                };
                readonly strike_price_gte: {
                    readonly type: "number";
                    readonly format: "double";
                    readonly minimum: -1.7976931348623157e+308;
                    readonly maximum: 1.7976931348623157e+308;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter contracts with strike price greater than or equal to the specified value.";
                };
                readonly strike_price_lte: {
                    readonly type: "number";
                    readonly format: "double";
                    readonly minimum: -1.7976931348623157e+308;
                    readonly maximum: 1.7976931348623157e+308;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter contracts with strike price less than or equal to the specified value.";
                };
                readonly expiration_date: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter contracts by the exact expiration date (format: YYYY-MM-DD).";
                };
                readonly expiration_date_gte: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter contracts with expiration date greater than or equal to the specified date.";
                };
                readonly expiration_date_lte: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter contracts with expiration date less than or equal to the specified date.";
                };
                readonly root_symbol: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter contracts by the root symbol.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly snapshots: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly description: "A snapshot provides the latest trade and latest quote.";
                        readonly properties: {
                            readonly dailyBar: {
                                readonly type: "object";
                                readonly description: "OHLC aggregate of all the trades in a given interval.";
                                readonly properties: {
                                    readonly t: {
                                        readonly type: "string";
                                        readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                        readonly format: "date-time";
                                        readonly "x-go-name": "Timestamp";
                                        readonly examples: readonly ["2024-01-18T05:00:00Z"];
                                    };
                                    readonly o: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Opening price.";
                                        readonly "x-go-name": "Open";
                                        readonly examples: readonly [0.28];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly h: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "High price.";
                                        readonly "x-go-name": "High";
                                        readonly examples: readonly [0.28];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly l: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Low price.";
                                        readonly "x-go-name": "Low";
                                        readonly examples: readonly [0.23];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly c: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Closing price.";
                                        readonly "x-go-name": "Close";
                                        readonly examples: readonly [0.23];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly v: {
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly description: "Bar volume.";
                                        readonly "x-go-name": "Volume";
                                        readonly examples: readonly [224];
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly n: {
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly description: "Trade count in the bar.";
                                        readonly "x-go-name": "TradeCount";
                                        readonly examples: readonly [26];
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly vw: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Volume weighted average price.";
                                        readonly "x-go-name": "VWAP";
                                        readonly examples: readonly [0.245045];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                };
                                readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                            };
                            readonly greeks: {
                                readonly type: "object";
                                readonly description: "The greeks for the contract calculated using the Black-Scholes model.";
                                readonly properties: {
                                    readonly delta: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly gamma: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly theta: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly vega: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly rho: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                };
                                readonly required: readonly ["delta", "gamma", "theta", "vega", "rho"];
                            };
                            readonly impliedVolatility: {
                                readonly description: "Implied volatility calculated using the Black-Scholes model.";
                                readonly format: "double";
                                readonly type: "number";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly latestQuote: {
                                readonly type: "object";
                                readonly description: "The best bid and ask information for a given option.\n";
                                readonly properties: {
                                    readonly t: {
                                        readonly type: "string";
                                        readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                        readonly format: "date-time";
                                        readonly "x-go-name": "Timestamp";
                                        readonly examples: readonly ["2024-02-28T15:30:28.046330624Z"];
                                    };
                                    readonly bx: {
                                        readonly type: "string";
                                        readonly description: "Bid exchange.";
                                        readonly "x-go-name": "BidExchange";
                                        readonly examples: readonly ["W"];
                                    };
                                    readonly bp: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Bid price.";
                                        readonly "x-go-name": "BidPrice";
                                        readonly examples: readonly [0.15];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly bs: {
                                        readonly type: "integer";
                                        readonly format: "uint32";
                                        readonly description: "Bid size.";
                                        readonly "x-go-name": "BidSize";
                                        readonly examples: readonly [164];
                                        readonly minimum: 0;
                                        readonly maximum: 4294967295;
                                    };
                                    readonly ax: {
                                        readonly type: "string";
                                        readonly description: "Ask exchange.";
                                        readonly "x-go-name": "AskExchange";
                                        readonly examples: readonly ["w"];
                                    };
                                    readonly ap: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Ask price.";
                                        readonly "x-go-name": "AskPrice";
                                        readonly examples: readonly [0.16];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly as: {
                                        readonly type: "integer";
                                        readonly format: "uint32";
                                        readonly description: "Ask size.";
                                        readonly "x-go-name": "AskSize";
                                        readonly examples: readonly [669];
                                        readonly minimum: 0;
                                        readonly maximum: 4294967295;
                                    };
                                    readonly c: {
                                        readonly type: "string";
                                        readonly description: "Quote condition.";
                                        readonly "x-go-name": "Condition";
                                        readonly examples: readonly ["A"];
                                    };
                                };
                                readonly required: readonly ["t", "bx", "bp", "bs", "ap", "as", "ax", "c"];
                            };
                            readonly latestTrade: {
                                readonly type: "object";
                                readonly description: "An option trade.";
                                readonly properties: {
                                    readonly t: {
                                        readonly type: "string";
                                        readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                        readonly format: "date-time";
                                        readonly "x-go-name": "Timestamp";
                                        readonly examples: readonly ["2024-01-18T15:03:44.56339456Z"];
                                    };
                                    readonly x: {
                                        readonly type: "string";
                                        readonly "x-go-name": "Exchange";
                                        readonly examples: readonly ["B"];
                                    };
                                    readonly p: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Trade price.";
                                        readonly "x-go-name": "Price";
                                        readonly examples: readonly [0.37];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly s: {
                                        readonly type: "integer";
                                        readonly format: "uint32";
                                        readonly description: "Trade size.";
                                        readonly "x-go-name": "Size";
                                        readonly examples: readonly [1];
                                        readonly minimum: 0;
                                        readonly maximum: 4294967295;
                                    };
                                    readonly c: {
                                        readonly type: "string";
                                        readonly description: "Trade condition.";
                                        readonly "x-go-name": "Condition";
                                        readonly examples: readonly ["I"];
                                    };
                                };
                                readonly required: readonly ["t", "x", "p", "s", "c"];
                            };
                            readonly minuteBar: {
                                readonly type: "object";
                                readonly description: "OHLC aggregate of all the trades in a given interval.";
                                readonly properties: {
                                    readonly t: {
                                        readonly type: "string";
                                        readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                        readonly format: "date-time";
                                        readonly "x-go-name": "Timestamp";
                                        readonly examples: readonly ["2024-01-18T05:00:00Z"];
                                    };
                                    readonly o: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Opening price.";
                                        readonly "x-go-name": "Open";
                                        readonly examples: readonly [0.28];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly h: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "High price.";
                                        readonly "x-go-name": "High";
                                        readonly examples: readonly [0.28];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly l: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Low price.";
                                        readonly "x-go-name": "Low";
                                        readonly examples: readonly [0.23];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly c: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Closing price.";
                                        readonly "x-go-name": "Close";
                                        readonly examples: readonly [0.23];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly v: {
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly description: "Bar volume.";
                                        readonly "x-go-name": "Volume";
                                        readonly examples: readonly [224];
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly n: {
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly description: "Trade count in the bar.";
                                        readonly "x-go-name": "TradeCount";
                                        readonly examples: readonly [26];
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly vw: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Volume weighted average price.";
                                        readonly "x-go-name": "VWAP";
                                        readonly examples: readonly [0.245045];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                };
                                readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                            };
                            readonly prevDailyBar: {
                                readonly type: "object";
                                readonly description: "OHLC aggregate of all the trades in a given interval.";
                                readonly properties: {
                                    readonly t: {
                                        readonly type: "string";
                                        readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                        readonly format: "date-time";
                                        readonly "x-go-name": "Timestamp";
                                        readonly examples: readonly ["2024-01-18T05:00:00Z"];
                                    };
                                    readonly o: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Opening price.";
                                        readonly "x-go-name": "Open";
                                        readonly examples: readonly [0.28];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly h: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "High price.";
                                        readonly "x-go-name": "High";
                                        readonly examples: readonly [0.28];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly l: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Low price.";
                                        readonly "x-go-name": "Low";
                                        readonly examples: readonly [0.23];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly c: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Closing price.";
                                        readonly "x-go-name": "Close";
                                        readonly examples: readonly [0.23];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly v: {
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly description: "Bar volume.";
                                        readonly "x-go-name": "Volume";
                                        readonly examples: readonly [224];
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly n: {
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly description: "Trade count in the bar.";
                                        readonly "x-go-name": "TradeCount";
                                        readonly examples: readonly [26];
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly vw: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Volume weighted average price.";
                                        readonly "x-go-name": "VWAP";
                                        readonly examples: readonly [0.245045];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                };
                                readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                            };
                        };
                    };
                };
                readonly next_page_token: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "Pagination token for the next page.";
                };
            };
            readonly required: readonly ["snapshots", "next_page_token"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const OptionLatestQuotes: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL241220C00300000,AAPL240315C00225000"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of contract symbols with a limit of 100.";
                };
                readonly feed: {
                    readonly type: "string";
                    readonly enum: readonly ["opra", "indicative"];
                    readonly default: "opra";
                    readonly description: "The source feed of the data. `opra` is the official OPRA feed, `indicative` is a free indicative feed where trades are delayed and quotes are modified. Default: `opra` if the user has a subscription, otherwise `indicative`.\n";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly quotes: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly description: "The best bid and ask information for a given option.\n";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2024-02-28T15:30:28.046330624Z"];
                            };
                            readonly bx: {
                                readonly type: "string";
                                readonly description: "Bid exchange.";
                                readonly "x-go-name": "BidExchange";
                                readonly examples: readonly ["W"];
                            };
                            readonly bp: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Bid price.";
                                readonly "x-go-name": "BidPrice";
                                readonly examples: readonly [0.15];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly bs: {
                                readonly type: "integer";
                                readonly format: "uint32";
                                readonly description: "Bid size.";
                                readonly "x-go-name": "BidSize";
                                readonly examples: readonly [164];
                                readonly minimum: 0;
                                readonly maximum: 4294967295;
                            };
                            readonly ax: {
                                readonly type: "string";
                                readonly description: "Ask exchange.";
                                readonly "x-go-name": "AskExchange";
                                readonly examples: readonly ["w"];
                            };
                            readonly ap: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Ask price.";
                                readonly "x-go-name": "AskPrice";
                                readonly examples: readonly [0.16];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly as: {
                                readonly type: "integer";
                                readonly format: "uint32";
                                readonly description: "Ask size.";
                                readonly "x-go-name": "AskSize";
                                readonly examples: readonly [669];
                                readonly minimum: 0;
                                readonly maximum: 4294967295;
                            };
                            readonly c: {
                                readonly type: "string";
                                readonly description: "Quote condition.";
                                readonly "x-go-name": "Condition";
                                readonly examples: readonly ["A"];
                            };
                        };
                        readonly required: readonly ["t", "bx", "bp", "bs", "ap", "as", "ax", "c"];
                    };
                };
            };
            readonly required: readonly ["quotes"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const OptionLatestTrades: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL241220C00300000,AAPL240315C00225000"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of contract symbols with a limit of 100.";
                };
                readonly feed: {
                    readonly type: "string";
                    readonly enum: readonly ["opra", "indicative"];
                    readonly default: "opra";
                    readonly description: "The source feed of the data. `opra` is the official OPRA feed, `indicative` is a free indicative feed where trades are delayed and quotes are modified. Default: `opra` if the user has a subscription, otherwise `indicative`.\n";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly trades: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly description: "An option trade.";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2024-01-18T15:03:44.56339456Z"];
                            };
                            readonly x: {
                                readonly type: "string";
                                readonly "x-go-name": "Exchange";
                                readonly examples: readonly ["B"];
                            };
                            readonly p: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Trade price.";
                                readonly "x-go-name": "Price";
                                readonly examples: readonly [0.37];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly s: {
                                readonly type: "integer";
                                readonly format: "uint32";
                                readonly description: "Trade size.";
                                readonly "x-go-name": "Size";
                                readonly examples: readonly [1];
                                readonly minimum: 0;
                                readonly maximum: 4294967295;
                            };
                            readonly c: {
                                readonly type: "string";
                                readonly description: "Trade condition.";
                                readonly "x-go-name": "Condition";
                                readonly examples: readonly ["I"];
                            };
                        };
                        readonly required: readonly ["t", "x", "p", "s", "c"];
                    };
                };
            };
            readonly required: readonly ["trades"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const OptionMetaConditions: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly ticktype: {
                    readonly type: "string";
                    readonly enum: readonly ["trade", "quote"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The type of ticks.";
                };
            };
            readonly required: readonly ["ticktype"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: {
                readonly type: "string";
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const OptionMetaExchanges: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: {
                readonly type: "string";
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const OptionSnapshots: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL241220C00300000,AAPL240315C00225000"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of contract symbols with a limit of 100.";
                };
                readonly feed: {
                    readonly type: "string";
                    readonly enum: readonly ["opra", "indicative"];
                    readonly default: "opra";
                    readonly description: "The source feed of the data. `opra` is the official OPRA feed, `indicative` is a free indicative feed where trades are delayed and quotes are modified. Default: `opra` if the user has a subscription, otherwise `indicative`.\n";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly updated_since: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter to snapshots that were updated since this timestamp, meaning that the timestamp of the trade or the quote is greater than or equal to this value.\nFormat: RFC-3339 or YYYY-MM-DD. If missing, all values are returned.\n";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 1000;
                    readonly default: 100;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of maximum snapshots to return in a response.\nThe limit applies to the total number of data points, not the number per symbol!\nUse `next_page_token` to fetch the next set of responses.\n";
                };
                readonly page_token: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The pagination token from which to continue. The value to pass here is returned in specific requests when more data is available, usually because of a response result limit.\n";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly snapshots: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly description: "A snapshot provides the latest trade and latest quote.";
                        readonly properties: {
                            readonly dailyBar: {
                                readonly type: "object";
                                readonly description: "OHLC aggregate of all the trades in a given interval.";
                                readonly properties: {
                                    readonly t: {
                                        readonly type: "string";
                                        readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                        readonly format: "date-time";
                                        readonly "x-go-name": "Timestamp";
                                        readonly examples: readonly ["2024-01-18T05:00:00Z"];
                                    };
                                    readonly o: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Opening price.";
                                        readonly "x-go-name": "Open";
                                        readonly examples: readonly [0.28];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly h: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "High price.";
                                        readonly "x-go-name": "High";
                                        readonly examples: readonly [0.28];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly l: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Low price.";
                                        readonly "x-go-name": "Low";
                                        readonly examples: readonly [0.23];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly c: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Closing price.";
                                        readonly "x-go-name": "Close";
                                        readonly examples: readonly [0.23];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly v: {
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly description: "Bar volume.";
                                        readonly "x-go-name": "Volume";
                                        readonly examples: readonly [224];
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly n: {
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly description: "Trade count in the bar.";
                                        readonly "x-go-name": "TradeCount";
                                        readonly examples: readonly [26];
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly vw: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Volume weighted average price.";
                                        readonly "x-go-name": "VWAP";
                                        readonly examples: readonly [0.245045];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                };
                                readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                            };
                            readonly greeks: {
                                readonly type: "object";
                                readonly description: "The greeks for the contract calculated using the Black-Scholes model.";
                                readonly properties: {
                                    readonly delta: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly gamma: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly theta: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly vega: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly rho: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                };
                                readonly required: readonly ["delta", "gamma", "theta", "vega", "rho"];
                            };
                            readonly impliedVolatility: {
                                readonly description: "Implied volatility calculated using the Black-Scholes model.";
                                readonly format: "double";
                                readonly type: "number";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly latestQuote: {
                                readonly type: "object";
                                readonly description: "The best bid and ask information for a given option.\n";
                                readonly properties: {
                                    readonly t: {
                                        readonly type: "string";
                                        readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                        readonly format: "date-time";
                                        readonly "x-go-name": "Timestamp";
                                        readonly examples: readonly ["2024-02-28T15:30:28.046330624Z"];
                                    };
                                    readonly bx: {
                                        readonly type: "string";
                                        readonly description: "Bid exchange.";
                                        readonly "x-go-name": "BidExchange";
                                        readonly examples: readonly ["W"];
                                    };
                                    readonly bp: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Bid price.";
                                        readonly "x-go-name": "BidPrice";
                                        readonly examples: readonly [0.15];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly bs: {
                                        readonly type: "integer";
                                        readonly format: "uint32";
                                        readonly description: "Bid size.";
                                        readonly "x-go-name": "BidSize";
                                        readonly examples: readonly [164];
                                        readonly minimum: 0;
                                        readonly maximum: 4294967295;
                                    };
                                    readonly ax: {
                                        readonly type: "string";
                                        readonly description: "Ask exchange.";
                                        readonly "x-go-name": "AskExchange";
                                        readonly examples: readonly ["w"];
                                    };
                                    readonly ap: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Ask price.";
                                        readonly "x-go-name": "AskPrice";
                                        readonly examples: readonly [0.16];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly as: {
                                        readonly type: "integer";
                                        readonly format: "uint32";
                                        readonly description: "Ask size.";
                                        readonly "x-go-name": "AskSize";
                                        readonly examples: readonly [669];
                                        readonly minimum: 0;
                                        readonly maximum: 4294967295;
                                    };
                                    readonly c: {
                                        readonly type: "string";
                                        readonly description: "Quote condition.";
                                        readonly "x-go-name": "Condition";
                                        readonly examples: readonly ["A"];
                                    };
                                };
                                readonly required: readonly ["t", "bx", "bp", "bs", "ap", "as", "ax", "c"];
                            };
                            readonly latestTrade: {
                                readonly type: "object";
                                readonly description: "An option trade.";
                                readonly properties: {
                                    readonly t: {
                                        readonly type: "string";
                                        readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                        readonly format: "date-time";
                                        readonly "x-go-name": "Timestamp";
                                        readonly examples: readonly ["2024-01-18T15:03:44.56339456Z"];
                                    };
                                    readonly x: {
                                        readonly type: "string";
                                        readonly "x-go-name": "Exchange";
                                        readonly examples: readonly ["B"];
                                    };
                                    readonly p: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Trade price.";
                                        readonly "x-go-name": "Price";
                                        readonly examples: readonly [0.37];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly s: {
                                        readonly type: "integer";
                                        readonly format: "uint32";
                                        readonly description: "Trade size.";
                                        readonly "x-go-name": "Size";
                                        readonly examples: readonly [1];
                                        readonly minimum: 0;
                                        readonly maximum: 4294967295;
                                    };
                                    readonly c: {
                                        readonly type: "string";
                                        readonly description: "Trade condition.";
                                        readonly "x-go-name": "Condition";
                                        readonly examples: readonly ["I"];
                                    };
                                };
                                readonly required: readonly ["t", "x", "p", "s", "c"];
                            };
                            readonly minuteBar: {
                                readonly type: "object";
                                readonly description: "OHLC aggregate of all the trades in a given interval.";
                                readonly properties: {
                                    readonly t: {
                                        readonly type: "string";
                                        readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                        readonly format: "date-time";
                                        readonly "x-go-name": "Timestamp";
                                        readonly examples: readonly ["2024-01-18T05:00:00Z"];
                                    };
                                    readonly o: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Opening price.";
                                        readonly "x-go-name": "Open";
                                        readonly examples: readonly [0.28];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly h: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "High price.";
                                        readonly "x-go-name": "High";
                                        readonly examples: readonly [0.28];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly l: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Low price.";
                                        readonly "x-go-name": "Low";
                                        readonly examples: readonly [0.23];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly c: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Closing price.";
                                        readonly "x-go-name": "Close";
                                        readonly examples: readonly [0.23];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly v: {
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly description: "Bar volume.";
                                        readonly "x-go-name": "Volume";
                                        readonly examples: readonly [224];
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly n: {
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly description: "Trade count in the bar.";
                                        readonly "x-go-name": "TradeCount";
                                        readonly examples: readonly [26];
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly vw: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Volume weighted average price.";
                                        readonly "x-go-name": "VWAP";
                                        readonly examples: readonly [0.245045];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                };
                                readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                            };
                            readonly prevDailyBar: {
                                readonly type: "object";
                                readonly description: "OHLC aggregate of all the trades in a given interval.";
                                readonly properties: {
                                    readonly t: {
                                        readonly type: "string";
                                        readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                        readonly format: "date-time";
                                        readonly "x-go-name": "Timestamp";
                                        readonly examples: readonly ["2024-01-18T05:00:00Z"];
                                    };
                                    readonly o: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Opening price.";
                                        readonly "x-go-name": "Open";
                                        readonly examples: readonly [0.28];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly h: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "High price.";
                                        readonly "x-go-name": "High";
                                        readonly examples: readonly [0.28];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly l: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Low price.";
                                        readonly "x-go-name": "Low";
                                        readonly examples: readonly [0.23];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly c: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Closing price.";
                                        readonly "x-go-name": "Close";
                                        readonly examples: readonly [0.23];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly v: {
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly description: "Bar volume.";
                                        readonly "x-go-name": "Volume";
                                        readonly examples: readonly [224];
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly n: {
                                        readonly type: "integer";
                                        readonly format: "int64";
                                        readonly description: "Trade count in the bar.";
                                        readonly "x-go-name": "TradeCount";
                                        readonly examples: readonly [26];
                                        readonly minimum: -9223372036854776000;
                                        readonly maximum: 9223372036854776000;
                                    };
                                    readonly vw: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly description: "Volume weighted average price.";
                                        readonly "x-go-name": "VWAP";
                                        readonly examples: readonly [0.245045];
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                };
                                readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                            };
                        };
                    };
                };
                readonly next_page_token: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "Pagination token for the next page.";
                };
            };
            readonly required: readonly ["snapshots", "next_page_token"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const OptionTrades: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL241220C00300000,AAPL240315C00225000"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of contract symbols with a limit of 100.";
                };
                readonly start: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-03T00:00:00Z", "2024-01-03T01:02:03.123456789Z", "2024-01-03T09:30:00-04:00", "2024-01-03"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive start of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the beginning of the current day.\n";
                };
                readonly end: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-04T00:00:00Z", "2024-01-04T01:02:03.123456789Z", "2024-01-04T09:30:00-04:00", "2024-01-04"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive end of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the current time if the user has `opra` access, otherwise 15 minutes before the current time.\n";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 10000;
                    readonly default: 1000;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of data points to return in the response page.\nThe API may return less, even if there are more available data points in the requested interval.\nAlways check the `next_page_token` for more pages.\nThe limit applies to the total number of data points, not per symbol!\n";
                };
                readonly page_token: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The pagination token from which to continue. The value to pass here is returned in specific requests when more data is available, usually because of a response result limit.\n";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly description: "Sort data in ascending or descending order.";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "asc";
                    readonly "x-go-name": "TypeSort";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly trades: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly description: "An option trade.";
                            readonly properties: {
                                readonly t: {
                                    readonly type: "string";
                                    readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                    readonly format: "date-time";
                                    readonly "x-go-name": "Timestamp";
                                    readonly examples: readonly ["2024-01-18T15:03:44.56339456Z"];
                                };
                                readonly x: {
                                    readonly type: "string";
                                    readonly "x-go-name": "Exchange";
                                    readonly examples: readonly ["B"];
                                };
                                readonly p: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Trade price.";
                                    readonly "x-go-name": "Price";
                                    readonly examples: readonly [0.37];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly s: {
                                    readonly type: "integer";
                                    readonly format: "uint32";
                                    readonly description: "Trade size.";
                                    readonly "x-go-name": "Size";
                                    readonly examples: readonly [1];
                                    readonly minimum: 0;
                                    readonly maximum: 4294967295;
                                };
                                readonly c: {
                                    readonly type: "string";
                                    readonly description: "Trade condition.";
                                    readonly "x-go-name": "Condition";
                                    readonly examples: readonly ["I"];
                                };
                            };
                            readonly required: readonly ["t", "x", "p", "s", "c"];
                        };
                    };
                };
                readonly currency: {
                    readonly type: "string";
                };
                readonly next_page_token: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "Pagination token for the next page.";
                };
            };
            readonly required: readonly ["trades", "next_page_token"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const Rates: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly currency_pairs: {
                    readonly type: "string";
                    readonly description: "A comma-separated string with currency pairs.";
                    readonly "x-go-name": "TypeCurrencyPairs";
                    readonly examples: readonly ["USDJPY,USDMXN"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly timeframe: {
                    readonly type: "string";
                    readonly default: "1Min";
                    readonly description: "The sampling interval of the currency rates. For example, 5S returns forex rates sampled every five seconds.\nYou can use the following values:\n - `5Sec` or `5S`\n - `1Min` or `1T`\n - `1Day` or `1D`\n";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly start: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-03T00:00:00Z", "2024-01-03T01:02:03.123456789Z", "2024-01-03T09:30:00-04:00", "2024-01-03"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive start of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the beginning of the current day.\n";
                };
                readonly end: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-04T00:00:00Z", "2024-01-04T01:02:03.123456789Z", "2024-01-04T09:30:00-04:00", "2024-01-04"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive end of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the current time.\n";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 10000;
                    readonly default: 1000;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of data points to return in the response page.\nThe API may return less, even if there are more available data points in the requested interval.\nAlways check the `next_page_token` for more pages.\nThe limit applies to the total number of data points, not per symbol!\n";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly description: "Sort data in ascending or descending order.";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "asc";
                    readonly "x-go-name": "TypeSort";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page_token: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The pagination token from which to continue. The value to pass here is returned in specific requests when more data is available, usually because of a response result limit.\n";
                };
            };
            readonly required: readonly ["currency_pairs"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly rates: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "array";
                        readonly items: {
                            readonly description: "A foreign exchange rate between two currencies at a given time.";
                            readonly type: "object";
                            readonly properties: {
                                readonly bp: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly "x-go-name": "BidPrice";
                                    readonly description: "The last bid price value of the currency at the end of the timeframe.";
                                    readonly examples: readonly [127.702];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly mp: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly "x-go-name": "MidPrice";
                                    readonly description: "The last mid price value of the currency at the end of the timeframe.";
                                    readonly examples: readonly [127.757];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly ap: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly "x-go-name": "AskPrice";
                                    readonly description: "The last ask price value of the currency at the end of the timeframe.";
                                    readonly examples: readonly [127.763];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly t: {
                                    readonly type: "string";
                                    readonly format: "date-time";
                                    readonly "x-go-name": "Timestamp";
                                    readonly description: "Timestamp of the rate.";
                                    readonly examples: readonly ["2022-04-20T18:23:00Z"];
                                };
                            };
                            readonly required: readonly ["bp", "mp", "ap", "t"];
                        };
                    };
                };
                readonly next_page_token: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "Pagination token for the next page.";
                };
            };
            readonly required: readonly ["rates", "next_page_token"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const StockAuctionSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbol: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The symbol to query.";
                };
            };
            readonly required: readonly ["symbol"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly start: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-03T00:00:00Z", "2024-01-03T01:02:03.123456789Z", "2024-01-03T09:30:00-04:00", "2024-01-03"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive start of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the beginning of the current day.\n";
                };
                readonly end: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-04T00:00:00Z", "2024-01-04T01:02:03.123456789Z", "2024-01-04T09:30:00-04:00", "2024-01-04"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive end of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: current time if `feed` is not `sip` or if the user has a subscription, otherwise 15 minutes before the current time.\n";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 10000;
                    readonly default: 1000;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of data points to return in the response page.\nThe API may return less, even if there are more available data points in the requested interval.\nAlways check the `next_page_token` for more pages.\nThe limit applies to the total number of data points, not per symbol!\n";
                };
                readonly asof: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The as-of date of the queried stock symbol(s). Format: YYYY-MM-DD. Default: current day.\n\nThis date is used to identify the underlying entity of the provided symbol(s), so that name changes for this entity can be found. Data for past symbol(s) is returned if the query date range spans the name change.\n\nThe special value of \"-\" means symbol mapping is skipped. Data is returned based on the symbol alone without looking up previous names. The same happens if the queried symbol is not found on the given `asof` date.\n\nExample: FB was renamed to META in 2022-06-09. Querying META with an `asof` date after 2022-06-09 will also yield FB data. The data for the FB ticker will be labeled as META because they are considered the same underlying entity as of 2022-06-09. Querying FB with an `asof` date after 2022-06-09 will only return data with the FB ticker, not with META. But with an `asof` date before 2022-06-09, META will also be returned (as FB).\n";
                };
                readonly feed: {
                    readonly type: "string";
                    readonly default: "sip";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Only `sip` is valid for auctions.";
                };
                readonly currency: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The currency of all prices in ISO 4217 format. Default: USD.\n";
                };
                readonly page_token: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The pagination token from which to continue. The value to pass here is returned in specific requests when more data is available, usually because of a response result limit.\n";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly description: "Sort data in ascending or descending order.";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "asc";
                    readonly "x-go-name": "TypeSort";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly symbol: {
                    readonly type: "string";
                };
                readonly auctions: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly description: "Opening and closing auction prices for a given day.\n";
                        readonly properties: {
                            readonly d: {
                                readonly type: "string";
                                readonly description: "Date in RFC-3339.";
                                readonly format: "date";
                                readonly "x-go-name": "Date";
                            };
                            readonly o: {
                                readonly type: "array";
                                readonly description: "Opening auctions.";
                                readonly items: {
                                    readonly type: "object";
                                    readonly description: "An auction\n";
                                    readonly properties: {
                                        readonly t: {
                                            readonly type: "string";
                                            readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                            readonly format: "date-time";
                                            readonly "x-go-name": "Timestamp";
                                            readonly examples: readonly ["2022-10-13T13:30:01.688322951Z"];
                                        };
                                        readonly x: {
                                            readonly type: "string";
                                            readonly description: "Exchange code. See `v2/stocks/meta/exchanges` for more details.";
                                            readonly examples: readonly ["Q"];
                                        };
                                        readonly p: {
                                            readonly type: "number";
                                            readonly format: "double";
                                            readonly description: "Auction price.";
                                            readonly "x-go-name": "Price";
                                            readonly examples: readonly [135];
                                            readonly minimum: -1.7976931348623157e+308;
                                            readonly maximum: 1.7976931348623157e+308;
                                        };
                                        readonly s: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly description: "Auction trade size.";
                                            readonly "x-go-name": "Size";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly c: {
                                            readonly description: "The condition flag indicating that this is an auction. See `v2/stocks/meta/conditions/trade` for more details.\n";
                                            readonly type: "string";
                                            readonly "x-go-name": "Condition";
                                            readonly examples: readonly ["O"];
                                        };
                                    };
                                    readonly required: readonly ["t", "x", "p", "c"];
                                };
                                readonly "x-go-name": "Opens";
                            };
                            readonly c: {
                                readonly type: "array";
                                readonly description: "Closing auctions. Every price / exchange / condition triplet is only shown once, with its earliest timestamp.";
                                readonly items: {
                                    readonly type: "object";
                                    readonly description: "An auction\n";
                                    readonly properties: {
                                        readonly t: {
                                            readonly type: "string";
                                            readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                            readonly format: "date-time";
                                            readonly "x-go-name": "Timestamp";
                                            readonly examples: readonly ["2022-10-13T13:30:01.688322951Z"];
                                        };
                                        readonly x: {
                                            readonly type: "string";
                                            readonly description: "Exchange code. See `v2/stocks/meta/exchanges` for more details.";
                                            readonly examples: readonly ["Q"];
                                        };
                                        readonly p: {
                                            readonly type: "number";
                                            readonly format: "double";
                                            readonly description: "Auction price.";
                                            readonly "x-go-name": "Price";
                                            readonly examples: readonly [135];
                                            readonly minimum: -1.7976931348623157e+308;
                                            readonly maximum: 1.7976931348623157e+308;
                                        };
                                        readonly s: {
                                            readonly type: "integer";
                                            readonly format: "int64";
                                            readonly description: "Auction trade size.";
                                            readonly "x-go-name": "Size";
                                            readonly minimum: -9223372036854776000;
                                            readonly maximum: 9223372036854776000;
                                        };
                                        readonly c: {
                                            readonly description: "The condition flag indicating that this is an auction. See `v2/stocks/meta/conditions/trade` for more details.\n";
                                            readonly type: "string";
                                            readonly "x-go-name": "Condition";
                                            readonly examples: readonly ["O"];
                                        };
                                    };
                                    readonly required: readonly ["t", "x", "p", "c"];
                                };
                                readonly "x-go-name": "Closes";
                            };
                        };
                        readonly required: readonly ["d", "o", "c"];
                    };
                };
                readonly currency: {
                    readonly type: "string";
                };
                readonly next_page_token: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "Pagination token for the next page.";
                };
            };
            readonly required: readonly ["auctions", "next_page_token", "symbol"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const StockAuctions: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL,TSLA"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of stock symbols.";
                };
                readonly start: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-03T00:00:00Z", "2024-01-03T01:02:03.123456789Z", "2024-01-03T09:30:00-04:00", "2024-01-03"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive start of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the beginning of the current day.\n";
                };
                readonly end: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-04T00:00:00Z", "2024-01-04T01:02:03.123456789Z", "2024-01-04T09:30:00-04:00", "2024-01-04"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive end of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: current time if `feed` is not `sip` or if the user has a subscription, otherwise 15 minutes before the current time.\n";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 10000;
                    readonly default: 1000;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of data points to return in the response page.\nThe API may return less, even if there are more available data points in the requested interval.\nAlways check the `next_page_token` for more pages.\nThe limit applies to the total number of data points, not per symbol!\n";
                };
                readonly asof: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The as-of date of the queried stock symbol(s). Format: YYYY-MM-DD. Default: current day.\n\nThis date is used to identify the underlying entity of the provided symbol(s), so that name changes for this entity can be found. Data for past symbol(s) is returned if the query date range spans the name change.\n\nThe special value of \"-\" means symbol mapping is skipped. Data is returned based on the symbol alone without looking up previous names. The same happens if the queried symbol is not found on the given `asof` date.\n\nExample: FB was renamed to META in 2022-06-09. Querying META with an `asof` date after 2022-06-09 will also yield FB data. The data for the FB ticker will be labeled as META because they are considered the same underlying entity as of 2022-06-09. Querying FB with an `asof` date after 2022-06-09 will only return data with the FB ticker, not with META. But with an `asof` date before 2022-06-09, META will also be returned (as FB).\n";
                };
                readonly feed: {
                    readonly type: "string";
                    readonly default: "sip";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Only `sip` is valid for auctions.";
                };
                readonly currency: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The currency of all prices in ISO 4217 format. Default: USD.\n";
                };
                readonly page_token: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The pagination token from which to continue. The value to pass here is returned in specific requests when more data is available, usually because of a response result limit.\n";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly description: "Sort data in ascending or descending order.";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "asc";
                    readonly "x-go-name": "TypeSort";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly auctions: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly description: "Opening and closing auction prices for a given day.\n";
                            readonly properties: {
                                readonly d: {
                                    readonly type: "string";
                                    readonly description: "Date in RFC-3339.";
                                    readonly format: "date";
                                    readonly "x-go-name": "Date";
                                };
                                readonly o: {
                                    readonly type: "array";
                                    readonly description: "Opening auctions.";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly description: "An auction\n";
                                        readonly properties: {
                                            readonly t: {
                                                readonly type: "string";
                                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                                readonly format: "date-time";
                                                readonly "x-go-name": "Timestamp";
                                                readonly examples: readonly ["2022-10-13T13:30:01.688322951Z"];
                                            };
                                            readonly x: {
                                                readonly type: "string";
                                                readonly description: "Exchange code. See `v2/stocks/meta/exchanges` for more details.";
                                                readonly examples: readonly ["Q"];
                                            };
                                            readonly p: {
                                                readonly type: "number";
                                                readonly format: "double";
                                                readonly description: "Auction price.";
                                                readonly "x-go-name": "Price";
                                                readonly examples: readonly [135];
                                                readonly minimum: -1.7976931348623157e+308;
                                                readonly maximum: 1.7976931348623157e+308;
                                            };
                                            readonly s: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly description: "Auction trade size.";
                                                readonly "x-go-name": "Size";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                            readonly c: {
                                                readonly description: "The condition flag indicating that this is an auction. See `v2/stocks/meta/conditions/trade` for more details.\n";
                                                readonly type: "string";
                                                readonly "x-go-name": "Condition";
                                                readonly examples: readonly ["O"];
                                            };
                                        };
                                        readonly required: readonly ["t", "x", "p", "c"];
                                    };
                                    readonly "x-go-name": "Opens";
                                };
                                readonly c: {
                                    readonly type: "array";
                                    readonly description: "Closing auctions. Every price / exchange / condition triplet is only shown once, with its earliest timestamp.";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly description: "An auction\n";
                                        readonly properties: {
                                            readonly t: {
                                                readonly type: "string";
                                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                                readonly format: "date-time";
                                                readonly "x-go-name": "Timestamp";
                                                readonly examples: readonly ["2022-10-13T13:30:01.688322951Z"];
                                            };
                                            readonly x: {
                                                readonly type: "string";
                                                readonly description: "Exchange code. See `v2/stocks/meta/exchanges` for more details.";
                                                readonly examples: readonly ["Q"];
                                            };
                                            readonly p: {
                                                readonly type: "number";
                                                readonly format: "double";
                                                readonly description: "Auction price.";
                                                readonly "x-go-name": "Price";
                                                readonly examples: readonly [135];
                                                readonly minimum: -1.7976931348623157e+308;
                                                readonly maximum: 1.7976931348623157e+308;
                                            };
                                            readonly s: {
                                                readonly type: "integer";
                                                readonly format: "int64";
                                                readonly description: "Auction trade size.";
                                                readonly "x-go-name": "Size";
                                                readonly minimum: -9223372036854776000;
                                                readonly maximum: 9223372036854776000;
                                            };
                                            readonly c: {
                                                readonly description: "The condition flag indicating that this is an auction. See `v2/stocks/meta/conditions/trade` for more details.\n";
                                                readonly type: "string";
                                                readonly "x-go-name": "Condition";
                                                readonly examples: readonly ["O"];
                                            };
                                        };
                                        readonly required: readonly ["t", "x", "p", "c"];
                                    };
                                    readonly "x-go-name": "Closes";
                                };
                            };
                            readonly required: readonly ["d", "o", "c"];
                        };
                    };
                };
                readonly currency: {
                    readonly type: "string";
                };
                readonly next_page_token: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "Pagination token for the next page.";
                };
            };
            readonly required: readonly ["auctions", "next_page_token"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const StockBarSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbol: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The symbol to query.";
                };
            };
            readonly required: readonly ["symbol"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly timeframe: {
                    readonly type: "string";
                    readonly examples: readonly ["1Min"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The timeframe represented by each bar in aggregation.\nYou can use any of the following values:\n - `[1-59]Min` or `[1-59]T`, e.g. `5Min` or `5T` creates 5-minute aggregations\n - `[1-23]Hour` or `[1-23]H`, e.g. `12Hour` or `12H` creates 12-hour aggregations\n - `1Day` or `1D` creates 1-day aggregations\n - `1Week` or `1W` creates 1-week aggregations\n - `[1,2,3,4,6,12]Month` or `[1,2,3,4,6,12]M`, e.g. `3Month` or `3M` creates 3-month aggregations\n";
                };
                readonly start: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-03T00:00:00Z", "2024-01-03T01:02:03.123456789Z", "2024-01-03T09:30:00-04:00", "2024-01-03"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive start of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the beginning of the current day.\n";
                };
                readonly end: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-04T00:00:00Z", "2024-01-04T01:02:03.123456789Z", "2024-01-04T09:30:00-04:00", "2024-01-04"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive end of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: current time if `feed` is not `sip` or if the user has a subscription, otherwise 15 minutes before the current time.\n";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 10000;
                    readonly default: 1000;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of data points to return in the response page.\nThe API may return less, even if there are more available data points in the requested interval.\nAlways check the `next_page_token` for more pages.\nThe limit applies to the total number of data points, not per symbol!\n";
                };
                readonly adjustment: {
                    readonly type: "string";
                    readonly enum: readonly ["raw", "split", "dividend", "all"];
                    readonly default: "raw";
                    readonly description: "Specifies the corporate action adjustment for the stocks.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly asof: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The as-of date of the queried stock symbol(s). Format: YYYY-MM-DD. Default: current day.\n\nThis date is used to identify the underlying entity of the provided symbol(s), so that name changes for this entity can be found. Data for past symbol(s) is returned if the query date range spans the name change.\n\nThe special value of \"-\" means symbol mapping is skipped. Data is returned based on the symbol alone without looking up previous names. The same happens if the queried symbol is not found on the given `asof` date.\n\nExample: FB was renamed to META in 2022-06-09. Querying META with an `asof` date after 2022-06-09 will also yield FB data. The data for the FB ticker will be labeled as META because they are considered the same underlying entity as of 2022-06-09. Querying FB with an `asof` date after 2022-06-09 will only return data with the FB ticker, not with META. But with an `asof` date before 2022-06-09, META will also be returned (as FB).\n";
                };
                readonly feed: {
                    readonly type: "string";
                    readonly enum: readonly ["iex", "otc", "sip"];
                    readonly default: "sip";
                    readonly description: "The source feed of the data: `sip` contains all US exchanges, `iex` contains only the Investors EXchange, and `otc` contains over-the-counter exchanges. Default: `sip`.\n";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly currency: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The currency of all prices in ISO 4217 format. Default: USD.\n";
                };
                readonly page_token: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The pagination token from which to continue. The value to pass here is returned in specific requests when more data is available, usually because of a response result limit.\n";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly description: "Sort data in ascending or descending order.";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "asc";
                    readonly "x-go-name": "TypeSort";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["timeframe"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly symbol: {
                    readonly type: "string";
                };
                readonly bars: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly description: "OHLC aggregate of all the trades in a given interval.\n";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2022-01-03T09:00:00Z"];
                            };
                            readonly o: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Opening price.";
                                readonly "x-go-name": "Open";
                                readonly examples: readonly [178.26];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly h: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "High price.";
                                readonly "x-go-name": "High";
                                readonly examples: readonly [178.34];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly l: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Low price.";
                                readonly "x-go-name": "Low";
                                readonly examples: readonly [177.76];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly c: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Closing price.";
                                readonly "x-go-name": "Close";
                                readonly examples: readonly [178.08];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly v: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly description: "Bar volume.";
                                readonly "x-go-name": "Volume";
                                readonly examples: readonly [60937];
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly n: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly description: "Trade count in the bar.";
                                readonly "x-go-name": "TradeCount";
                                readonly examples: readonly [1727];
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly vw: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Volume weighted average price.";
                                readonly "x-go-name": "VWAP";
                                readonly examples: readonly [177.954244];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                        };
                        readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                    };
                };
                readonly currency: {
                    readonly type: "string";
                };
                readonly next_page_token: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "Pagination token for the next page.";
                };
            };
            readonly required: readonly ["bars", "next_page_token", "symbol"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const StockBars: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL,TSLA"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of stock symbols.";
                };
                readonly timeframe: {
                    readonly type: "string";
                    readonly examples: readonly ["1Min"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The timeframe represented by each bar in aggregation.\nYou can use any of the following values:\n - `[1-59]Min` or `[1-59]T`, e.g. `5Min` or `5T` creates 5-minute aggregations\n - `[1-23]Hour` or `[1-23]H`, e.g. `12Hour` or `12H` creates 12-hour aggregations\n - `1Day` or `1D` creates 1-day aggregations\n - `1Week` or `1W` creates 1-week aggregations\n - `[1,2,3,4,6,12]Month` or `[1,2,3,4,6,12]M`, e.g. `3Month` or `3M` creates 3-month aggregations\n";
                };
                readonly start: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-03T00:00:00Z", "2024-01-03T01:02:03.123456789Z", "2024-01-03T09:30:00-04:00", "2024-01-03"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive start of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the beginning of the current day.\n";
                };
                readonly end: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-04T00:00:00Z", "2024-01-04T01:02:03.123456789Z", "2024-01-04T09:30:00-04:00", "2024-01-04"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive end of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: current time if `feed` is not `sip` or if the user has a subscription, otherwise 15 minutes before the current time.\n";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 10000;
                    readonly default: 1000;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of data points to return in the response page.\nThe API may return less, even if there are more available data points in the requested interval.\nAlways check the `next_page_token` for more pages.\nThe limit applies to the total number of data points, not per symbol!\n";
                };
                readonly adjustment: {
                    readonly type: "string";
                    readonly enum: readonly ["raw", "split", "dividend", "all"];
                    readonly default: "raw";
                    readonly description: "Specifies the corporate action adjustment for the stocks.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly asof: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The as-of date of the queried stock symbol(s). Format: YYYY-MM-DD. Default: current day.\n\nThis date is used to identify the underlying entity of the provided symbol(s), so that name changes for this entity can be found. Data for past symbol(s) is returned if the query date range spans the name change.\n\nThe special value of \"-\" means symbol mapping is skipped. Data is returned based on the symbol alone without looking up previous names. The same happens if the queried symbol is not found on the given `asof` date.\n\nExample: FB was renamed to META in 2022-06-09. Querying META with an `asof` date after 2022-06-09 will also yield FB data. The data for the FB ticker will be labeled as META because they are considered the same underlying entity as of 2022-06-09. Querying FB with an `asof` date after 2022-06-09 will only return data with the FB ticker, not with META. But with an `asof` date before 2022-06-09, META will also be returned (as FB).\n";
                };
                readonly feed: {
                    readonly type: "string";
                    readonly enum: readonly ["iex", "otc", "sip"];
                    readonly default: "sip";
                    readonly description: "The source feed of the data: `sip` contains all US exchanges, `iex` contains only the Investors EXchange, and `otc` contains over-the-counter exchanges. Default: `sip`.\n";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly currency: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The currency of all prices in ISO 4217 format. Default: USD.\n";
                };
                readonly page_token: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The pagination token from which to continue. The value to pass here is returned in specific requests when more data is available, usually because of a response result limit.\n";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly description: "Sort data in ascending or descending order.";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "asc";
                    readonly "x-go-name": "TypeSort";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["symbols", "timeframe"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly bars: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly description: "OHLC aggregate of all the trades in a given interval.\n";
                            readonly properties: {
                                readonly t: {
                                    readonly type: "string";
                                    readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                    readonly format: "date-time";
                                    readonly "x-go-name": "Timestamp";
                                    readonly examples: readonly ["2022-01-03T09:00:00Z"];
                                };
                                readonly o: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Opening price.";
                                    readonly "x-go-name": "Open";
                                    readonly examples: readonly [178.26];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly h: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "High price.";
                                    readonly "x-go-name": "High";
                                    readonly examples: readonly [178.34];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly l: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Low price.";
                                    readonly "x-go-name": "Low";
                                    readonly examples: readonly [177.76];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly c: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Closing price.";
                                    readonly "x-go-name": "Close";
                                    readonly examples: readonly [178.08];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly v: {
                                    readonly type: "integer";
                                    readonly format: "int64";
                                    readonly description: "Bar volume.";
                                    readonly "x-go-name": "Volume";
                                    readonly examples: readonly [60937];
                                    readonly minimum: -9223372036854776000;
                                    readonly maximum: 9223372036854776000;
                                };
                                readonly n: {
                                    readonly type: "integer";
                                    readonly format: "int64";
                                    readonly description: "Trade count in the bar.";
                                    readonly "x-go-name": "TradeCount";
                                    readonly examples: readonly [1727];
                                    readonly minimum: -9223372036854776000;
                                    readonly maximum: 9223372036854776000;
                                };
                                readonly vw: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Volume weighted average price.";
                                    readonly "x-go-name": "VWAP";
                                    readonly examples: readonly [177.954244];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                            };
                            readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                        };
                    };
                };
                readonly next_page_token: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "Pagination token for the next page.";
                };
                readonly currency: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["bars", "next_page_token"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const StockLatestBarSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbol: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The symbol to query.";
                };
            };
            readonly required: readonly ["symbol"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly feed: {
                    readonly type: "string";
                    readonly enum: readonly ["iex", "otc", "sip", "delayed_sip"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The source feed of the data: `sip` contains all US exchanges, `iex` contains only the Investors EXchange, and `otc` contains over-the-counter exchanges. `delayed_sip` is SIP data with a 15 minute delay. Default: `sip` if the user has the unlimited subscription, otherwise `iex`.\n";
                };
                readonly currency: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The currency of all prices in ISO 4217 format. Default: USD.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly bar: {
                    readonly type: "object";
                    readonly description: "OHLC aggregate of all the trades in a given interval.\n";
                    readonly properties: {
                        readonly t: {
                            readonly type: "string";
                            readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                            readonly format: "date-time";
                            readonly "x-go-name": "Timestamp";
                            readonly examples: readonly ["2022-01-03T09:00:00Z"];
                        };
                        readonly o: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Opening price.";
                            readonly "x-go-name": "Open";
                            readonly examples: readonly [178.26];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly h: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "High price.";
                            readonly "x-go-name": "High";
                            readonly examples: readonly [178.34];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly l: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Low price.";
                            readonly "x-go-name": "Low";
                            readonly examples: readonly [177.76];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly c: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Closing price.";
                            readonly "x-go-name": "Close";
                            readonly examples: readonly [178.08];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly v: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly description: "Bar volume.";
                            readonly "x-go-name": "Volume";
                            readonly examples: readonly [60937];
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly n: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly description: "Trade count in the bar.";
                            readonly "x-go-name": "TradeCount";
                            readonly examples: readonly [1727];
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly vw: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Volume weighted average price.";
                            readonly "x-go-name": "VWAP";
                            readonly examples: readonly [177.954244];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                    };
                    readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                };
                readonly symbol: {
                    readonly type: "string";
                };
                readonly currency: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["bar", "symbol"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const StockLatestBars: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL,TSLA"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of stock symbols.";
                };
                readonly feed: {
                    readonly type: "string";
                    readonly enum: readonly ["iex", "otc", "sip", "delayed_sip"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The source feed of the data: `sip` contains all US exchanges, `iex` contains only the Investors EXchange, and `otc` contains over-the-counter exchanges. `delayed_sip` is SIP data with a 15 minute delay. Default: `sip` if the user has the unlimited subscription, otherwise `iex`.\n";
                };
                readonly currency: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The currency of all prices in ISO 4217 format. Default: USD.\n";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly bars: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly description: "OHLC aggregate of all the trades in a given interval.\n";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2022-01-03T09:00:00Z"];
                            };
                            readonly o: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Opening price.";
                                readonly "x-go-name": "Open";
                                readonly examples: readonly [178.26];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly h: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "High price.";
                                readonly "x-go-name": "High";
                                readonly examples: readonly [178.34];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly l: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Low price.";
                                readonly "x-go-name": "Low";
                                readonly examples: readonly [177.76];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly c: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Closing price.";
                                readonly "x-go-name": "Close";
                                readonly examples: readonly [178.08];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly v: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly description: "Bar volume.";
                                readonly "x-go-name": "Volume";
                                readonly examples: readonly [60937];
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly n: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly description: "Trade count in the bar.";
                                readonly "x-go-name": "TradeCount";
                                readonly examples: readonly [1727];
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly vw: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Volume weighted average price.";
                                readonly "x-go-name": "VWAP";
                                readonly examples: readonly [177.954244];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                        };
                        readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                    };
                };
                readonly currency: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["bars"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const StockLatestQuoteSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbol: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The symbol to query.";
                };
            };
            readonly required: readonly ["symbol"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly feed: {
                    readonly type: "string";
                    readonly enum: readonly ["iex", "otc", "sip", "delayed_sip"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The source feed of the data: `sip` contains all US exchanges, `iex` contains only the Investors EXchange, and `otc` contains over-the-counter exchanges. `delayed_sip` is SIP data with a 15 minute delay. Default: `sip` if the user has the unlimited subscription, otherwise `iex`.\n";
                };
                readonly currency: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The currency of all prices in ISO 4217 format. Default: USD.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly quote: {
                    readonly type: "object";
                    readonly description: "The best bid and ask information for a given security.";
                    readonly properties: {
                        readonly t: {
                            readonly type: "string";
                            readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                            readonly format: "date-time";
                            readonly "x-go-name": "Timestamp";
                            readonly examples: readonly ["2021-02-06T13:35:08.946977536Z"];
                        };
                        readonly bx: {
                            readonly type: "string";
                            readonly description: "Bid exchange. See `v2/stocks/meta/exchanges` for more details.";
                            readonly "x-go-name": "BidExchange";
                            readonly examples: readonly ["N"];
                        };
                        readonly bp: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Bid price. 0 means the security has no active bid.";
                            readonly "x-go-name": "BidPrice";
                            readonly examples: readonly [387.67];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly bs: {
                            readonly type: "integer";
                            readonly format: "uint32";
                            readonly description: "Bid size in round lots.";
                            readonly "x-go-name": "BidSize";
                            readonly examples: readonly [1];
                            readonly minimum: 0;
                            readonly maximum: 4294967295;
                        };
                        readonly ax: {
                            readonly type: "string";
                            readonly description: "Ask exchange. See `v2/stocks/meta/exchanges` for more details.";
                            readonly "x-go-name": "AskExchange";
                            readonly examples: readonly ["C"];
                        };
                        readonly ap: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Ask price. 0 means the security has no active ask.";
                            readonly "x-go-name": "AskPrice";
                            readonly examples: readonly [387.7];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly as: {
                            readonly type: "integer";
                            readonly format: "uint32";
                            readonly description: "Ask size in round lots.";
                            readonly "x-go-name": "AskSize";
                            readonly examples: readonly [1];
                            readonly minimum: 0;
                            readonly maximum: 4294967295;
                        };
                        readonly c: {
                            readonly description: "Condition flags. See `v2/stocks/meta/conditions/quote` for more details. If the array contains one flag, it applies to both the bid and ask. If the array contains two flags, the first one applies to the bid and the second one to the ask.\n";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                                readonly examples: readonly ["R"];
                            };
                            readonly "x-go-name": "Conditions";
                        };
                        readonly z: {
                            readonly type: "string";
                            readonly description: "Tape A is the New York Stock Exchange, Tape B is NYSE Arca, Bats, IEX and other regional exchanges, Tape C is NASDAQ, Tape O is OTC.\n\n\n`A` `B` `C` `O`";
                            readonly "x-go-name": "Tape";
                            readonly enum: readonly ["A", "B", "C", "O"];
                            readonly examples: readonly ["C"];
                        };
                    };
                    readonly required: readonly ["t", "bx", "bp", "bs", "ap", "as", "ax", "c", "z"];
                };
                readonly symbol: {
                    readonly type: "string";
                };
                readonly currency: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["quote", "symbol"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const StockLatestQuotes: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL,TSLA"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of stock symbols.";
                };
                readonly feed: {
                    readonly type: "string";
                    readonly enum: readonly ["iex", "otc", "sip", "delayed_sip"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The source feed of the data: `sip` contains all US exchanges, `iex` contains only the Investors EXchange, and `otc` contains over-the-counter exchanges. `delayed_sip` is SIP data with a 15 minute delay. Default: `sip` if the user has the unlimited subscription, otherwise `iex`.\n";
                };
                readonly currency: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The currency of all prices in ISO 4217 format. Default: USD.\n";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly quotes: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly description: "The best bid and ask information for a given security.";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2021-02-06T13:35:08.946977536Z"];
                            };
                            readonly bx: {
                                readonly type: "string";
                                readonly description: "Bid exchange. See `v2/stocks/meta/exchanges` for more details.";
                                readonly "x-go-name": "BidExchange";
                                readonly examples: readonly ["N"];
                            };
                            readonly bp: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Bid price. 0 means the security has no active bid.";
                                readonly "x-go-name": "BidPrice";
                                readonly examples: readonly [387.67];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly bs: {
                                readonly type: "integer";
                                readonly format: "uint32";
                                readonly description: "Bid size in round lots.";
                                readonly "x-go-name": "BidSize";
                                readonly examples: readonly [1];
                                readonly minimum: 0;
                                readonly maximum: 4294967295;
                            };
                            readonly ax: {
                                readonly type: "string";
                                readonly description: "Ask exchange. See `v2/stocks/meta/exchanges` for more details.";
                                readonly "x-go-name": "AskExchange";
                                readonly examples: readonly ["C"];
                            };
                            readonly ap: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Ask price. 0 means the security has no active ask.";
                                readonly "x-go-name": "AskPrice";
                                readonly examples: readonly [387.7];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly as: {
                                readonly type: "integer";
                                readonly format: "uint32";
                                readonly description: "Ask size in round lots.";
                                readonly "x-go-name": "AskSize";
                                readonly examples: readonly [1];
                                readonly minimum: 0;
                                readonly maximum: 4294967295;
                            };
                            readonly c: {
                                readonly description: "Condition flags. See `v2/stocks/meta/conditions/quote` for more details. If the array contains one flag, it applies to both the bid and ask. If the array contains two flags, the first one applies to the bid and the second one to the ask.\n";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly examples: readonly ["R"];
                                };
                                readonly "x-go-name": "Conditions";
                            };
                            readonly z: {
                                readonly type: "string";
                                readonly description: "Tape A is the New York Stock Exchange, Tape B is NYSE Arca, Bats, IEX and other regional exchanges, Tape C is NASDAQ, Tape O is OTC.\n\n\n`A` `B` `C` `O`";
                                readonly "x-go-name": "Tape";
                                readonly enum: readonly ["A", "B", "C", "O"];
                                readonly examples: readonly ["C"];
                            };
                        };
                        readonly required: readonly ["t", "bx", "bp", "bs", "ap", "as", "ax", "c", "z"];
                    };
                };
                readonly currency: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["quotes"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const StockLatestTradeSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbol: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The symbol to query.";
                };
            };
            readonly required: readonly ["symbol"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly feed: {
                    readonly type: "string";
                    readonly enum: readonly ["iex", "otc", "sip", "delayed_sip"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The source feed of the data: `sip` contains all US exchanges, `iex` contains only the Investors EXchange, and `otc` contains over-the-counter exchanges. `delayed_sip` is SIP data with a 15 minute delay. Default: `sip` if the user has the unlimited subscription, otherwise `iex`.\n";
                };
                readonly currency: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The currency of all prices in ISO 4217 format. Default: USD.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly trade: {
                    readonly type: "object";
                    readonly description: "A stock trade.";
                    readonly properties: {
                        readonly t: {
                            readonly type: "string";
                            readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                            readonly format: "date-time";
                            readonly "x-go-name": "Timestamp";
                            readonly examples: readonly ["2022-01-03T09:00:00.086175744Z"];
                        };
                        readonly x: {
                            readonly type: "string";
                            readonly description: "Exchange code. See `v2/stocks/meta/exchanges` for more details.";
                            readonly "x-go-name": "Exchange";
                            readonly examples: readonly ["P"];
                        };
                        readonly p: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Trade price.";
                            readonly "x-go-name": "Price";
                            readonly examples: readonly [178.26];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly s: {
                            readonly type: "integer";
                            readonly format: "uint32";
                            readonly description: "Trade size.";
                            readonly "x-go-name": "Size";
                            readonly examples: readonly [246];
                            readonly minimum: 0;
                            readonly maximum: 4294967295;
                        };
                        readonly i: {
                            readonly type: "integer";
                            readonly format: "uint64";
                            readonly description: "Trade ID sent by the exchange.";
                            readonly "x-go-name": "ID";
                            readonly examples: readonly [1];
                            readonly minimum: 0;
                            readonly maximum: 18446744073709552000;
                        };
                        readonly c: {
                            readonly description: "Condition flags. See `v2/stocks/meta/conditions/trade` for more details.";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                                readonly examples: readonly ["@"];
                            };
                            readonly "x-go-name": "Conditions";
                        };
                        readonly z: {
                            readonly type: "string";
                            readonly description: "Tape A is the New York Stock Exchange, Tape B is NYSE Arca, Bats, IEX and other regional exchanges, Tape C is NASDAQ, Tape O is OTC.\n\n\n`A` `B` `C` `O`";
                            readonly "x-go-name": "Tape";
                            readonly enum: readonly ["A", "B", "C", "O"];
                            readonly examples: readonly ["C"];
                        };
                        readonly u: {
                            readonly type: "string";
                            readonly "x-go-name": "Update";
                            readonly description: "Update to the trade. This field is optional, if it's missing, the trade is valid. Otherwise, it can have these values:\n - canceled: indicates that the trade has been canceled\n - incorrect: indicates that the trade has been corrected and the given trade is no longer valid\n - corrected: indicates that this trade is the correction of a previous (incorrect) trade\n";
                        };
                    };
                    readonly required: readonly ["t", "i", "x", "p", "s", "c", "z"];
                };
                readonly symbol: {
                    readonly type: "string";
                };
                readonly currency: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["trade", "symbol"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const StockLatestTrades: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL,TSLA"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of stock symbols.";
                };
                readonly feed: {
                    readonly type: "string";
                    readonly enum: readonly ["iex", "otc", "sip", "delayed_sip"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The source feed of the data: `sip` contains all US exchanges, `iex` contains only the Investors EXchange, and `otc` contains over-the-counter exchanges. `delayed_sip` is SIP data with a 15 minute delay. Default: `sip` if the user has the unlimited subscription, otherwise `iex`.\n";
                };
                readonly currency: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The currency of all prices in ISO 4217 format. Default: USD.\n";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly trades: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly description: "A stock trade.";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2022-01-03T09:00:00.086175744Z"];
                            };
                            readonly x: {
                                readonly type: "string";
                                readonly description: "Exchange code. See `v2/stocks/meta/exchanges` for more details.";
                                readonly "x-go-name": "Exchange";
                                readonly examples: readonly ["P"];
                            };
                            readonly p: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Trade price.";
                                readonly "x-go-name": "Price";
                                readonly examples: readonly [178.26];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly s: {
                                readonly type: "integer";
                                readonly format: "uint32";
                                readonly description: "Trade size.";
                                readonly "x-go-name": "Size";
                                readonly examples: readonly [246];
                                readonly minimum: 0;
                                readonly maximum: 4294967295;
                            };
                            readonly i: {
                                readonly type: "integer";
                                readonly format: "uint64";
                                readonly description: "Trade ID sent by the exchange.";
                                readonly "x-go-name": "ID";
                                readonly examples: readonly [1];
                                readonly minimum: 0;
                                readonly maximum: 18446744073709552000;
                            };
                            readonly c: {
                                readonly description: "Condition flags. See `v2/stocks/meta/conditions/trade` for more details.";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly examples: readonly ["@"];
                                };
                                readonly "x-go-name": "Conditions";
                            };
                            readonly z: {
                                readonly type: "string";
                                readonly description: "Tape A is the New York Stock Exchange, Tape B is NYSE Arca, Bats, IEX and other regional exchanges, Tape C is NASDAQ, Tape O is OTC.\n\n\n`A` `B` `C` `O`";
                                readonly "x-go-name": "Tape";
                                readonly enum: readonly ["A", "B", "C", "O"];
                                readonly examples: readonly ["C"];
                            };
                            readonly u: {
                                readonly type: "string";
                                readonly "x-go-name": "Update";
                                readonly description: "Update to the trade. This field is optional, if it's missing, the trade is valid. Otherwise, it can have these values:\n - canceled: indicates that the trade has been canceled\n - incorrect: indicates that the trade has been corrected and the given trade is no longer valid\n - corrected: indicates that this trade is the correction of a previous (incorrect) trade\n";
                            };
                        };
                        readonly required: readonly ["t", "i", "x", "p", "s", "c", "z"];
                    };
                };
                readonly currency: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["trades"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const StockMetaConditions: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly ticktype: {
                    readonly type: "string";
                    readonly enum: readonly ["trade", "quote"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The type of ticks.";
                };
            };
            readonly required: readonly ["ticktype"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly tape: {
                    readonly type: "string";
                    readonly enum: readonly ["A", "B", "C"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The one character name of the tape.";
                };
            };
            readonly required: readonly ["tape"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: {
                readonly type: "string";
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const StockMetaExchanges: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: {
                readonly type: "string";
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const StockQuoteSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbol: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The symbol to query.";
                };
            };
            readonly required: readonly ["symbol"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly start: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-03T00:00:00Z", "2024-01-03T01:02:03.123456789Z", "2024-01-03T09:30:00-04:00", "2024-01-03"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive start of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the beginning of the current day.\n";
                };
                readonly end: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-04T00:00:00Z", "2024-01-04T01:02:03.123456789Z", "2024-01-04T09:30:00-04:00", "2024-01-04"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive end of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: current time if `feed` is not `sip` or if the user has a subscription, otherwise 15 minutes before the current time.\n";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 10000;
                    readonly default: 1000;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of data points to return in the response page.\nThe API may return less, even if there are more available data points in the requested interval.\nAlways check the `next_page_token` for more pages.\nThe limit applies to the total number of data points, not per symbol!\n";
                };
                readonly asof: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The as-of date of the queried stock symbol(s). Format: YYYY-MM-DD. Default: current day.\n\nThis date is used to identify the underlying entity of the provided symbol(s), so that name changes for this entity can be found. Data for past symbol(s) is returned if the query date range spans the name change.\n\nThe special value of \"-\" means symbol mapping is skipped. Data is returned based on the symbol alone without looking up previous names. The same happens if the queried symbol is not found on the given `asof` date.\n\nExample: FB was renamed to META in 2022-06-09. Querying META with an `asof` date after 2022-06-09 will also yield FB data. The data for the FB ticker will be labeled as META because they are considered the same underlying entity as of 2022-06-09. Querying FB with an `asof` date after 2022-06-09 will only return data with the FB ticker, not with META. But with an `asof` date before 2022-06-09, META will also be returned (as FB).\n";
                };
                readonly feed: {
                    readonly type: "string";
                    readonly enum: readonly ["iex", "otc", "sip"];
                    readonly default: "sip";
                    readonly description: "The source feed of the data: `sip` contains all US exchanges, `iex` contains only the Investors EXchange, and `otc` contains over-the-counter exchanges. Default: `sip`.\n";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly currency: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The currency of all prices in ISO 4217 format. Default: USD.\n";
                };
                readonly page_token: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The pagination token from which to continue. The value to pass here is returned in specific requests when more data is available, usually because of a response result limit.\n";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly description: "Sort data in ascending or descending order.";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "asc";
                    readonly "x-go-name": "TypeSort";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly symbol: {
                    readonly type: "string";
                };
                readonly quotes: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly description: "The best bid and ask information for a given security.";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2021-02-06T13:35:08.946977536Z"];
                            };
                            readonly bx: {
                                readonly type: "string";
                                readonly description: "Bid exchange. See `v2/stocks/meta/exchanges` for more details.";
                                readonly "x-go-name": "BidExchange";
                                readonly examples: readonly ["N"];
                            };
                            readonly bp: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Bid price. 0 means the security has no active bid.";
                                readonly "x-go-name": "BidPrice";
                                readonly examples: readonly [387.67];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly bs: {
                                readonly type: "integer";
                                readonly format: "uint32";
                                readonly description: "Bid size in round lots.";
                                readonly "x-go-name": "BidSize";
                                readonly examples: readonly [1];
                                readonly minimum: 0;
                                readonly maximum: 4294967295;
                            };
                            readonly ax: {
                                readonly type: "string";
                                readonly description: "Ask exchange. See `v2/stocks/meta/exchanges` for more details.";
                                readonly "x-go-name": "AskExchange";
                                readonly examples: readonly ["C"];
                            };
                            readonly ap: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Ask price. 0 means the security has no active ask.";
                                readonly "x-go-name": "AskPrice";
                                readonly examples: readonly [387.7];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly as: {
                                readonly type: "integer";
                                readonly format: "uint32";
                                readonly description: "Ask size in round lots.";
                                readonly "x-go-name": "AskSize";
                                readonly examples: readonly [1];
                                readonly minimum: 0;
                                readonly maximum: 4294967295;
                            };
                            readonly c: {
                                readonly description: "Condition flags. See `v2/stocks/meta/conditions/quote` for more details. If the array contains one flag, it applies to both the bid and ask. If the array contains two flags, the first one applies to the bid and the second one to the ask.\n";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly examples: readonly ["R"];
                                };
                                readonly "x-go-name": "Conditions";
                            };
                            readonly z: {
                                readonly type: "string";
                                readonly description: "Tape A is the New York Stock Exchange, Tape B is NYSE Arca, Bats, IEX and other regional exchanges, Tape C is NASDAQ, Tape O is OTC.\n\n\n`A` `B` `C` `O`";
                                readonly "x-go-name": "Tape";
                                readonly enum: readonly ["A", "B", "C", "O"];
                                readonly examples: readonly ["C"];
                            };
                        };
                        readonly required: readonly ["t", "bx", "bp", "bs", "ap", "as", "ax", "c", "z"];
                    };
                };
                readonly currency: {
                    readonly type: "string";
                };
                readonly next_page_token: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "Pagination token for the next page.";
                };
            };
            readonly required: readonly ["quotes", "next_page_token", "symbol"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const StockQuotes: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL,TSLA"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of stock symbols.";
                };
                readonly start: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-03T00:00:00Z", "2024-01-03T01:02:03.123456789Z", "2024-01-03T09:30:00-04:00", "2024-01-03"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive start of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the beginning of the current day.\n";
                };
                readonly end: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-04T00:00:00Z", "2024-01-04T01:02:03.123456789Z", "2024-01-04T09:30:00-04:00", "2024-01-04"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive end of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: current time if `feed` is not `sip` or if the user has a subscription, otherwise 15 minutes before the current time.\n";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 10000;
                    readonly default: 1000;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of data points to return in the response page.\nThe API may return less, even if there are more available data points in the requested interval.\nAlways check the `next_page_token` for more pages.\nThe limit applies to the total number of data points, not per symbol!\n";
                };
                readonly asof: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The as-of date of the queried stock symbol(s). Format: YYYY-MM-DD. Default: current day.\n\nThis date is used to identify the underlying entity of the provided symbol(s), so that name changes for this entity can be found. Data for past symbol(s) is returned if the query date range spans the name change.\n\nThe special value of \"-\" means symbol mapping is skipped. Data is returned based on the symbol alone without looking up previous names. The same happens if the queried symbol is not found on the given `asof` date.\n\nExample: FB was renamed to META in 2022-06-09. Querying META with an `asof` date after 2022-06-09 will also yield FB data. The data for the FB ticker will be labeled as META because they are considered the same underlying entity as of 2022-06-09. Querying FB with an `asof` date after 2022-06-09 will only return data with the FB ticker, not with META. But with an `asof` date before 2022-06-09, META will also be returned (as FB).\n";
                };
                readonly feed: {
                    readonly type: "string";
                    readonly enum: readonly ["iex", "otc", "sip"];
                    readonly default: "sip";
                    readonly description: "The source feed of the data: `sip` contains all US exchanges, `iex` contains only the Investors EXchange, and `otc` contains over-the-counter exchanges. Default: `sip`.\n";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly currency: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The currency of all prices in ISO 4217 format. Default: USD.\n";
                };
                readonly page_token: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The pagination token from which to continue. The value to pass here is returned in specific requests when more data is available, usually because of a response result limit.\n";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly description: "Sort data in ascending or descending order.";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "asc";
                    readonly "x-go-name": "TypeSort";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly quotes: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly description: "The best bid and ask information for a given security.";
                            readonly properties: {
                                readonly t: {
                                    readonly type: "string";
                                    readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                    readonly format: "date-time";
                                    readonly "x-go-name": "Timestamp";
                                    readonly examples: readonly ["2021-02-06T13:35:08.946977536Z"];
                                };
                                readonly bx: {
                                    readonly type: "string";
                                    readonly description: "Bid exchange. See `v2/stocks/meta/exchanges` for more details.";
                                    readonly "x-go-name": "BidExchange";
                                    readonly examples: readonly ["N"];
                                };
                                readonly bp: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Bid price. 0 means the security has no active bid.";
                                    readonly "x-go-name": "BidPrice";
                                    readonly examples: readonly [387.67];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly bs: {
                                    readonly type: "integer";
                                    readonly format: "uint32";
                                    readonly description: "Bid size in round lots.";
                                    readonly "x-go-name": "BidSize";
                                    readonly examples: readonly [1];
                                    readonly minimum: 0;
                                    readonly maximum: 4294967295;
                                };
                                readonly ax: {
                                    readonly type: "string";
                                    readonly description: "Ask exchange. See `v2/stocks/meta/exchanges` for more details.";
                                    readonly "x-go-name": "AskExchange";
                                    readonly examples: readonly ["C"];
                                };
                                readonly ap: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Ask price. 0 means the security has no active ask.";
                                    readonly "x-go-name": "AskPrice";
                                    readonly examples: readonly [387.7];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly as: {
                                    readonly type: "integer";
                                    readonly format: "uint32";
                                    readonly description: "Ask size in round lots.";
                                    readonly "x-go-name": "AskSize";
                                    readonly examples: readonly [1];
                                    readonly minimum: 0;
                                    readonly maximum: 4294967295;
                                };
                                readonly c: {
                                    readonly description: "Condition flags. See `v2/stocks/meta/conditions/quote` for more details. If the array contains one flag, it applies to both the bid and ask. If the array contains two flags, the first one applies to the bid and the second one to the ask.\n";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly examples: readonly ["R"];
                                    };
                                    readonly "x-go-name": "Conditions";
                                };
                                readonly z: {
                                    readonly type: "string";
                                    readonly description: "Tape A is the New York Stock Exchange, Tape B is NYSE Arca, Bats, IEX and other regional exchanges, Tape C is NASDAQ, Tape O is OTC.\n\n\n`A` `B` `C` `O`";
                                    readonly "x-go-name": "Tape";
                                    readonly enum: readonly ["A", "B", "C", "O"];
                                    readonly examples: readonly ["C"];
                                };
                            };
                            readonly required: readonly ["t", "bx", "bp", "bs", "ap", "as", "ax", "c", "z"];
                        };
                    };
                };
                readonly currency: {
                    readonly type: "string";
                };
                readonly next_page_token: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "Pagination token for the next page.";
                };
            };
            readonly required: readonly ["quotes", "next_page_token"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const StockSnapshotSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbol: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The symbol to query.";
                };
            };
            readonly required: readonly ["symbol"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly feed: {
                    readonly type: "string";
                    readonly enum: readonly ["iex", "otc", "sip", "delayed_sip"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The source feed of the data: `sip` contains all US exchanges, `iex` contains only the Investors EXchange, and `otc` contains over-the-counter exchanges. `delayed_sip` is SIP data with a 15 minute delay. Default: `sip` if the user has the unlimited subscription, otherwise `iex`.\n";
                };
                readonly currency: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The currency of all prices in ISO 4217 format. Default: USD.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly description: "A snapshot provides the latest trade, latest quote, latest minute bar, current daily bar and previous daily bar.\n";
            readonly properties: {
                readonly symbol: {
                    readonly type: "string";
                };
                readonly currency: {
                    readonly type: "string";
                };
                readonly dailyBar: {
                    readonly type: "object";
                    readonly description: "OHLC aggregate of all the trades in a given interval.\n";
                    readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                    readonly properties: {
                        readonly t: {
                            readonly type: "string";
                            readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                            readonly format: "date-time";
                            readonly "x-go-name": "Timestamp";
                            readonly examples: readonly ["2022-01-03T09:00:00Z"];
                        };
                        readonly o: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Opening price.";
                            readonly "x-go-name": "Open";
                            readonly examples: readonly [178.26];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly h: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "High price.";
                            readonly "x-go-name": "High";
                            readonly examples: readonly [178.34];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly l: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Low price.";
                            readonly "x-go-name": "Low";
                            readonly examples: readonly [177.76];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly c: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Closing price.";
                            readonly "x-go-name": "Close";
                            readonly examples: readonly [178.08];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly v: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly description: "Bar volume.";
                            readonly "x-go-name": "Volume";
                            readonly examples: readonly [60937];
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly n: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly description: "Trade count in the bar.";
                            readonly "x-go-name": "TradeCount";
                            readonly examples: readonly [1727];
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly vw: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Volume weighted average price.";
                            readonly "x-go-name": "VWAP";
                            readonly examples: readonly [177.954244];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                    };
                };
                readonly latestQuote: {
                    readonly type: "object";
                    readonly description: "The best bid and ask information for a given security.";
                    readonly required: readonly ["t", "bx", "bp", "bs", "ap", "as", "ax", "c", "z"];
                    readonly properties: {
                        readonly t: {
                            readonly type: "string";
                            readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                            readonly format: "date-time";
                            readonly "x-go-name": "Timestamp";
                            readonly examples: readonly ["2021-02-06T13:35:08.946977536Z"];
                        };
                        readonly bx: {
                            readonly type: "string";
                            readonly description: "Bid exchange. See `v2/stocks/meta/exchanges` for more details.";
                            readonly "x-go-name": "BidExchange";
                            readonly examples: readonly ["N"];
                        };
                        readonly bp: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Bid price. 0 means the security has no active bid.";
                            readonly "x-go-name": "BidPrice";
                            readonly examples: readonly [387.67];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly bs: {
                            readonly type: "integer";
                            readonly format: "uint32";
                            readonly description: "Bid size in round lots.";
                            readonly "x-go-name": "BidSize";
                            readonly examples: readonly [1];
                            readonly minimum: 0;
                            readonly maximum: 4294967295;
                        };
                        readonly ax: {
                            readonly type: "string";
                            readonly description: "Ask exchange. See `v2/stocks/meta/exchanges` for more details.";
                            readonly "x-go-name": "AskExchange";
                            readonly examples: readonly ["C"];
                        };
                        readonly ap: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Ask price. 0 means the security has no active ask.";
                            readonly "x-go-name": "AskPrice";
                            readonly examples: readonly [387.7];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly as: {
                            readonly type: "integer";
                            readonly format: "uint32";
                            readonly description: "Ask size in round lots.";
                            readonly "x-go-name": "AskSize";
                            readonly examples: readonly [1];
                            readonly minimum: 0;
                            readonly maximum: 4294967295;
                        };
                        readonly c: {
                            readonly description: "Condition flags. See `v2/stocks/meta/conditions/quote` for more details. If the array contains one flag, it applies to both the bid and ask. If the array contains two flags, the first one applies to the bid and the second one to the ask.\n";
                            readonly type: "array";
                            readonly "x-go-name": "Conditions";
                            readonly items: {
                                readonly type: "string";
                                readonly examples: readonly ["R"];
                            };
                        };
                        readonly z: {
                            readonly type: "string";
                            readonly description: "Tape A is the New York Stock Exchange, Tape B is NYSE Arca, Bats, IEX and other regional exchanges, Tape C is NASDAQ, Tape O is OTC.\n\n\n`A` `B` `C` `O`";
                            readonly "x-go-name": "Tape";
                            readonly enum: readonly ["A", "B", "C", "O"];
                            readonly examples: readonly ["C"];
                        };
                    };
                };
                readonly latestTrade: {
                    readonly type: "object";
                    readonly description: "A stock trade.";
                    readonly required: readonly ["t", "i", "x", "p", "s", "c", "z"];
                    readonly properties: {
                        readonly t: {
                            readonly type: "string";
                            readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                            readonly format: "date-time";
                            readonly "x-go-name": "Timestamp";
                            readonly examples: readonly ["2022-01-03T09:00:00.086175744Z"];
                        };
                        readonly x: {
                            readonly type: "string";
                            readonly description: "Exchange code. See `v2/stocks/meta/exchanges` for more details.";
                            readonly "x-go-name": "Exchange";
                            readonly examples: readonly ["P"];
                        };
                        readonly p: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Trade price.";
                            readonly "x-go-name": "Price";
                            readonly examples: readonly [178.26];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly s: {
                            readonly type: "integer";
                            readonly format: "uint32";
                            readonly description: "Trade size.";
                            readonly "x-go-name": "Size";
                            readonly examples: readonly [246];
                            readonly minimum: 0;
                            readonly maximum: 4294967295;
                        };
                        readonly i: {
                            readonly type: "integer";
                            readonly format: "uint64";
                            readonly description: "Trade ID sent by the exchange.";
                            readonly "x-go-name": "ID";
                            readonly examples: readonly [1];
                            readonly minimum: 0;
                            readonly maximum: 18446744073709552000;
                        };
                        readonly c: {
                            readonly description: "Condition flags. See `v2/stocks/meta/conditions/trade` for more details.";
                            readonly type: "array";
                            readonly "x-go-name": "Conditions";
                            readonly items: {
                                readonly type: "string";
                                readonly examples: readonly ["@"];
                            };
                        };
                        readonly z: {
                            readonly type: "string";
                            readonly description: "Tape A is the New York Stock Exchange, Tape B is NYSE Arca, Bats, IEX and other regional exchanges, Tape C is NASDAQ, Tape O is OTC.\n\n\n`A` `B` `C` `O`";
                            readonly "x-go-name": "Tape";
                            readonly enum: readonly ["A", "B", "C", "O"];
                            readonly examples: readonly ["C"];
                        };
                        readonly u: {
                            readonly type: "string";
                            readonly "x-go-name": "Update";
                            readonly description: "Update to the trade. This field is optional, if it's missing, the trade is valid. Otherwise, it can have these values:\n - canceled: indicates that the trade has been canceled\n - incorrect: indicates that the trade has been corrected and the given trade is no longer valid\n - corrected: indicates that this trade is the correction of a previous (incorrect) trade\n";
                        };
                    };
                };
                readonly minuteBar: {
                    readonly type: "object";
                    readonly description: "OHLC aggregate of all the trades in a given interval.\n";
                    readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                    readonly properties: {
                        readonly t: {
                            readonly type: "string";
                            readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                            readonly format: "date-time";
                            readonly "x-go-name": "Timestamp";
                            readonly examples: readonly ["2022-01-03T09:00:00Z"];
                        };
                        readonly o: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Opening price.";
                            readonly "x-go-name": "Open";
                            readonly examples: readonly [178.26];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly h: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "High price.";
                            readonly "x-go-name": "High";
                            readonly examples: readonly [178.34];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly l: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Low price.";
                            readonly "x-go-name": "Low";
                            readonly examples: readonly [177.76];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly c: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Closing price.";
                            readonly "x-go-name": "Close";
                            readonly examples: readonly [178.08];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly v: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly description: "Bar volume.";
                            readonly "x-go-name": "Volume";
                            readonly examples: readonly [60937];
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly n: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly description: "Trade count in the bar.";
                            readonly "x-go-name": "TradeCount";
                            readonly examples: readonly [1727];
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly vw: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Volume weighted average price.";
                            readonly "x-go-name": "VWAP";
                            readonly examples: readonly [177.954244];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                    };
                };
                readonly prevDailyBar: {
                    readonly type: "object";
                    readonly description: "OHLC aggregate of all the trades in a given interval.\n";
                    readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                    readonly properties: {
                        readonly t: {
                            readonly type: "string";
                            readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                            readonly format: "date-time";
                            readonly "x-go-name": "Timestamp";
                            readonly examples: readonly ["2022-01-03T09:00:00Z"];
                        };
                        readonly o: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Opening price.";
                            readonly "x-go-name": "Open";
                            readonly examples: readonly [178.26];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly h: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "High price.";
                            readonly "x-go-name": "High";
                            readonly examples: readonly [178.34];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly l: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Low price.";
                            readonly "x-go-name": "Low";
                            readonly examples: readonly [177.76];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly c: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Closing price.";
                            readonly "x-go-name": "Close";
                            readonly examples: readonly [178.08];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly v: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly description: "Bar volume.";
                            readonly "x-go-name": "Volume";
                            readonly examples: readonly [60937];
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly n: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly description: "Trade count in the bar.";
                            readonly "x-go-name": "TradeCount";
                            readonly examples: readonly [1727];
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                        readonly vw: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly description: "Volume weighted average price.";
                            readonly "x-go-name": "VWAP";
                            readonly examples: readonly [177.954244];
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const StockSnapshots: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL,TSLA"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of stock symbols.";
                };
                readonly feed: {
                    readonly type: "string";
                    readonly enum: readonly ["iex", "otc", "sip", "delayed_sip"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The source feed of the data: `sip` contains all US exchanges, `iex` contains only the Investors EXchange, and `otc` contains over-the-counter exchanges. `delayed_sip` is SIP data with a 15 minute delay. Default: `sip` if the user has the unlimited subscription, otherwise `iex`.\n";
                };
                readonly currency: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The currency of all prices in ISO 4217 format. Default: USD.\n";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly additionalProperties: {
                readonly type: "object";
                readonly description: "A snapshot provides the latest trade, latest quote, latest minute bar, current daily bar and previous daily bar.\n";
                readonly properties: {
                    readonly dailyBar: {
                        readonly type: "object";
                        readonly description: "OHLC aggregate of all the trades in a given interval.\n";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2022-01-03T09:00:00Z"];
                            };
                            readonly o: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Opening price.";
                                readonly "x-go-name": "Open";
                                readonly examples: readonly [178.26];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly h: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "High price.";
                                readonly "x-go-name": "High";
                                readonly examples: readonly [178.34];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly l: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Low price.";
                                readonly "x-go-name": "Low";
                                readonly examples: readonly [177.76];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly c: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Closing price.";
                                readonly "x-go-name": "Close";
                                readonly examples: readonly [178.08];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly v: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly description: "Bar volume.";
                                readonly "x-go-name": "Volume";
                                readonly examples: readonly [60937];
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly n: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly description: "Trade count in the bar.";
                                readonly "x-go-name": "TradeCount";
                                readonly examples: readonly [1727];
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly vw: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Volume weighted average price.";
                                readonly "x-go-name": "VWAP";
                                readonly examples: readonly [177.954244];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                        };
                        readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                    };
                    readonly latestQuote: {
                        readonly type: "object";
                        readonly description: "The best bid and ask information for a given security.";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2021-02-06T13:35:08.946977536Z"];
                            };
                            readonly bx: {
                                readonly type: "string";
                                readonly description: "Bid exchange. See `v2/stocks/meta/exchanges` for more details.";
                                readonly "x-go-name": "BidExchange";
                                readonly examples: readonly ["N"];
                            };
                            readonly bp: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Bid price. 0 means the security has no active bid.";
                                readonly "x-go-name": "BidPrice";
                                readonly examples: readonly [387.67];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly bs: {
                                readonly type: "integer";
                                readonly format: "uint32";
                                readonly description: "Bid size in round lots.";
                                readonly "x-go-name": "BidSize";
                                readonly examples: readonly [1];
                                readonly minimum: 0;
                                readonly maximum: 4294967295;
                            };
                            readonly ax: {
                                readonly type: "string";
                                readonly description: "Ask exchange. See `v2/stocks/meta/exchanges` for more details.";
                                readonly "x-go-name": "AskExchange";
                                readonly examples: readonly ["C"];
                            };
                            readonly ap: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Ask price. 0 means the security has no active ask.";
                                readonly "x-go-name": "AskPrice";
                                readonly examples: readonly [387.7];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly as: {
                                readonly type: "integer";
                                readonly format: "uint32";
                                readonly description: "Ask size in round lots.";
                                readonly "x-go-name": "AskSize";
                                readonly examples: readonly [1];
                                readonly minimum: 0;
                                readonly maximum: 4294967295;
                            };
                            readonly c: {
                                readonly description: "Condition flags. See `v2/stocks/meta/conditions/quote` for more details. If the array contains one flag, it applies to both the bid and ask. If the array contains two flags, the first one applies to the bid and the second one to the ask.\n";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly examples: readonly ["R"];
                                };
                                readonly "x-go-name": "Conditions";
                            };
                            readonly z: {
                                readonly type: "string";
                                readonly description: "Tape A is the New York Stock Exchange, Tape B is NYSE Arca, Bats, IEX and other regional exchanges, Tape C is NASDAQ, Tape O is OTC.\n\n\n`A` `B` `C` `O`";
                                readonly "x-go-name": "Tape";
                                readonly enum: readonly ["A", "B", "C", "O"];
                                readonly examples: readonly ["C"];
                            };
                        };
                        readonly required: readonly ["t", "bx", "bp", "bs", "ap", "as", "ax", "c", "z"];
                    };
                    readonly latestTrade: {
                        readonly type: "object";
                        readonly description: "A stock trade.";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2022-01-03T09:00:00.086175744Z"];
                            };
                            readonly x: {
                                readonly type: "string";
                                readonly description: "Exchange code. See `v2/stocks/meta/exchanges` for more details.";
                                readonly "x-go-name": "Exchange";
                                readonly examples: readonly ["P"];
                            };
                            readonly p: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Trade price.";
                                readonly "x-go-name": "Price";
                                readonly examples: readonly [178.26];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly s: {
                                readonly type: "integer";
                                readonly format: "uint32";
                                readonly description: "Trade size.";
                                readonly "x-go-name": "Size";
                                readonly examples: readonly [246];
                                readonly minimum: 0;
                                readonly maximum: 4294967295;
                            };
                            readonly i: {
                                readonly type: "integer";
                                readonly format: "uint64";
                                readonly description: "Trade ID sent by the exchange.";
                                readonly "x-go-name": "ID";
                                readonly examples: readonly [1];
                                readonly minimum: 0;
                                readonly maximum: 18446744073709552000;
                            };
                            readonly c: {
                                readonly description: "Condition flags. See `v2/stocks/meta/conditions/trade` for more details.";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly examples: readonly ["@"];
                                };
                                readonly "x-go-name": "Conditions";
                            };
                            readonly z: {
                                readonly type: "string";
                                readonly description: "Tape A is the New York Stock Exchange, Tape B is NYSE Arca, Bats, IEX and other regional exchanges, Tape C is NASDAQ, Tape O is OTC.\n\n\n`A` `B` `C` `O`";
                                readonly "x-go-name": "Tape";
                                readonly enum: readonly ["A", "B", "C", "O"];
                                readonly examples: readonly ["C"];
                            };
                            readonly u: {
                                readonly type: "string";
                                readonly "x-go-name": "Update";
                                readonly description: "Update to the trade. This field is optional, if it's missing, the trade is valid. Otherwise, it can have these values:\n - canceled: indicates that the trade has been canceled\n - incorrect: indicates that the trade has been corrected and the given trade is no longer valid\n - corrected: indicates that this trade is the correction of a previous (incorrect) trade\n";
                            };
                        };
                        readonly required: readonly ["t", "i", "x", "p", "s", "c", "z"];
                    };
                    readonly minuteBar: {
                        readonly type: "object";
                        readonly description: "OHLC aggregate of all the trades in a given interval.\n";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2022-01-03T09:00:00Z"];
                            };
                            readonly o: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Opening price.";
                                readonly "x-go-name": "Open";
                                readonly examples: readonly [178.26];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly h: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "High price.";
                                readonly "x-go-name": "High";
                                readonly examples: readonly [178.34];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly l: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Low price.";
                                readonly "x-go-name": "Low";
                                readonly examples: readonly [177.76];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly c: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Closing price.";
                                readonly "x-go-name": "Close";
                                readonly examples: readonly [178.08];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly v: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly description: "Bar volume.";
                                readonly "x-go-name": "Volume";
                                readonly examples: readonly [60937];
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly n: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly description: "Trade count in the bar.";
                                readonly "x-go-name": "TradeCount";
                                readonly examples: readonly [1727];
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly vw: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Volume weighted average price.";
                                readonly "x-go-name": "VWAP";
                                readonly examples: readonly [177.954244];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                        };
                        readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                    };
                    readonly prevDailyBar: {
                        readonly type: "object";
                        readonly description: "OHLC aggregate of all the trades in a given interval.\n";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2022-01-03T09:00:00Z"];
                            };
                            readonly o: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Opening price.";
                                readonly "x-go-name": "Open";
                                readonly examples: readonly [178.26];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly h: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "High price.";
                                readonly "x-go-name": "High";
                                readonly examples: readonly [178.34];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly l: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Low price.";
                                readonly "x-go-name": "Low";
                                readonly examples: readonly [177.76];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly c: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Closing price.";
                                readonly "x-go-name": "Close";
                                readonly examples: readonly [178.08];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly v: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly description: "Bar volume.";
                                readonly "x-go-name": "Volume";
                                readonly examples: readonly [60937];
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly n: {
                                readonly type: "integer";
                                readonly format: "int64";
                                readonly description: "Trade count in the bar.";
                                readonly "x-go-name": "TradeCount";
                                readonly examples: readonly [1727];
                                readonly minimum: -9223372036854776000;
                                readonly maximum: 9223372036854776000;
                            };
                            readonly vw: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Volume weighted average price.";
                                readonly "x-go-name": "VWAP";
                                readonly examples: readonly [177.954244];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                        };
                        readonly required: readonly ["t", "o", "h", "l", "c", "v", "n", "vw"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const StockTradeSingle: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbol: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The symbol to query.";
                };
            };
            readonly required: readonly ["symbol"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly start: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-03T00:00:00Z", "2024-01-03T01:02:03.123456789Z", "2024-01-03T09:30:00-04:00", "2024-01-03"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive start of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the beginning of the current day.\n";
                };
                readonly end: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-04T00:00:00Z", "2024-01-04T01:02:03.123456789Z", "2024-01-04T09:30:00-04:00", "2024-01-04"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive end of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: current time if `feed` is not `sip` or if the user has a subscription, otherwise 15 minutes before the current time.\n";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 10000;
                    readonly default: 1000;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of data points to return in the response page.\nThe API may return less, even if there are more available data points in the requested interval.\nAlways check the `next_page_token` for more pages.\nThe limit applies to the total number of data points, not per symbol!\n";
                };
                readonly asof: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The as-of date of the queried stock symbol(s). Format: YYYY-MM-DD. Default: current day.\n\nThis date is used to identify the underlying entity of the provided symbol(s), so that name changes for this entity can be found. Data for past symbol(s) is returned if the query date range spans the name change.\n\nThe special value of \"-\" means symbol mapping is skipped. Data is returned based on the symbol alone without looking up previous names. The same happens if the queried symbol is not found on the given `asof` date.\n\nExample: FB was renamed to META in 2022-06-09. Querying META with an `asof` date after 2022-06-09 will also yield FB data. The data for the FB ticker will be labeled as META because they are considered the same underlying entity as of 2022-06-09. Querying FB with an `asof` date after 2022-06-09 will only return data with the FB ticker, not with META. But with an `asof` date before 2022-06-09, META will also be returned (as FB).\n";
                };
                readonly feed: {
                    readonly type: "string";
                    readonly enum: readonly ["iex", "otc", "sip"];
                    readonly default: "sip";
                    readonly description: "The source feed of the data: `sip` contains all US exchanges, `iex` contains only the Investors EXchange, and `otc` contains over-the-counter exchanges. Default: `sip`.\n";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly currency: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The currency of all prices in ISO 4217 format. Default: USD.\n";
                };
                readonly page_token: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The pagination token from which to continue. The value to pass here is returned in specific requests when more data is available, usually because of a response result limit.\n";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly description: "Sort data in ascending or descending order.";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "asc";
                    readonly "x-go-name": "TypeSort";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly symbol: {
                    readonly type: "string";
                };
                readonly trades: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly description: "A stock trade.";
                        readonly properties: {
                            readonly t: {
                                readonly type: "string";
                                readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                readonly format: "date-time";
                                readonly "x-go-name": "Timestamp";
                                readonly examples: readonly ["2022-01-03T09:00:00.086175744Z"];
                            };
                            readonly x: {
                                readonly type: "string";
                                readonly description: "Exchange code. See `v2/stocks/meta/exchanges` for more details.";
                                readonly "x-go-name": "Exchange";
                                readonly examples: readonly ["P"];
                            };
                            readonly p: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly description: "Trade price.";
                                readonly "x-go-name": "Price";
                                readonly examples: readonly [178.26];
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly s: {
                                readonly type: "integer";
                                readonly format: "uint32";
                                readonly description: "Trade size.";
                                readonly "x-go-name": "Size";
                                readonly examples: readonly [246];
                                readonly minimum: 0;
                                readonly maximum: 4294967295;
                            };
                            readonly i: {
                                readonly type: "integer";
                                readonly format: "uint64";
                                readonly description: "Trade ID sent by the exchange.";
                                readonly "x-go-name": "ID";
                                readonly examples: readonly [1];
                                readonly minimum: 0;
                                readonly maximum: 18446744073709552000;
                            };
                            readonly c: {
                                readonly description: "Condition flags. See `v2/stocks/meta/conditions/trade` for more details.";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly examples: readonly ["@"];
                                };
                                readonly "x-go-name": "Conditions";
                            };
                            readonly z: {
                                readonly type: "string";
                                readonly description: "Tape A is the New York Stock Exchange, Tape B is NYSE Arca, Bats, IEX and other regional exchanges, Tape C is NASDAQ, Tape O is OTC.\n\n\n`A` `B` `C` `O`";
                                readonly "x-go-name": "Tape";
                                readonly enum: readonly ["A", "B", "C", "O"];
                                readonly examples: readonly ["C"];
                            };
                            readonly u: {
                                readonly type: "string";
                                readonly "x-go-name": "Update";
                                readonly description: "Update to the trade. This field is optional, if it's missing, the trade is valid. Otherwise, it can have these values:\n - canceled: indicates that the trade has been canceled\n - incorrect: indicates that the trade has been corrected and the given trade is no longer valid\n - corrected: indicates that this trade is the correction of a previous (incorrect) trade\n";
                            };
                        };
                        readonly required: readonly ["t", "i", "x", "p", "s", "c", "z"];
                    };
                };
                readonly next_page_token: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "Pagination token for the next page.";
                };
                readonly currency: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["trades", "next_page_token", "symbol"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
declare const StockTrades: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly symbols: {
                    readonly type: "string";
                    readonly examples: readonly ["AAPL,TSLA"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-separated list of stock symbols.";
                };
                readonly start: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-03T00:00:00Z", "2024-01-03T01:02:03.123456789Z", "2024-01-03T09:30:00-04:00", "2024-01-03"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive start of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: the beginning of the current day.\n";
                };
                readonly end: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-01-04T00:00:00Z", "2024-01-04T01:02:03.123456789Z", "2024-01-04T09:30:00-04:00", "2024-01-04"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The inclusive end of the interval. Format: RFC-3339 or YYYY-MM-DD.\nDefault: current time if `feed` is not `sip` or if the user has a subscription, otherwise 15 minutes before the current time.\n";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 10000;
                    readonly default: 1000;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The maximum number of data points to return in the response page.\nThe API may return less, even if there are more available data points in the requested interval.\nAlways check the `next_page_token` for more pages.\nThe limit applies to the total number of data points, not per symbol!\n";
                };
                readonly asof: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The as-of date of the queried stock symbol(s). Format: YYYY-MM-DD. Default: current day.\n\nThis date is used to identify the underlying entity of the provided symbol(s), so that name changes for this entity can be found. Data for past symbol(s) is returned if the query date range spans the name change.\n\nThe special value of \"-\" means symbol mapping is skipped. Data is returned based on the symbol alone without looking up previous names. The same happens if the queried symbol is not found on the given `asof` date.\n\nExample: FB was renamed to META in 2022-06-09. Querying META with an `asof` date after 2022-06-09 will also yield FB data. The data for the FB ticker will be labeled as META because they are considered the same underlying entity as of 2022-06-09. Querying FB with an `asof` date after 2022-06-09 will only return data with the FB ticker, not with META. But with an `asof` date before 2022-06-09, META will also be returned (as FB).\n";
                };
                readonly feed: {
                    readonly type: "string";
                    readonly enum: readonly ["iex", "otc", "sip"];
                    readonly default: "sip";
                    readonly description: "The source feed of the data: `sip` contains all US exchanges, `iex` contains only the Investors EXchange, and `otc` contains over-the-counter exchanges. Default: `sip`.\n";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly currency: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The currency of all prices in ISO 4217 format. Default: USD.\n";
                };
                readonly page_token: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The pagination token from which to continue. The value to pass here is returned in specific requests when more data is available, usually because of a response result limit.\n";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly description: "Sort data in ascending or descending order.";
                    readonly enum: readonly ["asc", "desc"];
                    readonly default: "asc";
                    readonly "x-go-name": "TypeSort";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["symbols"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly trades: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly description: "A stock trade.";
                            readonly properties: {
                                readonly t: {
                                    readonly type: "string";
                                    readonly description: "Timestamp in RFC-3339 format with nanosecond precision.";
                                    readonly format: "date-time";
                                    readonly "x-go-name": "Timestamp";
                                    readonly examples: readonly ["2022-01-03T09:00:00.086175744Z"];
                                };
                                readonly x: {
                                    readonly type: "string";
                                    readonly description: "Exchange code. See `v2/stocks/meta/exchanges` for more details.";
                                    readonly "x-go-name": "Exchange";
                                    readonly examples: readonly ["P"];
                                };
                                readonly p: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly description: "Trade price.";
                                    readonly "x-go-name": "Price";
                                    readonly examples: readonly [178.26];
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly s: {
                                    readonly type: "integer";
                                    readonly format: "uint32";
                                    readonly description: "Trade size.";
                                    readonly "x-go-name": "Size";
                                    readonly examples: readonly [246];
                                    readonly minimum: 0;
                                    readonly maximum: 4294967295;
                                };
                                readonly i: {
                                    readonly type: "integer";
                                    readonly format: "uint64";
                                    readonly description: "Trade ID sent by the exchange.";
                                    readonly "x-go-name": "ID";
                                    readonly examples: readonly [1];
                                    readonly minimum: 0;
                                    readonly maximum: 18446744073709552000;
                                };
                                readonly c: {
                                    readonly description: "Condition flags. See `v2/stocks/meta/conditions/trade` for more details.";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly examples: readonly ["@"];
                                    };
                                    readonly "x-go-name": "Conditions";
                                };
                                readonly z: {
                                    readonly type: "string";
                                    readonly description: "Tape A is the New York Stock Exchange, Tape B is NYSE Arca, Bats, IEX and other regional exchanges, Tape C is NASDAQ, Tape O is OTC.\n\n\n`A` `B` `C` `O`";
                                    readonly "x-go-name": "Tape";
                                    readonly enum: readonly ["A", "B", "C", "O"];
                                    readonly examples: readonly ["C"];
                                };
                                readonly u: {
                                    readonly type: "string";
                                    readonly "x-go-name": "Update";
                                    readonly description: "Update to the trade. This field is optional, if it's missing, the trade is valid. Otherwise, it can have these values:\n - canceled: indicates that the trade has been canceled\n - incorrect: indicates that the trade has been corrected and the given trade is no longer valid\n - corrected: indicates that this trade is the correction of a previous (incorrect) trade\n";
                                };
                            };
                            readonly required: readonly ["t", "i", "x", "p", "s", "c", "z"];
                        };
                    };
                };
                readonly currency: {
                    readonly type: "string";
                };
                readonly next_page_token: {
                    readonly type: readonly ["string", "null"];
                    readonly description: "Pagination token for the next page.";
                };
            };
            readonly required: readonly ["trades", "next_page_token"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly "X-RateLimit-Limit": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute.";
                };
                readonly "X-RateLimit-Remaining": {
                    readonly type: "integer";
                    readonly description: "Request limit per minute remaining.";
                };
                readonly "X-RateLimit-Reset": {
                    readonly type: "integer";
                    readonly description: "The UNIX epoch when the remaining quota changes.";
                };
            };
        };
    };
};
export { CorporateActions, CryptoBars, CryptoLatestBars, CryptoLatestOrderbooks, CryptoLatestQuotes, CryptoLatestTrades, CryptoPerpLatestBars, CryptoPerpLatestFuturesPricing, CryptoPerpLatestOrderbooks, CryptoPerpLatestQuotes, CryptoPerpLatestTrades, CryptoQuotes, CryptoSnapshots, CryptoTrades, LatestRates, Logos, MostActives, Movers, News, OptionBars, OptionChain, OptionLatestQuotes, OptionLatestTrades, OptionMetaConditions, OptionMetaExchanges, OptionSnapshots, OptionTrades, Rates, StockAuctionSingle, StockAuctions, StockBarSingle, StockBars, StockLatestBarSingle, StockLatestBars, StockLatestQuoteSingle, StockLatestQuotes, StockLatestTradeSingle, StockLatestTrades, StockMetaConditions, StockMetaExchanges, StockQuoteSingle, StockQuotes, StockSnapshotSingle, StockSnapshots, StockTradeSingle, StockTrades };
